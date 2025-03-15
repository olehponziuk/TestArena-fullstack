using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TestArena.Interfaces;

namespace TestArena.Controllers;

[Authorize]
[ApiController]
[Route("home")]
[EnableCors]
public class HomeController : ControllerBase
{
    private readonly IProfileService _profileService;

    public HomeController(IProfileService profileService)
    {
        _profileService = profileService;
    }
    
    [HttpGet]
    [Route("data")]
    public async Task<IActionResult> GetProfileData()
    {
        try
        {
            string? email = User.FindFirst(ClaimTypes.Email)?.Value;
            string userName = await _profileService.GetUserName(email!);
            return Ok(new
            {
                success = true,
                userName = userName
            });
        }
        catch (Exception e)
        {
            return Ok(new
            {
                success = true,
                message = e.Message
            });
        }
        
    }
    
    [HttpGet]
    [Route("tests")]
    public async Task<IActionResult> GetTests()
    {
        return Ok();
    }
    [HttpGet]
    [Route("attempts")]
    public async Task<IActionResult> GetAttempts()
    {
        return Ok();
    }
    
    
}