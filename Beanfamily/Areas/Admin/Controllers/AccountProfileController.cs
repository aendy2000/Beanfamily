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
        BeanfamilyEntities model = new BeanfamilyEntities();
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
        public ActionResult UpdateInfor(HttpPostedFileBase avatar, string hovaten, string chucdanh, string sodienthoai, string email, string ngaysinh, string gioitinh, string diachi)
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

            info.hovaten = hovaten;
            info.chucdanh = chucdanh;
            info.sodienthoai = sodienthoai;
            info.email = email;
            info.ngaysinh = ngaysinh;
            info.gioitinh = gioitinh;
            info.diachi = diachi;

            model.Entry(info).State = EntityState.Modified;
            model.SaveChanges();
            model = new BeanfamilyEntities();

            return Content("SUCCESS");
        }
    }
}