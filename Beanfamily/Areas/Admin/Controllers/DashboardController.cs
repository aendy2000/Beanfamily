using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Middlewall;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class DashboardController : Controller
    {
        // GET: Admin/Home
        public ActionResult Index()
        {
            return View("Index");
        }
    }
}