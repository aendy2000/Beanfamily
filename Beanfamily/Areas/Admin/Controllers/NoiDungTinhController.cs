using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using Beanfamily.Middlewall;
using System.Data.Entity;
using System.Security.Cryptography;
using System.Web.Razor.Tokenizer.Symbols;
using System.IO;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class NoiDungTinhController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/NoiDungTinh
        public ActionResult Index()
        {
            Session["active-dashboard"] = "collapsed # # ";
            Session["active-mtb-dmc1"] = "collapsed # # ";
            Session["active-mtb-qlm"] = "collapsed # # ";
            Session["active-mb-dmc1"] = "collapsed # # ";
            Session["active-mb-qlm"] = "collapsed # # ";
            Session["active-dmpv"] = "collapsed # # ";
            Session["active-mhn-dmc1"] = "collapsed # # ";
            Session["active-mhn-qlm"] = "collapsed # # ";
            Session["active-vrb-dmc1"] = "collapsed # # ";
            Session["active-vrb-spr"] = "collapsed # # ";
            Session["active-vrb-qltc"] = "collapsed # # ";
            Session["active-chtl-dmc1"] = "collapsed # # ";
            Session["active-chtl-sp"] = "collapsed # # ";
            Session["active-tkb-pq"] = "collapsed # # ";
            Session["active-tkb-tk"] = "collapsed # # ";
            Session["active-ddh"] = "collapsed # # ";
            Session["active-ddbt"] = "collapsed # # ";
            Session["active-ddbb"] = "collapsed # # ";
            Session["active-lhdb"] = "collapsed # # ";
            Session["active-hab"] = "collapsed # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # ";
            Session["active-ndt"] = " # # ";

            if (Session["ndt"] == null)
                return RedirectToAction("index", "dashboard");

            var ndt = model.BoCucNoiDungTinhWebsite.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("ndt"));
            if (chophepthemsuaxoa != null)
            {
                Session["chophep-them"] = chophepthemsuaxoa.chophepthem;
                Session["chophep-sua"] = chophepthemsuaxoa.chophepsua;
                Session["chophep-xoa"] = chophepthemsuaxoa.chophepxoa;
            }
            else
            {
                return RedirectToAction("index", "dashboard");
            }

            return View("index", ndt);
        }

        [HttpPost]
        public ActionResult SaveTrangChu(List<HttpPostedFileBase> banner_trangchu, string banner_trangchuCu,
            string mota_trangchu, HttpPostedFileBase hinhanh_mota_trangchu, string hinhanh_mota_trangchuCu,
            string mota_thanhphanchinh_nhahang, string mota_thanhphanchinh_vuonrau, string mota_thanhphanchinh_muasam,
            string mota_sanphammoi_nhahang, string mota_sanphammoi_vuonrau, string mota_sanphammoi_muasam,
            string mota_sanphamnoibat_nhahang, string mota_sanphamnoibat_vuonrau, string mota_sanphamnoibat_muasam)
        {
            try
            {
                if (model.BoCucNoiDungTinhWebsite.ToList().Count < 1)
                {
                    var newNdt = new BoCucNoiDungTinhWebsite();
                    model.BoCucNoiDungTinhWebsite.Add(newNdt);
                    model.SaveChanges();
                    model = new BeanfamilyEntities();
                }

                var ndt = model.BoCucNoiDungTinhWebsite.First();
                string path = "";
                string pathDirectory = "";

                string strList_banner_trangchu = "";
                if (banner_trangchu != null)
                {
                    foreach (var item in banner_trangchu)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/TrangChu/Banner"));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/TrangChu/Banner"), item.FileName);
                                item.SaveAs(path);
                                strList_banner_trangchu += "~/Content/AdminAreas/images/NoiDungTinh/TrangChu/Banner/" + item.FileName + "#";
                            }
                        }
                    }
                }
                if (!string.IsNullOrEmpty(strList_banner_trangchu))
                    ndt.banner_trangchu = strList_banner_trangchu.Substring(0, strList_banner_trangchu.Length - 1);
                else
                    ndt.banner_trangchu = banner_trangchuCu;

                path = "";
                pathDirectory = "";

                string strList_hinhanh_mota_trangchu = "";
                if (hinhanh_mota_trangchu != null)
                {
                    var item = hinhanh_mota_trangchu;

                    if (item != null)
                    {
                        if (item.ContentLength > 0)
                        {
                            pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/TrangChu/hinhanh_mota_trangchu"));
                            if (!Directory.Exists(pathDirectory))
                            {
                                Directory.CreateDirectory(pathDirectory);
                            }
                            path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/TrangChu/hinhanh_mota_trangchu"), item.FileName);
                            item.SaveAs(path);
                            strList_hinhanh_mota_trangchu += "~/Content/AdminAreas/images/NoiDungTinh/TrangChu/hinhanh_mota_trangchu/" + item.FileName + "#";
                        }
                    }

                }
                if (!string.IsNullOrEmpty(strList_hinhanh_mota_trangchu))
                    ndt.hinhanh_mota_trangchu = strList_hinhanh_mota_trangchu.Substring(0, strList_hinhanh_mota_trangchu.Length - 1);
                else
                    ndt.hinhanh_mota_trangchu = hinhanh_mota_trangchuCu;

                ndt.mota_trangchu = mota_trangchu;
                ndt.mota_thanhphanchinh_nhahang = mota_thanhphanchinh_nhahang;
                ndt.mota_thanhphanchinh_vuonrau = mota_thanhphanchinh_vuonrau;
                ndt.mota_thanhphanchinh_muasam = mota_thanhphanchinh_muasam;
                ndt.mota_sanphammoi_nhahang = mota_sanphammoi_nhahang;
                ndt.mota_sanphammoi_vuonrau = mota_sanphammoi_vuonrau;
                ndt.mota_sanphammoi_muasam = mota_sanphammoi_muasam;
                ndt.mota_sanphamnoibat_nhahang = mota_sanphamnoibat_nhahang;
                ndt.mota_sanphamnoibat_vuonrau = mota_sanphamnoibat_vuonrau;
                ndt.mota_sanphamnoibat_muasam = mota_sanphamnoibat_muasam;

                model.Entry(ndt).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SaveGioiThieu(List<HttpPostedFileBase> banner_gioithieu, string banner_gioithieuCu,
        HttpPostedFileBase hinhanh1_gioithieu, HttpPostedFileBase hinhanh2_gioithieu,
        HttpPostedFileBase hinhanh_mota_gioithieu, string tieude_gioithieu, string tieude2_gioithieu,
        string hinhanh1_gioithieuCu, string hinhanh2_gioithieuCu, string hinhanh_mota_gioithieuCu, string mota_gioithieu)
        {
            try
            {
                if (model.BoCucNoiDungTinhWebsite.ToList().Count < 1)
                {
                    var newNdt = new BoCucNoiDungTinhWebsite();
                    model.BoCucNoiDungTinhWebsite.Add(newNdt);
                    model.SaveChanges();
                    model = new BeanfamilyEntities();
                }

                var ndt = model.BoCucNoiDungTinhWebsite.First();
                string path = "";
                string pathDirectory = "";

                string strList_banner_gioithieu = "";
                if (banner_gioithieu != null)
                {
                    foreach (var item in banner_gioithieu)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/GioiThieu/Banner"));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/GioiThieu/Banner"), item.FileName);
                                item.SaveAs(path);
                                strList_banner_gioithieu += "~/Content/AdminAreas/images/NoiDungTinh/GioiThieu/Banner/" + item.FileName + "#";
                            }
                        }
                    }
                }
                if (!string.IsNullOrEmpty(strList_banner_gioithieu))
                    ndt.banner_gioithieu = strList_banner_gioithieu.Substring(0, strList_banner_gioithieu.Length - 1);
                else
                    ndt.banner_gioithieu = banner_gioithieuCu;

                path = "";
                pathDirectory = "";

                string strList_hinhanh1_gioithieu = "";
                if (hinhanh1_gioithieu != null)
                {
                    var item = hinhanh1_gioithieu;

                    if (item != null)
                    {
                        if (item.ContentLength > 0)
                        {
                            pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/GioiThieu/hinhanh1_gioithieu"));
                            if (!Directory.Exists(pathDirectory))
                            {
                                Directory.CreateDirectory(pathDirectory);
                            }
                            path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/GioiThieu/hinhanh1_gioithieu"), item.FileName);
                            item.SaveAs(path);
                            strList_hinhanh1_gioithieu += "~/Content/AdminAreas/images/NoiDungTinh/GioiThieu/hinhanh1_gioithieu/" + item.FileName + "#";
                        }
                    }

                }
                if (!string.IsNullOrEmpty(strList_hinhanh1_gioithieu))
                    ndt.hinhanh1_gioithieu = strList_hinhanh1_gioithieu.Substring(0, strList_hinhanh1_gioithieu.Length - 1);
                else
                    ndt.hinhanh1_gioithieu = hinhanh1_gioithieuCu;


                path = "";
                pathDirectory = "";

                string strList_hinhanh2_gioithieu = "";
                if (hinhanh2_gioithieu != null)
                {
                    var item = hinhanh2_gioithieu;

                    if (item != null)
                    {
                        if (item.ContentLength > 0)
                        {
                            pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/GioiThieu/hinhanh2_gioithieu"));
                            if (!Directory.Exists(pathDirectory))
                            {
                                Directory.CreateDirectory(pathDirectory);
                            }
                            path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/GioiThieu/hinhanh2_gioithieu"), item.FileName);
                            item.SaveAs(path);
                            strList_hinhanh2_gioithieu += "~/Content/AdminAreas/images/NoiDungTinh/GioiThieu/hinhanh2_gioithieu/" + item.FileName + "#";
                        }
                    }

                }
                if (!string.IsNullOrEmpty(strList_hinhanh2_gioithieu))
                    ndt.hinhanh2_gioithieu = strList_hinhanh2_gioithieu.Substring(0, strList_hinhanh2_gioithieu.Length - 1);
                else
                    ndt.hinhanh2_gioithieu = hinhanh2_gioithieuCu;


                path = "";
                pathDirectory = "";

                string strList_hinhanh_mota_gioithieu = "";
                if (hinhanh_mota_gioithieu != null)
                {
                    var item = hinhanh_mota_gioithieu;

                    if (item != null)
                    {
                        if (item.ContentLength > 0)
                        {
                            pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/GioiThieu/hinhanh_mota_gioithieu"));
                            if (!Directory.Exists(pathDirectory))
                            {
                                Directory.CreateDirectory(pathDirectory);
                            }
                            path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/GioiThieu/hinhanh_mota_gioithieu"), item.FileName);
                            item.SaveAs(path);
                            strList_hinhanh_mota_gioithieu += "~/Content/AdminAreas/images/NoiDungTinh/GioiThieu/hinhanh_mota_gioithieu/" + item.FileName + "#";
                        }
                    }

                }
                if (!string.IsNullOrEmpty(strList_hinhanh_mota_gioithieu))
                    ndt.hinhanh_mota_gioithieu = strList_hinhanh_mota_gioithieu.Substring(0, strList_hinhanh_mota_gioithieu.Length - 1);
                else
                    ndt.hinhanh_mota_gioithieu = hinhanh_mota_gioithieuCu;

                ndt.tieude_gioithieu = tieude_gioithieu;
                ndt.tieude2_gioithieu = tieude2_gioithieu;
                ndt.mota_gioithieu = mota_gioithieu;

                model.Entry(ndt).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SaveNhaHang(List<HttpPostedFileBase> banner_nhahang, string banner_nhahangCu,
        HttpPostedFileBase hinhanh_menuhangngay, string hinhanh_menuhangngayCu,
        HttpPostedFileBase hinhanh_menutiecban, string hinhanh_menutiecbanCu,
        HttpPostedFileBase hinhanh_menutiecbuffet, string hinhanh_menutiecbuffetCu,
        string mota_menuhangngay, string mota_menutiecban, string mota_menutiecbuffet)
        {
            try
            {
                if (model.BoCucNoiDungTinhWebsite.ToList().Count < 1)
                {
                    var newNdt = new BoCucNoiDungTinhWebsite();
                    model.BoCucNoiDungTinhWebsite.Add(newNdt);
                    model.SaveChanges();
                    model = new BeanfamilyEntities();
                }

                var ndt = model.BoCucNoiDungTinhWebsite.First();
                string path = "";
                string pathDirectory = "";

                string strList_banner_nhahang = "";
                if (banner_nhahang != null)
                {
                    foreach (var item in banner_nhahang)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/NhaHang/Banner"));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/NhaHang/Banner"), item.FileName);
                                item.SaveAs(path);
                                strList_banner_nhahang += "~/Content/AdminAreas/images/NoiDungTinh/NhaHang/Banner/" + item.FileName + "#";
                            }
                        }
                    }
                }
                if (!string.IsNullOrEmpty(strList_banner_nhahang))
                    ndt.banner_nhahang = strList_banner_nhahang.Substring(0, strList_banner_nhahang.Length - 1);
                else
                    ndt.banner_nhahang = banner_nhahangCu;

                path = "";
                pathDirectory = "";

                string strList_hinhanh_menuhangngay = "";
                if (hinhanh_menuhangngay != null)
                {
                    var item = hinhanh_menuhangngay;

                    if (item != null)
                    {
                        if (item.ContentLength > 0)
                        {
                            pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/NhaHang/hinhanh_menuhangngay"));
                            if (!Directory.Exists(pathDirectory))
                            {
                                Directory.CreateDirectory(pathDirectory);
                            }
                            path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/NhaHang/hinhanh_menuhangngay"), item.FileName);
                            item.SaveAs(path);
                            strList_hinhanh_menuhangngay += "~/Content/AdminAreas/images/NoiDungTinh/NhaHang/hinhanh_menuhangngay/" + item.FileName + "#";
                        }
                    }

                }
                if (!string.IsNullOrEmpty(strList_hinhanh_menuhangngay))
                    ndt.hinhanh_menuhangngay = strList_hinhanh_menuhangngay.Substring(0, strList_hinhanh_menuhangngay.Length - 1);
                else
                    ndt.hinhanh_menuhangngay = hinhanh_menuhangngayCu;


                path = "";
                pathDirectory = "";

                string strList_hinhanh_menutiecban = "";
                if (hinhanh_menutiecban != null)
                {
                    var item = hinhanh_menutiecban;

                    if (item != null)
                    {
                        if (item.ContentLength > 0)
                        {
                            pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/NhaHang/hinhanh_menutiecban"));
                            if (!Directory.Exists(pathDirectory))
                            {
                                Directory.CreateDirectory(pathDirectory);
                            }
                            path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/NhaHang/hinhanh_menutiecban"), item.FileName);
                            item.SaveAs(path);
                            strList_hinhanh_menutiecban += "~/Content/AdminAreas/images/NoiDungTinh/NhaHang/hinhanh_menutiecban/" + item.FileName + "#";
                        }
                    }

                }
                if (!string.IsNullOrEmpty(strList_hinhanh_menutiecban))
                    ndt.hinhanh_menutiecban = strList_hinhanh_menutiecban.Substring(0, strList_hinhanh_menutiecban.Length - 1);
                else
                    ndt.hinhanh_menutiecban = hinhanh_menutiecbanCu;


                path = "";
                pathDirectory = "";

                string strList_hinhanh_menutiecbuffet = "";
                if (hinhanh_menutiecbuffet != null)
                {
                    var item = hinhanh_menutiecbuffet;

                    if (item != null)
                    {
                        if (item.ContentLength > 0)
                        {
                            pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/NhaHang/hinhanh_menutiecbuffet"));
                            if (!Directory.Exists(pathDirectory))
                            {
                                Directory.CreateDirectory(pathDirectory);
                            }
                            path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/NhaHang/hinhanh_menutiecbuffet"), item.FileName);
                            item.SaveAs(path);
                            strList_hinhanh_menutiecbuffet += "~/Content/AdminAreas/images/NoiDungTinh/NhaHang/hinhanh_menutiecbuffet/" + item.FileName + "#";
                        }
                    }

                }
                if (!string.IsNullOrEmpty(strList_hinhanh_menutiecbuffet))
                    ndt.hinhanh_menutiecbuffet = strList_hinhanh_menutiecbuffet.Substring(0, strList_hinhanh_menutiecbuffet.Length - 1);
                else
                    ndt.hinhanh_menutiecbuffet = hinhanh_menutiecbuffetCu;

                ndt.mota_menuhangngay = mota_menuhangngay;
                ndt.mota_menutiecban = mota_menutiecban;
                ndt.mota_menutiecbuffet = mota_menutiecbuffet;

                model.Entry(ndt).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SaveThucDonHangNgay(List<HttpPostedFileBase> banner_thucdonhangngay, string banner_thucdonhangngayCu)
        {
            try
            {
                if (model.BoCucNoiDungTinhWebsite.ToList().Count < 1)
                {
                    var newNdt = new BoCucNoiDungTinhWebsite();
                    model.BoCucNoiDungTinhWebsite.Add(newNdt);
                    model.SaveChanges();
                    model = new BeanfamilyEntities();
                }

                var ndt = model.BoCucNoiDungTinhWebsite.First();
                string path = "";
                string pathDirectory = "";

                string strList_banner_thucdonhangngay = "";
                if (banner_thucdonhangngay != null)
                {
                    foreach (var item in banner_thucdonhangngay)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/ThucDonHangNgay/Banner"));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/ThucDonHangNgay/Banner"), item.FileName);
                                item.SaveAs(path);
                                strList_banner_thucdonhangngay += "~/Content/AdminAreas/images/NoiDungTinh/ThucDonHangNgay/Banner/" + item.FileName + "#";
                            }
                        }
                    }
                }
                if (!string.IsNullOrEmpty(strList_banner_thucdonhangngay))
                    ndt.banner_thucdonhangngay = strList_banner_thucdonhangngay.Substring(0, strList_banner_thucdonhangngay.Length - 1);
                else
                    ndt.banner_thucdonhangngay = banner_thucdonhangngayCu;

                model.Entry(ndt).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SaveTiecBan(List<HttpPostedFileBase> banner_tiecban, string banner_tiecbanCu)
        {
            try
            {
                if (model.BoCucNoiDungTinhWebsite.ToList().Count < 1)
                {
                    var newNdt = new BoCucNoiDungTinhWebsite();
                    model.BoCucNoiDungTinhWebsite.Add(newNdt);
                    model.SaveChanges();
                    model = new BeanfamilyEntities();
                }

                var ndt = model.BoCucNoiDungTinhWebsite.First();
                string path = "";
                string pathDirectory = "";

                string strList_banner_tiecban = "";
                if (banner_tiecban != null)
                {
                    foreach (var item in banner_tiecban)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/TiecBan/Banner"));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/TiecBan/Banner"), item.FileName);
                                item.SaveAs(path);
                                strList_banner_tiecban += "~/Content/AdminAreas/images/NoiDungTinh/TiecBan/Banner/" + item.FileName + "#";
                            }
                        }
                    }
                }
                if (!string.IsNullOrEmpty(strList_banner_tiecban))
                    ndt.banner_tiecban = strList_banner_tiecban.Substring(0, strList_banner_tiecban.Length - 1);
                else
                    ndt.banner_tiecban = banner_tiecbanCu;

                model.Entry(ndt).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SaveBuffet(List<HttpPostedFileBase> banner_buffet, string banner_buffetCu)
        {
            try
            {
                if (model.BoCucNoiDungTinhWebsite.ToList().Count < 1)
                {
                    var newNdt = new BoCucNoiDungTinhWebsite();
                    model.BoCucNoiDungTinhWebsite.Add(newNdt);
                    model.SaveChanges();
                    model = new BeanfamilyEntities();
                }

                var ndt = model.BoCucNoiDungTinhWebsite.First();
                string path = "";
                string pathDirectory = "";

                string strList_banner_buffet = "";
                if (banner_buffet != null)
                {
                    foreach (var item in banner_buffet)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/Buffet/Banner"));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/Buffet/Banner"), item.FileName);
                                item.SaveAs(path);
                                strList_banner_buffet += "~/Content/AdminAreas/images/NoiDungTinh/Buffet/Banner/" + item.FileName + "#";
                            }
                        }
                    }
                }
                if (!string.IsNullOrEmpty(strList_banner_buffet))
                    ndt.banner_buffet = strList_banner_buffet.Substring(0, strList_banner_buffet.Length - 1);
                else
                    ndt.banner_buffet = banner_buffetCu;

                model.Entry(ndt).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SaveVuonRau(List<HttpPostedFileBase> banner_vuonrau, string banner_vuonrauCu)
        {
            try
            {
                if (model.BoCucNoiDungTinhWebsite.ToList().Count < 1)
                {
                    var newNdt = new BoCucNoiDungTinhWebsite();
                    model.BoCucNoiDungTinhWebsite.Add(newNdt);
                    model.SaveChanges();
                    model = new BeanfamilyEntities();
                }

                var ndt = model.BoCucNoiDungTinhWebsite.First();
                string path = "";
                string pathDirectory = "";

                string strList_banner_vuonrau = "";
                if (banner_vuonrau != null)
                {
                    foreach (var item in banner_vuonrau)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/VuonRau/Banner"));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/VuonRau/Banner"), item.FileName);
                                item.SaveAs(path);
                                strList_banner_vuonrau += "~/Content/AdminAreas/images/NoiDungTinh/VuonRau/Banner/" + item.FileName + "#";
                            }
                        }
                    }
                }
                if (!string.IsNullOrEmpty(strList_banner_vuonrau))
                    ndt.banner_vuonrau = strList_banner_vuonrau.Substring(0, strList_banner_vuonrau.Length - 1);
                else
                    ndt.banner_vuonrau = banner_vuonrauCu;

                model.Entry(ndt).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SaveMuaSam(List<HttpPostedFileBase> banner_muasam, string banner_muasamCu)
        {
            try
            {
                if (model.BoCucNoiDungTinhWebsite.ToList().Count < 1)
                {
                    var newNdt = new BoCucNoiDungTinhWebsite();
                    model.BoCucNoiDungTinhWebsite.Add(newNdt);
                    model.SaveChanges();
                    model = new BeanfamilyEntities();
                }

                var ndt = model.BoCucNoiDungTinhWebsite.First();
                string path = "";
                string pathDirectory = "";

                string strList_banner_muasam = "";
                if (banner_muasam != null)
                {
                    foreach (var item in banner_muasam)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/MuaSam/Banner"));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/MuaSam/Banner"), item.FileName);
                                item.SaveAs(path);
                                strList_banner_muasam += "~/Content/AdminAreas/images/NoiDungTinh/MuaSam/Banner/" + item.FileName + "#";
                            }
                        }
                    }
                }
                if (!string.IsNullOrEmpty(strList_banner_muasam))
                    ndt.banner_muasam = strList_banner_muasam.Substring(0, strList_banner_muasam.Length - 1);
                else
                    ndt.banner_muasam = banner_muasamCu;

                model.Entry(ndt).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SaveHinhAnh(List<HttpPostedFileBase> banner_hinhanh, string banner_hinhanhCu)
        {
            try
            {
                if (model.BoCucNoiDungTinhWebsite.ToList().Count < 1)
                {
                    var newNdt = new BoCucNoiDungTinhWebsite();
                    model.BoCucNoiDungTinhWebsite.Add(newNdt);
                    model.SaveChanges();
                    model = new BeanfamilyEntities();
                }

                var ndt = model.BoCucNoiDungTinhWebsite.First();
                string path = "";
                string pathDirectory = "";

                string strList_banner_hinhanh = "";
                if (banner_hinhanh != null)
                {
                    foreach (var item in banner_hinhanh)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/HinhAnh/Banner"));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/HinhAnh/Banner"), item.FileName);
                                item.SaveAs(path);
                                strList_banner_hinhanh += "~/Content/AdminAreas/images/NoiDungTinh/HinhAnh/Banner/" + item.FileName + "#";
                            }
                        }
                    }
                }
                if (!string.IsNullOrEmpty(strList_banner_hinhanh))
                    ndt.banner_hinhanh = strList_banner_hinhanh.Substring(0, strList_banner_hinhanh.Length - 1);
                else
                    ndt.banner_hinhanh = banner_hinhanhCu;

                model.Entry(ndt).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SaveKhac(List<HttpPostedFileBase> banner_khac, string banner_khacCu)
        {
            try
            {
                if (model.BoCucNoiDungTinhWebsite.ToList().Count < 1)
                {
                    var newNdt = new BoCucNoiDungTinhWebsite();
                    model.BoCucNoiDungTinhWebsite.Add(newNdt);
                    model.SaveChanges();
                    model = new BeanfamilyEntities();
                }

                var ndt = model.BoCucNoiDungTinhWebsite.First();
                string path = "";
                string pathDirectory = "";

                string strList_banner_khac = "";
                if (banner_khac != null)
                {
                    foreach (var item in banner_khac)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/Khac/Banner"));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/NoiDungTinh/Khac/Banner"), item.FileName);
                                item.SaveAs(path);
                                strList_banner_khac += "~/Content/AdminAreas/images/NoiDungTinh/Khac/Banner/" + item.FileName + "#";
                            }
                        }
                    }
                }
                if (!string.IsNullOrEmpty(strList_banner_khac))
                    ndt.banner_khac = strList_banner_khac.Substring(0, strList_banner_khac.Length - 1);
                else
                    ndt.banner_khac = banner_khacCu;

                model.Entry(ndt).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
    }
}