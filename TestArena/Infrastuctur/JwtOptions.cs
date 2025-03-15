using Newtonsoft.Json.Linq;

namespace TestArena.Infrastuctur;

public static class JwtOptions
{
    private static readonly JObject Configuration;

    static JwtOptions()
    {
        var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "appsettings.json");
        string json = File.ReadAllText(path);
        Configuration = JObject.Parse(json);
    }

    public static string? JwtKey => 
        Configuration.SelectToken("JwtSettings.SecretKey")?.ToString();
}