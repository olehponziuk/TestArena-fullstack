using Microsoft.EntityFrameworkCore;
using TestArena.Data;
using TestArena.Exeptions;
using TestArena.Models;

namespace TestArena.Repositories;

public class CommentLikeRepository :Repository<CommentLike>
{
    public CommentLikeRepository(ApplicationDbContext context) : base(context) {}
    
    public async Task<User?> GetAuthorForCommentLikeAsync(int likeId)
    {
        CommentLike? like = await _Set.Include(l => l.Author).FirstOrDefaultAsync(l => l.Id == likeId);
        if (like == null)
            throw new RepositoryExeption("CommentLikeRepository: GetAuthorForCommentLikeAsync: like == null");

        return like.Author;
    }
    
    public async Task<Comment> GetCommentForCommentLikeAsync(int likeId)
    {
        CommentLike? like = await _Set.Include(l => l.Comment).FirstOrDefaultAsync(l => l.Id == likeId);
        if (like == null)
            throw new RepositoryExeption("CommentLikeRepository: GetCommentForCommentLikeAsync: like == null");

        return like.Comment;
    }
}