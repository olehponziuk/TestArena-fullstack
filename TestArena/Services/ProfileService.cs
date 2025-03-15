using TestArena.Interfaces;
using TestArena.Repositories;

namespace TestArena.Services;

public class ProfileService : IProfileService
{
    private IUnitOfWork _unit;
    private UserRepository _userRepository;

    public ProfileService(IUnitOfWork unit)
    {
        _unit = unit;
        _userRepository = (UserRepository)unit.Users;
    }
    public async Task<string> GetUserName(string email)
    {
        return (await _userRepository.GetByEmailAsync(email)).UserName;
    }
}