using TestArena.DTO;
using TestArena.Interfaces;
using TestArena.Models;
using TestArena.Repositories;
using TestArena.Requests;
using TestArena.Response;

namespace TestArena.Services;

public class CheckingService : ICheckingService
{
    private IUnitOfWork _unit;
    private AttemptRepository _attemptRepository;
    private ResultRepository _resultRepository;
    private TestRepository _testRepository;
    private UserRepository _userRepository;
    
    public CheckingService(IUnitOfWork unit)
    {
        _unit = unit;
        _attemptRepository = (AttemptRepository)_unit.Attempts;
        _resultRepository = (ResultRepository)_unit.Results;
        _testRepository = (TestRepository)_unit.Tests;
        _userRepository = (UserRepository)_unit.Users;
    }

    public async Task<int> CreateAttempt(AttemptCreateDto attemptDto)
    {
        User? user = await _userRepository.GetByEmailAsync(attemptDto.UserEmail);
        if (user == null)
            throw new Exception("CheckingService : CreateAttempt: user == null");

        Test? test = await _testRepository.GetAsync(attemptDto.TestId);
        if (test == null)
            throw new Exception("CheckingService : CreateAttempt: test == null");
        Attempt? attempt = new Attempt()
        {
            User = user,
            Test = test
        };
        await _attemptRepository.CreateAsync(attempt);
        await _unit.SaveAsync();
        
        return attempt.Id;
    }

    public async Task<int> SaveResult(ResultCreateDto resultDto)
    {
        Question? question = await _unit.Questions.GetAsync(resultDto.QuestionId);
        if (question == null)
            throw new Exception("CheckingService: SaveResult: question == null");
        Attempt? attempt = await _attemptRepository.GetAsync(resultDto.AttemptId);
        if (attempt == null)
            throw new Exception("CheckingService: SaveResult: attempt == null");

        Result result = new Result()
        {
            Question = question,
            Attempt = attempt,
            MetaData = resultDto.MetaData
        };
        await _resultRepository.CreateAsync(result);
        await _unit.SaveAsync();

        return result.Id;
    }

    public async Task<TestResultResponse> GetAttemptResult(int attemptId)
    {
        Attempt? attempt = await _attemptRepository.GetWithDetailsAsync(attemptId);
        if (attempt == null)
            throw new Exception("CheckingService: GetAttemptResult: attempt == null");
        var results = attempt.Results;
        float count = 0.0F;
        int maxCount = results.Count;
        if (maxCount == 0)
            throw new Exception("CheckingService: GetAttemptResult: maxCount == 0");
        
        foreach (var r in results)
        {
            
            string? questionType = r.Question.MetaData?.RootElement.GetProperty("Type").GetString();
            if (questionType == null)
                throw new Exception("CheckingService: GetAttemptResult: Type == null");

            if (questionType == "test") {
                var resultRespond = r.MetaData?.RootElement.GetProperty("respond").EnumerateArray()
                    .Select(i => i.GetInt32().ToString()).ToList();
                var questionRespond = r.Question.MetaData?.RootElement.GetProperty("Respond").EnumerateArray()
                    .Select(i => i.GetInt32().ToString()).ToList();
                if (questionRespond?[0] == resultRespond?[0] && questionRespond.Count == resultRespond.Count)
                    count++;
                else if (questionRespond.Count != resultRespond.Count)
                    throw new Exception(
                        "CheckingService: GetAttemptResult: questionRespond.Count !=  resultRespond.Count");
            }
            else if (questionType == "textarea")
            {
                var resultRespond = r.MetaData?.RootElement.GetProperty("respond").EnumerateArray()
                    .Select(i => i.GetString()).ToList();
                var questionRespond = r.Question.MetaData?.RootElement.GetProperty("Respond").GetString();
                if (resultRespond[0] == questionRespond)
                    count++;
            }else if (questionType == "multitest") {
                var resultRespond = r.MetaData?.RootElement.GetProperty("respond").EnumerateArray()
                    .Select(i => i.GetInt32().ToString()).ToList();
                var questionRespond = r.Question.MetaData?.RootElement.GetProperty("Respond").EnumerateArray()
                    .Select(i => i.GetInt32().ToString()).ToList();
                float tmp = 1F;
                foreach (var s in resultRespond) 
                    if (!questionRespond.Contains(s))
                        tmp -= 1F /  (float)questionRespond.Count;
                count += tmp;
            }else
                throw new Exception("CheckingService: GetAttemptResult: Undefined type of Test");
        }
        //MetaData for Answer Grid
        
        int score = (int)(count * 100.0 / maxCount);

        return new TestResultResponse()
        {
            Score = score,
            MaxValue = maxCount,
            Value = count
        };
    }

    public async Task<IEnumerable<UsersResultItemDto>> GetAllForAuthor(int userId)
    {
        IEnumerable<Attempt> attempts = await _attemptRepository.GetForUserWithDetails(userId);
       return await Task.WhenAll(attempts.Select(async a => new UsersResultItemDto()
        {
            AttemptId = a.Id,
            TestTitle = a.Test.Title,
            Score = (await GetAttemptResult(a.Id)).Score
        }));
    }
}