namespace MPO_backend.DTOs.Account;

public record ResetPasswordRequest
{
    public required string Email { get; set; }
    public required string NewPassword { get; set; }
}