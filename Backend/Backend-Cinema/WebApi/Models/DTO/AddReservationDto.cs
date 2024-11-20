namespace WebApi.Models.DTO;

public class AddReservationDto
{
    private Guid EventId { get; set; }
    
    private int Amount { get; set; }
}