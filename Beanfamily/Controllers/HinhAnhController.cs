using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;

namespace Beanfamily.Controllers
{
    public class HinhAnhController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: HinhAnh
        public ActionResult Index()
        {
            var lstha = model.HinhAnhBean.ToList();
            return View("index", lstha);
        }
    }
}