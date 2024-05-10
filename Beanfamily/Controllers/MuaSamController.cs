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
            Session["title-url"] = "san-pham-mua-sam";
            var lstSanPham = model.SanPhamMuaSam.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
            Session["categories-muasam"] = model.DanhMucSanPhamMuaSamCap1.Where(s => s.hienthi == true).OrderBy(o => o.tendanhmuc).ToList();

            if (pageSize == null)
                pageSize = 24;
            if (pageNum == null)
                pageNum = 1;

            if (Session["id-category-muasam"] == null)
            {
                Session["id-category-muasam"] = "tatca";
                var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
                return PartialView("index", lstPr.ToPagedList((int)pageNum, (int)pageSize));
            }
            else
            {
                if (Session["id-category-muasam"].ToString().Equals("tatca"))
                {
                    var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
                    return PartialView("index", lstPr.ToPagedList((int)pageNum, (int)pageSize));
                }
                else
                {
                    int ids = Int32.Parse(Session["id-category-muasam"].ToString());
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

            Session["id-category-muasam"] = id;
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

            Session["title-url"] = "san-pham-" + sp.tensanpham.ToLower().Replace(" ", "-");

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
                    if (sp.TonKhoSanPham.FirstOrDefault(t => t.id == idloaitonkho).soluong < 1)
                        return Content("HETHANG");

                    int tonKhoConLai = model.SanPhamMuaSam.Find(idsp).TonKhoSanPham.FirstOrDefault(t => t.id == idloaitonkho).soluong;
                    List<string> giohang = new List<string>();

                    if (soluong > tonKhoConLai)
                    {
                        Session["soluongmax-muasam-" + idsp + idloaitonkho] = tonKhoConLai;
                        Session["tonkhoconlai-muasam-" + idsp + idloaitonkho] = tonKhoConLai;
                        giohang.Add(idsp + "#" + idloaitonkho + "#" + tonKhoConLai);
                    }
                    else
                    {
                        Session["soluongmax-muasam-" + idsp + idloaitonkho] = null;
                        Session["tonkhoconlai-muasam-" + idsp + idloaitonkho] = tonKhoConLai;
                        giohang.Add(idsp + "#" + idloaitonkho + "#" + soluong);
                    }

                    Session["giohang-muasam"] = giohang;
                }
                else
                {
                    List<string> giohang = Session["giohang-muasam"] as List<string>;

                    
                    var checks = false;
                    foreach (string item in giohang)
                    {
                        int idPro = Int32.Parse(item.Split('#')[0]);
                        if (idPro == idsp)
                        {
                            int idLoai = Int32.Parse(item.Split('#')[1]);
                            if (idLoai == idloaitonkho)
                            {
                                checks = true;

                                int soluongs = Int32.Parse(item.Split('#')[2]) + soluong;
                                int tonKhoConLai = model.SanPhamMuaSam.Find(idsp).TonKhoSanPham.FirstOrDefault(t => t.id == idloaitonkho).soluong;
                                if (sp.TonKhoSanPham.FirstOrDefault(t => t.id == idloaitonkho).soluong < 1)
                                {
                                    Session["soluongmax-muasam-" + idsp + idloaitonkho] = 0;
                                    Session["tonkhoconlai-muasam-" + idsp + idloaitonkho] = 0;
                                    giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + 0)).ToList();

                                    Session["giohang-muasam"] = giohang;
                                    return Content("HETHANG");
                                }
                                else
                                {
                                    if (soluongs > tonKhoConLai)
                                    {
                                        Session["soluongmax-muasam-" + idsp + idloaitonkho] = tonKhoConLai;
                                        Session["tonkhoconlai-muasam-" + idsp + idloaitonkho] = tonKhoConLai;
                                        giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + tonKhoConLai)).ToList();
                                    }
                                    else
                                    {
                                        Session["soluongmax-muasam-" + idsp + idloaitonkho] = null;
                                        Session["tonkhoconlai-muasam-" + idsp + idloaitonkho] = tonKhoConLai;
                                        giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + soluongs)).ToList();
                                    }
                                }
                            }
                        }
                    }

                    if (checks == false)
                    {
                        int tonKhoConLai = model.SanPhamMuaSam.Find(idsp).TonKhoSanPham.FirstOrDefault(t => t.id == idloaitonkho).soluong;

                        if (soluong > tonKhoConLai)
                        {
                            Session["soluongmax-muasam-" + idsp + idloaitonkho] = tonKhoConLai;
                            Session["tonkhoconlai-muasam-" + idsp + idloaitonkho] = tonKhoConLai;
                            giohang.Add(idsp + "#" + idloaitonkho + "#" + tonKhoConLai);
                        }
                        else
                        {
                            Session["soluongmax-muasam-" + idsp + idloaitonkho] = null;
                            Session["tonkhoconlai-muasam-" + idsp + idloaitonkho] = tonKhoConLai;
                            giohang.Add(idsp + "#" + idloaitonkho + "#" + soluong);
                        }
                    }
                    Session["giohang-muasam"] = giohang;
                }

                return PartialView("_addCart");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }

        }

        [HttpPost]
        public ActionResult UpdateCart(string id, int soluong)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                {
                    return Content("KHONGTONTAI");
                }

                int idsp = Int32.Parse(id.Split('-')[0]);
                int idloaitonkho = Int32.Parse(id.Split('-')[1]);

                List<string> giohang = Session["giohang-muasam"] as List<string>;

                var sp = model.SanPhamMuaSam.Find(idsp);
                if (sp == null)
                {
                    for (int i = 0; i < giohang.Count; i++)
                    {
                        if (giohang[i].IndexOf(idsp + "#") != -1)
                            giohang.RemoveAt(i);
                    }
                    Session["giohang-muasam"] = giohang;
                    return Content("KHONGTONTAI");
                }
                if (sp.TonKhoSanPham.FirstOrDefault(t => t.id == idloaitonkho) == null)
                {
                    int indexing = giohang.FindIndex(t => t.StartsWith(idsp + "#" + idloaitonkho + "#"));
                    giohang.RemoveAt(indexing);
                    Session["giohang-muasam"] = giohang;
                    return Content("KHONGTONTAI");
                }

                int tonKhoConLai = sp.TonKhoSanPham.FirstOrDefault(t => t.id == idloaitonkho).soluong;
                if (tonKhoConLai < 1)
                {
                    foreach (string item in giohang)
                    {
                        int idPro = Int32.Parse(item.Split('#')[0]);
                        if (idPro == idsp)
                        {
                            int idLoai = Int32.Parse(item.Split('#')[1]);
                            if (idLoai == idloaitonkho)
                            {
                                Session["soluongmax-muasam-" + idsp + idloaitonkho] = 0;
                                Session["tonkhoconlai-muasam-" + idsp + idloaitonkho] = 0;
                                giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + 0)).ToList();
                                soluong = 0;
                            }
                        }
                    }
                    Session["giohang-muasam"] = giohang;
                    return Content("HETHANG");
                }

                foreach (string item in giohang)
                {
                    int idPro = Int32.Parse(item.Split('#')[0]);
                    if (idPro == idsp)
                    {
                        int idLoai = Int32.Parse(item.Split('#')[1]);
                        if (idLoai == idloaitonkho)
                        {
                            if (soluong > tonKhoConLai)
                            {
                                Session["soluongmax-muasam-" + idsp + idloaitonkho] = tonKhoConLai;
                                Session["tonkhoconlai-muasam-" + idsp + idloaitonkho] = tonKhoConLai;
                                giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + tonKhoConLai)).ToList();
                                soluong = tonKhoConLai;
                            }
                            else
                            {
                                Session["soluongmax-muasam-" + idsp + idloaitonkho] = null;
                                Session["tonkhoconlai-muasam-" + idsp + idloaitonkho] = tonKhoConLai;
                                giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + soluong)).ToList();
                            }
                        }
                    }
                }

                Session["giohang-muasam"] = giohang;
                return Content("SUCCESS-" + soluong);
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }

        }

        [HttpPost]
        public ActionResult DeletedCart(string id)
        {
            try
            {
                List<string> giohang = Session["giohang-muasam"] as List<string>;
                if (string.IsNullOrEmpty(id))
                {
                    return Content("KHONGTONTAI");
                }

                int idsp = Int32.Parse(id.Split('-')[0]);
                int idloaitonkho = Int32.Parse(id.Split('-')[1]);
                var sp = model.SanPhamMuaSam.Find(idsp);
                if (sp == null)
                    return Content("KHONGTONTAI");
                if (sp.TonKhoSanPham.FirstOrDefault(t => t.id == idloaitonkho) == null)
                    return Content("KHONGTONTAI");

                int i = 0;
                foreach (string item in giohang)
                {
                    int idPro = Int32.Parse(item.Split('#')[0]);
                    if (idPro == idsp)
                    {
                        int idLoai = Int32.Parse(item.Split('#')[1]);
                        if (idLoai == idloaitonkho)
                        {
                            giohang.RemoveAt(i);
                            break;
                        }
                    }
                    i++;
                }

                Session["giohang-muasam"] = giohang;
                return PartialView("_addCart");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }

        }
    }
}