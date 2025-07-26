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
    public class ThongTinWebController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/ThongTinWeb
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
            Session["active-tlc-ttw"] = " # show # ";
            Session["active-tlc-lkmxh"] = " # show # active";
            Session["active-ndt"] = "collapsed # # "; Session["active-cs"] = "collapsed # # ";

            if (Session["tlc-lkmxh"] == null)
                return RedirectToAction("index", "dashboard");

            var ttw = model.ThongTinCauHinh.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("tlc-lkmxh"));
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

            return View("index", ttw);
        }
        [HttpPost]
        public ActionResult CapNhat(string giomocua, string ngaymocua, string sodienthoai, string email, string diachi, 
            string facebook, string mess, string zalo, string ig, string tiktok, string chiduong, string toado, string tenmien,
            string foothotline, string footFb)
        {
            try
            {
                var cauhinh = model.ThongTinCauHinh.ToList();
                if (cauhinh.Count < 1)
                {
                    ThongTinCauHinh cauhinhs = new ThongTinCauHinh();
                    cauhinhs.giomocua = giomocua;
                    cauhinhs.ngaymocua = ngaymocua;
                    cauhinhs.sodienthoai = sodienthoai;
                    cauhinhs.email = email;
                    cauhinhs.diachi = diachi;
                    cauhinhs.facebook = facebook;
                    cauhinhs.messenger = mess;
                    cauhinhs.zalo = zalo;
                    cauhinhs.instagram = ig;
                    cauhinhs.tiktok = tiktok;
                    cauhinhs.linkchiduong = chiduong;
                    cauhinhs.toadogooglemapiframe = toado;
                    cauhinhs.coppyright = tenmien;
                    cauhinhs.footer_hotline = foothotline;
                    cauhinhs.footer_page_facebook = footFb;

                    model.ThongTinCauHinh.Add(cauhinhs);
                }
                else
                {
                    var cauhinhs = cauhinh.First();
                    cauhinhs.giomocua = giomocua;
                    cauhinhs.ngaymocua = ngaymocua;
                    cauhinhs.sodienthoai = sodienthoai;
                    cauhinhs.email = email;
                    cauhinhs.diachi = diachi;
                    cauhinhs.facebook = facebook;
                    cauhinhs.messenger = mess;
                    cauhinhs.zalo = zalo;
                    cauhinhs.instagram = ig;
                    cauhinhs.tiktok = tiktok;
                    cauhinhs.linkchiduong = chiduong;
                    cauhinhs.toadogooglemapiframe = toado;
                    cauhinhs.coppyright = tenmien;
                    cauhinhs.footer_hotline = foothotline;
                    cauhinhs.footer_page_facebook = footFb;

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