namespace WebApi.Models;

public class Reservation
{
    public Guid Id { get; set; }
    
    public string UserId { get; set; }
    
    public Event Event { get; set; }
    
    public int Amount { get; set; }
}