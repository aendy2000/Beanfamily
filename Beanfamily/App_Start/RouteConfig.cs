﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Beanfamily.Models;
namespace Beanfamily
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //Hình ảnh bean
            routes.MapRoute(
                name: "Hình Ảnh Bean",
                url: "hinh-anh-bean",
                defaults: new { controller = "HinhAnh", action = "Index", id = UrlParameter.Optional }
            );

            //Tra cứu đơn hàng
            routes.MapRoute(
                name: "Tra Cứu Đơn Hàng",
                url: "tra-cuu-don-hang",
                defaults: new { controller = "Home", action = "TraCuuDonHang", id = UrlParameter.Optional }
            );

            //Thông tin đặt hàng
            routes.MapRoute(
                name: "Tiến Hành Đặt Hàng",
                url: "tien-hanh-dat-hang",
                defaults: new { controller = "DatHang", action = "TienHanhDatHang", id = UrlParameter.Optional }
            );

            //Giỏ hàng
            routes.MapRoute(
                name: "Giỏ Hàng",
                url: "gio-hang",
                defaults: new { controller = "DatHang", action = "Index", id = UrlParameter.Optional }
            );

            //Mua sắm
            routes.MapRoute(
                name: "Sản Phẩm Mua Sắm",
                url: "mua-sam/san-pham-mua-sam-{id}",
                defaults: new { controller = "MuaSam", action = "ProductDetail", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Mua sắm",
                url: "mua-sam",
                defaults: new { controller = "MuaSam", action = "Index", id = UrlParameter.Optional }
            );

            //Nhà Hàng
            routes.MapRoute(
                name: "Nhà hàng",
                url: "nha-hang-bean",
                defaults: new { controller = "NhaHangBean", action = "Index", id = UrlParameter.Optional }
            );

            //Thực đơn hằng ngày
            routes.MapRoute(
                name: "Sản Phẩm Thực Đơn Hằng Ngày",
                url: "menu-hang-ngay/san-pham-thuc-don-hang-ngay-{id}",
                defaults: new { controller = "ThucDonHangNgay", action = "ProductDetail", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Thực Đơn Hằng Ngày",
                url: "menu-hang-ngay",
                defaults: new { controller = "ThucDonHangNgay", action = "Index", id = UrlParameter.Optional }
            );

            //Menu Tiệc Bàn
            routes.MapRoute(
                name: "Menu Tiệc Bàn",
                url: "menu-tiec-ban",
                defaults: new { controller = "MenuTiecBan", action = "Index", id = UrlParameter.Optional }
            );

            //Menu Buffet
            routes.MapRoute(
                name: "Menu Buffet",
                url: "menu-buffet",
                defaults: new { controller = "MenuBuffet", action = "Index", id = UrlParameter.Optional }
            );

            //Vườn rau
            routes.MapRoute(
                name: "Quy Trình Trồng",
                url: "vuon-rau-bean/quy-trinh-trong-cay-{id}",
                defaults: new { controller = "VuonRau", action = "quytrinhtrong", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Sản Phẩm Vườn Rau Bean",
                url: "vuon-rau-bean/san-pham-rau-{id}",
                defaults: new { controller = "VuonRau", action = "ProductDetail", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Vườn Rau Bean",
                url: "vuon-rau-bean",
                defaults: new { controller = "VuonRau", action = "Index", id = UrlParameter.Optional }
            );

            //Giới thiệu
            routes.MapRoute(
                name: "Giới Thiệu",
                url: "gioi-thieu",
                defaults: new { controller = "Home", action = "About", id = UrlParameter.Optional }
            );

            //Trang chủ
            routes.MapRoute(
                name: "Trang Chủ",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

        }
    }
}
