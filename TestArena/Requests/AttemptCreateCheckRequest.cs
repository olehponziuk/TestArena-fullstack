using System.Text.Json;
using TestArena.Models;

namespace TestArena.Requests;

public class AttemptCreateCheckRequest
{
    public int TestId { get; set; }
    public List<ResultItemRequest> Results { get; set; }
}