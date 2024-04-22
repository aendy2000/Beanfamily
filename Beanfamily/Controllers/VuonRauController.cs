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
                        Session["soluongmax-vuonrau-" + idsp] = tonKhoConLai.ToString("0.00").Replace(",", ".").Replace(".00", string.Empty);
                        Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai.ToString("0.00").Replace(",", ".").Replace(".00", string.Empty);
                        giohang.Add(idsp + "#" + tonKhoConLai.ToString("0.00"));
                    }
                    else
                    {
                        Session["soluongmax-vuonrau-" + idsp] = null;
                        Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai.ToString("0.00").Replace(",", ".").Replace(".00", string.Empty);

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

                            decimal soluongs2 = Convert.ToDecimal(item.Split('#')[1].Replace(".", ",")) + soluongs;
                            decimal tonKhoConLai = model.SanPhamRauNhaTrong.Find(idsp).giatritrendonvi;
                            if (sp.giatritrendonvi <= 0)
                            {
                                Session["soluongmax-vuonrau-" + idsp] = 0;
                                Session["tonkhoconlai-vuonrau-" + idsp] = 0;
                                giohang = giohang.Select(g => g.Replace(item, idPro + "#" + 0)).ToList();

                                Session["giohang-vuonrau"] = giohang;
                                return Content("HETHANG");
                            }
                            else
                            {
                                if (soluongs2 > tonKhoConLai)
                                {
                                    Session["soluongmax-vuonrau-" + idsp] = tonKhoConLai.ToString("0.00").Replace(",", ".").Replace(".00", string.Empty);
                                    Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai.ToString("0.00").Replace(",", ".").Replace(".00", string.Empty);
                                    giohang = giohang.Select(g => g.Replace(item, idPro + "#" + tonKhoConLai.ToString("0.00"))).ToList();
                                }
                                else
                                {
                                    Session["soluongmax-vuonrau-" + idsp] = null;
                                    Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai.ToString("0.00").Replace(",", ".").Replace(".00", string.Empty);
                                    giohang = giohang.Select(g => g.Replace(item, idPro + "#" + soluongs2.ToString("0.00"))).ToList();
                                }
                            }
                        }
                    }

                    if (checks == false)
                    {
                        decimal tonKhoConLai = model.SanPhamRauNhaTrong.Find(idsp).giatritrendonvi;

                        if (soluongs > tonKhoConLai)
                        {
                            Session["soluongmax-vuonrau-" + idsp] = tonKhoConLai.ToString("0.00").Replace(",", ".").Replace(".00", string.Empty);
                            Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai.ToString("0.00").Replace(",", ".").Replace(".00", string.Empty);
                            giohang.Add(idsp + "#" + tonKhoConLai.ToString("0.00"));
                        }
                        else
                        {
                            Session["soluongmax-vuonrau-" + idsp] = null;
                            Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai.ToString("0.00").Replace(",", ".").Replace(".00", string.Empty);
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


        [HttpPost]
        public ActionResult UpdateCart(string id, string soluong)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                {
                    return Content("KHONGTONTAI");
                }

                int idsp = Int32.Parse(id);
                decimal soluongs = Convert.ToDecimal(soluong.Replace(",", "").Replace(".", ","));
                List<string> giohang = Session["giohang-vuonrau"] as List<string>;

                var sp = model.SanPhamRauNhaTrong.Find(idsp);
                if (sp == null)
                {
                    for (int i = 0; i < giohang.Count; i++)
                    {
                        if (giohang[i].IndexOf(idsp + "#") != -1)
                            giohang.RemoveAt(i);
                    }
                    Session["giohang-vuonrau"] = giohang;
                    return Content("KHONGTONTAI");
                }

                decimal tonKhoConLai = sp.giatritrendonvi;
                if (tonKhoConLai <= 0)
                {
                    foreach (string item in giohang)
                    {
                        int idPro = Int32.Parse(item.Split('#')[0]);
                        if (idPro == idsp)
                        {
                            Session["soluongmax-vuonrau-" + idsp] = 0;
                            Session["tonkhoconlai-vuonrau-" + idsp] = 0;
                            giohang = giohang.Select(g => g.Replace(item, idPro + "#" + 0)).ToList();
                            soluongs = 0;
                        }
                    }
                    Session["giohang-vuonrau"] = giohang;
                    return Content("HETHANG");
                }

                foreach (string item in giohang)
                {
                    int idPro = Int32.Parse(item.Split('#')[0]);
                    if (idPro == idsp)
                    {
                        if (soluongs > tonKhoConLai)
                        {
                            Session["soluongmax-vuonrau-" + idsp] = tonKhoConLai.ToString("0.00").Replace(",", ".").Replace(".00", string.Empty);
                            Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai.ToString("0.00").Replace(",", ".").Replace(".00", string.Empty);
                            giohang = giohang.Select(g => g.Replace(item, idPro + "#" + tonKhoConLai.ToString("0.00"))).ToList();
                            soluongs = tonKhoConLai;
                        }
                        else
                        {
                            Session["soluongmax-vuonrau-" + idsp] = null;
                            Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai.ToString("0.00").Replace(",", ".").Replace(".00", string.Empty);
                            giohang = giohang.Select(g => g.Replace(item, idPro + "#" + soluong)).ToList();
                        }
                    }
                }

                Session["giohang-vuonrau"] = giohang;
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
                List<string> giohang = Session["giohang-vuonrau"] as List<string>;
                if (string.IsNullOrEmpty(id))
                {
                    return Content("KHONGTONTAI");
                }

                int idsp = Int32.Parse(id.Split('-')[0]);
                var sp = model.SanPhamRauNhaTrong.Find(idsp);
                if (sp == null)
                    return Content("KHONGTONTAI");

                int i = 0;
                foreach (string item in giohang)
                {
                    int idPro = Int32.Parse(item.Split('#')[0]);
                    if (idPro == idsp)
                    {
                        giohang.RemoveAt(i);
                        break;
                    }
                    i++;
                }

                Session["giohang-vuonrau"] = giohang;
                return PartialView("_addCart");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }

        }

        public ActionResult quytrinhtrong(int id)
        {
            try
            {
                model = new BeanfamilyEntities();
                var rau = model.SanPhamRauNhaTrong.Find(id);
                if (rau == null)
                    return Content("KHONGTONTAI");

                if (rau.QuyTrinhTrongCay == null)
                    return Content("KHONGTONTAIQUYTRINH");

                return View("quytrinhtrong", model.QuyTrinhTrongCay.Find(rau.id_quytrinhtrongcay));
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }
    }
}