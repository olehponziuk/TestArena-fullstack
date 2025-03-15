using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TestArena.Data;
using TestArena.Infrastuctur;
using TestArena.Interfaces;
using TestArena.Models;
using TestArena.Repositories;
using TestArena.Services;

internal class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var services = builder.Services;
        var configuration = builder.Configuration;

        builder.Services.AddControllers();
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

//builder.Services.AddTransient<IRepository<User>, UserRepository>();
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IUnitOfWork, EFUnitOfWork>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddSingleton<JwtTokenGenerator>();

        services.AddScoped<IUsersService, UsersService>();
        services.AddScoped<IProfileService, ProfileService>();
        services.AddScoped<ITestingService, TestingService>();
        services.AddScoped<ITestCreationService, TestCreationService>();
        services.AddScoped<ICheckingService, CheckingService>();
        
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
        {
    
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtOptions.JwtKey)) 
            };
        });
        services.AddAuthorization();


        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            db.Database.EnsureCreated();
        }
        

        app.UseHttpsRedirection();

        app.UseStaticFiles();
        app.UseDefaultFiles();

        app.UseRouting();

        app.UseCors();

        app.UseAuthentication();
        app.UseAuthorization();
        
        app.MapControllers();
        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Auth}/{action=Start}/{id?}");

        app.MapFallback(context =>
        {
            context.Response.Redirect("http://localhost:5173" + context.Request.Path);
            return Task.CompletedTask;
        });
        
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    try
    {
        
        EFUnitOfWork unit = new EFUnitOfWork(dbContext);
        TestRepository testRepository = (TestRepository)unit.Tests;

        //Categorie c = new Categorie() { Title = "universal", Color = "gray" };
        //await categotieRepository.CreateAsync(c);
        //unit.Save();
        var tests = await testRepository.GetAllAsync();
        
        foreach (var u in tests)
        {
            Console.WriteLine($"{u.Id} - {u.Title} - {u.MetaData}");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("Ошибка подключения к базе данных: " + ex.Message);
    }
}
        app.Run();
    }
}



