namespace TestArena.Models;

public class CommentLike
{
    public int Id { get; set; }
    public User? Author { get; set; }
    public Comment Comment { get; set; }
}