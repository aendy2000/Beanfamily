public class MomoConfig
{
    public const string endpoint = "https://payment.momo.vn/v2/gateway/api/create";
    public const string refundEndpoint = "https://payment.momo.vn/v2/gateway/api/refund";

    public const string partnerCode = "MOMOUGKS20250312";
    public const string accessKey = "dM7zD5V8t87CD41X";
    public const string secretKey = "rwz8qNpedgrCsl3isRSbND7M0UClSEkk";

    public const string redirectUrl = "https://localhost:44332/DatHang/MomoPaymentResult";
    public const string ipnUrl = "https://localhost:44332/DatHang/MomoPaymentNotify";
    public const string requestType = "captureWallet";
}
