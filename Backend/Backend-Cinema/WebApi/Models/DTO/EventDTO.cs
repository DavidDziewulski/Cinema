namespace WebApi.Models.DTO;

public class EventDto
{
    public Guid Id { get; set; }
    
    public string Title { get; set; }
    
    public string Start { get; set; }
    
    public string  End { get; set; }
    
    public int AvailableSeats { get; set; }
    
    public double Price { get; set; }
    
    public string Description { get; set; }
}