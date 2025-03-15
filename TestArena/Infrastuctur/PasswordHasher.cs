using TestArena.Interfaces;

namespace TestArena.Infrastuctur;

public class PasswordHasher : IPasswordHasher
{
    public string Generate(string password) => 
        BCrypt.Net.BCrypt.EnhancedHashPassword(password);

    public bool Verify(string password, string hashPasword) => 
        BCrypt.Net.BCrypt.EnhancedVerify(password, hashPasword);

}