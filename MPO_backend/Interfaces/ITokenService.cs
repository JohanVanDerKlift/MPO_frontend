using MPO_backend.Models;

namespace MPO_backend.Interfaces;

public interface ITokenService
{
    string CreateToken(AppUser user);
}