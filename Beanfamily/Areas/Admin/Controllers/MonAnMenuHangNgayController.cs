using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Beanfamily.Models;
using Beanfamily.Middlewall;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class MonAnMenuHangNgayController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/MonAnMenuHangNgay
        public ActionResult Index()
        {
            var monAn = model.SanPhamThucDonHangNgay.ToList();
            return View("index", monAn);
        }
    }
}