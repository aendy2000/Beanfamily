using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using System.Data.Entity;
using System.Web.Helpers;

namespace Beanfamily.Controllers
{
    public class DatHangController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: DatHang
        public ActionResult Index()
        {
            return View("index");
        }
    }
}