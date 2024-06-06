using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.DynamicData;
using System.Web.Mvc;
using Beanfamily.Models;
using PagedList;

namespace Beanfamily.Controllers
{
    public class ThucDonHangNgayController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: ThucDonHangNgay
        public ActionResult Index(int? pageNum, int? pageSize)
        {
            var lstSanPham = model.SanPhamThucDonHangNgay.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
            Session["categories-thucdonhangngay"] = model.DanhMucThucDocHangNgayCap1.Where(s => s.hienthi == true).OrderBy(o => o.tendanhmuc).ToList();

            if (pageSize == null)
                pageSize = 24;
            if (pageNum == null)
                pageNum = 1;

            if (Session["id-category-thucdonhangngay"] == null)
            {
                Session["id-category-thucdonhangngay"] = "tatca";
                var lstPr = model.SanPhamThucDonHangNgay.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
                return PartialView("index", lstPr.ToPagedList((int)pageNum, (int)pageSize));
            }
            else
            {
                if (Session["id-category-thucdonhangngay"].ToString().Equals("tatca"))
                {
                    var lstPr = model.SanPhamThucDonHangNgay.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
                    return PartialView("index", lstPr.ToPagedList((int)pageNum, (int)pageSize));
                }
                else
                {
                    int ids = Int32.Parse(Session["id-category-thucdonhangngay"].ToString());
                    var lstPr = model.SanPhamThucDonHangNgay.Where(s => s.hienthi == true && s.id_danhmucthucdonhangngaycap1 == ids).OrderBy(o => o.tensanpham).ToList();
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
                var lstPr = model.SanPhamThucDonHangNgay.Where(s => s.hienthi == true).OrderBy(o => o.tensanpham).ToList();
                return PartialView("_ListProduct", lstPr.ToPagedList((int)pageNum, (int)pageSize));
            }
            else
            {
                int ids = Int32.Parse(id);
                var lstPr = model.SanPhamThucDonHangNgay.Where(s => s.hienthi == true && s.id_danhmucthucdonhangngaycap1 == ids).OrderBy(o => o.tensanpham).ToList();
                return PartialView("_ListProduct", lstPr.ToPagedList((int)pageNum, (int)pageSize));
            }
        }

        public ActionResult ProductDetail(int id)
        {
            var sp = model.SanPhamThucDonHangNgay.Find(id);
            if (sp == null)
                return RedirectToAction("index");

            sp.luotxem = sp.luotxem + 1;
            model.Entry(sp).State = System.Data.Entity.EntityState.Modified;
            model.SaveChanges();
            model = new BeanfamilyEntities();
            return View("productdetail", sp);
        }

        [HttpPost]
        public ActionResult AddToCart(int idsp, int soluong)
        {
            try
            {
                var sp = model.SanPhamThucDonHangNgay.Find(idsp);
                if (sp == null)
                    return Content("KHONGTONTAI");

                if (Session["giohang-thucdonhangngay"] == null)
                {
                    if (sp.conhang == false)
                        return Content("HETHANG");

                    List<string> giohang = new List<string>();
                    giohang.Add(idsp + "#" + soluong);
                    Session["giohang-thucdonhangngay"] = giohang;

                    var tk = Session["user-data"] as TaiKhoanKhachHang;
                    if (Session["user-dangnhap"] != null)
                    {
                        var giohangs = new GioHangThucDonHangNgay();
                        giohangs.id_taikhoankhachhang = tk.id;
                        giohangs.id_sanpham = idsp;
                        giohangs.soluong = soluong;
                        giohangs.addDate = DateTime.Now;

                        model.GioHangThucDonHangNgay.Add(giohangs);
                        model.SaveChanges();
                    }
                }
                else
                {
                    List<string> giohang = Session["giohang-thucdonhangngay"] as List<string>;
                    if (giohang.Count < 1)
                    {
                        if (sp.conhang == false)
                            return Content("HETHANG");

                        giohang = new List<string>();
                        giohang.Add(idsp + "#" + soluong);

                        var tk = Session["user-data"] as TaiKhoanKhachHang;
                        if (Session["user-dangnhap"] != null)
                        {
                            var giohangs = new GioHangThucDonHangNgay();
                            giohangs.id_taikhoankhachhang = tk.id;
                            giohangs.id_sanpham = idsp;
                            giohangs.soluong = soluong;
                            giohangs.addDate = DateTime.Now;

                            model.GioHangThucDonHangNgay.Add(giohangs);
                            model.SaveChanges();
                        }
                    }
                    else
                    {
                        var checks = false;
                        foreach (string item in giohang)
                        {
                            int idPro = Int32.Parse(item.Split('#')[0]);
                            if (idPro == idsp)
                            {
                                checks = true;
                                int soluongs2 = Convert.ToInt32(item.Split('#')[1]) + soluong;
                                giohang = giohang.Select(g => g.Replace(item, idPro + "#" + soluongs2)).ToList();
                                soluong = soluongs2;
                                
                                var tk = Session["user-data"] as TaiKhoanKhachHang;
                                if (Session["user-dangnhap"] != null)
                                {
                                    var giohangs = model.GioHangThucDonHangNgay.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro);
                                    giohangs.soluong = soluongs2;

                                    model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                    model.SaveChanges();
                                }

                                break;
                            }
                        }
                        if (checks == false)
                        {
                            giohang.Add(idsp + "#" + soluong);

                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                            if (Session["user-dangnhap"] != null)
                            {
                                var giohangs = new GioHangThucDonHangNgay();
                                giohangs.id_taikhoankhachhang = tk.id;
                                giohangs.id_sanpham = idsp;
                                giohangs.soluong = soluong;
                                giohangs.addDate = DateTime.Now;

                                model.GioHangThucDonHangNgay.Add(giohangs);
                                model.SaveChanges();
                            }
                        }
                    }
                    Session["giohang-thucdonhangngay"] = giohang;
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
                int soluongs = Convert.ToInt32(soluong);
                List<string> giohang = Session["giohang-thucdonhangngay"] as List<string>;

                var sp = model.SanPhamThucDonHangNgay.Find(idsp);
                if (sp == null)
                {
                    for (int i = 0; i < giohang.Count; i++)
                    {
                        if (giohang[i].IndexOf(idsp + "#") != -1)
                            giohang.RemoveAt(i);
                    }

                    var tk = Session["user-data"] as TaiKhoanKhachHang;
                    if (Session["user-dangnhap"] != null)
                    {
                        model.GioHangThucDonHangNgay.RemoveRange(tk.GioHangThucDonHangNgay.Where(t => t.id_sanpham == idsp).ToList());
                        model.SaveChanges();
                    }

                    Session["giohang-thucdonhangngay"] = giohang;
                    return Content("KHONGTONTAI");
                }

                if (sp.conhang == false)
                {
                    foreach (string item in giohang)
                    {
                        int idPro = Int32.Parse(item.Split('#')[0]);
                        if (idPro == idsp)
                        {
                            giohang = giohang.Select(g => g.Replace(item, idPro + "#" + 0)).ToList();

                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                            if (Session["user-dangnhap"] != null)
                            {
                                var giohangs = model.GioHangThucDonHangNgay.FirstOrDefault(t => t.id_sanpham == idPro && t.id_taikhoankhachhang == tk.id);

                                if (giohangs != null)
                                {
                                    giohangs.soluong = 0;
                                    model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                    model.SaveChanges();
                                }
                            }
                        }
                    }
                    Session["giohang-thucdonhangngay"] = giohang;
                    return Content("HETHANG");
                }

                foreach (string item in giohang)
                {
                    int idPro = Int32.Parse(item.Split('#')[0]);
                    if (idPro == idsp)
                    {
                        giohang = giohang.Select(g => g.Replace(item, idPro + "#" + soluong)).ToList();

                        var tk = Session["user-data"] as TaiKhoanKhachHang;
                        if (Session["user-dangnhap"] != null)
                        {
                            var giohangs = model.GioHangThucDonHangNgay.FirstOrDefault(t => t.id_sanpham == idPro && t.id_taikhoankhachhang == tk.id);

                            if (giohangs != null)
                            {
                                giohangs.soluong = Int32.Parse(soluong);
                                model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                model.SaveChanges();
                            }
                        }
                    }
                }

                Session["giohang-thucdonhangngay"] = giohang;
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
                List<string> giohang = Session["giohang-thucdonhangngay"] as List<string>;
                if (string.IsNullOrEmpty(id))
                    return Content("KHONGTONTAI");

                int idsp = Int32.Parse(id.Split('-')[0]);
                var sp = model.SanPhamThucDonHangNgay.Find(idsp);
                if (sp == null)
                    return Content("KHONGTONTAI");

                int i = 0;
                foreach (string item in giohang)
                {
                    int idPro = Int32.Parse(item.Split('#')[0]);
                    if (idPro == idsp)
                    {
                        giohang.RemoveAt(i);

                        var tk = Session["user-data"] as TaiKhoanKhachHang;
                        if (Session["user-dangnhap"] != null)
                        {
                            var spgiohang = model.GioHangThucDonHangNgay.FirstOrDefault(g => g.id_sanpham == idPro && g.id_taikhoankhachhang == tk.id);
                            model.GioHangThucDonHangNgay.Remove(spgiohang);
                            model.SaveChanges();
                        }

                        break;
                    }
                    i++;
                }

                Session["giohang-thucdonhangngay"] = giohang;
                return PartialView("_addCart");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }

        }
    }
}