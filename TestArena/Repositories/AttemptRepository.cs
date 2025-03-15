using Microsoft.EntityFrameworkCore;
using TestArena.Data;
using TestArena.Exeptions;
using TestArena.Models;

namespace TestArena.Repositories;

public class AttemptRepository: Repository<Attempt>
{
    public AttemptRepository(ApplicationDbContext context) : base(context) {}
    
    public async Task<User> GetUserForAttemptAsync(int attemptId)
    {
        Attempt? attempt = await _Set.Include(a => a.User).FirstOrDefaultAsync(a => a.Id == attemptId);
        if (attempt == null)
            throw new RepositoryExeption("AttemptRepository: GetUserForAttempt: attempt == null");

        return attempt.User;
    }
        
    public async Task<Test> GetTestForAttemptAsync(int attemptId)
    {
        Attempt? attempt = await _Set.Include(a => a.Test).FirstOrDefaultAsync(a => a.Id == attemptId);
        if (attempt == null)
            throw new RepositoryExeption("AttemptRepository: GetUserForAttempt: attempt == null");

        return attempt.Test;
    }

    public async Task<IEnumerable<Result>> GetResultsForAttemptAsync(int attemptId)
    {
        Attempt? attempt = await _Set.Include(a => a.Results).FirstOrDefaultAsync(a => a.Id == attemptId);
        if (attempt == null)
            throw new RepositoryExeption("AttemptRepository: GetResultsForAttemptAsync: attempt == null");

        return attempt.Results ?? Enumerable.Empty<Result>();
    }

    public async Task AddResultToAttemptAsync(int attemptId,int resultId)
    {
        Attempt? attempt = await _Set.Include(a => a.Test).ThenInclude(t => t.Questions)
            .FirstOrDefaultAsync(a => a.Id == attemptId);
        if (attempt == null)
            throw new RepositoryExeption("AttemptRepository: AddResultToAttemptAsync: attempt == null");

        Result? result = await _db.Results.Include(r => r.Question).FirstOrDefaultAsync(r => r.Id == resultId);
        if (result == null)
            throw new RankException("AttemptRepository: AddResultToAttemptAsync: result == null");

        if ((attempt.Test.Questions.Contains(result.Question))
            && (!attempt.Results.Contains(result)))
        {
            attempt.Results.Add(result);
        }
    }
    
    public async Task<Attempt?> GetWithDetailsAsync(int attemptId)
    {
        return await _Set
            .Include(a => a.User)
            .Include(a => a.Test)
            .Include(a => a.Results)
            .FirstOrDefaultAsync();
    }

}