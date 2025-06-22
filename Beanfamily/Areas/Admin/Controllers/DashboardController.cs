using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Beanfamily.Models;
using Beanfamily.Middlewall;
using System.IO;
using System.Net.Mail;
using System.Net;
using System.Web.Helpers;
using System.Reflection;
using System.Web.Razor.Parser.SyntaxTree;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class DashboardController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/Home
        public ActionResult Index()
        {
            Session["active-dashboard"] = " # # ";
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
            Session["active-tlc-lkmxh"] = "collapsed # # "; Session["active-ndt"] = "collapsed # # "; Session["active-cs"] = "collapsed # # ";

            var currentYear = DateTime.Now.Year;
            var currentMonth = DateTime.Now.Year;
            var currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));

            Session["nam-thongke"] = currentYear;
            Session["thang-thongke"] = currentMonth;

            #region Thống Kê Doanh Thu

            string listDoanhThu = "";
            for (int i = 1; i <= 12; i++)
            {
                var dt = model.LichSuThanhToanDonHangTongHop.Where(p => p.thoigian.Month == i && p.thoigian.Year == currentYear).ToList();
                listDoanhThu += dt.Sum(s => s.sotien) + "-";
            }
            listDoanhThu = listDoanhThu.Substring(0, listDoanhThu.Length - 1);

            string listDonHang = "";
            string listSoDonHang = "";
            for (int i = 1; i <= 12; i++)
            {
                var donhang = model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(p => p.ngaydat.Month == i && p.ngaydat.Year == currentYear).ToList();
                decimal money = 0;
                int lstSoDonHangCount = 0;
                if (donhang.Count > 0)
                {
                    foreach (var item in donhang)
                    {
                        if (item.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.First().tieude.ToLower().Equals("hoàn thành"))
                        {
                            money += item.ChiTietDonHangSanPhamMuaSam.Sum(s => s.gia * s.soluongmua)
                                + item.ChiTietDonHangSanPhamRauNhaTrong.Sum(s => s.soluongmua * s.gia)
                                + item.ChiTietDonHangSanPhamThucDonHangNgay.Sum(s => s.soluongmua * s.gia);
                            
                            lstSoDonHangCount++;
                        }
                    }

                    listDonHang += money + "-";
                    listSoDonHang += lstSoDonHangCount + "-";
                }
                else
                {
                    listDonHang += 0 + "-";
                    listSoDonHang += 0 + "-";
                }
            }
            listDonHang = listDonHang.Substring(0, listDonHang.Length - 1);
            listSoDonHang = listSoDonHang.Substring(0, listSoDonHang.Length - 1);

            string listTiecBan = "";
            string listSoTiecBan = "";
            for (int i = 1; i <= 12; i++)
            {
                var donhang = model.DonHangMenuTiecBan.Where(p => p.ngaytao.Month == i && p.ngaytao.Year == currentYear).ToList();
                decimal money = 0;
                int listSoTiecBanCount = 0;
                if (donhang.Count > 0)
                {
                    foreach (var item in donhang)
                    {
                        if ((item.ngaybatdau - currentDate).Days <= 0
                                            && (item.ChiTietDonHangSanPhamMenuTiecBan.Sum(s => s.gia * item.soban) +
                                            item.ChiTietDonHangDanhMucPhucVuMenuTiecBan.Where(w => w.giatheosoban == true).Sum(s => s.gia * item.soban) +
                                            item.ChiTietDonHangDanhMucPhucVuMenuTiecBan.Where(w => w.giatheosoban == false).Sum(s => s.gia))
                                            <= item.LichSuThanhToanDonHangTongHop.Sum(s => s.sotien)
                                            && item.TinhTrangDonHangMenuTiecBan.First().tieude.Equals("Hoàn thành"))
                        {
                            money += item.ChiTietDonHangSanPhamMenuTiecBan.Sum(s => s.gia * item.soban)
                                    + item.ChiTietDonHangDanhMucPhucVuMenuTiecBan.Where(w => w.giatheosoban == true).Sum(s => item.soban * s.gia)
                                    + item.ChiTietDonHangDanhMucPhucVuMenuTiecBan.Where(w => w.giatheosoban == false).Sum(s => s.gia);

                            listSoTiecBanCount++;
                        }
                    }

                    listTiecBan += money + "-";
                    listSoTiecBan += listSoTiecBanCount + "-";
                }
                else
                {
                    listTiecBan += 0 + "-";
                    listSoTiecBan += 0 + "-";
                }
            }
            listTiecBan = listTiecBan.Substring(0, listTiecBan.Length - 1);
            listSoTiecBan = listSoTiecBan.Substring(0, listSoTiecBan.Length - 1);

            string listBuffet = "";
            string listSoBuffet = "";
            for (int i = 1; i <= 12; i++)
            {
                var donhang = model.DonHangMenuBuffet.Where(p => p.ngaytao.Month == i && p.ngaytao.Year == currentYear).ToList();
                decimal money = 0;
                int listSoBuffetCount = 0;
                if (donhang.Count > 0)
                {
                    foreach (var item in donhang)
                    {
                        if ((item.ngaybatdau - currentDate).Days <= 0
                                            && (item.giamon +
                                            item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == true).Sum(s => s.gia * item.soban) +
                                            item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == false).Sum(s => s.gia))
                                            <= item.LichSuThanhToanDonHangTongHop.Sum(s => s.sotien)
                                            && item.TinhTrangDonHangMenuBuffet.First().tieude.Equals("Hoàn thành"))
                        {
                            money += item.ChiTietDonHangSanPhamMenuBuffet.Sum(s => item.giamon)
                                    + item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == true).Sum(s => item.soban * s.gia)
                                    + item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == false).Sum(s => s.gia);

                            listSoBuffetCount++;
                        }
                    }
                    listBuffet += money + "-";
                    listSoBuffet += listSoBuffetCount + "-";
                }
                else
                {
                    listBuffet += 0 + "-";
                    listSoBuffet += 0 + "-";
                }
            }
            listBuffet = listBuffet.Substring(0, listBuffet.Length - 1);
            listSoBuffet = listSoBuffet.Substring(0, listSoBuffet.Length - 1);

            Session["lst-doanhthu-nam"] = listDoanhThu;
            Session["lst-donhang-nam"] = listDonHang;
            Session["lst-tiecban-nam"] = listTiecBan;
            Session["lst-buffet-nam"] = listBuffet;

            Session["lst-sodonhang-nam"] = listSoDonHang;
            Session["lst-sotiecban-nam"] = listSoTiecBan;
            Session["lst-sobuffet-nam"] = listSoBuffet;

            #endregion

            #region Thống Kê Đơn Hàng

            var lstTTDH = model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => w.DonHangVuonRauMuaSamVaMenuHangNgay.ngaydat.Year == currentYear).ToList();
            int donhangChoDuyet = lstTTDH.Where(t => t.tieude.Equals("Chờ duyệt")).Count();
            int donhangDangDongGoi = lstTTDH.Where(t => t.tieude.Equals("Đang đóng gói")).Count();
            int donhangDangGiao = lstTTDH.Where(t => t.tieude.Equals("Đang giao")).Count();
            int donhangKhongThanhCong = lstTTDH.Where(t => t.tieude.Equals("Không thành công")).Count();

            Session["lst-donhang-thongke"] = donhangChoDuyet + "-"
                + donhangDangDongGoi + "-"
                + donhangDangGiao + "-"
                + donhangKhongThanhCong;

            #endregion

            #region Thống Kê Tiến Trình Đơn Hàng

            if ((donhangChoDuyet + donhangDangDongGoi) == 0 && (donhangChoDuyet + donhangDangDongGoi + donhangDangGiao) == 0)
                Session["tientrinhdonhang-thongke"] = 100;
            else if ((donhangChoDuyet + donhangDangDongGoi) == 0 && (donhangChoDuyet + donhangDangDongGoi + donhangDangGiao) > 0)
                Session["tientrinhdonhang-thongke"] = 100;
            else if ((donhangChoDuyet + donhangDangDongGoi) > 0 && (donhangChoDuyet + donhangDangDongGoi + donhangDangGiao) == 0)
                Session["tientrinhdonhang-thongke"] = 0;
            else
                Session["tientrinhdonhang-thongke"] = (donhangChoDuyet + donhangDangDongGoi) / (donhangChoDuyet + donhangDangDongGoi + donhangDangGiao) * 100;

            #endregion

            #region Thống Kê Đơn Đặt Bàn Tiệc

            var lstTTDHTB = model.TinhTrangDonHangMenuTiecBan.ToList();
            var lstDHTB = model.DonHangMenuTiecBan.ToList();
            int chuaThanhToan = 0;
            foreach (var item in lstDHTB.Where(w => (w.ngaybatdau - DateTime.Now).Days <= 0).ToList())
            {
                if (item.LichSuThanhToanDonHangTongHop.Count < 1
                    && item.TinhTrangDonHangMenuTiecBan.First().tieude.Equals("Hoàn thành"))
                {
                    chuaThanhToan++;
                }
                else
                {
                    if ((item.ChiTietDonHangSanPhamMenuTiecBan.Sum(s => s.gia * item.soban) +
                        item.ChiTietDonHangDanhMucPhucVuMenuTiecBan.Where(w => w.giatheosoban == true).Sum(s => s.gia * item.soban) +
                        item.ChiTietDonHangDanhMucPhucVuMenuTiecBan.Where(w => w.giatheosoban == false).Sum(s => s.gia))
                        > item.LichSuThanhToanDonHangTongHop.Sum(s => s.sotien)
                        && item.TinhTrangDonHangMenuTiecBan.First().tieude.Equals("Hoàn thành"))
                    {
                        chuaThanhToan++;
                    }
                }
            }

            string choduyetTB = lstTTDHTB.Where(t => t.tieude.Equals("Chờ duyệt")).Count() + "-";
            string dangdienraTB = lstDHTB.Where(w => (w.ngaybatdau - currentDate).Days == 0 &&
                                w.TinhTrangDonHangMenuTiecBan.First().tieude.Equals("Đã xác nhận")).Count() + "-";
            string sapdienraTB = lstDHTB.Where(w => (w.ngaybatdau - currentDate).Days >= 1 &&
                                w.TinhTrangDonHangMenuTiecBan.First().tieude.Equals("Đã xác nhận")).Count() + "";
            string daquahanTB = lstDHTB.Where(w => (w.ngaybatdau - currentDate).Days < 0 &&
                                w.TinhTrangDonHangMenuTiecBan.First().tieude.Equals("Đã xác nhận")).Count() + "-";
            string chothanhtoanTB = chuaThanhToan.ToString();
            Session["dontiecban-thongke"] = choduyetTB + dangdienraTB + sapdienraTB + daquahanTB + chothanhtoanTB;

            #endregion

            #region Thống Kê Đơn Đặt Bàn Buffet

            var lstTTDHBF = model.TinhTrangDonHangMenuBuffet.ToList();
            var lstDHBF = model.DonHangMenuBuffet.ToList();
            int chuaThanhToanBF = 0;
            foreach (var item in lstDHBF.Where(w => (w.ngaybatdau - DateTime.Now).Days <= 0).ToList())
            {
                if (item.LichSuThanhToanDonHangTongHop.Count < 1
                    && item.TinhTrangDonHangMenuBuffet.First().tieude.Equals("Hoàn thành"))
                {
                    chuaThanhToanBF++;
                }
                else
                {
                    if ((item.giamon +
                        item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == true).Sum(s => s.gia * item.soban) +
                        item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == false).Sum(s => s.gia))
                        > item.LichSuThanhToanDonHangTongHop.Sum(s => s.sotien)
                        && item.TinhTrangDonHangMenuBuffet.First().tieude.Equals("Hoàn thành"))
                    {
                        chuaThanhToanBF++;
                    }
                }
            }

            string choduyetBF = lstTTDHBF.Where(t => t.tieude.Equals("Chờ duyệt")).Count() + "-";
            string dangdienraBF = lstDHBF.Where(w => (w.ngaybatdau - currentDate).Days == 0 &&
                                w.TinhTrangDonHangMenuBuffet.First().tieude.Equals("Đã xác nhận")).Count() + "-";
            string sapdienraBF = lstDHBF.Where(w => (w.ngaybatdau - currentDate).Days >= 1 &&
                                w.TinhTrangDonHangMenuBuffet.First().tieude.Equals("Đã xác nhận")).Count() + "";
            string daquahanBF = lstDHBF.Where(w => (w.ngaybatdau - currentDate).Days < 0 &&
                                w.TinhTrangDonHangMenuBuffet.First().tieude.Equals("Đã xác nhận")).Count() + "-";
            string chothanhtoanBF = chuaThanhToanBF.ToString();
            Session["donbuffet-thongke"] = choduyetBF + dangdienraBF + sapdienraBF + daquahanBF + chothanhtoanBF;

            #endregion

            return View("Index");
        }

        [HttpPost]
        public ActionResult DoanhThuTheoNam(int year, int month)
        {
            try
            {
                Session["nam-thongke"] = year;
                Session["thang-thongke"] = month;

                var currentYear = year;
                var doanhthulst = model.LichSuThanhToanDonHangTongHop.Where(w => w.thoigian.Year == currentYear && w.thoigian.Month == month).ToList();

                #region Thống Kê Doanh Thu

                string listDoanhThu = "";
                for (int i = 1; i <= 12; i++)
                {
                    var dt = model.LichSuThanhToanDonHangTongHop.Where(p => p.thoigian.Month == i && p.thoigian.Year == currentYear).ToList();
                    listDoanhThu += dt.Sum(s => s.sotien) + "-";
                }
                listDoanhThu = listDoanhThu.Substring(0, listDoanhThu.Length - 1);

                string listDonHang = "";
                string listSoDonHang = "";
                for (int i = 1; i <= 12; i++)
                {
                    var donhang = model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(p => p.ngaydat.Month == i && p.ngaydat.Year == currentYear).ToList();
                    decimal money = 0;

                    if (donhang.Count > 0)
                    {
                        foreach (var item in donhang)
                        {
                            money += item.ChiTietDonHangSanPhamMuaSam.Sum(s => s.gia * s.soluongmua)
                                    + item.ChiTietDonHangSanPhamRauNhaTrong.Sum(s => s.soluongmua * s.gia)
                                    + item.ChiTietDonHangSanPhamThucDonHangNgay.Sum(s => s.soluongmua * s.gia);
                        }
                        listDonHang += money + "-";
                        listSoDonHang += donhang.Count + "-";
                    }
                    else
                    {
                        listDonHang += 0 + "-";
                        listSoDonHang += 0 + "-";
                    }
                }
                listDonHang = listDonHang.Substring(0, listDonHang.Length - 1);
                listSoDonHang = listSoDonHang.Substring(0, listSoDonHang.Length - 1);

                string listTiecBan = "";
                string listSoTiecBan = "";
                for (int i = 1; i <= 12; i++)
                {
                    var donhang = model.DonHangMenuTiecBan.Where(p => p.ngaytao.Month == i && p.ngaytao.Year == currentYear).ToList();
                    decimal money = 0;

                    if (donhang.Count > 0)
                    {
                        foreach (var item in donhang)
                        {
                            money += item.ChiTietDonHangSanPhamMenuTiecBan.Sum(s => s.gia * item.soban)
                                    + item.ChiTietDonHangDanhMucPhucVuMenuTiecBan.Where(w => w.giatheosoban == true).Sum(s => item.soban * s.gia)
                                    + item.ChiTietDonHangDanhMucPhucVuMenuTiecBan.Where(w => w.giatheosoban == false).Sum(s => s.gia);
                        }
                        listTiecBan += money + "-";
                        listSoTiecBan += donhang.Count + "-";
                    }
                    else
                    {
                        listTiecBan += 0 + "-";
                        listSoTiecBan += 0 + "-";
                    }
                }
                listTiecBan = listTiecBan.Substring(0, listTiecBan.Length - 1);
                listSoTiecBan = listSoTiecBan.Substring(0, listSoTiecBan.Length - 1);

                string listBuffet = "";
                string listSoBuffet = "";
                for (int i = 1; i <= 12; i++)
                {
                    var donhang = model.DonHangMenuBuffet.Where(p => p.ngaytao.Month == i && p.ngaytao.Year == currentYear).ToList();
                    decimal money = 0;

                    if (donhang.Count > 0)
                    {
                        foreach (var item in donhang)
                        {
                            money += item.ChiTietDonHangSanPhamMenuBuffet.Sum(s => item.giamon)
                                    + item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == true).Sum(s => item.soban * s.gia)
                                    + item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == false).Sum(s => s.gia);
                        }
                        listBuffet += money + "-";
                        listSoBuffet += donhang.Count + "-";
                    }
                    else
                    {
                        listBuffet += 0 + "-";
                        listSoBuffet += 0 + "-";
                    }
                }
                listBuffet = listBuffet.Substring(0, listBuffet.Length - 1);
                listSoBuffet = listSoBuffet.Substring(0, listSoBuffet.Length - 1);

                Session["lst-doanhthu-nam"] = listDoanhThu;
                Session["lst-donhang-nam"] = listDonHang;
                Session["lst-tiecban-nam"] = listTiecBan;
                Session["lst-buffet-nam"] = listBuffet;

                Session["lst-sodonhang-nam"] = listSoDonHang;
                Session["lst-sotiecban-nam"] = listSoTiecBan;
                Session["lst-sobuffet-nam"] = listSoBuffet;

                #endregion

                return PartialView("_ThongKeDoanhThu", doanhthulst.OrderByDescending(o => o.id).ToList());
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult DoanhThuTheoThang(int year, int month)
        {
            try
            {
                Session["nam-thongke"] = year;
                Session["thang-thongke"] = month;

                var currentYear = year;
                var doanhthulst = model.LichSuThanhToanDonHangTongHop.Where(w => w.thoigian.Year == currentYear && w.thoigian.Month == month).ToList();

                return PartialView("_ThongKeDoanhThuTheoThang", doanhthulst.OrderByDescending(o => o.id).ToList());
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
    }
}