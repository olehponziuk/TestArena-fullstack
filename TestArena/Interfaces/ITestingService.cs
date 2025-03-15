using TestArena.DTO;
using TestArena.Requests;
using TestArena.Response;

namespace TestArena.Interfaces;

public interface ITestingService
{
    public Task<TestStartDto> GetTestInfo(int testId);
    public Task<List<TestItemResponse>> GetAllTests();
    public Task<List<QuestionItemResponse>> GetTestQuestions(int testId);
}