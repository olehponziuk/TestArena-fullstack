using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TestArena.DTO;
using TestArena.Infrastuctur;
using TestArena.Interfaces;
using TestArena.Models;
using TestArena.Repositories;

namespace TestArena.Services;

public class UsersService : IUsersService
{
    private IPasswordHasher _passwordHasher;
    private IUnitOfWork _unit;
    private JwtTokenGenerator _jwtGenerator;
    private UserRepository _userRepository;
    
    public UsersService(IPasswordHasher passwordHasher, IUnitOfWork unit, JwtTokenGenerator jwtGenerator)
    {
        _unit = unit;
        _userRepository = (UserRepository)_unit.Users;
        _passwordHasher = passwordHasher;
        _jwtGenerator = jwtGenerator;
    }
    
    public async Task Register(UserRegisterDTO userDto)
    {
        if (userDto.Email == null ||
            userDto.UserName == null || userDto.Password == null)
            throw new Exception("UsersService: Register: Bad entered data");
        
        string passwordHash = _passwordHasher.Generate(userDto.Password);
        User user = new User() { 
            UserName = userDto.UserName, 
            Email = userDto.Email, 
            Phone = userDto.Phone, 
            Password = passwordHash 
        };

        await _userRepository.CreateAsync(user);
        _unit.Save();
    }

    public async Task<string> LogIn(UserLogInDTO userDto)
    {
        User? user = await _userRepository.GetByEmailAsync(userDto.Email);
        if (user == null)
            throw new Exception("UsersService: LogIn: user == null");

        bool result = userDto.Password != null && _passwordHasher.Verify(userDto.Password, user.Password);
        if (!result)
            throw new Exception("LogIn: BAD PASSWORD");
        
        string token = _jwtGenerator.GenerateToken(user);
        
        return token;
    }
}