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
    public class DmCap1MenuTiecBanController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/DmCap1MenuTiecBan
        public ActionResult Index()
        {
            Session["active-dashboard"] = "collapsed # # ";
            Session["active-mtb-dmc1"] = " # show # active";
            Session["active-mtb-dmpv"] = " # show # ";
            Session["active-mtb-qlm"] = " # show # ";
            Session["active-mb-dmc1"] = "collapsed # # ";
            Session["active-mb-dmpv"] = "collapsed # # ";
            Session["active-mb-qlm"] = "collapsed # # ";
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

            if (Session["mhn-dmc1"] == null)
                return RedirectToAction("index", "dashboard");

            var dm = model.DanhMucMenuTiecBanCap1.ToList();
            return View("index", dm);
        }

        [HttpPost]
        public ActionResult ThemDm(string tendanhmuc, bool hienthi, string sothutu)
        {
            try
            {
                var checkExist = model.DanhMucMenuTiecBanCap1.FirstOrDefault(d => d.tendanhmuc.ToLower().Equals(tendanhmuc.ToLower().Trim()));
                if (checkExist != null)
                    return Content("EXIST");

                DanhMucMenuTiecBanCap1 dm = new DanhMucMenuTiecBanCap1();
                dm.tendanhmuc = tendanhmuc;
                dm.hienthi = hienthi;
                if (!string.IsNullOrEmpty(sothutu))
                    dm.sothutu = Int32.Parse(sothutu);
                else
                    dm.sothutu = 0;
                dm.ngaytao = DateTime.Now;
                dm.ngaysuadoi = DateTime.Now;

                model.DanhMucMenuTiecBanCap1.Add(dm);
                model.SaveChanges();
                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SuaDm(int id, string tendanhmuc, bool hienthi, string sothutu)
        {
            try
            {
                var checkExist = model.DanhMucMenuTiecBanCap1.FirstOrDefault(d => d.tendanhmuc.ToLower().Equals(tendanhmuc.ToLower().Trim()) && d.id != id);
                if (checkExist != null)
                    return Content("EXIST");

                var dm = model.DanhMucMenuTiecBanCap1.Find(id);
                if (dm == null)
                    return Content("KHONGTONTAI");

                dm.tendanhmuc = tendanhmuc;
                dm.hienthi = hienthi;
                if (!string.IsNullOrEmpty(sothutu))
                    dm.sothutu = Int32.Parse(sothutu);
                else
                    dm.sothutu = 0;
                dm.ngaysuadoi = DateTime.Now;
                model.Entry(dm).State = EntityState.Modified;
                model.SaveChanges();
                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult XoaDm(int id)
        {
            try
            {
                var dm = model.DanhMucMenuTiecBanCap1.Find(id);
                if (dm == null)
                    return Content("KHONGTONTAI");

                model.DanhMucMenuTiecBanCap1.Remove(dm);
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult ShowDanhSachMon(int id)
        {
            try
            {
                var dm = model.DanhMucMenuTiecBanCap1.Find(id);
                if (dm == null)
                    return Content("KHONGTONTAI");

                var mon = model.SanPhamMenuTiecBan.Where(m => m.id_danhmucmenutiecbancap1 == id).ToList();
                return PartialView("_DanhSachMonHangNgay", mon);
            }
            catch (Exception ex)
            {

                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }
    }
}