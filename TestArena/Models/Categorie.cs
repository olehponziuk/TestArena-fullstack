namespace TestArena.Models;

public class Categorie
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Color { get; set; }
    public ICollection<Question> Questions { get; set; }

}