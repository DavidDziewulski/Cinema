using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;
using WebApi.Models.DTO;

namespace WebApi.Controllers

{
    [ApiController]
    [Route("[controller]")]
    public class ReservationController(AppDbContext _context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            // var userId = new Guid("D4EC4A79-0510-45AB-95BF-808CC4EBBE9E");

            // var userReservations = await _context.Reservations
            //     .Where(reservation => reservation.UserId == userId)
            //     .Include(item => item.Event)
            //     .ThenInclude(item => item.)
            //     .Select(item => item.Event)
            //     .ToListAsync();
            
            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized("Token is missing or invalid.");
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var userEmail = jwtToken.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;
            if (string.IsNullOrEmpty(userEmail))
            {
                return Unauthorized("userEmail not found in the token.");
            }
            
            var user = _context.Users.FirstOrDefault(u => u.Email == userEmail);

            if (user == null)
            {
                return Unauthorized("User not found.");
            }
            
            var reservations = await _context.Reservations
                .Where(reservation => reservation.UserId == user.Id)
                .Include(item => item.Event)
                .ThenInclude(eventItem => eventItem.Movie)
                .Select(res => new ReservationDto()
                {
                    Id = res.Id,
                    MovieId = res.Event.MovieId,
                    Amount = res.Amount,
                    Title = res.Event.Movie.Title,
                    Description = res.Event.Movie.Description,
                    Background = res.Event.Movie.Background,
                    Event = new EventDto()
                    {
                        Id = res.Event.Id,
                        Title = res.Event.Title,
                        Start = res.Event.Start,
                        End = res.Event.End,
                        AvailableSeats = res.Event.AvailableSeats - res.Event.Reservations.Sum(r => r.Amount),
                        Price = res.Event.Price,
                        Description = res.Event.Description,
                    }
                }).ToListAsync();
            
            return Ok(reservations);
        }
        [HttpPost]
        // reservation - Create 
        public async Task<ActionResult> CreateReservation([FromBody] AddReservationDto input)
        {
            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized("Token is missing or invalid.");
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var userEmail = jwtToken.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;
            if (string.IsNullOrEmpty(userEmail))
            {
                return Unauthorized("userEmail not found in the token.");
            }
            
            var user = _context.Users.FirstOrDefault(u => u.Email == userEmail);

            if (user == null)
            {
                return Unauthorized("User not found.");
            }
            
            var EventId = input.EventId;
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            if (EventId == Guid.Empty)
            {
                return BadRequest("Id is invalid");
            }

            var eventItem = await _context.Events
                .Where(item => item.Id == EventId )
                .FirstOrDefaultAsync();
                
            if (eventItem == null)
            {
                return BadRequest("Events not found");
            }

            var reservations = await _context.Reservations
                .Where(item => item.Event.Id == EventId)
                .Include(item => item.Event)
                .ToListAsync();

            var totalReservations = reservations
                .Select(item => item.Amount)
                .Sum();

            if (totalReservations + input.Amount > eventItem.AvailableSeats)
            {
                return BadRequest("Reservations not available");
            }
            
            var newReservation = new Reservation()
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                Event = eventItem,
                Amount = input.Amount,
            };
            
            await _context.Reservations.AddAsync(newReservation);
            await _context.SaveChangesAsync();
            
            return Ok("Reservation created successfully");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateReservation(Guid id,[FromBody] UpdateReservationDto input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            if (id == Guid.Empty)
            {
                return BadRequest("Id is invalid");
            }
            
            var reservationItem = await _context.Reservations
                .Where(item => item.Id == id )
                .Include(item => item.Event)
                .FirstOrDefaultAsync();
                
            if (reservationItem == null)
            {
                return BadRequest("Reservation not found");
            }

            var reservations = await _context.Reservations
                .Where(item => item.Event.Id == reservationItem.Event.Id && item.Id != reservationItem.Id)
                .ToListAsync();

            var totalReservedTickets = reservations
                .Sum(item => item.Amount);
            
            var newTotalReservations = totalReservedTickets + input.Amount;

            if (newTotalReservations > reservationItem.Event.AvailableSeats)
            {
                return BadRequest("Not enough available tickets.");
            }

            reservationItem.Amount = input.Amount;
            
            _context.Reservations.Update(reservationItem);
            await _context.SaveChangesAsync();
            
            return Ok("Reservation created successfully");
            
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReservation(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            if (id == Guid.Empty)
            {
                return BadRequest("Id is invalid");
            }
            
            var reservationItem = await _context.Reservations
                .Where(item => item.Id == id )
                .Include(item => item.Event)
                .FirstOrDefaultAsync();
                
            if (reservationItem == null)
            {
                return BadRequest("Reservation not found");
            }

            _context.Reservations.Remove(reservationItem);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok("Reservation deleted successfully.");
        }
    }
}