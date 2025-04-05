using Microsoft.EntityFrameworkCore;
using TestArena.Data;
using TestArena.Exeptions;
using TestArena.Models;

namespace TestArena.Repositories;

public class TestRepository : Repository<Test>
{
    public TestRepository(ApplicationDbContext context): base(context){}

    public async Task<User?> GetAuthorForTestAsync(int testId)
    {
        Test? test = await _Set.Include(t => t.Author).FirstOrDefaultAsync(t => t.Id == testId);
        if (test == null)
            throw new RepositoryExeption("TestRepository: GetAuthorForTestAsync: test == null");

        return test.Author;
    }
    
    public async Task<IEnumerable<Question>> GetQuestionsAsync(int testId)
    {
        Test? test = await _Set.Include(t => t.Questions).FirstOrDefaultAsync(t => t.Id == testId);
        if (test == null)
            throw new RepositoryExeption("TestRepository: GetQuestionsAsync: test == null");
        
        return test.Questions ?? Enumerable.Empty<Question>();
    }
    
    public async Task AddQuestionAsync(int testId, int questionId)
    {
        Test? test = await _Set.Include(t => t.Questions).FirstOrDefaultAsync(t => t.Id == testId);
        if (test == null)
            throw new RepositoryExeption("TestRepository: AddQuestionToTest: test == null");

        Question? question = await _db.Questions.FirstOrDefaultAsync(q => q.Id == questionId);
        if (question == null)
            throw new RepositoryExeption("TestRepository: AddQuestionToTest: question == null");
        
        if (!test.Questions.Contains(question))
            test.Questions.Add(question);
    }

    public async Task<IEnumerable<Test>> GetTestsForAuthor(int userId)
    {
        return await _Set
            .Include(t => t.Author)
            .Where(t => t.Author.Id == userId).ToListAsync();
    }
    
    public async Task<IEnumerable<Attempt>> GetAttemptsForUserAndTestAsync(int userId, int testId)
    {
        return await _db.Attempts.Where(a => a.User.Id == userId && a.Test.Id == testId).ToListAsync() ?? Enumerable.Empty<Attempt>();
    }
    
    public async Task AddCommentToTestAsync(int testId, int commentId)
    {
        Comment? comment = await _db.Comments.FirstOrDefaultAsync(c => c.Id == commentId);
        if (comment == null)
            throw new RepositoryExeption("TestRepository: AddCommentToTestAsync: comment == null");

        Test? test = await _Set.Include(t => t.Comments).FirstOrDefaultAsync(t => t.Id == testId);
        if(test == null)
            throw new RepositoryExeption("TestRepository: AddCommentToTestAsync: test == null");
        if (!test.Comments.Contains(comment))
        {
            test.Comments.Add(comment);
        }
    }
    //GetComments_All
    public async Task<IEnumerable<TestLike>> GetLikesForTestAsync(int testId)
    {
        Test? test = await _Set.Include(c => c.Likes).FirstOrDefaultAsync(c => c.Id == testId);
        if (test == null)
            throw new RepositoryExeption("TestRepository: GetLikesForTestAsync: test == null");

        return test.Likes;
    }
    
    public async Task AddLikeToTestAsync(int testId, int likeId)
    {
        Test? test = await _Set.Include(c => c.Likes).FirstOrDefaultAsync(c => c.Id == testId);
        if (test == null)
            throw new RepositoryExeption("TestRepository: AddLikeToTestAsync: test == null");

        TestLike? like = await _db.TestLikes.FirstOrDefaultAsync(l => l.Id == likeId);
        if (like == null)
            throw new RepositoryExeption("TestRepository: AddLikeToTestAsync: like == null");
        
        if (!test.Likes.Contains(like))
            test.Likes.Add(like);
    }
}