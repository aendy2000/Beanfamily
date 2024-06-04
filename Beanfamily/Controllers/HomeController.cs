using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using PagedList;

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
                    return Content("SUCCESS");
                }
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }
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
                taikhoan.ngaysuadoi = DateTime.Now;

                model.TaiKhoanKhachHang.Add(taikhoan);
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