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
    public class MonAnMenuBuffetController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/MonAnMenuBuffet
        public ActionResult Index()
        {
            Session["active-dashboard"] = "collapsed # # ";
            Session["active-mtb-dmc1"] = "collapsed # # ";
            Session["active-mtb-qlm"] = "collapsed # # ";
            Session["active-mb-dmc1"] = " # show # ";
            Session["active-mb-qlm"] = " # show # active";
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

            if (Session["mb-qlm"] == null)
                return RedirectToAction("index", "dashboard");

            var monAn = model.SanPhamMenuBuffet.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("mb-qlm"));
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

            return View("index", monAn);
        }

        [HttpPost]
        public ActionResult ThemMon(HttpPostedFileBase hinhanh, string tenmon, string sothutu, int danhmuc, bool hienthi)
        {
            try
            {
                var checkExist = model.SanPhamMenuBuffet.FirstOrDefault(s => s.tensanpham.ToLower().Equals(tenmon.ToLower().Trim()) && s.id_danhmucmenubuffetcap1 == danhmuc);
                if (checkExist != null)
                    return Content("DATONTAI");

                SanPhamMenuBuffet monan = new SanPhamMenuBuffet();
                monan.tensanpham = tenmon;
                monan.id_danhmucmenubuffetcap1 = danhmuc;
                if (string.IsNullOrEmpty(sothutu))
                    monan.sothutu = 0;
                else
                    monan.sothutu = Int32.Parse(sothutu);

                monan.hienthi = hienthi;
                model.SanPhamMenuBuffet.Add(monan);
                model.SaveChanges();

                int idMonAn = monan.id;
                model = new BeanfamilyEntities();

                string path = "";
                string pathDirectory = "";
                string strImages = "";
                if (hinhanh != null)
                {
                    if (hinhanh.ContentLength > 0)
                    {
                        pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMenuBuffet/SanPham_" + idMonAn));
                        if (!Directory.Exists(pathDirectory))
                        {
                            Directory.CreateDirectory(pathDirectory);
                        }
                        path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMenuBuffet/SanPham_" + idMonAn), hinhanh.FileName);
                        hinhanh.SaveAs(path);
                        strImages = "~/Content/AdminAreas/images/SanPhamMenuBuffet/SanPham_" + idMonAn + "/" + hinhanh.FileName;

                        var monanCurrent = model.SanPhamMenuBuffet.Find(idMonAn);
                        monanCurrent.hinhanh = strImages;
                        model.Entry(monanCurrent).State = EntityState.Modified;
                        model.SaveChanges();
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
        public ActionResult OpenSuaMon(int id)
        {
            try
            {
                var mon = model.SanPhamMenuBuffet.Find(id);
                if (mon == null)
                    return Content("KHONGTONTAI");

                return PartialView("_OpenSuaMonBuffet", mon);
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SuaMon(int id, HttpPostedFileBase hinhanh, string tenmon, string sothutu, int danhmuc, bool hienthi, string hinhcu)
        {
            try
            {
                var checkExist = model.SanPhamMenuBuffet.FirstOrDefault(s => s.tensanpham.ToLower().Equals(tenmon.ToLower().Trim()) && s.id_danhmucmenubuffetcap1 == danhmuc && s.id != id);
                if (checkExist != null)
                    return Content("DATONTAI");

                var monan = model.SanPhamMenuBuffet.Find(id);
                if (monan == null)
                    return Content("KHONGTONTAI");

                monan.tensanpham = tenmon;
                monan.id_danhmucmenubuffetcap1 = danhmuc;
                if (string.IsNullOrEmpty(sothutu))
                    monan.sothutu = 0;
                else
                    monan.sothutu = Int32.Parse(sothutu);

                monan.hienthi = hienthi;
                string path = "";
                string pathDirectory = "";
                string strImages = "";
                if (hinhanh != null)
                {
                    if (hinhanh.ContentLength > 0)
                    {
                        pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMenuTiecBan/SanPham_" + id));
                        if (!Directory.Exists(pathDirectory))
                        {
                            Directory.CreateDirectory(pathDirectory);
                        }
                        path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMenuTiecBan/SanPham_" + id), hinhanh.FileName);
                        hinhanh.SaveAs(path);
                        strImages = "~/Content/AdminAreas/images/SanPhamMenuTiecBan/SanPham_" + id + "/" + hinhanh.FileName;

                        monan.hinhanh = strImages;
                    }
                }
                else
                {
                    monan.hinhanh = hinhcu;
                }
                model.Entry(monan).State = EntityState.Modified;
                model.SaveChanges();
                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult XoaMon(int id)
        {
            try
            {
                var mon = model.SanPhamMenuBuffet.Find(id);
                if (mon == null)
                    return Content("KHONGTONTAI");

                model.SanPhamMenuBuffet.Remove(mon);
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
                        var dm = model.SanPhamMenuBuffet.Find(id);
                        model.SanPhamMenuBuffet.Remove(dm);
                        model.SaveChanges();
                    }
                }
                else
                {
                    int id = Int32.Parse(lstId);
                    var dm = model.SanPhamMenuBuffet.Find(id);
                    model.SanPhamMenuBuffet.Remove(dm);
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