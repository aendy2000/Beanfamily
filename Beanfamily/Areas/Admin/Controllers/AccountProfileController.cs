using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using Beanfamily.Middlewall;
using System.Net.Mail;
using System.Net;
using System.Data;
using System.Data.Entity;
using System.IO;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class AccountProfileController : Controller
    {
        beanfamilyEntities model = new beanfamilyEntities();
        // GET: Admin/Profile
        public ActionResult Index()
        {
            int id = Int32.Parse(Session["user-id"].ToString());
            var info = model.TaiKhoanBean.Find(id);
            if (info == null)
            {
                Session.Abandon();
                return RedirectToAction("index", "dashboard");
            }
            return View("Index", info);
        }
        [HttpPost]
        public ActionResult UpdateInfor(HttpPostedFileBase avatar, string tendangnhap, string hovaten, string sodienthoai, string email, DateTime? ngaysinh, string gioitinh, string diachi, string xoahinhdaidien)
        {
            int id = Int32.Parse(Session["user-id"].ToString());
            var info = model.TaiKhoanBean.Find(id);
            if (info == null)
            {
                Session.Abandon();
                return Content("INDEX");
            }

            string path = "";
            if (avatar != null)
            {
                if (avatar.ContentLength > 0)
                {
                    path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/taikhoanbean"), avatar.FileName);
                    avatar.SaveAs(path);
                    info.hinhdaidien = "~/Content/AdminAreas/images/taikhoanbean/" + avatar.FileName;
                    Session["user-avatar"] = "~/Content/AdminAreas/images/taikhoanbean/" + avatar.FileName;
                }
            }
            else
            {
                if (xoahinhdaidien.Equals("yes"))
                {
                    Session["user-avatar"] = "~/Content/AdminAreas/assets/img/profile-img.jpg";
                    info.hinhdaidien = "";
                }
            }

            info.hovaten = hovaten;
            info.username = tendangnhap;
            info.sodienthoai = sodienthoai;
            info.email = email;
            if (ngaysinh != null)
                info.ngaysinh = Convert.ToDateTime(ngaysinh).ToString("yyyy-MM-dd");
            info.gioitinh = gioitinh;
            info.diachi = diachi;

            model.Entry(info).State = EntityState.Modified;
            model.SaveChanges();
            model = new beanfamilyEntities();

            return Content("SUCCESS");
        }

        public ActionResult UpdatePassword(string matkhauhientai, string matkhaumoi)
        {
            int id = Int32.Parse(Session["user-id"].ToString());
            var info = model.TaiKhoanBean.Find(id);
            if (info == null)
            {
                Session.Abandon();
                return Content("INDEX");
            }

            if (!info.password.Equals(matkhauhientai))
                return Content("MKHIENTAIKHONGDUNG");

            info.password = matkhaumoi;
            model.Entry(info).State = EntityState.Modified;
            model.SaveChanges();
            model = new beanfamilyEntities();

            return Content("SUCCESS");
        }
    }
}