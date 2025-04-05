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
    private readonly ITestingService _testingService;
    private readonly ICheckingService _checkingService;

    public HomeController(IProfileService profileService, ITestingService testingService, ICheckingService checkingService)
    {
        _profileService = profileService;
        _testingService = testingService;
        _checkingService = checkingService;
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
                success = false,
                message = e.Message
            });
        }
        
    }
    
    [HttpGet]
    [Route("attempts")]
    public async Task<IActionResult> GetAttempts()
    {
        return Ok();
    }

    [HttpGet]
    [Route("tests")]
    public async Task<IActionResult> GetUserTests()
    {
        try
        {
            string? email = User.FindFirst(ClaimTypes.Email)?.Value;
            int userId = (await _profileService.GetUserByEmail(email)).Id;
            return Ok(new
            {
                success = true,
                Tests = await _testingService.GetAllForAuthor(userId)
            });
        }
        catch (Exception e)
        {
            return Ok(new
            {
                success = false,
                message = e.Message
            });
        }
    }
    
    [HttpGet]
    [Route("results")]
    public async Task<IActionResult> GetUserTResults()
    {
        try
        {
            string? email = User.FindFirst(ClaimTypes.Email)?.Value;
            int userId = (await _profileService.GetUserByEmail(email)).Id;
            return Ok(new
            {
                success = true,
                Tests = await _checkingService.GetAllForAuthor(userId)
            });
        }
        catch (Exception e)
        {
            return Ok(new
            {
                success = false,
                message = e.Message
            });
        }
    }
    
    
}