using TestArena.DTO;

namespace TestArena.Interfaces;

public interface IUsersService
{
    public Task Register(UserRegisterDTO user);

    public Task<string> LogIn(UserLogInDTO user);
}