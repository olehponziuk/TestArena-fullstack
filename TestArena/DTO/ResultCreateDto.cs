using System.Text.Json;

namespace TestArena.DTO;

public class ResultCreateDto
{
    public int QuestionId { get; set; }
    public int AttemptId { get; set; }
    public JsonDocument MetaData  {get; set; }
}