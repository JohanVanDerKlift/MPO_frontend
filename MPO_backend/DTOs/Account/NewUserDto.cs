namespace MPO_backend.DTOs.Account;

public class NewUserDto
{
    public string Email { get; set; }
    public string Token { get; set; }
    public List<string> Roles { get; set; }
}