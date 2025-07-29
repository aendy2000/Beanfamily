using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Helpers;
using ZaloDotNetSDK;
using ZaloDotNetSDK.entities.oa;
using System.IO;

namespace Beanfamily.ZaloAPI
{
    public class SendMessageOrder
    {
        ZaloClient client = new ZaloClient("JGkvKbegupjF2h9LM2pYEK44lL5GEx9RGqUjGJ4kzcjqVkjW9IlYIKDesK8H4EjUScRGDJL3o0jDFim1E6UN450Wcpv3NPK6AHo-47zxWI489DvA7L3lG5TvtMz32lPiDq7x3LCX_68vKgTNJHojOWjfZaj-09zKQLQ1J0CahLiKShTDSngkGnb6a4bk1jLVF77rQ2mJztKwLlfkK2RJ0ZnFqorr9ja0P6FaFdS6vYGCViWSQZVLBNb1oXWFFUiB0npa1qra_MauGQTlQZQxH0bHWcm5RPzgTaMnMGy3aqz6PPLP2YkPDsneamKB9iilGdgM3YaXXX5DT9ejL2365XfKn0jw4zay4sFa96WwwnWbJT8lDH78DND5p1bZ8-rm0rhWN6yfyZGUQwyV3WEYCdftZp8rSo4HQ5bODE0w");
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

            JObject jObject1 = client.sendTransactionMessagetoUserId("61868408479739071", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER); //Đặng Văn Tuấn
            JObject jObject2 = client.sendTransactionMessagetoUserId("3684922333495928647", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER); //Beanfamily
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

            JObject jObject1 = client.sendTransactionMessagetoUserId("61868408479739071", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER); //Đặng Văn Tuấn
            JObject jObject2 = client.sendTransactionMessagetoUserId("3684922333495928647", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER); //Beanfamily
        }
    }
}