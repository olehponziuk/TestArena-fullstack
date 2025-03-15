using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TestArena.Data;
using TestArena.Exeptions;
using TestArena.Interfaces;
using TestArena.Models;

namespace TestArena.Repositories;

public class UserRepository : Repository<User>
{
    public UserRepository(ApplicationDbContext context) : base(context){}

    public async Task<IEnumerable<Test>> GetTestsForUserAsync(int userId)
    {
        User? user = await _Set.Include(u => u.Tests).FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
            throw new RepositoryExeption("UserRepository: GetTestsForUser: user == null");

        return user.Tests ?? Enumerable.Empty<Test>();
    }
    
    public async Task<IEnumerable<Attempt>> GetAttemptsForTestAndUserAsync(int testId, int userId)
    {
         User? user = await _Set.Include(t => t.Attempts).ThenInclude(a => a.Test).FirstOrDefaultAsync(u => u.Id == userId);
         if (user == null)
             throw new RepositoryExeption("UserRepository: GetAttemptsForTestAndUserAsync: user == null");
         return user.Attempts.Where(a => a.Test.Id == testId).OrderBy(a => a.Id) ?? Enumerable.Empty<Attempt>();
    }

    public async Task<IEnumerable<Attempt>> GetAttemptsForUserAsync(int userId)
    {
        User? user = await _Set.Include(u => u.Attempts).FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
            throw new RepositoryExeption("UserRepository: GetAttemptsForUserAsync: user == null");

        return user.Attempts ?? Enumerable.Empty<Attempt>();
    }

    public async Task<User> GetByEmailAsync(string email)
    {
        return (await _Set/*AsNoTracking()*/.FirstOrDefaultAsync(u => EF.Functions.Like(u.Email, email)))!;
    }
    
    
    /*public async Task UpdateAsync(User item)
    {
        var user = await _Set.FirstOrDefaultAsync(u => u.Id == item.Id);
        if (user == null)
            throw new RepositoryExeption("UserRepository: Update : user == null");

        if (!string.IsNullOrEmpty(item.UserName))
            user.UserName = item.UserName;

        if (!string.IsNullOrEmpty(item.Password))
            user.Password = item.Password;

        if (!string.IsNullOrEmpty(item.Email))
            user.Email = item.Email;

        if (!string.IsNullOrEmpty(item.Phone))
            user.Phone = item.Phone;

        if (item.Photo != null)
            user.Photo = item.Photo;

        await _db.SaveChangesAsync();
    }


    public void Delete(int id)
    {
        User? user = _db.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
            throw new RepositoryExeption("UserRepository: Delete: user == null");
        _db.Users.Remove(user);
    }*/
}