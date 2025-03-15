using System.ComponentModel.DataAnnotations;
using TestArena.Data;

namespace TestArena.Atributs;

public class UniqueEmailAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value == null)
            return ValidationResult.Success;

        var context = (ApplicationDbContext)validationContext.GetService(typeof(ApplicationDbContext));
        var email = value.ToString();
        var entity = context.Users.FirstOrDefault(u => u.Email == email);

        if (entity != null)
            return new ValidationResult("Цей Email вже використовується.");

        return ValidationResult.Success;
    }
}
