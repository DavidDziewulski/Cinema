using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
    public class MoviesController(AppDbContext _context, UserManager<ApplicationUser> _userManager) : ControllerBase
    {
        // GET: /movies
        [HttpGet]
        // [Authorize]
        public async Task<ActionResult<List<MovieListItemDto>>> GetMovies()
        { 
            // var claims = User.Claims.ToList();
            // Opcjonalnie: Uzyskaj szczegóły zalogowanego użytkownika
            // var userName = User.FindFirstValue(ClaimTypes.Email);
            // var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Pobiera ID zalogowanego użytkownika
            // var user = await _userManager.FindByIdAsync(userId);
            //
            // if (user == null)
            // {
            //     return Unauthorized("User not found");
            // }
            
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
            var movie = await _context.Movies
                .Where(item => item.Id == id)
                .Include(item => item.Events)
                .ThenInclude(item => item.Reservations)
                .AsNoTracking()
                .FirstOrDefaultAsync();
            
            if (movie == null)
            {
                return NotFound();
            }
            
            return Ok(new MovieDto
            {
                Id = movie.Id,
                AuthorName = movie.AuthorName,
                Title = movie.Title,
                Description = movie.Description,
                Rating = movie.Rating,
                Background = movie.Background,
                ReleaseDate = movie.ReleaseDate,
                Director = movie.Director,
                Duration = movie.Duration,
                Cast = movie.Cast,
                Events = movie.Events.Select(x => new EventDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Start = x.Start,
                    End = x.End,
                    AvailableSeats = x.AvailableSeats - x.Reservations.Select(item => item.Amount).Sum(),
                    Price = x.Price,
                    Description = x.Description,
                }).ToList(),
            });
        }
    }
}