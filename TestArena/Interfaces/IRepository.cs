using System.Linq.Expressions;
using TestArena.Models;

namespace TestArena.Interfaces;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetAsync(int id);
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
    Task CreateAsync(T item);
    Task UpdateAsync(T item);
    Task DeleteAsync(int id);
}