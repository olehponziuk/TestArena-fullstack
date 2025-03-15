using System.Text.Json;
using TestArena.Models;

namespace TestArena.Requests;

public class TestCreateRequest
{ 
    public string Title { get; set; }
    public JsonDocument MetaData { get; set; }
    public string? PhoneColor { get; set; }
    public int[] QuestionKeys { get; set; }
}