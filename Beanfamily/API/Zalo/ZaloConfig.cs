using Newtonsoft.Json;
using System;
using System.IO;
using System.Web;

public class ZaloConfig
{
    public static string AppId { get; set; }
    public static string AccessToken { get; set; }
    public static string RefreshToken { get; set; }
    public static DateTime ExpiresAt { get; set; }

    public static string RefreshEndpoint = "https://oauth.zaloapp.com/v4/oa/access_token";

    private static readonly string tokenFile = HttpContext.Current.Server.MapPath("~/API/Zalo/zalo_tokens.json");

    public static void LoadConfig()
    {
        if (!File.Exists(tokenFile))
            throw new FileNotFoundException("Token file not found: " + tokenFile);

        string json = File.ReadAllText(tokenFile);
        dynamic data = JsonConvert.DeserializeObject(json);

        AppId = data.appId;
        AccessToken = data.accessToken;
        RefreshToken = data.refreshToken;
        ExpiresAt = DateTime.Parse(data.expiresAt.ToString());
    }

    public static void SaveConfig()
    {
        var data = new
        {
            appId = AppId,
            accessToken = AccessToken,
            refreshToken = RefreshToken,
            expiresAt = ExpiresAt
        };

        string json = JsonConvert.SerializeObject(data, Formatting.Indented);
        File.WriteAllText(tokenFile, json);
    }
}
