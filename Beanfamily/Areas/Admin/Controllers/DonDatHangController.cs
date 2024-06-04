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
    public class DonDatHangController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        //Đơn đặt hàng: Vườn rau, mua sắm, tđ hằng ngày
        // GET: Admin/DonDatHang
        public ActionResult Index()
        {
            var donhang = model.DonHangVuonRauMuaSamVaMenuHangNgay.ToList();

            return View("index");
        }
    }
}