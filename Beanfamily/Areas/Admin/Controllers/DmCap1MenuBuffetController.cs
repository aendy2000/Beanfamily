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
    public class DmCap1MenuBuffetController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/DmCap1MenuBuffet
        public ActionResult Index()
        {
            Session["active-dashboard"] = "collapsed # # ";
            Session["active-mtb-dmc1"] = "collapsed # # ";
            Session["active-mtb-qlm"] = "collapsed # # ";
            Session["active-mb-dmc1"] = " # show # active";
            Session["active-mb-qlm"] = " # show # ";
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
            Session["active-cs"] = "collapsed # # ";Session["active-spnb"] = "collapsed # # ";

            if (Session["mb-dmc1"] == null)
                return RedirectToAction("index", "dashboard");

            var dm = model.DanhMucMenuBuffetCap1.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("mb-dmc1"));
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

            return View("index", dm);
        }

        [HttpPost]
        public ActionResult ThemDm(string tendanhmuc, bool hienthi, string sothutu)
        {
            try
            {
                var checkExist = model.DanhMucMenuBuffetCap1.FirstOrDefault(d => d.tendanhmuc.ToLower().Equals(tendanhmuc.ToLower().Trim()));
                if (checkExist != null)
                    return Content("EXIST");

                DanhMucMenuBuffetCap1 dm = new DanhMucMenuBuffetCap1();
                dm.tendanhmuc = tendanhmuc;
                dm.hienthi = hienthi;
                if (!string.IsNullOrEmpty(sothutu))
                    dm.sothutu = Int32.Parse(sothutu);
                else
                    dm.sothutu = 0;
                dm.ngaytao = DateTime.Now;
                dm.ngaysuadoi = DateTime.Now;

                model.DanhMucMenuBuffetCap1.Add(dm);
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
                var checkExist = model.DanhMucMenuBuffetCap1.FirstOrDefault(d => d.tendanhmuc.ToLower().Equals(tendanhmuc.ToLower().Trim()) && d.id != id);
                if (checkExist != null)
                    return Content("EXIST");

                var dm = model.DanhMucMenuBuffetCap1.Find(id);
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
                var dm = model.DanhMucMenuBuffetCap1.Find(id);
                if (dm == null)
                    return Content("KHONGTONTAI");

                model.DanhMucMenuBuffetCap1.Remove(dm);
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
                var dm = model.DanhMucMenuBuffetCap1.Find(id);
                if (dm == null)
                    return Content("KHONGTONTAI");

                var mon = model.SanPhamMenuBuffet.Where(w => w.id_danhmucmenubuffetcap1 == id).ToList();
                return PartialView("_DanhSachMonBuffet", mon);
            }
            catch (Exception ex)
            {

                return Content("Chi tiết lỗi: " + ex.Message);
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
                        var dm = model.DanhMucMenuBuffetCap1.Find(id);
                        model.DanhMucMenuBuffetCap1.Remove(dm);
                        model.SaveChanges();
                    }
                }
                else
                {
                    int id = Int32.Parse(lstId);
                    var dm = model.DanhMucMenuBuffetCap1.Find(id);
                    model.DanhMucMenuBuffetCap1.Remove(dm);
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