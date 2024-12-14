namespace WebApi.Models.DTO;

public class MovieDto
{
    public required Guid Id { get; set; }
    
    public required string AuthorName { get; set; }
    
    public required string Title { get; set; }
    
    public required string Description { get; set; }
    
    public required double Rating { get; set; }
    
    public required string Background { get; set; }
    
    public required string ReleaseDate { get; set; }
    
    public required string Director { get; set; }
    
    public required string Duration { get; set; }
    
    public required string Cast { get; set; }
    
    public required List<EventDto> Events { get; set; } 
}