using Beanfamily.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beanfamily.Controllers
{
    public class ChinhSachBeanController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: ChinhSachBean
        public ActionResult ChinhSach(int id)
        {
            return View("chinhsach", model.ChinhSachBean.Find(id));
        }
    }
}