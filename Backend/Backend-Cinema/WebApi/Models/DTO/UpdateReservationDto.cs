namespace WebApi.Models.DTO;

public class UpdateReservationDto
{
    public required Guid Id { get; set; }
    
    public required Int16 Amount { get; set; }
}