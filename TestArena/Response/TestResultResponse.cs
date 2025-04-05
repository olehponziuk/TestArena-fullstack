using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace TestArena.Response;

public class TestResultResponse
{
    [Range(0,100)]
    public int Score { get; set; }
    public float MaxValue { get; set; }
    public float Value { get; set; }
    //public JsonDocument MetaData { get; set; }
}