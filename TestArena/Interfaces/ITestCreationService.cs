using TestArena.DTO;
using TestArena.Requests;

namespace TestArena.Interfaces;

public interface ITestCreationService
{
    public Task<int> SaveQuestion(QuestionCreateRequest r);
    public Task<int> CreateTest(TestCreateDto r);
}