using System.Diagnostics;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TestArena.DTO;
using TestArena.Interfaces;
using TestArena.Models;

namespace TestArena.Controllers;

[ApiController]
[Route("auth")]
[EnableCors] 
public class AuthController : ControllerBase
{
    //private readonly ILogger<AuthController> _logger;
    private readonly IUsersService _usersService;

    public AuthController(IUsersService usersService)
    {
        _usersService = usersService;
    }
    [HttpGet]
    [Route("start")]
    public IActionResult Start()
    {
        var data = new { message = "Testik1!" };
        return Ok(data);
    }
    
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> LogIn([FromBody]UserLogInDTO userDto)
    {
        try
        {
            var token = await _usersService.LogIn(new UserLogInDTO()
            {
                Password = userDto.Password, 
                Email = userDto.Email
            });
            
            return Ok(new
            {
                success = true,
                token = token,
            });
        }
        catch (Exception exception)
        {
            return Ok(new
            {
                success = false,
                message = exception.Message
            });
        }
    }

    [HttpPost]
    [Route("registration")]
    public async Task<IActionResult> Register([FromBody]UserRegisterDTO userDto)
    {
        if(string.IsNullOrEmpty(userDto.UserName) || string.IsNullOrEmpty(userDto.Password) ||
           string.IsNullOrEmpty(userDto.Email) ) 
            return Ok(new
        {
            success = false,
            message = "reg -"
        });
        try
        {
            await _usersService.Register(new UserRegisterDTO()
            {
                UserName = userDto.UserName,
                Password = userDto.Password,
                Email = userDto.Email,
                Phone = userDto.Phone
            });

            return Ok(new
            {
                success = true,
                userName = userDto.UserName
            });
        }
        catch(Exception exception)
        {
            return Ok(new
            {
                success = false,
                message = exception.Message
            });
        }
    }

   
}