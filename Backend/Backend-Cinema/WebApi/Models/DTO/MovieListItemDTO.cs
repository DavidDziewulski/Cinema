namespace WebApi.Models.DTO;

public class MovieListItemDTO
{
    public string  Id { get; set; }
    
    public string AuthorName { get; set; }
    
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public double Rating { get; set; }
    
    public string Background { get; set; }
}