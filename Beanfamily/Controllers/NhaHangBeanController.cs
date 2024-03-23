using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beanfamily.Controllers
{
    public class NhaHangBeanController : Controller
    {
        // GET: NhaHangBean
        public ActionResult Index()
        {
            return View("Index");
        }
    }
}