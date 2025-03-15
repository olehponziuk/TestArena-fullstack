namespace TestArena.Models;

public class TestLike
{
    public int Id { get; set; }
    public User? Author { get; set; }
    public Test Test { get; set; }
}