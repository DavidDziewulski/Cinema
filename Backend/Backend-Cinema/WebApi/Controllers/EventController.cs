using System.Runtime.InteropServices.JavaScript;
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
    public class EventController(AppDbContext _context) : ControllerBase
    {
        [HttpPost]
        [Route("{id}/reserva")]
        public async Task<ActionResult> CreateReservation([FromBody] AddReservationDto input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            
            Console.WriteLine(input.Amount);
            Console.WriteLine(input.EventId);

            return Ok("Reservation created successfully");
        }
    }
}