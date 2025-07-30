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
            var lstSanPham = model.SanPhamMuaSam.Where(s => s.hienthi == true && s.daxoa == false).OrderBy(o => o.tensanpham).ToList();
            Session["categories-muasam"] = model.DanhMucSanPhamMuaSamCap1.Where(s => s.hienthi == true).OrderBy(o => o.tendanhmuc).ToList();

            Session["data-timkiem"] = "";

            if (pageSize == null)
                pageSize = 24;
            if (pageNum == null)
                pageNum = 1;

            if (Session["id-category-muasam"] == null)
            {
                Session["id-category-muasam"] = "tatca";
                var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true && s.daxoa == false).OrderBy(o => o.tensanpham).ToList();
                return PartialView("index", lstPr.ToPagedList((int)pageNum, (int)pageSize));
            }
            else
            {
                if (Session["id-category-muasam"].ToString().Equals("tatca"))
                {
                    var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true && s.daxoa == false).OrderBy(o => o.tensanpham).ToList();
                    return PartialView("index", lstPr.ToPagedList((int)pageNum, (int)pageSize));
                }
                else
                {
                    int ids = Int32.Parse(Session["id-category-muasam"].ToString());
                    var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true && s.id_danhmucmuasamcap1 == ids && s.daxoa == false).OrderBy(o => o.tensanpham).ToList();
                    return PartialView("index", lstPr.ToPagedList((int)pageNum, (int)pageSize));
                }
            }
        }

        [HttpPost]
        public ActionResult SearchProduct(string search)
        {
            int pageSize = 24;
            int pageNum = 1;

            Session["data-timkiem"] = search;

            var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true
            && s.daxoa == false
            && s.tensanpham.ToLower().Contains(search.ToLower())).OrderBy(o => o.tensanpham).ToList();
            return PartialView("_ListProduct", lstPr.ToPagedList((int)pageNum, lstPr.Count + 1));
        }

        [HttpPost]
        public ActionResult getProductOnCategories(string id, int? pageNum, int? pageSize, string search)
        {
            if (string.IsNullOrEmpty(id))
                return Content("empty");

            if (pageSize == null)
                pageSize = 24;
            if (pageNum == null)
                pageNum = 1;

            Session["id-category-muasam"] = id;

            if (string.IsNullOrEmpty(search))
            {
                if (id.Equals("tatca"))
                {
                    var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true && s.daxoa == false).OrderBy(o => o.tensanpham).ToList();
                    return PartialView("_ListProduct", lstPr.ToPagedList((int)pageNum, (int)pageSize));
                }
                else
                {
                    int ids = Int32.Parse(id);
                    var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true && s.id_danhmucmuasamcap1 == ids && s.daxoa == false).OrderBy(o => o.tensanpham).ToList();
                    return PartialView("_ListProduct", lstPr.ToPagedList((int)pageNum, (int)pageSize));
                }
            }
            else
            {
                if (id.Equals("tatca"))
                {
                    var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true 
                    && s.daxoa == false
                    && s.tensanpham.ToLower().Contains(search.ToLower())).OrderBy(o => o.tensanpham).ToList();
                    return PartialView("_ListProduct", lstPr.ToPagedList((int)pageNum, lstPr.Count + 1));
                }
                else
                {
                    int ids = Int32.Parse(id);
                    var lstPr = model.SanPhamMuaSam.Where(s => s.hienthi == true 
                    && s.id_danhmucmuasamcap1 == ids 
                    && s.daxoa == false
                    && s.tensanpham.ToLower().Contains(search.ToLower())).OrderBy(o => o.tensanpham).ToList();
                    return PartialView("_ListProduct", lstPr.ToPagedList((int)pageNum, lstPr.Count + 1));
                }
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

        public ActionResult QuickProductDetail(int id)
        {
            var sp = model.SanPhamMuaSam.Find(id);
            if (sp == null)
                return RedirectToAction("index");

            sp.luotxem = sp.luotxem + 1;
            model.Entry(sp).State = System.Data.Entity.EntityState.Modified;
            model.SaveChanges();
            model = new BeanfamilyEntities();
            return PartialView("_quickproductdetail", sp);
        }

        [HttpPost]
        public ActionResult AddToCart(int idsp, int idloaitonkho, int soluong)
        {
            try
            {
                var sp = model.SanPhamMuaSam.Find(idsp);
                if (sp == null)
                    return Content("KHONGTONTAI");
                if (sp.TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == idloaitonkho) == null)
                    return Content("KHONGTONTAI");

                if (Session["giohang-muasam"] == null)
                {
                    if (sp.TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == idloaitonkho).soluong < 1)
                        return Content("HETHANG");

                    int tonKhoConLai = model.SanPhamMuaSam.Find(idsp).TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == idloaitonkho).soluong;
                    List<string> giohang = new List<string>();

                    if (soluong > tonKhoConLai)
                    {
                        Session["soluongmax-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                        Session["tonkhoconlai-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                        giohang.Add(idsp + "#" + idloaitonkho + "#" + tonKhoConLai);

                        var tk = Session["user-data"] as TaiKhoanKhachHang;
                        if (Session["user-dangnhap"] != null)
                        {
                            var giohangs = new GioHangMuaSam();
                            giohangs.id_taikhoankhachhang = tk.id;
                            giohangs.id_sanpham = idsp;
                            giohangs.id_loaitonkho = idloaitonkho;
                            giohangs.soluong = tonKhoConLai;
                            giohangs.addDate = DateTime.Now;

                            model.GioHangMuaSam.Add(giohangs);
                            model.SaveChanges();
                        }
                    }
                    else
                    {
                        Session["soluongmax-muasam-" + idsp + "-" + idloaitonkho] = null;
                        Session["tonkhoconlai-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                        giohang.Add(idsp + "#" + idloaitonkho + "#" + soluong);

                        var tk = Session["user-data"] as TaiKhoanKhachHang;
                        if (Session["user-dangnhap"] != null)
                        {
                            var giohangs = new GioHangMuaSam();
                            giohangs.id_taikhoankhachhang = tk.id;
                            giohangs.id_sanpham = idsp;
                            giohangs.id_loaitonkho = idloaitonkho;
                            giohangs.soluong = soluong;
                            giohangs.addDate = DateTime.Now;

                            model.GioHangMuaSam.Add(giohangs);
                            model.SaveChanges();
                        }
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
                                int tonKhoConLai = model.SanPhamMuaSam.Find(idsp).TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == idloaitonkho).soluong;
                                if (sp.TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == idloaitonkho).soluong < 1)
                                {
                                    Session["soluongmax-muasam-" + idsp + "-" + idloaitonkho] = 0;
                                    Session["tonkhoconlai-muasam-" + idsp + "-" + idloaitonkho] = 0;
                                    giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + 0)).ToList();

                                    var tk = Session["user-data"] as TaiKhoanKhachHang;
                                    if (Session["user-dangnhap"] != null)
                                    {
                                        var giohangs = model.GioHangMuaSam.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro && g.id_loaitonkho == idLoai);
                                        giohangs.soluong = 0;

                                        model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                        model.SaveChanges();
                                    }

                                    Session["giohang-muasam"] = giohang;
                                    return Content("HETHANG");
                                }
                                else
                                {
                                    if (tonKhoConLai > 100)
                                    {
                                        if (soluongs > tonKhoConLai)
                                        {
                                            Session["soluongmax-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                                            Session["tonkhoconlai-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                                            giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + 100)).ToList();

                                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                                            if (Session["user-dangnhap"] != null)
                                            {
                                                var giohangs = model.GioHangMuaSam.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro && g.id_loaitonkho == idLoai);
                                                giohangs.soluong = 100;

                                                model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                                model.SaveChanges();
                                            }
                                        }
                                        else
                                        {
                                            if (soluongs > 100)
                                                soluongs = 100;
                                            Session["soluongmax-muasam-" + idsp + "-" + idloaitonkho] = null;
                                            Session["tonkhoconlai-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                                            giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + soluongs)).ToList();

                                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                                            if (Session["user-dangnhap"] != null)
                                            {
                                                var giohangs = model.GioHangMuaSam.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro && g.id_loaitonkho == idLoai);
                                                giohangs.soluong = soluongs;

                                                model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                                model.SaveChanges();
                                            }
                                        }
                                    }
                                    else
                                    {
                                        if (soluongs > tonKhoConLai)
                                        {
                                            Session["soluongmax-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                                            Session["tonkhoconlai-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                                            giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + tonKhoConLai)).ToList();

                                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                                            if (Session["user-dangnhap"] != null)
                                            {
                                                var giohangs = model.GioHangMuaSam.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro && g.id_loaitonkho == idLoai);
                                                giohangs.soluong = tonKhoConLai;

                                                model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                                model.SaveChanges();
                                            }
                                        }
                                        else
                                        {
                                            Session["soluongmax-muasam-" + idsp + "-" + idloaitonkho] = null;
                                            Session["tonkhoconlai-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                                            giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + soluongs)).ToList();

                                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                                            if (Session["user-dangnhap"] != null)
                                            {
                                                var giohangs = model.GioHangMuaSam.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro && g.id_loaitonkho == idLoai);
                                                giohangs.soluong = soluongs;

                                                model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                                model.SaveChanges();
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }

                    if (checks == false)
                    {
                        int tonKhoConLai = model.SanPhamMuaSam.Find(idsp).TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == idloaitonkho).soluong;

                        if (soluong > tonKhoConLai)
                        {
                            Session["soluongmax-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                            Session["tonkhoconlai-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                            giohang.Add(idsp + "#" + idloaitonkho + "#" + tonKhoConLai);

                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                            if (Session["user-dangnhap"] != null)
                            {
                                var giohangs = new GioHangMuaSam();
                                giohangs.id_taikhoankhachhang = tk.id;
                                giohangs.id_sanpham = idsp;
                                giohangs.id_loaitonkho = idloaitonkho;
                                giohangs.soluong = tonKhoConLai;
                                giohangs.addDate = DateTime.Now;

                                model.GioHangMuaSam.Add(giohangs);
                                model.SaveChanges();
                            }
                        }
                        else
                        {
                            Session["soluongmax-muasam-" + idsp + "-" + idloaitonkho] = null;
                            Session["tonkhoconlai-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                            giohang.Add(idsp + "#" + idloaitonkho + "#" + soluong);

                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                            if (Session["user-dangnhap"] != null)
                            {
                                var giohangs = new GioHangMuaSam();
                                giohangs.id_taikhoankhachhang = tk.id;
                                giohangs.id_sanpham = idsp;
                                giohangs.id_loaitonkho = idloaitonkho;
                                giohangs.soluong = soluong;
                                giohangs.addDate = DateTime.Now;

                                model.GioHangMuaSam.Add(giohangs);
                                model.SaveChanges();
                            }
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

                    var tk = Session["user-data"] as TaiKhoanKhachHang;
                    if (Session["user-dangnhap"] != null)
                    {
                        model.GioHangMuaSam.RemoveRange(tk.GioHangMuaSam.Where(t => t.id_sanpham == idsp).ToList());
                        model.SaveChanges();
                    }

                    Session["giohang-muasam"] = giohang;
                    return Content("KHONGTONTAI");
                }
                if (sp.TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == idloaitonkho) == null)
                {
                    int indexing = giohang.FindIndex(t => t.StartsWith(idsp + "#" + idloaitonkho + "#"));
                    giohang.RemoveAt(indexing);

                    var tk = Session["user-data"] as TaiKhoanKhachHang;
                    if (Session["user-dangnhap"] != null)
                    {
                        var spgh = model.GioHangMuaSam.FirstOrDefault(s => s.id_sanpham == idsp && s.id_taikhoankhachhang == tk.id && s.id_loaitonkho == idloaitonkho);
                        if (spgh != null)
                        {
                            model.GioHangMuaSam.Remove(spgh);
                            model.SaveChanges();
                        }
                    }

                    Session["giohang-muasam"] = giohang;
                    return Content("KHONGTONTAI");
                }

                int tonKhoConLai = sp.TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == idloaitonkho).soluong;
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
                                Session["soluongmax-muasam-" + idsp + "-" + idloaitonkho] = 0;
                                Session["tonkhoconlai-muasam-" + idsp + "-" + idloaitonkho] = 0;
                                giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + 0)).ToList();
                                soluong = 0;

                                var tk = Session["user-data"] as TaiKhoanKhachHang;
                                if (Session["user-dangnhap"] != null)
                                {
                                    var giohangs = model.GioHangMuaSam.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro && g.id_loaitonkho == idLoai);
                                    giohangs.soluong = 0;

                                    model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                    model.SaveChanges();
                                }
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
                                Session["soluongmax-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                                Session["tonkhoconlai-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                                giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + tonKhoConLai)).ToList();
                                soluong = tonKhoConLai;

                                var tk = Session["user-data"] as TaiKhoanKhachHang;
                                if (Session["user-dangnhap"] != null)
                                {
                                    var giohangs = model.GioHangMuaSam.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro && g.id_loaitonkho == idLoai);
                                    giohangs.soluong = tonKhoConLai;

                                    model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                    model.SaveChanges();
                                }
                            }
                            else
                            {
                                Session["soluongmax-muasam-" + idsp + "-" + idloaitonkho] = null;
                                Session["tonkhoconlai-muasam-" + idsp + "-" + idloaitonkho] = tonKhoConLai;
                                giohang = giohang.Select(g => g.Replace(item, idPro + "#" + idLoai + "#" + soluong)).ToList();

                                var tk = Session["user-data"] as TaiKhoanKhachHang;
                                if (Session["user-dangnhap"] != null)
                                {
                                    var giohangs = model.GioHangMuaSam.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro && g.id_loaitonkho == idLoai);
                                    giohangs.soluong = soluong;

                                    model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                    model.SaveChanges();
                                }
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
                if (sp.TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == idloaitonkho) == null)
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

                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                            if (Session["user-dangnhap"] != null)
                            {
                                var spgiohang = model.GioHangMuaSam.FirstOrDefault(g => g.id_sanpham == idPro && g.id_taikhoankhachhang == tk.id && g.id_loaitonkho == idLoai);
                                model.GioHangMuaSam.Remove(spgiohang);
                                model.SaveChanges();
                            }
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