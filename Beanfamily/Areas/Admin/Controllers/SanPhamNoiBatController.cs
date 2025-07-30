using Beanfamily.Middlewall;
using Beanfamily.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class SanPhamNoiBatController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();

        // GET: Admin/SanPhamNoiBat
        public ActionResult Index()
        {
            Session["active-dashboard"] = "collapsed # # ";
            Session["active-mtb-dmc1"] = "collapsed # # ";
            Session["active-mtb-qlm"] = "collapsed # # ";
            Session["active-mb-dmc1"] = "collapsed # # ";
            Session["active-mb-qlm"] = "collapsed # # ";
            Session["active-dmpv"] = "collapsed # # ";
            Session["active-mhn-dmc1"] = "collapsed # # ";
            Session["active-mhn-qlm"] = "collapsed # # ";
            Session["active-vrb-dmc1"] = "collapsed # # ";
            Session["active-vrb-spr"] = "collapsed # # ";
            Session["active-vrb-qltc"] = "collapsed # # ";
            Session["active-chtl-dmc1"] = "collapsed # # ";
            Session["active-chtl-sp"] = "collapsed # # ";
            Session["active-tkb-pq"] = "collapsed # # ";
            Session["active-tkb-tk"] = "collapsed # # ";
            Session["active-ddh"] = "collapsed # # ";
            Session["active-ddbt"] = "collapsed # # ";
            Session["active-ddbb"] = "collapsed # # ";
            Session["active-lhdb"] = "collapsed # # ";
            Session["active-hab"] = "collapsed # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # ";
            Session["active-ndt"] = "collapsed # # ";
            Session["active-cs"] = "collapsed # # ";
            Session["active-spnb"] = " # # ";

            if (Session["spnb"] == null)
                return RedirectToAction("index", "dashboard");

            var spnb = model.TopSanPhamNoiBat.First();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("spnb"));
            if (chophepthemsuaxoa != null)
            {
                Session["chophep-them"] = chophepthemsuaxoa.chophepthem;
                Session["chophep-sua"] = chophepthemsuaxoa.chophepsua;
                Session["chophep-xoa"] = chophepthemsuaxoa.chophepxoa;
            }
            else
            {
                return RedirectToAction("index", "dashboard");
            }

            return View("index", spnb);
        }

        public ActionResult OpenSua()
        {
            Session["spnb-thucdon"] = model.SanPhamThucDonHangNgay.Where(w => w.hienthi == true && w.daxoa == false).ToList();
            Session["spnb-vuonrau"] = model.SanPhamRauNhaTrong.Where(w => w.hienthi == true && w.daxoa == false).ToList();
            Session["spnb-muasam"] = model.SanPhamMuaSam.Where(w => w.hienthi == true && w.daxoa == false).ToList();

            return PartialView("_OpenSua", model.TopSanPhamNoiBat.First());
        }
        [HttpPost]
        public ActionResult LuuChinhSua(int thucdon, int vuonrau, int muasam, int thucdon2, int vuonrau2, int muasam2)
        {
            try
            {
                var spnb = model.TopSanPhamNoiBat.First();

                spnb.id_thucdon = thucdon;
                spnb.id_vuonrau = vuonrau;
                spnb.id_muasam = muasam;

                spnb.id_thucdon_2 = thucdon2;
                spnb.id_vuonrau_2 = vuonrau2;
                spnb.id_muasam_2 = muasam2;

                model.Entry(spnb).State = System.Data.Entity.EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
    }
}