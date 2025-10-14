using System;
using System.Net;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json.Linq;

public class MomoRefundService
{
    public JObject Refund(string orderId, string transId, string amount, string description)
    {
        string requestId = Guid.NewGuid().ToString();

        // raw signature string
        string rawHash = "accessKey=" + MomoConfig.accessKey +
                         "&amount=" + amount +
                         "&description=" + description +
                         "&orderId=" + orderId +
                         "&partnerCode=" + MomoConfig.partnerCode +
                         "&requestId=" + requestId +
                         "&transId=" + transId;

        // tạo signature
        string signature = SignSHA256(rawHash, MomoConfig.secretKey);

        // tạo body JSON
        JObject message = new JObject
        {
            { "partnerCode", MomoConfig.partnerCode },
            { "orderId", orderId },
            { "requestId", requestId },
            { "amount", amount },
            { "transId", transId },
            { "lang", "vi" },
            { "description", description },
            { "signature", signature }
        };

        // gửi request
        HttpWebRequest httpRequest = (HttpWebRequest)WebRequest.Create(MomoConfig.refundEndpoint);
        httpRequest.Method = "POST";
        httpRequest.ContentType = "application/json";

        using (var streamWriter = new StreamWriter(httpRequest.GetRequestStream()))
        {
            streamWriter.Write(message.ToString());
            streamWriter.Flush();
        }

        string responseContent = "";
        using (HttpWebResponse httpResponse = (HttpWebResponse)httpRequest.GetResponse())
        using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
        {
            responseContent = streamReader.ReadToEnd();
        }

        return JObject.Parse(responseContent);
    }

    private string SignSHA256(string rawData, string key)
    {
        var encoding = new UTF8Encoding();
        byte[] keyByte = encoding.GetBytes(key);
        byte[] messageBytes = encoding.GetBytes(rawData);
        using (var hmacsha256 = new HMACSHA256(keyByte))
        {
            byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
            return BitConverter.ToString(hashmessage).Replace("-", "").ToLower();
        }
    }
}
