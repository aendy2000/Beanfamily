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

        [HttpPost]
        public ActionResult XacNhanDatHang(string hoten, string sodienthoai, string email,
            string ghichu, string diachi, string tinh, string quanhuyen,
            string phuongxa, string pttt, bool giaotannoi)
        {
            try
            {
                TaiKhoanKhachHang tkkh = Session["user-data"] as TaiKhoanKhachHang;
                int? idtk;
                if (tkkh == null)
                    idtk = null;
                else 
                    idtk = tkkh.id;

                var donhang = new DonHangVuonRauMuaSamVaMenuHangNgay();
                donhang.id_taikhoankhkachhang = idtk;
                donhang.hoten = hoten;
                donhang.dienthoai = sodienthoai;
                donhang.email = email;
                donhang.ghichu = ghichu;
                donhang.diachi = diachi;
                donhang.tinh = tinh;
                donhang.quanhuyen = quanhuyen;
                donhang.phuongxa = phuongxa;
                donhang.ngaydat = DateTime.Now;
                donhang.hinhthucthanhtoan = pttt;
                donhang.giaohangtannoi = giaotannoi;
                
                model.DonHangVuonRauMuaSamVaMenuHangNgay.Add(donhang);
                model.SaveChanges();

                int idDonHang = donhang.id;


                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }
    }
}