namespace WebApi.Models.DTO;

public class AddReservationDto
{
    public Guid EventId { get; set; }
    public int Amount { get; set; }
}