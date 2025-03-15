using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TestArena.DTO;
using TestArena.Interfaces;
using TestArena.Models;
using TestArena.Requests;

namespace TestArena.Controllers;
[Authorize]
[ApiController]
[Route("results")]
[EnableCors]
public class ResultsController : ControllerBase
{
    private ICheckingService _checkingService;

    public ResultsController(ICheckingService checkingService)
    {
        _checkingService = checkingService;
    }

    [HttpPost]
    [Route("create/new")]
    public async Task<IActionResult> AddQuestion([FromBody] AttemptCreateCheckRequest request)
    {
        try
        {
            int attemptId = await _checkingService.CreateAttempt(new AttemptCreateDto()
            {
                TestId = request.TestId,
                UserEmail = User.FindFirst(ClaimTypes.Email)?.Value
            });
            
            List<ResultItemRequest> resultItems = request.Results;
            foreach (var r in resultItems)
            {
                await _checkingService.SaveResult(new ResultCreateDto()
                {
                    QuestionId = r.Id,
                    AttemptId = attemptId,
                    MetaData = r.MetaData
                });
            }


            return Ok( new
            {
                success = true,
                score = await _checkingService.GetAttemptResult(attemptId)
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