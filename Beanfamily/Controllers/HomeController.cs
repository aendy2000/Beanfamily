using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beanfamily.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View("index");
        }

        public ActionResult About()
        {
            return View("about");
        }

        public ActionResult Restaurant()
        {
            return View("restaurant");
        }

        public ActionResult Garden()
        {
            return View("garden");
        }
        public ActionResult Shopping()
        {
            return View("shopping");
        }
        public ActionResult Contact()
        {
            return View("contact");
        }
    }
}