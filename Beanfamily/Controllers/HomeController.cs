using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using System.Data.Entity;
using PagedList;
using System.Web.Helpers;

namespace Beanfamily.Controllers
{
    public class HomeController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        public ActionResult Index()
        {
            Session["sanphammoi-nhahang"] = model.SanPhamThucDonHangNgay.OrderByDescending(o => o.id).Take(3).ToList();
            Session["sanphammoi-vuonrau"] = model.SanPhamRauNhaTrong.OrderByDescending(o => o.id).Take(3).ToList();
            Session["sanphammoi-muasam"] = model.SanPhamMuaSam.OrderByDescending(o => o.id).Take(3).ToList();

            Session["sanphamnoibat-nhahang"] = model.SanPhamThucDonHangNgay.OrderByDescending(o => o.luotxem).Take(3).ToList();
            Session["sanphamnoibat-vuonrau"] = model.SanPhamRauNhaTrong.OrderByDescending(o => o.luotxem).Take(3).ToList();
            Session["sanphamnoibat-muasam"] = model.SanPhamMuaSam.OrderByDescending(o => o.luotxem).Take(3).ToList();

            return View("index");
        }

        public ActionResult About()
        {
            return View("about");
        }

        public ActionResult Restaurant()
        {
            return RedirectToAction("index", "nhahangbean");
        }

        public ActionResult Garden(int? pageNum, int? pageSize)
        {
            return RedirectToAction("index", "vuonrau");
        }
        public ActionResult Shopping(int? pageNum, int? pageSize)
        {
            return RedirectToAction("index", "muasam");
        }

        [HttpPost]
        public ActionResult DangNhap(string sodienthoai, string matkhau)
        {
            try
            {
                var taikhoan = model.TaiKhoanKhachHang.FirstOrDefault(t => t.sodienthoai.Equals(sodienthoai) && t.password.Equals(matkhau));
                if (taikhoan == null)
                {
                    return Content("INVALID");
                }
                else
                {
                    if (taikhoan.taikhoankhoa == true)
                    {
                        return Content("LOCKED");
                    }
                    else
                    {
                        taikhoan.dangnhaplancuoi = DateTime.Now;
                        model.Entry(taikhoan).State = EntityState.Modified;
                        model.SaveChanges();

                        int idtk = taikhoan.id;
                        if (taikhoan.GioHangThucDonHangNgay.Count < 1 && taikhoan.GioHangMuaSam.Count < 1 && taikhoan.GioHangVuonRauBean.Count < 1)
                        {
                            var giohangmuasam = Session["giohang-muasam"] as List<string>;
                            if (giohangmuasam != null)
                            {
                                foreach (var item in giohangmuasam)
                                {
                                    string idsp = item.Split('#')[0];
                                    string idloai = item.Split('#')[1];
                                    string soluong = item.Split('#')[2];

                                    GioHangMuaSam ghmuasam = new GioHangMuaSam();
                                    ghmuasam.id_sanpham = Int32.Parse(idsp);
                                    ghmuasam.id_loaitonkho = Int32.Parse(idloai);
                                    ghmuasam.id_taikhoankhachhang = idtk;
                                    ghmuasam.soluong = Int32.Parse(soluong);
                                    ghmuasam.addDate = DateTime.Now;

                                    model.GioHangMuaSam.Add(ghmuasam);
                                    model.SaveChanges();
                                }
                            }

                            var giohangthucdonhangngay = Session["giohang-thucdonhangngay"] as List<string>;
                            if (giohangthucdonhangngay != null)
                            {
                                foreach (var item in giohangthucdonhangngay)
                                {
                                    string idsp = item.Split('#')[0];
                                    string soluong = item.Split('#')[1];

                                    GioHangThucDonHangNgay ghtdhn = new GioHangThucDonHangNgay();
                                    ghtdhn.id_sanpham = Int32.Parse(idsp);
                                    ghtdhn.id_taikhoankhachhang = idtk;
                                    ghtdhn.soluong = Int32.Parse(soluong);
                                    ghtdhn.addDate = DateTime.Now;

                                    model.GioHangThucDonHangNgay.Add(ghtdhn);
                                    model.SaveChanges();
                                }
                            }

                            var giohangvuonrau = Session["giohang-vuonrau"] as List<string>;
                            if (giohangvuonrau != null)
                            {
                                foreach (var item in giohangvuonrau)
                                {
                                    string idsp = item.Split('#')[0];
                                    string soluong = item.Split('#')[1];

                                    GioHangVuonRauBean ghvr = new GioHangVuonRauBean();
                                    ghvr.id_sanpham = Int32.Parse(idsp);
                                    ghvr.id_taikhoankhachhang = idtk;
                                    ghvr.soluong = Int32.Parse(soluong);
                                    ghvr.addDate = DateTime.Now;

                                    model.GioHangVuonRauBean.Add(ghvr);
                                    model.SaveChanges();
                                }
                            }
                        }
                        else
                        {
                            var giohangmuasams = new List<string>();
                            foreach (var item in taikhoan.GioHangMuaSam.ToList())
                                giohangmuasams.Add(item.id_sanpham + "#" + item.id_loaitonkho + "#" + item.soluong);
                            Session["giohang-muasam"] = giohangmuasams;

                            var giohangthucdonhangngays = new List<string>();
                            foreach (var item in taikhoan.GioHangThucDonHangNgay.ToList())
                                giohangthucdonhangngays.Add(item.id_sanpham + "#" + item.soluong);
                            Session["giohang-thucdonhangngay"] = giohangthucdonhangngays;

                            var giohangvuonraus = new List<string>();
                            foreach (var item in taikhoan.GioHangVuonRauBean.ToList())
                                giohangvuonraus.Add(item.id_sanpham + "#" + item.soluong);
                            Session["giohang-vuonrau"] = giohangvuonraus;
                        }

                        Session["user-data"] = taikhoan;
                        Session["user-dangnhap"] = true;
                        return PartialView("_addCart");
                    }
                }
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        public ActionResult DangXuat()
        {
            try
            {
                Session["user-dangnhap"] = null;

                Session["giohang-muasam"] = null;
                Session["giohang-thucdonhangngay"] = null;
                Session["giohang-vuonrau"] = null;

                return PartialView("_addCart");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult DangKy(string sodienthoai, string matkhau, string email, string hoten)
        {
            try
            {
                var checkMail = model.TaiKhoanKhachHang.FirstOrDefault(e => e.email.ToLower().Equals(email.ToLower()));
                if (checkMail != null)
                    return Content("EMAILEXIST");

                var checkPhone = model.TaiKhoanKhachHang.FirstOrDefault(e => e.sodienthoai.ToLower().Equals(sodienthoai.ToLower()));
                if (checkMail != null)
                    return Content("SDTEXIST");

                var taikhoan = new TaiKhoanKhachHang();
                taikhoan.hovaten = hoten;
                taikhoan.sodienthoai = sodienthoai;
                taikhoan.email = email;
                taikhoan.password = matkhau;
                taikhoan.ngaytao = DateTime.Now;
                taikhoan.dangnhaplancuoi = DateTime.Now;
                taikhoan.taikhoankhoa = false;

                model.TaiKhoanKhachHang.Add(taikhoan);
                model.SaveChanges();

                int idtk = taikhoan.id;

                var giohangmuasam = Session["giohang-muasam"] as List<string>;
                if (giohangmuasam != null)
                {
                    foreach (var item in giohangmuasam)
                    {
                        string idsp = item.Split('#')[0];
                        string idloai = item.Split('#')[1];
                        string soluong = item.Split('#')[2];

                        GioHangMuaSam ghmuasam = new GioHangMuaSam();
                        ghmuasam.id_sanpham = Int32.Parse(idsp);
                        ghmuasam.id_loaitonkho = Int32.Parse(idloai);
                        ghmuasam.id_taikhoankhachhang = idtk;
                        ghmuasam.soluong = Int32.Parse(soluong);
                        ghmuasam.addDate = DateTime.Now;

                        model.GioHangMuaSam.Add(ghmuasam);
                        model.SaveChanges();
                    }
                }

                var giohangthucdonhangngay = Session["giohang-thucdonhangngay"] as List<string>;
                if (giohangthucdonhangngay != null)
                {
                    foreach (var item in giohangthucdonhangngay)
                    {
                        string idsp = item.Split('#')[0];
                        string soluong = item.Split('#')[1];

                        GioHangThucDonHangNgay ghtdhn = new GioHangThucDonHangNgay();
                        ghtdhn.id_sanpham = Int32.Parse(idsp);
                        ghtdhn.id_taikhoankhachhang = idtk;
                        ghtdhn.soluong = Int32.Parse(soluong);
                        ghtdhn.addDate = DateTime.Now;

                        model.GioHangThucDonHangNgay.Add(ghtdhn);
                        model.SaveChanges();
                    }
                }

                var giohangvuonrau = Session["giohang-vuonrau"] as List<string>;
                if (giohangvuonrau != null)
                {
                    foreach (var item in giohangvuonrau)
                    {
                        string idsp = item.Split('#')[0];
                        string soluong = item.Split('#')[1];

                        GioHangVuonRauBean ghvr = new GioHangVuonRauBean();
                        ghvr.id_sanpham = Int32.Parse(idsp);
                        ghvr.id_taikhoankhachhang = idtk;
                        ghvr.soluong = Int32.Parse(soluong);
                        ghvr.addDate = DateTime.Now;

                        model.GioHangVuonRauBean.Add(ghvr);
                        model.SaveChanges();
                    }
                }

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult LayMaQuenMatKhau(string email)
        {
            try
            {
                var tk = model.TaiKhoanKhachHang.FirstOrDefault(t => t.email.ToLower().Equals(email.ToLower().Trim()));

                if (tk == null)
                    return Content("INVALID");

                Random generator = new Random();
                String ma = generator.Next(0, 1000000).ToString("D6");
                tk.maxacnhan = ma;
                tk.thoihanma = DateTime.Now.AddMinutes(10);
                model.Entry(tk).State = EntityState.Modified;
                model.SaveChanges();

                Session["email-xacnhan"] = email;
                return PartialView("_NhapMaXacNhan");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult GuiMaQuenMatKhau(string ma, string email)
        {
            try
            {
                var tk = model.TaiKhoanKhachHang.FirstOrDefault(t => t.email.ToLower().Equals(email.ToLower().Trim()));

                if (tk == null)
                    return Content("NOTEXIST");

                var curma = tk.maxacnhan;
                if (!curma.Equals(ma))
                {
                    if (tk.thoihanma.Value.Subtract(DateTime.Now).TotalMinutes <= 0)
                    {
                        tk.maxacnhan = null;
                        tk.thoihanma = null;
                        model.Entry(tk).State = EntityState.Modified;
                        model.SaveChanges();

                        return Content("TIMEOUT");
                    }
                    else
                    {
                        return Content("INVALID");
                    }
                }
                return PartialView("_DatLaiMatKhau");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        public ActionResult GuiLaiMaXacNhan()
        {
            try
            {
                string email = Session["email-xacnhan"].ToString();
                var tk = model.TaiKhoanKhachHang.FirstOrDefault(t => t.email.ToLower().Equals(email.ToLower().Trim()));

                if (tk == null)
                    return Content("INVALID");

                if (tk.thoihanma.Value != null)
                {
                    if (tk.thoihanma.Value.Subtract(DateTime.Now).TotalMinutes <= 7)
                    {
                        Random generator = new Random();
                        String ma = generator.Next(0, 1000000).ToString("D6");
                        tk.maxacnhan = ma;
                        tk.thoihanma = DateTime.Now.AddMinutes(10);
                        model.Entry(tk).State = EntityState.Modified;
                        model.SaveChanges();

                        return Content("SUCCESS");
                    }
                    else
                    {
                        return Content("WAIT");
                    }
                }
                else
                {
                    Random generator = new Random();
                    String ma = generator.Next(0, 1000000).ToString("D6");
                    tk.maxacnhan = ma;
                    tk.thoihanma = DateTime.Now.AddMinutes(10);
                    model.Entry(tk).State = EntityState.Modified;
                    model.SaveChanges();

                    return Content("SUCCESS");
                }
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult DatLaiMatKhau(string pass, string email)
        {
            try
            {
                var tk = model.TaiKhoanKhachHang.FirstOrDefault(t => t.email.ToLower().Equals(email.ToLower()));
                if (tk == null)
                    return Content("INVALID");

                tk.password = pass;
                tk.maxacnhan = null;
                tk.thoihanma = null;
                model.Entry(tk).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
        [HttpPost]
        public ActionResult UpdateInfo(int id, string hoten, string sodienthoai, string email, string ngaysinh, string gioitinh, string diachi)
        {
            try
            {
                var tk = model.TaiKhoanKhachHang.Find(id);
                if (tk == null)
                    return Content("NOTEXIST");

                tk.hovaten = hoten;
                tk.sodienthoai = sodienthoai;
                tk.email = email;
                tk.ngaysinh = ngaysinh;
                tk.gioitinh = gioitinh;
                tk.diachi = diachi;

                model.Entry(tk).State= EntityState.Modified;
                model.SaveChanges();

                Session["user-data"] = tk;

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

    }
}