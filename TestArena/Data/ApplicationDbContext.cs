using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using TestArena.Models;

namespace TestArena.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Categorie> Categories { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Test> Tests { get; set; }
    public DbSet<Attempt> Attempts { get; set; }
    public DbSet<Result> Results { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<CommentLike> CommentLikes { get; set; }
    public DbSet<TestLike> TestLikes { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    { }

    public ApplicationDbContext()
    {
        throw new NotImplementedException();
    }
}