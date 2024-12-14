using Microsoft.AspNetCore.Identity;

namespace WebApi.Models;

public class ApplicationUser : IdentityUser
{
    public string Name { get; set; }
    
    public string?  RefreshToken { get; set; }
    
    public DateTime RefreshTokenExpiryTime { get; set; }
}