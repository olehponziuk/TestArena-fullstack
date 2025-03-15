using Microsoft.EntityFrameworkCore;
using TestArena.Data;
using TestArena.Exeptions;
using TestArena.Models;

namespace TestArena.Repositories;

public class CommentRepository : Repository<Comment>
{
    public CommentRepository(ApplicationDbContext context) : base(context) {}
    
    public async Task<User> GetAuthorForCommentAsync(int commentId)
    {
        Comment? comment = await _Set.Include(c => c.Author).FirstOrDefaultAsync(c => c.Id == commentId);
        if (comment == null)
            throw new RepositoryExeption("CommentRepository: GetAuthorForCommentAsync: comment == null");
        return comment.Author;
    }
    
    public async Task<Comment?> GetParentCommentAsync(int commentId)
    {
        Comment? comment = await _Set.Include(c=>c.Parent).FirstOrDefaultAsync(c => c.Id == commentId);
        if (comment == null)
            throw new RepositoryExeption("CommentRepository: GetParentCommentAsync: comment == null");
        return comment.Parent;
    }
    
    public async Task<Test?> GetTestAsync(int commentId)
    {
        Comment? comment = await _Set.Include(c=>c.Test).FirstOrDefaultAsync(c => c.Id == commentId);
        if (comment == null)
            throw new RepositoryExeption("CommentRepository: GetParentCommentAsync: comment == null");
        return comment.Test;
    }

    public async Task<IEnumerable<Comment>> GetChildrenAsync(int commentId)
    {
        Comment? comment = await _Set.Include(c => c.Children).FirstOrDefaultAsync(c => c.Id == commentId);
        if (comment == null)
            throw new RepositoryExeption("CommentRepository: GetChildrenAsync: comment == null");
        return comment.Children;
    }
    
    public async Task AddCommentAsync(int parentId, int childId)
    {
        Comment? parent = await _Set.Include(c => c.Children).FirstOrDefaultAsync(c => c.Id == parentId);
        if (parent == null)
            throw new RepositoryExeption("TestRepository: AddCommentAsync: parent == null");

        Comment? child = await _Set.FirstOrDefaultAsync(t => t.Id == childId);
        if(child == null)
            throw new RepositoryExeption("CommentRepository: AddCommentAsync: child == null");
        if (!parent.Children.Contains(child))
        {
            parent.Children.Add(child);
        }
    }
    
    public async Task<IEnumerable<CommentLike>> GetLikesForCommentAsync(int commentId)
    {
        Comment? comment = await _Set.Include(c => c.Likes).FirstOrDefaultAsync(c => c.Id == commentId);
        if (comment == null)
            throw new RepositoryExeption("CommentRepository: GetLikesForComment: comment == null");

        return comment.Likes;
    }
    
    public async Task AddLikeToCommentAsync(int commentId, int likeId)
    {
        Comment? comment = await _Set.Include(c => c.Likes).FirstOrDefaultAsync(c => c.Id == commentId);
        if (comment == null)
            throw new RepositoryExeption("CommentRepository: AddLikeToCommentAsync: comment == null");

        CommentLike? like = await _db.CommentLikes.FirstOrDefaultAsync(l => l.Id == likeId);
        if (like == null)
            throw new RepositoryExeption("CommentRepository: AddLikeToCommentAsync: like == null");
        
        if (!comment.Likes.Contains(like))
            comment.Likes.Add(like);
    }
}