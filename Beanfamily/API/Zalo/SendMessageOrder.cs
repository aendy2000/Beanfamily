using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using ZaloDotNetSDK;
using ZaloDotNetSDK.entities.oa;

namespace Beanfamily.ZaloAPI
{
    public class SendMessageOrder
    {
        public void ThongBaoDonDatHang(string ngaydat, string ma, string hoten, string sdt, string diachi, string hinhthuc, string sotien, string urlImg, string urlManagement)
        {
            List<ElementV3> elements = new List<ElementV3>();
            BannerElementV3 bannerElement = new BannerElementV3(urlImg, "");
            HeaderElementV3 headerElementV3 = new HeaderElementV3("ĐƠN ĐẶT HÀNG MỚI!", ElementV3Align.CENTER);
            TextElementV3 textElementV3 = new TextElementV3("<br>Ngày đặt hàng: " + ngaydat, ElementV3Align.LEFT);

            List<ElementV3TableItem> tableItems = new List<ElementV3TableItem>();
            ElementV3TableItem tableItem1 = new ElementV3TableItem("Mã đơn hàng", ma, ElementV3TableItemStyle.BLUE);
            ElementV3TableItem tableItem2 = new ElementV3TableItem("Họ & Tên", hoten, ElementV3TableItemStyle.NONE);
            ElementV3TableItem tableItem3 = new ElementV3TableItem("Điện thoại", sdt, ElementV3TableItemStyle.NONE);
            ElementV3TableItem tableItem4 = new ElementV3TableItem("Địa chỉ", diachi, ElementV3TableItemStyle.NONE);
            ElementV3TableItem tableItem5 = new ElementV3TableItem("Hình thức", hinhthuc, ElementV3TableItemStyle.NONE);
            ElementV3TableItem tableItem6 = new ElementV3TableItem("Số tiền", sotien, ElementV3TableItemStyle.NONE);

            tableItems.Add(tableItem1);
            tableItems.Add(tableItem2);
            tableItems.Add(tableItem3);
            tableItems.Add(tableItem4);
            tableItems.Add(tableItem5);
            tableItems.Add(tableItem6);
            TableElementV3 tableElement = new TableElementV3(tableItems);

            elements.Add(bannerElement);
            elements.Add(headerElementV3);
            elements.Add(textElementV3);
            elements.Add(tableElement);

            List<ButtonV3> buttons = new List<ButtonV3>();
            OpenUrlButtonV3 openUrlButton = new OpenUrlButtonV3("Truy Cập Trang Quản Lý Đơn Hàng", "", urlManagement);
            OpenPhoneButtonV3 openPhoneButton = new OpenPhoneButtonV3("Gọi Cho Khách Hàng", "", sdt);
            buttons.Add(openUrlButton);
            buttons.Add(openPhoneButton);

            ZaloConfig.LoadConfig();

            // Nếu token sắp hết hạn hoặc hết hạn thì refresh
            if (DateTime.Now >= ZaloConfig.ExpiresAt.AddMinutes(-5))
            {
                bool refreshed = ZaloTokenService.GetNewAccessToken();
                if (!refreshed)
                    SendMessageError("Không thể get access token mới cho Zalo API");
            }

            // Khởi tạo client với access token mới nhất
            ZaloClient client = new ZaloClient(ZaloConfig.AccessToken);

            //Đặng Văn Tuấn
            //JObject jObject1 = client.sendTransactionMessagetoUserId("61868408479739071", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER);
            JObject jObject = client.sendTransactionMessagetoUserId("3684922333495928647", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER);

            int errorCode = (int)jObject["error"];
            string message = jObject["message"].ToString();

            //Gửi mail báo lỗi gì cho admin
            if (jObject["message"].ToString() != "Success")
            {
                if (errorCode == -201 || errorCode == -200)
                {
                    bool refreshed = ZaloTokenService.GetNewAccessToken();
                    if (!refreshed)
                        SendMessageError("Không thể get access token mới cho Zalo API");

                    client = new ZaloClient(ZaloConfig.AccessToken);
                    JObject retry = client.sendTransactionMessagetoUserId("3684922333495928647", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER);
                    if (retry["message"].ToString() != "Success")
                        SendMessageError(retry["message"].ToString());

                }
                else
                {
                    SendMessageError(jObject["message"].ToString());
                }
            }
        }

        public void ThongBaoDonDatBan(string ngaydat, string ma, string loai, string soban, string hoten, string sdt, string thoigian, string ghichu, string urlImg, string urlManagement)
        {

            List<ElementV3> elements = new List<ElementV3>();
            BannerElementV3 bannerElement = new BannerElementV3(urlImg, "");
            HeaderElementV3 headerElementV3 = new HeaderElementV3("ĐƠN ĐẶT BÀN " + loai + " MỚI!", ElementV3Align.CENTER);
            TextElementV3 textElementV3 = new TextElementV3("<br>Ngày đặt bàn:  " + ngaydat, ElementV3Align.LEFT);

            List<ElementV3TableItem> tableItems = new List<ElementV3TableItem>();
            ElementV3TableItem tableItem1 = new ElementV3TableItem("Mã đơn hàng", ma, ElementV3TableItemStyle.BLUE);
            ElementV3TableItem tableItem2 = new ElementV3TableItem("Số bàn", soban, ElementV3TableItemStyle.NONE);
            ElementV3TableItem tableItem3 = new ElementV3TableItem("Ngày bắt đầu", thoigian, ElementV3TableItemStyle.NONE);
            ElementV3TableItem tableItem4 = new ElementV3TableItem("Họ & Tên", hoten, ElementV3TableItemStyle.NONE);
            ElementV3TableItem tableItem5 = new ElementV3TableItem("Điện thoại", sdt, ElementV3TableItemStyle.NONE);
            ElementV3TableItem tableItem6 = new ElementV3TableItem("Ghi chú", ghichu, ElementV3TableItemStyle.NONE);

            tableItems.Add(tableItem1);
            tableItems.Add(tableItem2);
            tableItems.Add(tableItem3);
            tableItems.Add(tableItem4);
            tableItems.Add(tableItem5);
            tableItems.Add(tableItem6);
            TableElementV3 tableElement = new TableElementV3(tableItems);

            elements.Add(bannerElement);
            elements.Add(headerElementV3);
            elements.Add(textElementV3);
            elements.Add(tableElement);

            List<ButtonV3> buttons = new List<ButtonV3>();
            OpenUrlButtonV3 openUrlButton = new OpenUrlButtonV3("Truy Cập Trang Quản Lý Đơn Hàng", "", urlManagement);
            OpenPhoneButtonV3 openPhoneButton = new OpenPhoneButtonV3("Gọi Cho Khách Hàng", "", sdt);
            buttons.Add(openUrlButton);
            buttons.Add(openPhoneButton);

            ZaloConfig.LoadConfig();

            // Nếu token sắp hết hạn hoặc hết hạn thì refresh
            if (DateTime.Now >= ZaloConfig.ExpiresAt.AddMinutes(-5))
            {
                bool refreshed = ZaloTokenService.GetNewAccessToken();
                if (!refreshed)
                    SendMessageError("Không thể get access token mới cho Zalo API");
            }

            // Khởi tạo client với access token mới nhất
            ZaloClient client = new ZaloClient(ZaloConfig.AccessToken);

            //Đặng Văn Tuấn
            //JObject jObject1 = client.sendTransactionMessagetoUserId("61868408479739071", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER);
            JObject jObject = client.sendTransactionMessagetoUserId("3684922333495928647", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER);

            int errorCode = (int)jObject["error"];
            string message = jObject["message"].ToString();

            //Gửi mail báo lỗi gì cho admin
            if (jObject["message"].ToString() != "Success")
            {
                if (errorCode == -201 || errorCode == -200)
                {
                    bool refreshed = ZaloTokenService.GetNewAccessToken();
                    if (!refreshed)
                        SendMessageError("Không thể get access token mới cho Zalo API");

                    client = new ZaloClient(ZaloConfig.AccessToken);
                    JObject retry = client.sendTransactionMessagetoUserId("3684922333495928647", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER);
                    if (retry["message"].ToString() != "Success")
                        SendMessageError(retry["message"].ToString());
                }
                else
                {
                    SendMessageError(jObject["message"].ToString());
                }
            }
        }

        public void SendMessageError(string content)
        {
            using (MailMessage mailMessage = new MailMessage("info@aendy.net", "dv.tuan3010@gmail.com"))
            {
                mailMessage.Subject = "LỖI ZALO API - [BEANFAMILY.VN]";
                mailMessage.IsBodyHtml = true;
                mailMessage.Body = content;
                mailMessage.Priority = MailPriority.High;

                using (SmtpClient smtp = new SmtpClient())
                {
                    smtp.Host = "mail49.vietnix.vn";
                    smtp.EnableSsl = true;
                    NetworkCredential cred = new NetworkCredential("Info@aendy.net", "Aendy3010dvt.2kkk");
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = cred;
                    smtp.Port = 587;

                    smtp.Send(mailMessage);
                }
            }
        }
    }
}