namespace WebApi.Models;

public class Event
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Start { get; set; }
    public string End { get; set; }
    public int AvailableSeats { get; set; }
    public double Price { get; set; }
    public string Description { get; set; }
    
    public Guid MovieId { get; set; }
    
    public Movie Movie { get; set; }
    
    public List<Reservation> Reservations { get; set; }
}