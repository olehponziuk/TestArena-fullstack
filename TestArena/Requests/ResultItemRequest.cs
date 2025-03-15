using System.Text.Json;

namespace TestArena.Requests;

public class ResultItemRequest
{
    public int Id { get; set; }
    public JsonDocument MetaData { get; set; }
}