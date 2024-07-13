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

        public ActionResult ProductDetail(int id, string urlname)
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
        public ActionResult AddToCart(int idsp, int soluong)
        {
            try
            {
                var sp = model.SanPhamRauNhaTrong.Find(idsp);
                if (sp == null)
                    return Content("KHONGTONTAI");

                int soluongs = Convert.ToInt32(soluong);
                if (Session["giohang-vuonrau"] == null)
                {
                    if (sp.giatritrendonvi <= 0)
                        return Content("HETHANG");

                    int tonKhoConLai = model.SanPhamRauNhaTrong.Find(idsp).giatritrendonvi;
                    List<string> giohang = new List<string>();

                    if (soluongs > tonKhoConLai)
                    {
                        Session["soluongmax-vuonrau-" + idsp] = tonKhoConLai;
                        Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                        giohang.Add(idsp + "#" + tonKhoConLai);

                        var tk = Session["user-data"] as TaiKhoanKhachHang;
                        if (Session["user-dangnhap"] != null)
                        {
                            var giohangs = new GioHangVuonRauBean();
                            giohangs.id_taikhoankhachhang = tk.id;
                            giohangs.id_sanpham = idsp;
                            giohangs.soluong = tonKhoConLai;
                            giohangs.addDate = DateTime.Now;

                            model.GioHangVuonRauBean.Add(giohangs);
                            model.SaveChanges();
                        }
                    }
                    else
                    {
                        Session["soluongmax-vuonrau-" + idsp] = null;
                        Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;

                        giohang.Add(idsp + "#" + soluong);

                        var tk = Session["user-data"] as TaiKhoanKhachHang;
                        if (Session["user-dangnhap"] != null)
                        {
                            var giohangs = new GioHangVuonRauBean();
                            giohangs.id_taikhoankhachhang = tk.id;
                            giohangs.id_sanpham = idsp;
                            giohangs.soluong = soluong;
                            giohangs.addDate = DateTime.Now;

                            model.GioHangVuonRauBean.Add(giohangs);
                            model.SaveChanges();
                        }
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

                            int soluongs2 = Convert.ToInt32(item.Split('#')[1]) + soluongs;
                            int tonKhoConLai = model.SanPhamRauNhaTrong.Find(idsp).giatritrendonvi;
                            if (sp.giatritrendonvi <= 0)
                            {
                                Session["soluongmax-vuonrau-" + idsp] = 0;
                                Session["tonkhoconlai-vuonrau-" + idsp] = 0;
                                giohang = giohang.Select(g => g.Replace(item, idPro + "#" + 0)).ToList();

                                var tk = Session["user-data"] as TaiKhoanKhachHang;
                                if (Session["user-dangnhap"] != null)
                                {
                                    var giohangs = model.GioHangVuonRauBean.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro);
                                    giohangs.soluong = 0;

                                    model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                    model.SaveChanges();
                                }

                                Session["giohang-vuonrau"] = giohang;
                                return Content("HETHANG");
                            }
                            else
                            {
                                if (tonKhoConLai > 100)
                                {
                                    if (soluongs2 > tonKhoConLai)
                                    {
                                        Session["soluongmax-vuonrau-" + idsp] = tonKhoConLai;
                                        Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                                        giohang = giohang.Select(g => g.Replace(item, idPro + "#" + 100)).ToList();

                                        var tk = Session["user-data"] as TaiKhoanKhachHang;
                                        if (Session["user-dangnhap"] != null)
                                        {
                                            var giohangs = model.GioHangVuonRauBean.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro);
                                            giohangs.soluong = 100;

                                            model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                            model.SaveChanges();
                                        }
                                    }
                                    else
                                    {
                                        if (soluongs2 > 100)
                                            soluongs2 = 100;
                                        Session["soluongmax-vuonrau-" + idsp] = null;
                                        Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                                        giohang = giohang.Select(g => g.Replace(item, idPro + "#" + soluongs2)).ToList();

                                        var tk = Session["user-data"] as TaiKhoanKhachHang;
                                        if (Session["user-dangnhap"] != null)
                                        {
                                            var giohangs = model.GioHangVuonRauBean.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro);
                                            giohangs.soluong = soluongs2;

                                            model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                            model.SaveChanges();
                                        }
                                    }
                                }
                                else
                                {
                                    if (soluongs2 > tonKhoConLai)
                                    {
                                        Session["soluongmax-vuonrau-" + idsp] = tonKhoConLai;
                                        Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                                        giohang = giohang.Select(g => g.Replace(item, idPro + "#" + tonKhoConLai)).ToList();

                                        var tk = Session["user-data"] as TaiKhoanKhachHang;
                                        if (Session["user-dangnhap"] != null)
                                        {
                                            var giohangs = model.GioHangVuonRauBean.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro);
                                            giohangs.soluong = tonKhoConLai;

                                            model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                            model.SaveChanges();
                                        }
                                    }
                                    else
                                    {
                                        Session["soluongmax-vuonrau-" + idsp] = null;
                                        Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                                        giohang = giohang.Select(g => g.Replace(item, idPro + "#" + soluongs2)).ToList();

                                        var tk = Session["user-data"] as TaiKhoanKhachHang;
                                        if (Session["user-dangnhap"] != null)
                                        {
                                            var giohangs = model.GioHangVuonRauBean.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro);
                                            giohangs.soluong = soluongs2;

                                            model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                            model.SaveChanges();
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (checks == false)
                    {
                        int tonKhoConLai = model.SanPhamRauNhaTrong.Find(idsp).giatritrendonvi;

                        if (soluongs > tonKhoConLai)
                        {
                            Session["soluongmax-vuonrau-" + idsp] = tonKhoConLai;
                            Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                            giohang.Add(idsp + "#" + tonKhoConLai);

                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                            if (Session["user-dangnhap"] != null)
                            {
                                var giohangs = new GioHangVuonRauBean();
                                giohangs.id_taikhoankhachhang = tk.id;
                                giohangs.id_sanpham = idsp;
                                giohangs.soluong = tonKhoConLai;
                                giohangs.addDate = DateTime.Now;

                                model.GioHangVuonRauBean.Add(giohangs);
                                model.SaveChanges();
                            }
                        }
                        else
                        {
                            Session["soluongmax-vuonrau-" + idsp] = null;
                            Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                            giohang.Add(idsp + "#" + soluong);

                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                            if (Session["user-dangnhap"] != null)
                            {
                                var giohangs = new GioHangVuonRauBean();
                                giohangs.id_taikhoankhachhang = tk.id;
                                giohangs.id_sanpham = idsp;
                                giohangs.soluong = soluong;
                                giohangs.addDate = DateTime.Now;

                                model.GioHangVuonRauBean.Add(giohangs);
                                model.SaveChanges();
                            }
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
        public ActionResult UpdateCart(string id, int soluong)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                {
                    return Content("KHONGTONTAI");
                }

                int idsp = Int32.Parse(id);
                int soluongs = soluong;
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

                    var tk = Session["user-data"] as TaiKhoanKhachHang;
                    if (Session["user-dangnhap"] != null)
                    {
                        model.GioHangVuonRauBean.RemoveRange(tk.GioHangVuonRauBean.Where(t => t.id_sanpham == idsp).ToList());
                        model.SaveChanges();
                    }

                    return Content("KHONGTONTAI");
                }

                int tonKhoConLai = sp.giatritrendonvi;
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

                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                            if (Session["user-dangnhap"] != null)
                            {
                                var giohangs = model.GioHangVuonRauBean.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro);
                                giohangs.soluong = 0;

                                model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                model.SaveChanges();
                            }
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
                            Session["soluongmax-vuonrau-" + idsp] = tonKhoConLai;
                            Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                            giohang = giohang.Select(g => g.Replace(item, idPro + "#" + tonKhoConLai)).ToList();
                            soluongs = tonKhoConLai;

                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                            if (Session["user-dangnhap"] != null)
                            {
                                var giohangs = model.GioHangVuonRauBean.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro);
                                giohangs.soluong = tonKhoConLai;

                                model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                model.SaveChanges();
                            }
                        }
                        else
                        {
                            Session["soluongmax-vuonrau-" + idsp] = null;
                            Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;
                            giohang = giohang.Select(g => g.Replace(item, idPro + "#" + soluong)).ToList();

                            var tk = Session["user-data"] as TaiKhoanKhachHang;
                            if (Session["user-dangnhap"] != null)
                            {
                                var giohangs = model.GioHangVuonRauBean.FirstOrDefault(g => g.id_taikhoankhachhang == tk.id && g.id_sanpham == idPro);
                                giohangs.soluong = soluong;

                                model.Entry(giohangs).State = System.Data.Entity.EntityState.Modified;
                                model.SaveChanges();
                            }
                        }
                    }
                }

                Session["giohang-vuonrau"] = giohang;
                return Content("SUCCESS-" + soluongs);
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

                        var tk = Session["user-data"] as TaiKhoanKhachHang;
                        if (Session["user-dangnhap"] != null)
                        {
                            var spgiohang = model.GioHangVuonRauBean.FirstOrDefault(g => g.id_sanpham == idPro && g.id_taikhoankhachhang == tk.id);
                            model.GioHangVuonRauBean.Remove(spgiohang);
                            model.SaveChanges();
                        }

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

                var quytrinh = model.QuyTrinhTrongCay.Find(rau.id_quytrinhtrongcay);
                quytrinh.luotxem++;

                model.Entry(quytrinh).State = System.Data.Entity.EntityState.Modified;
                model.SaveChanges();

                return View("quytrinhtrong", quytrinh);
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }
    }
}