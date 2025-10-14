using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;

public class ZaloTokenService
{
    public static bool GetNewAccessToken()
    {
        try
        {
            // Đọc config hiện tại
            ZaloConfig.LoadConfig();

            using (var client = new HttpClient())
            {
                var requestBody = new
                {
                    app_id = ZaloConfig.AppId,
                    grant_type = "refresh_token",
                    refresh_token = ZaloConfig.RefreshToken
                };

                var content = new StringContent(
                    JsonConvert.SerializeObject(requestBody),
                    Encoding.UTF8,
                    "application/json"
                );

                var response = client.PostAsync(ZaloConfig.RefreshEndpoint, content).Result;
                string result = response.Content.ReadAsStringAsync().Result;

                JObject json = JObject.Parse(result);

                if (json["access_token"] != null)
                {
                    string newAccessToken = json["access_token"].ToString();
                    string newRefreshToken = json["refresh_token"].ToString();
                    int expiresIn = Convert.ToInt32(json["expires_in"]);

                    // Cập nhật vào config runtime
                    ZaloConfig.AccessToken = newAccessToken;
                    ZaloConfig.RefreshToken = newRefreshToken;
                    ZaloConfig.ExpiresAt = DateTime.Now.AddSeconds(expiresIn);

                    // Lưu xuống file
                    ZaloConfig.SaveConfig();

                    return true;
                }
                else
                {
                    // Có thể log lỗi
                    Console.WriteLine("Zalo Refresh Token Error: " + result);
                    return false;
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Exception in GetNewAccessToken: " + ex.Message);
            return false;
        }
    }
}