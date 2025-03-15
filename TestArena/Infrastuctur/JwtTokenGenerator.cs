using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using TestArena.Models;

namespace TestArena.Infrastuctur;

public class JwtTokenGenerator
{
    public string GenerateToken(User user)
    {
        byte[] key = Encoding.UTF8.GetBytes(JwtOptions.JwtKey ?? throw new InvalidOperationException());
        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

        if (user.Email == null)
            throw new Exception("JwtTokenGenerator: GenerateToken: user.Email == null");
        SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            }),
            Expires = DateTime.UtcNow.AddHours(6),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}