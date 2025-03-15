using Microsoft.EntityFrameworkCore;
using TestArena.Data;
using TestArena.Exeptions;
using TestArena.Models;

namespace TestArena.Repositories;

public class TestLikeRepository : Repository<TestLike>
{
    public TestLikeRepository(ApplicationDbContext context) : base(context) {}
    
    public async Task<User?> GetAuthorForTestLikeAsync(int likeId)
    {
        TestLike? like = await _Set.Include(l => l.Author).FirstOrDefaultAsync(l => l.Id == likeId);
        if (like == null)
            throw new RepositoryExeption("TestLikeRepository: GetAuthorForTestLikeAsync: like == null");

        return like.Author;
    }
    
    public async Task<Test> GetCommentForCommentLikeAsync(int likeId)
    {
        TestLike? like = await _Set.Include(l => l.Test).FirstOrDefaultAsync(l => l.Id == likeId);
        if (like == null)
            throw new RepositoryExeption("TestLikeRepository: GetCommentForTestLikeAsync: like == null");

        return like.Test;
    }
}