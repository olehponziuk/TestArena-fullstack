using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using TestArena.DTO;
using TestArena.Interfaces;
using TestArena.Models;
using TestArena.Repositories;
using TestArena.Requests;
using TestArena.Response;

namespace TestArena.Services;

public class TestingService : ITestingService
{
    private IUnitOfWork _unit;
    private QuestionRepository _questionRepository;
    private TestRepository _testRepository;
    private UserRepository _userRepository;

    public TestingService(IUnitOfWork unit)
    {
        _unit = unit;
        _questionRepository = (QuestionRepository)_unit.Questions;
        _testRepository = (TestRepository)_unit.Tests;
        _userRepository = (UserRepository)_unit.Users;
    }

    public async Task<TestStartDto> GetTestInfo(int testId)
    {
        var test = await _testRepository.GetAsync(testId);
        return new TestStartDto()
        {
            Id = testId,
            MetaData = test.MetaData,
            Title = test.Title
        };
    }

    public async Task<List<TestItemResponse>> GetAllTests()
    {
        var tests = await _testRepository.GetAllAsync();

        var testResponses = new List<TestItemResponse>();

        foreach (var t in tests)
        {
            var author = await _testRepository.GetAuthorForTestAsync(t.Id);
            testResponses.Add(new TestItemResponse
            {
                Id = t.Id,
                Title = t.Title,
                PhoneColor = t.PhoneColor,
                AuthorName = author?.UserName
            });
        }

        return testResponses;
    }

    public async Task<List<QuestionItemResponse>> GetTestQuestions(int testId)
    {
        Test? test = await _testRepository.GetAsync(testId);
        if (test == null)
            throw new Exception("TestingService: GetTestQuestions: test == null");

        JsonDocument? metaData = test.MetaData;

        bool isMixed = metaData.RootElement.GetProperty("Mixed").GetBoolean();
        bool isMixedEach = metaData.RootElement.GetProperty("MixedEach").GetBoolean();
        
        IEnumerable<Question> questions =
            (isMixed)
                ? RandomSortQuestions(await _testRepository.GetQuestionsAsync(testId))
                : await _testRepository.GetQuestionsAsync(testId);
        var questionResponses = new List<QuestionItemResponse>();
        foreach (var q in questions)
        {
            questionResponses.Add(new QuestionItemResponse()
            {
                Id = q.Id,
                Content = q.Content,
                MetaData = q.MetaData,
            });
        }

        return questionResponses;
    }

    private IEnumerable<Question> RandomSortQuestions(IEnumerable<Question> questions)
    {
        /*Random random = new Random();
        List<int> keys = new List<int>();
        keys.AddRange(questions.Select(q => q.Id));

        List<Question> questionsRes = new List<Question>();
        int keysIndex;
        int key;
        Question tmp;
        while (keys.Count > 1)
        {
            keysIndex = random.Next(0, keys.Count);
            key = keys[keysIndex];
            tmp = questions.Where(q => q.Id == key).FirstOrDefault();
            questionsRes.Add(tmp);
            keys.RemoveAt(keysIndex);
        }
        questionsRes.Add(questions.Where(q => q.Id == keys[0]).FirstOrDefault());

        return questionsRes;*/
        return questions.OrderBy(q => Guid.NewGuid());
    }
}