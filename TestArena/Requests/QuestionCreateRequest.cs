using System.Text.Json;

namespace TestArena.Requests;

public class QuestionCreateRequest
{
    public string Content { get; set; }
    //public byte[]? Photo { get; set; }
    public JsonDocument? MetaData { get; set; }
    public List<int> CategorieKeys { get; set; }
}