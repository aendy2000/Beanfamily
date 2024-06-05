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
                    if (taikhoan.taikhoankhoa == false)
                    {
                        return Content("LOCKED");
                    }
                    else
                    {
                        taikhoan.dangnhaplancuoi = DateTime.Now;
                        model.Entry(taikhoan).State = EntityState.Modified;
                        model.SaveChanges();

                        Session["user-data"] = taikhoan;
                        Session["user-dangnhap"] = true;
                        return Content("SUCCESS");
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
                return Content("SUCCESS");
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
                    return Content("INVALID");

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
    }
}