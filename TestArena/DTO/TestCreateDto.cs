using System.Text.Json;
using TestArena.Models;

namespace TestArena.DTO;

public class TestCreateDto
{
    public string? Email { get; set; }
    public string Title { get; set; }
    public JsonDocument MetaData { get; set; }
    public string? PhoneColor { get; set; }
    public int[] QuestionKeys { get; set; }

}