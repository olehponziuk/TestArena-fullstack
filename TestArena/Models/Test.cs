using System.Text.Json;

namespace TestArena.Models;

public class Test
{
    public int Id { get; set; }
    public User? Author { get; set; }
    public string Title { get; set; }
    public JsonDocument MetaData { get; set; }
    public string? PhoneColor { get; set; }
    
    public ICollection<Question> Questions { get; set; }
    public ICollection<Comment> Comments { get; set; }
    public ICollection<TestLike> Likes { get; set; } = null!;
    public ICollection<Attempt> Attempts { get; set; }
}