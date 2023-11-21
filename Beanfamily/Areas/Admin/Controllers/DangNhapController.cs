using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using System.Data.Entity;

namespace Beanfamily.Areas.Admin.Controllers
{
    public class DangNhapController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();

        // GET: Admin/Account
        public ActionResult Index()
        {
            if (Session["user-id"] != null)
                return RedirectToAction("index", "dashboard");

            return View("index");
        }

        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            var taikhoan = model.TaiKhoanBean.FirstOrDefault(t => t.email.ToLower().Equals(username.ToLower().Trim()) || t.username.ToLower().Equals(username.ToLower().Trim()));
            if (taikhoan != null)
            {
                if (taikhoan.password.Equals(password))
                {
                    if (taikhoan.khoataikhoan == false)
                    {
                        taikhoan.solandasaimatkhau = 0;
                        model.Entry(taikhoan).State = EntityState.Modified;
                        model.SaveChanges();

                        Session["user-fullname"] = taikhoan.hovaten;
                        Session["user-id"] = taikhoan.id;
                        Session["user-email"] = taikhoan.email;
                        Session["user-chucdanh"] = taikhoan.chucdanh;
                        Session["user-role-id"] = taikhoan.id_quyentaikhoanbean;
                        Session["user-avatar"] = taikhoan.hinhdaidien + "";

                        return Content("SUCCESS");
                    }
                    else
                    {
                        return Content("BIKHOA");
                    }
                }

                int soLanSaiMkToiDa = taikhoan.solansaimatkhautoida;
                int soLanDaSaiMk = taikhoan.solandasaimatkhau + 1;
                taikhoan.solandasaimatkhau = soLanDaSaiMk;

                if (soLanSaiMkToiDa <= soLanDaSaiMk)
                    taikhoan.khoataikhoan = true;

                model.Entry(taikhoan).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SAIMATKHAU");
            }
            return Content("KHONGTONTAI");
        }

        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("index");
        }
    }
}