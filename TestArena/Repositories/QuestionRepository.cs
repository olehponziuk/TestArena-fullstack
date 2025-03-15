using Microsoft.EntityFrameworkCore;
using TestArena.Data;
using TestArena.Exeptions;
using TestArena.Models;

namespace TestArena.Repositories;

public class QuestionRepository : Repository<Question>
{
    public QuestionRepository(ApplicationDbContext context) : base(context) {}

    public async Task AddCategoryToQuestion(int questionId, int categoryId)
    {
        Question? question = await _Set.Include(q => q.Categories).FirstOrDefaultAsync(q => q.Id == questionId);
        if (question == null)
            throw new RepositoryExeption("QestionRepositors: AddCategoryToQuestion: question == null");

        Categorie? categorie = await _db.Categories.FirstOrDefaultAsync(c => c.Id == categoryId);
        if (categorie == null)
            throw new RepositoryExeption("QestionRepositors: AddCategoryToQuestion: categorie == null");
        
        if (!question.Categories.Contains(categorie))
        {
            question.Categories.Add(categorie);
        }
    }

    public async Task<IEnumerable<Categorie>> GetCategoriesForQuestion(int questionId)
    {
        Question? question = await _Set.Include(q => q.Categories).FirstOrDefaultAsync(q => q.Id == questionId);
        if (question == null)
            throw new RepositoryExeption("QestionRepositors: GetCategoriesForQuestion: question == null");

        return question.Categories ?? Enumerable.Empty<Categorie>();
    }
    
    public async Task<IEnumerable<Question>> GetQuestionsForCategory(int categoryId)
    {
        Categorie? categorie = await _db.Categories.Include(q => q.Questions).FirstOrDefaultAsync(q => q.Id == categoryId);
        if (categorie == null)
            throw new RepositoryExeption("QestionRepositors: GetQuestionsForCategory: categorie == null");

        return categorie.Questions ?? Enumerable.Empty<Question>();
    }
    
    public async Task<IEnumerable<Test>> GetTestsForQuestion(int questionId)
    {
        Question? question = await _Set.Include(q => q.Tests).FirstOrDefaultAsync(q => q.Id == questionId);
        if (question == null)
            throw new RepositoryExeption("QuestionRepository: GetTestsForQuestion: question == null");

        return question.Tests ?? Enumerable.Empty<Test>();
    }
}