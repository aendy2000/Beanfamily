using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Beanfamily.Models;
using Beanfamily.Middlewall;
using System.IO;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class HinhAnhBeanController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/HinhAnhBean
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
            Session["active-hab"] = " # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # "; Session["active-ndt"] = "collapsed # # "; Session["active-cs"] = "collapsed # # "; Session["active-spnb"] = "collapsed # # "; Session["active-ttsk"] = "collapsed # # ";

            if (Session["hab"] == null)
                return RedirectToAction("index", "dashboard");

            var ha = model.HinhAnhBean.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("hab"));
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

            return View("Index", ha);
        }

        [HttpPost]
        public ActionResult ThemHinhAnh(List<HttpPostedFileBase> images)
        {
            try
            {
                int i = 0;
                if (images != null)
                {
                    foreach (var item in images)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                HinhAnhBean ha = new HinhAnhBean();

                                string pathSecond = i.ToString() + DateTime.Now.ToString("fffssmmHHddMMyyyy");
                                string pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/HinhAnhBean"));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                string path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/HinhAnhBean"), pathSecond + item.FileName);
                                item.SaveAs(path);

                                ha.url = "~/Content/AdminAreas/images/HinhAnhBean/" + pathSecond + item.FileName;
                                ha.trangchu = false;
                                model.HinhAnhBean.Add(ha);
                                model.SaveChanges();

                                i++;
                            }
                        }
                    }
                }

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult XoaHinhAnh(int id, string src)
        {
            try
            {
                var ha = model.HinhAnhBean.Find(id);
                if (ha != null)
                {
                    model.HinhAnhBean.Remove(ha);
                    model.SaveChanges();
                }

                try
                {
                    string path = Path.Combine(Server.MapPath(src));
                    System.IO.File.Delete(path);
                }
                catch (Exception) { }

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult HinhAnhTrangChu(int id, bool check)
        {
            try
            {
                var ha = model.HinhAnhBean.Find(id);
                if (ha != null)
                {
                    ha.trangchu = check;
                    model.Entry(ha).State = EntityState.Modified;
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