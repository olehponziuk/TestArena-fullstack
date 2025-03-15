using System.Linq.Expressions;
using TestArena.Data;
using TestArena.Exeptions;
using TestArena.Interfaces;
using TestArena.Models;

namespace TestArena.Repositories;

internal class CategotieRepository : Repository<Categorie>
{
    public CategotieRepository(ApplicationDbContext context) : base(context){}
    
}