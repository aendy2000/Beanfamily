using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Beanfamily.Models;
using Beanfamily.Middlewall;
using System.Data.Entity.Core.Objects;
using System.IO;
using System.Net.Mail;
using System.Net;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class LienHeDatBanController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/LienHeDatBan
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
            Session["active-hab"] = "collapsed # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # ";
            Session["active-lhdb"] = " # # ";

            model = new BeanfamilyEntities(); var donhangTB = model.LienHeDatBan.ToList();
            int numTB = donhangTB.Where(w => w.id_donhangmenubuffet == null && w.id_donhangmenutiecban == null && !w.trangthai.Equals("cancel")).ToList().Count;

            Session["new-lienhedatban"] = numTB;

            if (Session["lhdb"] == null)
                return RedirectToAction("index", "dashboard");

            var dh = model.LienHeDatBan.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("lhdb"));
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

            return View("Index", dh.OrderByDescending(o => o.id).ToList());
        }

        [HttpPost]
        public ActionResult BoQuaLienHe(int id)
        {
            try
            {
                var dm = model.LienHeDatBan.Find(id);
                if (dm == null)
                    return Content("KHONGTONTAI");

                dm.trangthai = "cancel";
                dm.id_donhangmenubuffet = null;
                dm.id_donhangmenutiecban = null;

                model.Entry(dm).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult BoQuaHangLoat(string lstId)
        {
            try
            {
                if (lstId.IndexOf("-") != -1)
                {
                    foreach (var item in lstId.Split('-'))
                    {
                        int id = Int32.Parse(item);
                        var dm = model.LienHeDatBan.Find(id);
                        dm.trangthai = "cancel";
                        dm.id_donhangmenubuffet = null;
                        dm.id_donhangmenutiecban = null;

                        model.Entry(dm).State = EntityState.Modified;
                        model.SaveChanges();
                    }
                }
                else
                {
                    int id = Int32.Parse(lstId);
                    var dm = model.LienHeDatBan.Find(id);
                    dm.trangthai = "cancel";
                    dm.id_donhangmenubuffet = null;
                    dm.id_donhangmenutiecban = null;

                    model.Entry(dm).State = EntityState.Modified;
                    model.SaveChanges();
                }

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }
    }
}