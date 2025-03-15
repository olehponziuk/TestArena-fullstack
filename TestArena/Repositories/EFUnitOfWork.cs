using TestArena.Data;
using TestArena.Interfaces;
using TestArena.Models;

namespace TestArena.Repositories;

public class EFUnitOfWork : IUnitOfWork
{
    private ApplicationDbContext _db;
    
    private UserRepository _userRepository;
    private CategotieRepository _categotieRepository;
    private QuestionRepository _questionRepository;
    private TestRepository _testRepository;
    private AttemptRepository _attemptRepository;
    private ResultRepository _resultRepository;
    private CommentRepository _commentRepository;
    private CommentLikeRepository _commentLikeRepository;
    private TestLikeRepository _testLikeRepository;

    public EFUnitOfWork(ApplicationDbContext context)
    {
        _db = context;
    }

    public IRepository<User> Users
    {
        get
        {
            if (_userRepository == null)
                _userRepository = new UserRepository(_db);
            return _userRepository;
        }
    }

    public IRepository<Categorie> Categories
    {
        get
        {
            if (_categotieRepository == null)
                _categotieRepository = new CategotieRepository(_db);
            return _categotieRepository;
        }
    }
    
    public IRepository<Question> Questions
    {
        get
        {
            if (_questionRepository == null)
                _questionRepository = new QuestionRepository(_db);
            return _questionRepository;
        }
    }

    public IRepository<Test> Tests
    {
        get
        {
            if (_testRepository == null)
                _testRepository = new TestRepository(_db);
            return _testRepository;
        }
    }

    public IRepository<Attempt> Attempts
    {
        get
        {
            if (_attemptRepository == null)
                _attemptRepository = new AttemptRepository(_db);
            return _attemptRepository;
        }
    }

    public IRepository<Result> Results
    {
        get
        {
            if (_resultRepository == null)
                _resultRepository = new ResultRepository(_db);
            return _resultRepository;
        }
    }

    public IRepository<Comment> Comments
    {
        get
        {
            if (_commentRepository == null)
                _commentRepository = new CommentRepository(_db);
            return _commentRepository;
        }
    }

    public IRepository<CommentLike> CommentLikes
    {
        get
        {
            if (_commentLikeRepository == null)
                _commentLikeRepository = new CommentLikeRepository(_db);
            return _commentLikeRepository;
        }
    }

    public IRepository<TestLike> TestLikes
    {
        get
        {
            if (_testLikeRepository == null)
                _testLikeRepository = new TestLikeRepository(_db);
            return _testLikeRepository;
        }
    }
    public void Save()
    {
        _db.SaveChanges();
    }

    public async Task SaveAsync()
    {
        await _db.SaveChangesAsync();
    }

    private bool _disposed = false;
    public virtual void Dispose(bool disposing)
    {
        if (!this._disposed)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            this._disposed = true;
        }
    }
 
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    
    
}