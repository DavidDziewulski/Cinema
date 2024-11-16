using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
// using MovieApi.Data;
// using MovieApi.Models;
// using WebApi.Data;
using WebApi.Models;
using WebApi.Models.DTO;

namespace MovieApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly List<Movie> _moviesList = new List<Movie>
        {
            new Movie
            {
                Id = "1",
                AuthorName = "Andrzej Wajda",
                Title = "Ashes and Diamonds",
                Description = "A Polish resistance fighter faces moral dilemmas at the end of World War II.",
                Rating = 8.2,
                Background = "https://multikino.pl/-/jssmedia/multikino/images/film-and-events/2024/vaiana-2/vaiana-2-plakat.jpg?mw=208&rev=b07d707b113949df8800acb69759634c",
                ReleaseDate = "1958-05-08",
                Director = "Andrzej Wajda",
                Duration = "1h 43m",
                Cast = "Zbigniew Cybulski, Ewa Krzyżewska",
                EventIds = ["1","2"],
            },
            new Movie
            {
                Id = "2",
                AuthorName = "Roman Polanski",
                Title = "Knife in the Water",
                Description = "A tense psychological thriller set on a sailboat.",
                Rating = 7.6,
                Background = "https://multikino.pl/-/jssmedia/multikino/images/film-and-events/2024/vaiana-2/vaiana-2-plakat.jpg?mw=208&rev=b07d707b113949df8800acb69759634c",
                ReleaseDate = "1962-10-09",
                Director = "Roman Polanski",
                Duration = "1h 34m",
                Cast = "Leon Niemczyk, Jolanta Umecka",
                EventIds = ["1","2"],
            },
            new Movie
            {
                Id = "3",
                AuthorName = "Krzysztof Kieślowski",
                Title = "The Double Life of Véronique",
                Description = "A mysterious and lyrical tale of two women leading parallel lives.",
                Rating = 7.8,
                Background = "https://multikino.pl/-/jssmedia/multikino/images/film-and-events/2024/vaiana-2/vaiana-2-plakat.jpg?mw=208&rev=b07d707b113949df8800acb69759634c",
                ReleaseDate = "1991-05-15",
                Director = "Krzysztof Kieślowski",
                Duration = "1h 38m",
                Cast = "Irène Jacob, Halina Gryglaszewska",
                EventIds = ["1","2"],
            },
            new Movie
            {
                Id = "4",
                AuthorName = "Paweł Pawlikowski",
                Title = "Ida",
                Description = "A young nun in 1960s Poland discovers a dark family secret.",
                Rating = 7.4,
                Background = "https://multikino.pl/-/jssmedia/multikino/images/film-and-events/2024/vaiana-2/vaiana-2-plakat.jpg?mw=208&rev=b07d707b113949df8800acb69759634c",
                ReleaseDate = "2013-10-25",
                Director = "Paweł Pawlikowski",
                Duration = "1h 22m",
                Cast = "Agata Kulesza, Agata Trzebuchowska",
                EventIds = ["1","2","3","4"],
            }
        };
        
        private readonly List<Event> _eventsList = new List<Event>
        {
            new Event
            {
                Id = "1",
                Title = "Premiere Screening",
                Start = "2023-11-20T19:00:00",
                End = "2023-11-20T21:00:00",
                AvailableSeats = 100,
                Price = 20.50,
                Description = "Special premiere screening of Ashes and Diamonds.",
                MovieId = "1",
            },
            new Event
            {
                Id = "2",
                Title = "Evening Show",
                Start = "2023-11-21T18:00:00",
                End = "2023-11-21T20:00:00",
                AvailableSeats = 80,
                Price = 18.00,
                Description = "Evening show for Knife in the Water.",
                MovieId = "2",
            },
            new Event
            {
                Id = "3",
                Title = "Classic Film Night",
                Start = "2023-11-22T20:30:00",
                End = "2023-11-22T22:30:00",
                AvailableSeats = 120,
                Price = 22.00,
                Description = "Classic film night featuring The Double Life of Véronique.",
                MovieId = "3",
            },
            new Event
            {
                Id = "4",
                Title = "Special Screening",
                Start = "2023-11-23T17:00:00",
                End = "2023-11-23T19:00:00",
                AvailableSeats = 90,
                Price = 19.99,
                Description = "Special screening of Ida.",
                MovieId = "4",
            },
            new Event
            {
                Id = "5",
                Title = "Comedy Night",
                Start = "2023-11-24T20:00:00",
                End = "2023-11-24T22:00:00",
                AvailableSeats = 150,
                Price = 15.00,
                Description = "Comedy night featuring The Wedding.",
                MovieId = "5",
            },
            new Event
            {
                Id = "6",
                Title = "Director's Cut Screening",
                Start = "2023-11-25T19:00:00",
                End = "2023-11-25T21:30:00",
                AvailableSeats = 50,
                Price = 30.00,
                Description = "Director's cut screening of Man of Marble.",
                MovieId = "6",
            },
            new Event
            {
                Id = "7",
                Title = "Late Night Screening",
                Start = "2023-11-26T22:00:00",
                End = "2023-11-27T00:30:00",
                AvailableSeats = 40,
                Price = 25.00,
                Description = "Late night screening of Mother Joan of the Angels.",
                MovieId = "7",
            },
            new Event
            {
                Id = "8",
                Title = "Historical Film Evening",
                Start = "2023-11-27T18:00:00",
                End = "2023-11-27T20:00:00",
                AvailableSeats = 70,
                Price = 20.00,
                Description = "Historical film evening featuring Eroica.",
                MovieId = "8",
            },
            new Event
            {
                Id = "9",
                Title = "Retrospective Screening",
                Start = "2023-11-28T15:00:00",
                End = "2023-11-28T17:00:00",
                AvailableSeats = 100,
                Price = 17.00,
                Description = "Retrospective screening of Dekalog.",
                MovieId = "9",
            },
            new Event
            {
                Id = "10",
                Title = "Morning Show",
                Start = "2023-11-29T10:00:00",
                End = "2023-11-29T12:00:00",
                AvailableSeats = 200,
                Price = 12.00,
                Description = "Morning show of Knife in the Water.",
                MovieId = "2",
            }
        };

        
        // GET: /movies
        [HttpGet]
        public async Task<ActionResult<List<MovieListItem>>> GetMovies()
        {
            var movieList = _moviesList.Select(movie => new MovieListItemDTO()
            {
                Id = movie.Id,
                AuthorName = movie.AuthorName,
                Title = movie.Title,
                Description = movie.Description,
                Rating = movie.Rating,
                Background = movie.Background,
            }).ToList();
            
            return Ok(movieList);
        }
            
        // Get: /movies/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Movie>> GetMovieDetail(string id)
        {
            var movie = _moviesList.FirstOrDefault(item => item.Id == id);

            if (movie == null)
            {
                return NotFound("No movie was found with the given ID");
            }

            var movieEvents = movie.EventIds
                .Select(eventId => _eventsList.FirstOrDefault(item => item.Id == eventId))
                .Where(e => e != null) 
                .Cast<Event>() 
                .ToList();

            var movieDetail = new MovieDto
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
                Events = movieEvents,
            };
            
            return Ok(movieDetail);
        }
    }
}