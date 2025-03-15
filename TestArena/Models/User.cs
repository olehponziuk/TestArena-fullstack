using System.ComponentModel.DataAnnotations;
using TestArena.Atributs;

namespace TestArena.Models;

public class User
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    [EmailAddress]
    [UniqueEmail]
    public string? Email { get; set; }
    [Phone]
    public string? Phone { get; set; }
    public byte[]? Photo { get; set; }
    
    public ICollection<Test>? Tests { get; set; }
    public ICollection<Attempt> Attempts { get; set; }
    public ICollection<Comment> Comments { get; set; }
    public ICollection<CommentLike> CommentLikes { get; set; }
    public ICollection<TestLike> TestLikes { get; set; }
}
