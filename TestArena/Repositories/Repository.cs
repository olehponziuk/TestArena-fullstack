using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TestArena.Data;
using TestArena.Interfaces;

namespace TestArena.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    protected ApplicationDbContext _db;
    protected DbSet<T> _Set;
    private IRepository<T> _repositoryImplementation;

    public Repository(ApplicationDbContext context)
    {
        _db = context;
        _Set = _db.Set<T>();
    }

    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await _Set.Where(predicate).ToListAsync();
    }
    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _Set.ToListAsync();
    }
    

    public async Task<T?> GetAsync(int id)
    {
        return await _Set.FindAsync(id);
    }

    public async Task CreateAsync(T item)
    { 
        await _Set.AddAsync(item);
    }

    public Task UpdateAsync(T item)
    {
        _Set.Update(item);
        return Task.CompletedTask; 
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _Set.FindAsync(id);
        if (entity != null)
        {
            _Set.Remove(entity);
        }
    }
}