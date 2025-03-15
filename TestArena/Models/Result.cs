using System.Text.Json;

namespace TestArena.Models;

public class Result
{
    public int Id { get; set; }
    public Question Question { get; set; }
    public Attempt Attempt { get; set; }
    
    public JsonDocument MetaData { get; set; }
}