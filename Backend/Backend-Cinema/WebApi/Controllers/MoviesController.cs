using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Seeder;
using WebApi.Models;
using WebApi.Models.DTO;

namespace WebApi.Controllers

{
    [ApiController]
    [Route("[controller]")]
    public class MoviesController(AppDbContext _context) : ControllerBase
    {
        // GET: /movies
        [HttpGet]
        public async Task<ActionResult<List<MovieListItemDto>>> GetMovies()
        { 
           var  movies = await _context.Movies.ToListAsync();
            
            var movieList = await _context.Movies.Select(movie => new MovieListItemDto()
            {
                Id = movie.Id,
                AuthorName = movie.AuthorName,
                Title = movie.Title,
                Description = movie.Description,
                Rating = movie.Rating,
                Background = movie.Background,
            }).ToListAsync();
            
            return Ok(movieList);
        }
            
        // Get: /movies/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<MovieDto>> GetMovieDetail(Guid id)
        {
            var result = await _context.Movies
                .Where(item => item.Id == id)
                .Include(item => item.Events)
                .AsNoTracking()
                .FirstOrDefaultAsync();
            
            if (result == null)
            {
                return NotFound();
            }
            
            return Ok(new MovieDto
            {
                Id = result.Id,
                AuthorName = result.AuthorName,
                Title = result.Title,
                Description = result.Description,
                Rating = result.Rating,
                Background = result.Background,
                ReleaseDate = result.ReleaseDate,
                Director = result.Director,
                Duration = result.Duration,
                Cast = result.Cast,
                Events = result.Events.Select(x => new EventDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Start = x.Start,
                    End = x.End,
                    AvailableSeats = x.AvailableSeats,
                    Price = x.Price,
                    Description = x.Description,
                }).ToList(),
            });
        }
    }
}