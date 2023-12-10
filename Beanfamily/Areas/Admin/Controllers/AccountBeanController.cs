using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using Beanfamily.Middlewall;
using System.IO;
using System.Data.Entity;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class AccountBeanController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();

        // GET: Admin/AccountBean
        public ActionResult Index()
        {
            Session["active-dashboard"] = "collapsed # # ";
            Session["active-mtb-dmc1"] = "collapsed # # ";
            Session["active-mtb-dmpv"] = "collapsed # # ";
            Session["active-mtb-qlm"] = "collapsed # # ";
            Session["active-mb-dmc1"] = "collapsed # # ";
            Session["active-mb-dmpv"] = "collapsed # # ";
            Session["active-mb-qlm"] = "collapsed # # ";
            Session["active-mhn-dmc1"] = "collapsed # # ";
            Session["active-mhn-qlm"] = "collapsed # # ";
            Session["active-vrb-dmc1"] = "collapsed # # ";
            Session["active-vrb-spr"] = "collapsed # # ";
            Session["active-vrb-qltc"] = "collapsed # # ";
            Session["active-chtl-dmc1"] = "collapsed # # ";
            Session["active-chtl-sp"] = "collapsed # # ";
            Session["active-tkb-pq"] = " # show # ";
            Session["active-tkb-tk"] = " # show # active";
            Session["active-ddh"] = "collapsed # # ";
            Session["active-ddbt"] = "collapsed # # ";
            Session["active-ddbb"] = "collapsed # # ";
            Session["active-hab"] = "collapsed # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # ";

            if (Session["tkb-tk"] == null)
                return RedirectToAction("index", "dashboard");

            int id = Int32.Parse(Session["user-id"].ToString());
            var user = model.TaiKhoanBean.Where(t => t.id != id && t.id != 1).ToList();
            return View("Index", user);
        }

        [HttpPost]
        public ActionResult AddAccount(HttpPostedFileBase avatar, string tendangnhap, string matkhau, string hovaten, int phanquyen, string email
        , string chucdanh, string sodienthoai, DateTime? ngaysinh, string gioitinh, string diachi)
        {
            try
            {
                var checkUsname = model.TaiKhoanBean.FirstOrDefault(t => t.username.ToLower().Trim().Equals(tendangnhap.ToLower().Trim()));
                if (checkUsname != null)
                    return Content("USERNAMETONTAI");

                var checkMail = model.TaiKhoanBean.FirstOrDefault(t => t.email.ToLower().Trim().Equals(email.ToLower().Trim()));
                if (checkMail != null)
                    return Content("EMAILTONTAI");

                TaiKhoanBean acc = new TaiKhoanBean();
                string path = "";
                if (avatar != null)
                {
                    if (avatar.ContentLength > 0)
                    {
                        path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/taikhoanbean"), avatar.FileName);
                        avatar.SaveAs(path);
                        acc.hinhdaidien = "~/Content/AdminAreas/images/taikhoanbean/" + avatar.FileName;
                    }
                }

                acc.username = tendangnhap;
                acc.password = matkhau;
                acc.hovaten = hovaten;
                acc.sodienthoai = sodienthoai;
                acc.email = email;
                if (ngaysinh != null)
                    acc.ngaysinh = Convert.ToDateTime(ngaysinh).ToString("yyyy-MM-dd");
                acc.gioitinh = gioitinh;
                acc.diachi = diachi;
                acc.id_quyentaikhoanbean = phanquyen;
                acc.chucdanh = chucdanh;
                acc.ngaythamgia = DateTime.Now;
                acc.ngaysuadoi = DateTime.Now;
                acc.khoataikhoan = false;
                acc.solansaimatkhautoida = 5;
                acc.solandasaimatkhau = 0;
                model.TaiKhoanBean.Add(acc);
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }

        }

        [HttpPost]
        public ActionResult EditAccount(HttpPostedFileBase avatar, int id, string tendangnhap, string hovaten, int phanquyen, string email
        , string chucdanh, string sodienthoai, DateTime? ngaysinh, string gioitinh, string diachi, string xoahinhdaidien)
        {
            try
            {
                var checkUsname = model.TaiKhoanBean.FirstOrDefault(t => t.username.ToLower().Trim().Equals(tendangnhap.ToLower().Trim()) && t.id != id);
                if (checkUsname != null)
                    return Content("USERNAMETONTAI");

                var checkMail = model.TaiKhoanBean.FirstOrDefault(t => t.email.ToLower().Trim().Equals(email.ToLower().Trim()) && t.id != id);
                if (checkMail != null)
                    return Content("EMAILTONTAI");

                var acc = model.TaiKhoanBean.Find(id);
                string path = "";
                if (avatar != null)
                {
                    if (avatar.ContentLength > 0)
                    {
                        path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/taikhoanbean"), avatar.FileName);
                        avatar.SaveAs(path);
                        acc.hinhdaidien = "~/Content/AdminAreas/images/taikhoanbean/" + avatar.FileName;
                    }
                }
                else
                {
                    if (xoahinhdaidien.Equals("yes"))
                    {
                        acc.hinhdaidien = "";
                    }
                }

                acc.hovaten = hovaten;
                acc.sodienthoai = sodienthoai;
                acc.email = email;
                if (ngaysinh != null)
                    acc.ngaysinh = Convert.ToDateTime(ngaysinh).ToString("yyyy-MM-dd");
                acc.gioitinh = gioitinh;
                acc.diachi = diachi;
                acc.id_quyentaikhoanbean = phanquyen;
                acc.chucdanh = chucdanh;
                acc.ngaysuadoi = DateTime.Now;
                model.Entry(acc).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }

        }

        [HttpPost]
        public ActionResult DetailAccount(int id)
        {
            try
            {
                var acc = model.TaiKhoanBean.Find(id);
                if (acc == null)
                    return Content("KHONGTONTAI");

                return PartialView("_DetailAccount", acc);

            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult LockAccount(int id, bool lockAcc)
        {
            try
            {
                var acc = model.TaiKhoanBean.Find(id);
                if (acc == null)
                    return Content("KHONGTONTAI");

                acc.khoataikhoan = lockAcc;
                model.Entry(acc).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult RePassword(int id, string matkhau)
        {
            try
            {
                var acc = model.TaiKhoanBean.Find(id);
                if (acc == null)
                    return Content("KHONGTONTAI");

                acc.password = matkhau;
                model.Entry(acc).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult PassVerify(string pass)
        {
            try
            {
                if (Session["user-id"] == null)
                    return Content("INDEX");

                int id = Int32.Parse(Session["user-id"].ToString());
                var acc = model.TaiKhoanBean.Find(id);
                if (acc == null)
                    return Content("KHONGTONTAI");

                if (acc.password.Equals(pass))
                    return Content("SUCCESS");
                else
                    return Content("INVALID");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }
    }
}