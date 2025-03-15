using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TestArena.DTO;
using TestArena.Interfaces;
using TestArena.Requests;

namespace TestArena.Controllers;

[Authorize]
[ApiController]
[Route("tests")]
[EnableCors]
public class TestsController : ControllerBase
{
    private readonly ITestingService _testingService;
    private readonly ITestCreationService _testCreationService;

    public TestsController(ITestingService testingService, ITestCreationService testCreationService)
    {
        _testingService = testingService;
        _testCreationService = testCreationService;
    }

    [HttpGet]
    [Route("list")]
    public async Task<IActionResult> GetAllTests()
    {
        try
        {
            var tests = await _testingService.GetAllTests();
            return Ok(new
            {
                success = true,
                tests = tests
            });
        }
        catch (Exception e)
        {
            return Ok(new
            {
                success = false,
                message = e.Message
            });
        }
    }

    [HttpPost]
    [Route("add/question")]
    public async Task<IActionResult> AddQuestion([FromBody] QuestionCreateRequest request)
    {
        try
        {
            var tmp = new
            {
                success = true,
                questionId = await _testCreationService.SaveQuestion(request)
            };
            return Ok(tmp);
        }
        catch (Exception e)
        {
            return Ok(new
            {
                success = false,
                message = e.Message
            });
        }
    }

    [HttpPost]
    [Route("create/test")]
    public async Task<IActionResult> CreateTest([FromBody] TestCreateRequest request)
    {
        try
        {
            TestCreateDto testDto = new TestCreateDto()
            {
                Email = User.FindFirst(ClaimTypes.Email)?.Value,
                PhoneColor = request.PhoneColor,
                Title = request.Title,
                MetaData = request.MetaData,
                QuestionKeys = request.QuestionKeys
            };
            return Ok(new
            {
                success = true,
                testId = await _testCreationService.CreateTest(testDto)
            });
        }
        catch (Exception e)
        {
            return Ok(new
            {
                success = false,
                message = e.Message
            });
        }
    }

    [HttpGet]
    [Route("start")]
    public async Task<IActionResult> StartTest([FromQuery] int testId)
    {
        try
        {
            var testInfo = await _testingService.GetTestInfo(testId);
            return Ok(new
            {
                success = true,
                testId = testId,
                title = testInfo.Title,
                metaData = testInfo.MetaData,
                questions = _testingService.GetTestQuestions(testId),
            });
        }
        catch (Exception e)
        {
            return Ok(new
            {
                success = false,
                message = e.Message
            });
        }
    }

}