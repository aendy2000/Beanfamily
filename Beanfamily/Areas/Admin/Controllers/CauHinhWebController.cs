using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using Beanfamily.Middlewall;
using System.Data.Entity;
using System.Security.Cryptography;
using System.Web.Razor.Tokenizer.Symbols;


namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class CauHinhWebController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/CauHinhWeb
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
            Session["active-ddbb"] = "collapsed # # "; Session["active-lhdb"] = "collapsed # # ";
            Session["active-hab"] = "collapsed # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = " # show # active";
            Session["active-tlc-lkmxh"] = " # show # ";
            Session["active-ndt"] = "collapsed # # ";

            if (Session["tlc-ttw"] == null)
                return RedirectToAction("index", "dashboard");

            var chw = model.ThongTinCauHinh.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("tlc-ttw"));
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

            return View("index", chw);
        }

        [HttpPost]
        public ActionResult CapNhat(string googlesearchconsole, string googleanalyst)
        {
            try
            {
                var cauhinh = model.ThongTinCauHinh.ToList();
                if (cauhinh.Count < 1)
                {
                    ThongTinCauHinh cauhinhs = new ThongTinCauHinh();
                    cauhinhs.googleanalyst = googleanalyst;
                    cauhinhs.googlesearchconsole = googlesearchconsole;

                    model.ThongTinCauHinh.Add(cauhinhs);
                }
                else
                {
                    var cauhinhs = cauhinh.First();
                    cauhinhs.googleanalyst = googleanalyst;
                    cauhinhs.googlesearchconsole = googlesearchconsole;

                    model.Entry(cauhinhs).State = EntityState.Modified;
                }
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