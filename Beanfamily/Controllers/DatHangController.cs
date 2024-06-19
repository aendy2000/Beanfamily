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

        public ActionResult UpdateInfoCart()
        {
            return PartialView("_UpdateInfoCart");
        }

        public ActionResult TienHanhDatHang()
        {
            List<string> giohangmuassam = Session["giohang-muasam"] as List<string>;
            List<string> giohangvuonrau = Session["giohang-vuonrau"] as List<string>;
            List<string> giohangthucdonhangngay = Session["giohang-thucdonhangngay"] as List<string>;

            bool cartMuaSamNull = false;
            bool cartVuonRauNull = false;
            bool cartThucDonNull = false;

            if (giohangmuassam == null && giohangvuonrau == null && giohangthucdonhangngay == null)
            {
                cartMuaSamNull = true;
                cartVuonRauNull = true;
                cartThucDonNull = true;
            }
            else
            {
                if (giohangmuassam == null)
                    cartMuaSamNull = true;
                else if (giohangmuassam != null)
                    if (giohangmuassam.Count < 1)
                        cartMuaSamNull = true;

                if (giohangvuonrau == null)
                    cartVuonRauNull = true;
                else if (giohangvuonrau != null)
                    if (giohangvuonrau.Count < 1)
                        cartVuonRauNull = true;

                if (giohangthucdonhangngay == null)
                    cartThucDonNull = true;
                else if (giohangthucdonhangngay != null)
                    if (giohangthucdonhangngay.Count < 1)
                        cartThucDonNull = true;
            }

            if (cartMuaSamNull == true && cartVuonRauNull == true && cartThucDonNull == true)
                return RedirectToAction("index");
            else
                return View("tienhanhdathang");
        }
    }
}