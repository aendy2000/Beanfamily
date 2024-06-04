using Beanfamily.Middlewall;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class HinhAnhBeanController : Controller
    {
        // GET: Admin/HinhAnhBean
        public ActionResult Index()
        {
            return View();
        }
    }
}