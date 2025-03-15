namespace TestArena.Models;

public class Attempt
{
    public int Id { get; set; }
    public User User { get; set; }
    public Test Test { get; set; }
    public ICollection<Result> Results { get; set; }
}