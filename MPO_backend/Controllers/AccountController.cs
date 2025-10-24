using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MPO_backend.DTOs.Account;
using MPO_backend.Interfaces;
using MPO_backend.Models;

namespace MPO_backend.Controllers;

[Route("api/account")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<AppUser> _signInManager;

    public AccountController(UserManager<AppUser> userManager, 
        ITokenService tokenService, 
        SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        if (user == null)
            return Unauthorized();
        
        var roles = await _userManager.GetRolesAsync(user);
        
        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
        if (!result.Succeeded) return Unauthorized("Username not found and/or invalid password!");

        return Ok(
            new NewUserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                Roles = roles.ToList()
            }
        );
    }

    [Authorize]
    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterDto registerDto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Email,
            };
            
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                var roleErrors = new List<IdentityError>();
                foreach (var role in registerDto.Role)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, role);
                    if (!roleResult.Succeeded)
                    {
                        roleErrors.AddRange(roleResult.Errors);
                    }
                }
                
                if (roleErrors.Any())
                {
                    return StatusCode(500, roleErrors);
                    
                }
                return Ok(
                    new NewUserDto
                    {
                        Email = user.Email,
                        Token = _tokenService.CreateToken(user),
                        Roles = registerDto.Role
                    }
                );
            }
            return StatusCode(500, result.Errors);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
    
    [Authorize]
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest resetPasswordRequest)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordRequest.Email);
            
            if (user == null)
            {
                return BadRequest("User with this email not found.");
            }
            
            var passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            if (string.IsNullOrWhiteSpace(passwordResetToken))
            {
                return StatusCode(500, $"Internal server error");
            }
            var result = await _userManager.ResetPasswordAsync(user, passwordResetToken, resetPasswordRequest.NewPassword);
            return result.Succeeded ? Ok("Password reset successfully.") : BadRequest("Password reset failed.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}