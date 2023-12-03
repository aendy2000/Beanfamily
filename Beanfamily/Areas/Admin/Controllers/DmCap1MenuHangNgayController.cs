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
    public class DmCap1MenuHangNgayController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/MenuHangNgay
        public ActionResult Index()
        {
            if (Session["mhn-dmc1"] == null)
                return RedirectToAction("index", "dashboard");

            var dm = model.DanhMucThucDocHangNgayCap1.ToList();
            return View("index", dm);
        }

        [HttpPost]
        public ActionResult ThemDm(string tendanhmuc, bool hienthi, string sothutu)
        {
            try
            {
                var checkExist = model.DanhMucThucDocHangNgayCap1.FirstOrDefault(d => d.tendanhmuc.ToLower().Equals(tendanhmuc.ToLower().Trim()));
                if (checkExist != null)
                    return Content("EXIST");

                DanhMucThucDocHangNgayCap1 dm = new DanhMucThucDocHangNgayCap1();
                dm.tendanhmuc = tendanhmuc;
                dm.hienthi = hienthi;
                if (!string.IsNullOrEmpty(sothutu))
                    dm.sothutu = Int32.Parse(sothutu);
                else
                    dm.sothutu = 0;
                dm.ngaytao = DateTime.Now;
                dm.ngaysuadoi = DateTime.Now;

                model.DanhMucThucDocHangNgayCap1.Add(dm);
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
                var checkExist = model.DanhMucThucDocHangNgayCap1.FirstOrDefault(d => d.tendanhmuc.ToLower().Equals(tendanhmuc.ToLower().Trim()) && d.id != id);
                if (checkExist != null)
                    return Content("EXIST");

                var dm = model.DanhMucThucDocHangNgayCap1.Find(id);
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
                var dm = model.DanhMucThucDocHangNgayCap1.Find(id);
                if (dm == null)
                    return Content("KHONGTONTAI");

                model.DanhMucThucDocHangNgayCap1.Remove(dm);
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
                var dm = model.DanhMucThucDocHangNgayCap1.Find(id);
                if (dm == null)
                    return Content("KHONGTONTAI");

                var mon = model.SanPhamThucDonHangNgay.Where(m => m.id_danhmucthucdonhangngaycap1 == id).ToList();
                return PartialView("_DanhSachMonHangNgay", mon);
            }
            catch (Exception ex)
            {

                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }
    }
}