namespace WebApi.Models;

public class Movie
{
    public Guid Id { get; set; }
    public string AuthorName { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public double Rating { get; set; }
    public string Background { get; set; }
    public string ReleaseDate { get; set; }
    public string Director { get; set; }
    public string Duration { get; set; }
    public string Cast { get; set; }
    
    public List<Event> Events { get; set; }
}