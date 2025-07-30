using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using Beanfamily.Middlewall;
using System.Data.Entity;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class SEOPageConfigController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/SEOPageConfig
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
            Session["active-qlsp"] = " # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # "; 
            Session["active-ndt"] = "collapsed # # "; 
            Session["active-cs"] = "collapsed # # ";
            Session["active-spnb"] = "collapsed # # ";

            if (Session["qlsp"] == null)
                return RedirectToAction("index", "dashboard");

            var seopage = model.NoiDungSEO.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("qlsp"));
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

            return View("index", seopage);
        }

        [HttpPost]
        public ActionResult CapNhatSEOPage(string title, string keyword, string desc)
        {
            try
            {
                var seopage = model.NoiDungSEO.ToList();
                if (seopage.Count < 1)
                {
                    NoiDungSEO noiDungSEO = new NoiDungSEO();
                    noiDungSEO.SEOtitle = title;
                    noiDungSEO.SEOkeyword = keyword;
                    noiDungSEO.SEOdescription = desc;

                    model.NoiDungSEO.Add(noiDungSEO);
                }
                else
                {
                    var seopages = seopage.First();
                    seopages.SEOtitle = title;
                    seopages.SEOkeyword = keyword;
                    seopages.SEOdescription = desc;

                    model.Entry(seopages).State = EntityState.Modified;
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