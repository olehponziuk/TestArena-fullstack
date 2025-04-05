using TestArena.DTO;
using TestArena.Response;

namespace TestArena.Interfaces;

public interface ICheckingService
{
    public  Task<int> CreateAttempt(AttemptCreateDto attemptDto);

    public  Task<int> SaveResult(ResultCreateDto resultDto);

    public  Task<TestResultResponse> GetAttemptResult(int attemptId);

    public Task<IEnumerable<UsersResultItemDto>> GetAllForAuthor(int userId);
}