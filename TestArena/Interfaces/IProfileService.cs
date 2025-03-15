namespace TestArena.Interfaces;

public interface IProfileService
{
    public Task<string> GetUserName(string email);
}