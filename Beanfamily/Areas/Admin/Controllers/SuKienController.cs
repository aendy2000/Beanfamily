using Beanfamily.Middlewall;
using Beanfamily.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class SuKienController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();

        // GET: Admin/SuKien
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
            Session["active-spnb"] = "collapsed # # ";
            Session["active-ttsk"] = " # # ";

            if (Session["ttsk"] == null)
                return RedirectToAction("index", "dashboard");

            var ttsk = model.SuKienBean.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("ttsk"));
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

            return View("index", ttsk);
        }

        [HttpPost]
        public ActionResult ThemSuKien(HttpPostedFileBase hinhanh_sukien,
            string tieude, string noidung, string linkbai)
        {
            try
            {
                var sk = new SuKienBean();
                sk.tieude = tieude;
                sk.noidung = noidung;
                sk.baiviet = linkbai;
                sk.ngaygio = DateTime.Now;

                string path = "";
                string pathDirectory = "";
                if (hinhanh_sukien != null)
                {
                    if (hinhanh_sukien.ContentLength > 0)
                    {
                        pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SuKien"));
                        if (!Directory.Exists(pathDirectory))
                        {
                            Directory.CreateDirectory(pathDirectory);
                        }
                        path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SuKien"), hinhanh_sukien.FileName);
                        hinhanh_sukien.SaveAs(path);
                        sk.hinhanh = "~/Content/AdminAreas/images/SuKien/" + hinhanh_sukien.FileName;
                    }
                }

                model.SuKienBean.Add(sk);
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Xoa(int id)
        {
            try
            {
                var sk = model.SuKienBean.Find(id);
                if (sk == null)
                    return Content("KHONGTONTAI");

                model.SuKienBean.Remove(sk);
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult XoaHangLoat(string lstId)
        {
            try
            {
                if (lstId.IndexOf("-") != -1)
                {
                    foreach (var item in lstId.Split('-'))
                    {
                        int id = Int32.Parse(item);
                        var sk = model.SuKienBean.Find(id);
                        model.SuKienBean.Remove(sk);
                        model.SaveChanges();
                    }
                }
                else
                {
                    int id = Int32.Parse(lstId);
                    var sk = model.SuKienBean.Find(id);
                    model.SuKienBean.Remove(sk);
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