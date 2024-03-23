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

        [HttpPost]
        public ActionResult AddToCart(int idsp, string soluong)
        {
            try
            {
                var sp = model.SanPhamRauNhaTrong.Find(idsp);
                if (sp == null)
                    return Content("KHONGTONTAI");

                decimal soluongs = Convert.ToDecimal(soluong.Replace(",", "").Replace(".", ","));
                if (Session["giohang-vuonrau"] == null)
                {
                    if (sp.giatritrendonvi <= 0)
                        return Content("HETHANG");

                    decimal tonKhoConLai = model.SanPhamRauNhaTrong.Find(idsp).giatritrendonvi;
                    List<string> giohang = new List<string>();

                    if (soluongs > tonKhoConLai)
                    {
                        Session["soluongmax-vuonrau-" + idsp] = tonKhoConLai;
                        Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                        giohang.Add(idsp + "#" + tonKhoConLai.ToString("0.00"));
                    }
                    else
                    {
                        Session["soluongmax-vuonrau-" + idsp] = null;
                        Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                        giohang.Add(idsp + "#" + soluong);
                    }

                    Session["giohang-vuonrau"] = giohang;
                }
                else
                {
                    List<string> giohang = Session["giohang-vuonrau"] as List<string>;


                    var checks = false;
                    foreach (string item in giohang)
                    {
                        int idPro = Int32.Parse(item.Split('#')[0]);
                        if (idPro == idsp)
                        {
                            checks = true;

                            decimal soluongs2 = Convert.ToDecimal(item.Split('#')[2]) + soluongs;
                            decimal tonKhoConLai = model.SanPhamRauNhaTrong.Find(idsp).giatritrendonvi;
                            if (sp.giatritrendonvi <= 0)
                            {
                                Session["soluongmax-vuonrau-" + idsp] = 0;
                                Session["tonkhoconlai-vuonrau-" + idsp] = 0;
                                giohang = giohang.Select(g => g.Replace(item, idPro + "#" + 0.00)).ToList();

                                Session["giohang-vuonrau"] = giohang;
                                return Content("HETHANG");
                            }
                            else
                            {
                                if (soluongs2 > tonKhoConLai)
                                {
                                    Session["soluongmax-vuonrau-" + idsp] = tonKhoConLai;
                                    Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                                    giohang = giohang.Select(g => g.Replace(item, idPro + "#" + tonKhoConLai.ToString("0.00"))).ToList();
                                }
                                else
                                {
                                    Session["soluongmax-vuonrau-" + idsp] = null;
                                    Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                                    giohang = giohang.Select(g => g.Replace(item, idPro + "#" + soluongs.ToString("0.00"))).ToList();
                                }
                            }
                        }
                    }

                    if (checks == false)
                    {
                        decimal tonKhoConLai = model.SanPhamRauNhaTrong.Find(idsp).giatritrendonvi;

                        if (soluongs > tonKhoConLai)
                        {
                            Session["soluongmax-vuonrau-" + idsp] = tonKhoConLai;
                            Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                            giohang.Add(idsp + "#" + tonKhoConLai.ToString("0.00"));
                        }
                        else
                        {
                            Session["soluongmax-vuonrau-" + idsp] = null;
                            Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                            giohang.Add(idsp + "#" + soluong);
                        }
                    }
                    Session["giohang-vuonrau"] = giohang;
                }

                return PartialView("_addCart");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }

        }

    }
}