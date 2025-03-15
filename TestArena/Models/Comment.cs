namespace TestArena.Models;

public class Comment
{
    public int Id { get; set; }
    public User Author { get; set; }
    public Comment? Parent { get; set; }
    public Test? Test { get; set; }
    public string Content { get; set; }
    
    public ICollection<CommentLike> Likes { get; set; }
    public ICollection<Comment> Children { get; set; }
}