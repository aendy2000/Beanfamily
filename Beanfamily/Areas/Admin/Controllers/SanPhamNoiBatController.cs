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
            Session["active-ttsk"] = "collapsed # # ";

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
            return PartialView("_OpenSua", model.TopSanPhamNoiBat.First());
        }

        [HttpPost]
        public ActionResult LuuChinhSua(string idthucdon)
        {
            try
            {
                if (string.IsNullOrEmpty(idthucdon))
                {
                    var spms = model.SanPhamThucDonHangNgay.Where(w => w.hienthi == true && w.daxoa == false).OrderByDescending(o => o.luotxem).Take(10).ToList();

                    string lstIdNew = "";
                    foreach (var item in spms)
                        lstIdNew += item.id + "#";

                    var spnb = model.TopSanPhamNoiBat.First();
                    spnb.list_id_thucdon = !string.IsNullOrEmpty(lstIdNew) ? "" : lstIdNew.Remove(lstIdNew.Length - 1);
                    model.Entry(spnb).State = System.Data.Entity.EntityState.Modified;
                    model.SaveChanges();

                }
                else
                {
                    var spnb = model.TopSanPhamNoiBat.First();

                    spnb.list_id_thucdon = idthucdon;

                    model.Entry(spnb).State = System.Data.Entity.EntityState.Modified;
                    model.SaveChanges();
                }

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
    }
}