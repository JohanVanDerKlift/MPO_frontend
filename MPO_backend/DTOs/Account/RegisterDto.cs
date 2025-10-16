using System.ComponentModel.DataAnnotations;

namespace MPO_backend.DTOs.Account;

public class RegisterDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required] 
    public string Password { get; set; }
    
    [Required]
    public List<string> Role { get; set; }
}