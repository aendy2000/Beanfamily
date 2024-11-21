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
        ZaloClient client = new ZaloClient("_SUgCuNO6pl_ng4qXzuQEV78hZ2FoNaxaOMHH-_SNZNKlUX-_SOpTUFOYIwSfaT-aFEN8kwM86ZMpzi4gQaKJTAmnH7ivIyTyllkVSg1FoAfwunhgAexOP3jq2odYnvTkTIaKhh3KbkMgvSDk-T0KhoEcGYR-IrQjud5CBl_456VWFyQdESbSUEPyto0tpOoX9xRQ_l-6n7Yfi9Gn_W6FxY4vtI1p0qahRcsATN01tlAkkKtwUzMITACeGZUrH92vh3tC_xU6dxPoSqGpg5-U-QxY7J6rNuswREIO-RVNmp3fxvvlwKCEA33pLEQbXSfeV3w9OENIqxyzO4tnhytD_denZh6i2elkD7RJQUa5XVUmlGVv8KvSy3PYYEufqDYb-MkD-6656d8aTKbjE4JAcbOJY-3E8V663e");
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

            JObject jObject1 = client.sendTransactionMessagetoUserId("61868408479739071", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER);
            JObject jObject2 = client.sendTransactionMessagetoUserId("3684922333495928647", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER);
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

            JObject jObject1 = client.sendTransactionMessagetoUserId("61868408479739071", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER);
            JObject jObject2 = client.sendTransactionMessagetoUserId("3684922333495928647", "VI", elements, buttons, TransactionTemplateType.TRANSACTION_ORDER);
        }
    }
}