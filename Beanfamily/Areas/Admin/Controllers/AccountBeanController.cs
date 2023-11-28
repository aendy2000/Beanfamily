using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using Beanfamily.Middlewall;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class AccountBeanController : Controller
    {
        beanfamilyEntities model = new beanfamilyEntities();
        // GET: Admin/AccountBean
        public ActionResult Index()
        {
            var user = model.TaiKhoanBean.ToList();
            return View("Index", user);
        }
    }
}