using System.Text.Json;

namespace TestArena.DTO;

public class TestStartDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public JsonDocument MetaData { get; set; }
}