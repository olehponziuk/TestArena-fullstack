using TestArena.Models;

namespace TestArena.Interfaces;

public interface IUnitOfWork: IDisposable
{
    IRepository<User> Users { get;}
    IRepository<Categorie> Categories { get;}
    IRepository<Question> Questions { get;}
    IRepository<Test> Tests{ get;}
    IRepository<Attempt> Attempts{ get;}
    IRepository<Result> Results{ get;}
    IRepository<Comment> Comments{ get;}
    IRepository<CommentLike> CommentLikes{ get;}
    IRepository<TestLike> TestLikes{ get;}
    void Save();
    Task SaveAsync();
}