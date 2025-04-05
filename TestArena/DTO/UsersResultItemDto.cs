using System.ComponentModel.DataAnnotations;

namespace TestArena.DTO;

public class UsersResultItemDto
{
    public int AttemptId { get; set; }
    public string? TestTitle { get; set; }
    [Range(0, 100)]
    public int Score { get; set; }
}