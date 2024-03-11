using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using PagedList;

namespace Beanfamily.Controllers
{
    public class VuonRauController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: VuonRau
        public ActionResult Index(int? pageNum, int? pageSize)
        {
            var lstSanPham = model.SanPhamRauNhaTrong.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
            Session["categories-raunhatrong"] = model.DanhMucSanPhamRauNhaTrongCap1.Where(s => s.hienthi == true).OrderBy(o => o.tendanhmuc).ToList();

            if (pageSize == null)
                pageSize = 24;
            if (pageNum == null)
                pageNum = 1;

            if (Session["id-category-raunhatrong"] == null)
            {
                Session["id-category-raunhatrong"] = "tatca";
                var lstPr = model.SanPhamRauNhaTrong.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
                return PartialView("index", lstPr.ToPagedList((int)pageNum, (int)pageSize));
            }
            else
            {
                if (Session["id-category-raunhatrong"].ToString().Equals("tatca"))
                {
                    var lstPr = model.SanPhamRauNhaTrong.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
                    return PartialView("index", lstPr.ToPagedList((int)pageNum, (int)pageSize));
                }
                else
                {
                    int ids = Int32.Parse(Session["id-category-raunhatrong"].ToString());
                    var lstPr = model.SanPhamRauNhaTrong.Where(s => s.hienthi == true && s.id_danhmucsanphamraunhatrongcap1 == ids).OrderBy(o => o.tensanpham).ToList();
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

            Session["id-category-raunhatrong"] = id;
            if (id.Equals("tatca"))
            {
                var lstPr = model.SanPhamRauNhaTrong.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
                return PartialView("_ListProduct", lstPr.ToPagedList((int)pageNum, (int)pageSize));
            }
            else
            {
                int ids = Int32.Parse(id);
                var lstPr = model.SanPhamRauNhaTrong.Where(s => s.hienthi == true && s.id_danhmucsanphamraunhatrongcap1 == ids).OrderBy(o => o.tensanpham).ToList();
                return PartialView("_ListProduct", lstPr.ToPagedList((int)pageNum, (int)pageSize));
            }
        }

        public ActionResult ProductDetail(int id)
        {
            var sp = model.SanPhamRauNhaTrong.Find(id);
            if (sp == null)
                return RedirectToAction("index");

            sp.luotxem = sp.luotxem + 1;
            model.Entry(sp).State = System.Data.Entity.EntityState.Modified;
            model.SaveChanges();
            model = new BeanfamilyEntities();
            return View("productdetail", sp);
        }
    }
}