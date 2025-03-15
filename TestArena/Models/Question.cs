using System.Text.Json;

namespace TestArena.Models;

public class Question
{
    public int Id { get; set; }
    public string Content { get; set; }
    public byte[]? Photo { get; set; }
    public JsonDocument? MetaData { get; set; }
    public ICollection<Categorie> Categories { get; set; }
    public ICollection<Test> Tests { get; set; }
    public ICollection<Result> Results { get; set; }
}