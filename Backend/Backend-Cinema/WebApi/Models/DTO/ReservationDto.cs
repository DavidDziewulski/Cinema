namespace WebApi.Models.DTO;

public class ReservationDto
{
    public required Guid Id { get; set; }
    
    public required Guid MovieId { get; set; }
    
    public required int Amount { get; set; }
    
    public required string Title { get; set; }
    
    public required string Description { get; set; }
    
    public required string Background { get; set; }
    
    public required EventDto Event { get; set; }
}