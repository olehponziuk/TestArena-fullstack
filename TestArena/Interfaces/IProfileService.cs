using TestArena.Models;

namespace TestArena.Interfaces;

public interface IProfileService
{
    public Task<User> GetUserByEmail(string email);
    public Task<string> GetUserName(string email);
}