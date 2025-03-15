using Microsoft.EntityFrameworkCore;
using TestArena.Data;
using TestArena.Exeptions;
using TestArena.Interfaces;
using TestArena.Models;

namespace TestArena.Repositories;

public class ResultRepository : Repository<Result>
{
    public ResultRepository(ApplicationDbContext context) : base(context) {}

    public async Task<Question> GetQuestionForResultAsync(int resultId)
    {
        Result? result = await _Set.Include(r => r.Question).FirstOrDefaultAsync(r => r.Id == resultId);
        if (result == null)
            throw new RepositoryExeption("ResultRepository: GetQuestionForResult: result == null");

        return result.Question;
    }
    
    public async Task<Attempt> GetAttemptForResultAsync(int resultId)
    {
        Result? result = await _Set.Include(r => r.Attempt).FirstOrDefaultAsync(r => r.Id == resultId);
        if (result == null)
            throw new RepositoryExeption("ResultRepository: GetQuestionForResult: result == null");

        return result.Attempt;
    }
    
}