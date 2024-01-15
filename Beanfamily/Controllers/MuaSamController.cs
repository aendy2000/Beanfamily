using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using PagedList;

namespace Beanfamily.Controllers
{
    public class MuaSamController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: MuaSam
        public ActionResult Index(int? pageNum, int? pageSize)
        {
            var lstSanPham = model.SanPhamMuaSam.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
            Session["categories"] = model.DanhMucSanPhamMuaSamCap1.Where(s => s.hienthi == true).OrderBy(o => o.tendanhmuc).ToList();

            if (pageSize == null)
                pageSize = 24;
            if (pageNum == null)
                pageNum = 1;

            if (Session["id-category"] == null)
            {
                Session["id-category"] = "tatca";
                var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
                return PartialView("index", lstPr.ToPagedList((int)pageNum, (int)pageSize));
            }
            else
            {
                if (Session["id-category"].ToString().Equals("tatca"))
                {
                    var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
                    return PartialView("index", lstPr.ToPagedList((int)pageNum, (int)pageSize));
                }
                else
                {
                    int ids = Int32.Parse(Session["id-category"].ToString());
                    var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true && s.id_danhmucmuasamcap1 == ids).OrderBy(o => o.tensanpham).ToList();
                    return PartialView("index", lstPr.ToPagedList((int)pageNum, (int)pageSize));
                }
            }
        }

        [HttpPost]
        public ActionResult getProductOnCategories(string id, int? pageNum, int? pageSize)
        {
            if (string.IsNullOrEmpty(id))
                return Content("empty");

            if (pageSize == null)
                pageSize = 24;
            if (pageNum == null)
                pageNum = 1;

            Session["id-category"] = id;
            if (id.Equals("tatca"))
            {
                var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
                return PartialView("_ListProduct", lstPr.ToPagedList((int)pageNum, (int)pageSize));
            }
            else
            {
                int ids = Int32.Parse(id);
                var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true && s.id_danhmucmuasamcap1 == ids).OrderBy(o => o.tensanpham).ToList();
                return PartialView("_ListProduct", lstPr.ToPagedList((int)pageNum, (int)pageSize));
            }
        }

        public ActionResult ProductDetail(int id)
        {
            var sp = model.SanPhamMuaSam.Find(id);
            if (sp == null)
                return RedirectToAction("index");

            sp.luotxem = sp.luotxem + 1;
            model.Entry(sp).State = System.Data.Entity.EntityState.Modified;
            model.SaveChanges();
            model = new BeanfamilyEntities();
            return View("productdetail", sp);
        }
        [HttpPost]
        public ActionResult AddToCart(int idsp, int idloaitonkho, int soluong)
        {
            try
            {
                var sp = model.SanPhamMuaSam.Find(idsp);
                if (sp == null)
                    return Content("KHONGTONTAI");
                if (sp.TonKhoSanPham.FirstOrDefault(t => t.id == idloaitonkho) == null)
                    return Content("KHONGTONTAI");

                if (Session["giohang-muasam"] == null)
                {
                    List<string> giohang = new List<string>();
                    giohang.Add(idsp + "#" + idloaitonkho + "#" + soluong);
                    Session["giohang-muasam"] = giohang;
                }
                else
                {
                    List<string> giohang = Session["giohang-muasam"] as List<string>;
                    giohang.Add(idsp + "#" + idloaitonkho + "#" + soluong);
                    Session["giohang-muasam"] = giohang;
                }

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
            
        }
    }
}