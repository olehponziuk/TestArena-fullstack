using System.Text.Json;

namespace TestArena.Response;

public class QuestionItemResponse
{
    public int Id { get; set; }
    public string Content { get; set; }
    //byte[]? Photo{get; set;}
    public JsonDocument? MetaData { get; set; }
}