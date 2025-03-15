using TestArena.DTO;
using TestArena.Interfaces;
using TestArena.Models;
using TestArena.Repositories;
using TestArena.Requests;

namespace TestArena.Services;

public class TestCreationService : ITestCreationService
{
    private IUnitOfWork _unit;
    private QuestionRepository _questionRepository;
    private TestRepository _testRepository;
    private UserRepository _userRepository;

    public TestCreationService(IUnitOfWork unit)
    {
        _unit = unit;
        _questionRepository = (QuestionRepository)_unit.Questions;
        _testRepository = (TestRepository)_unit.Tests;
        _userRepository = (UserRepository)_unit.Users;
    }
    
    public async Task<int> SaveQuestion(QuestionCreateRequest r)
    {
        Question question = new Question()
        {
            Content = r.Content,
            MetaData = r.MetaData,
        };
        await _questionRepository.CreateAsync(question);
        await _unit.SaveAsync();
        foreach (var key in r.CategorieKeys)
        {
            await _questionRepository.AddCategoryToQuestion(question.Id,key);
        }
        await _unit.SaveAsync();

        return question.Id;
    }
    
    public async Task<int> CreateTest(TestCreateDto testDto)
    {
        Test test = new Test()
        {
            Author = await _userRepository.GetByEmailAsync(testDto.Email),
            Title = testDto.Title,
            PhoneColor = testDto.PhoneColor,
            MetaData = testDto.MetaData,
        };
        await _testRepository.CreateAsync(test);
        await _unit.SaveAsync();
        foreach (var key in testDto.QuestionKeys)
        {
            await _testRepository.AddQuestionAsync(test.Id,key);
        }
        await _unit.SaveAsync();

        return test.Id;
    }
}