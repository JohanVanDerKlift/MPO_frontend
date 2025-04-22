using System.ComponentModel.DataAnnotations;

namespace MPO_backend.DTOs.Account;

public class LoginDto
{
    [Required] 
    public string Username { get; set; }
    
    [Required] 
    public string Password { get; set; }
}