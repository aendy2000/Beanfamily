using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;

namespace Beanfamily.Controllers
{
    public class HomeController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        public ActionResult Index()
        {
            Session["sanphammoi-nhahang"] = model.SanPhamThucDonHangNgay.OrderByDescending(o => o.id).Take(3).ToList();
            Session["sanphammoi-vuonrau"] = model.SanPhamRauNhaTrong.OrderByDescending(o => o.id).Take(3).ToList();
            Session["sanphammoi-muasam"] = model.SanPhamMuaSam.OrderByDescending(o => o.id).Take(3).ToList();

            Session["sanphamnoibat-nhahang"] = model.SanPhamThucDonHangNgay.OrderByDescending(o => o.luotxem).Take(3).ToList();
            Session["sanphamnoibat-vuonrau"] = model.SanPhamRauNhaTrong.OrderByDescending(o => o.luotxem).Take(3).ToList();
            Session["sanphamnoibat-muasam"] = model.SanPhamMuaSam.OrderByDescending(o => o.luotxem).Take(3).ToList();

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