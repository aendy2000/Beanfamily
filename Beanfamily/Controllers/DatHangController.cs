using Beanfamily.Models;
using Beanfamily.ZaloAPI;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Razor.Parser.SyntaxTree;
using System.Web.Services.Description;

namespace Beanfamily.Controllers
{
    public class DatHangController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: DatHang
        public ActionResult Index()
        {
            return View("index");
        }

        public ActionResult UpdateInfoCart()
        {
            return PartialView("_UpdateInfoCart");
        }

        public void UpdateCart()
        {
            // Mua sắm

            var lstSpMuaSam = Session["giohang-muasam"] as List<string>;
            foreach (string lstItem in lstSpMuaSam)
            {
                string id = lstItem.Split('#')[0] + "-" + lstItem.Split('#')[1];
                int soluong = Int32.Parse(lstItem.Split('#')[2]);

                try
                {
                    if (!string.IsNullOrEmpty(id))
                    {

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
                    }
                }

                catch (Exception ex)
                {

                }
            }

            //Vườn rau

            var lstSpVuonRau = Session["giohang-vuonrau"] as List<string>;
            foreach (string lstItem in lstSpVuonRau)
            {
                string id = lstItem.Split('#')[0];
                int soluong = Int32.Parse(lstItem.Split('#')[2]);

                try
                {
                    if (!string.IsNullOrEmpty(id))
                    {

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
                    }
                }

                catch (Exception ex)
                {
                }
            }

            //TDHN

            var lstSpTDHN = Session["giohang-thucdonhangngay"] as List<string>;
            foreach (string lstItem in lstSpTDHN)
            {
                string id = lstItem.Split('#')[0];
                string soluong = lstItem.Split('#')[2];

                try
                {
                    if (!string.IsNullOrEmpty(id))
                    {

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
                    }
                }

                catch (Exception ex)
                {
                }
            }
        }

        public ActionResult TienHanhDatHang()
        {
            List<string> giohangmuassam = Session["giohang-muasam"] as List<string>;
            List<string> giohangvuonrau = Session["giohang-vuonrau"] as List<string>;
            List<string> giohangthucdonhangngay = Session["giohang-thucdonhangngay"] as List<string>;

            bool cartMuaSamNull = false;
            bool cartVuonRauNull = false;
            bool cartThucDonNull = false;

            if (giohangmuassam == null && giohangvuonrau == null && giohangthucdonhangngay == null)
            {
                cartMuaSamNull = true;
                cartVuonRauNull = true;
                cartThucDonNull = true;
            }
            else
            {
                if (giohangmuassam == null)
                    cartMuaSamNull = true;
                else if (giohangmuassam != null)
                    if (giohangmuassam.Count < 1)
                        cartMuaSamNull = true;

                if (giohangvuonrau == null)
                    cartVuonRauNull = true;
                else if (giohangvuonrau != null)
                    if (giohangvuonrau.Count < 1)
                        cartVuonRauNull = true;

                if (giohangthucdonhangngay == null)
                    cartThucDonNull = true;
                else if (giohangthucdonhangngay != null)
                    if (giohangthucdonhangngay.Count < 1)
                        cartThucDonNull = true;
            }

            if (cartMuaSamNull == true && cartVuonRauNull == true && cartThucDonNull == true)
                return RedirectToAction("index");
            else
                return View("tienhanhdathang");
        }

        [HttpPost]
        public ActionResult XacNhanDatHang(string hoten, string sodienthoai, string email,
            string ghichu, string diachi, string tinh, string quanhuyen,
            string phuongxa, string pttt, bool giaotannoi, string mack)
        {
            int idTemp = 0;
            try
            {
                TaiKhoanKhachHang tkkh = Session["user-data"] as TaiKhoanKhachHang;
                int? idtk;
                if (tkkh == null)
                    idtk = null;
                else
                    idtk = tkkh.id;

                var ngaydathang = DateTime.Now;
                string thongtindiachi = "Nhận tại nhà hàng";
                var donhang = new DonHangVuonRauMuaSamVaMenuHangNgay();
                donhang.id_taikhoankhkachhang = idtk;
                donhang.hoten = hoten;
                donhang.dienthoai = sodienthoai;
                donhang.email = email;
                if (giaotannoi == true)
                {
                    thongtindiachi = diachi + ", " + phuongxa + ", " + quanhuyen + ", " + tinh;
                    donhang.diachi = diachi;
                    donhang.tinh = tinh;
                    donhang.quanhuyen = quanhuyen;
                    donhang.phuongxa = phuongxa;
                }
                donhang.ngaydat = ngaydathang;
                donhang.hinhthucthanhtoan = pttt;
                donhang.giaohangtannoi = giaotannoi;
                if (pttt.Equals("Thanh toán qua Ngân hàng"))
                    donhang.ghichu = "Mã CK [" + mack + 
                        (string.IsNullOrEmpty(ghichu) ? "] được viết trong nội dung CK của khách hàng." 
                        : "]. Note của khách: " + ghichu);
                else
                    donhang.ghichu = ghichu;


                model.DonHangVuonRauMuaSamVaMenuHangNgay.Add(donhang);
                model.SaveChanges();

                int idDH = donhang.id;
                idTemp = donhang.id;
                string madonhang = "DH" + idDH + DateTime.Now.ToString("ddMMyyyy");

                donhang.madonhang = madonhang;
                model.Entry(donhang).State = EntityState.Modified;
                model.SaveChanges();

                var lstSpMuaSam = Session["giohang-muasam"] as List<string>;
                List<ChiTietDonHangSanPhamMuaSam> lstSpDonHangMuaSam = new List<ChiTietDonHangSanPhamMuaSam>();

                if (lstSpMuaSam != null)
                {
                    foreach (var item in lstSpMuaSam)
                    {
                        int idsp = Int32.Parse(item.Split('#')[0]);
                        int idloaitonkho = Int32.Parse(item.Split('#')[1]);
                        int soluong = Int32.Parse(item.Split('#')[2]);

                        var spmuasam = model.SanPhamMuaSam.Find(idsp);
                        var tonkho = spmuasam.TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == idloaitonkho);
                        if (spmuasam == null)
                        {
                            model.DonHangVuonRauMuaSamVaMenuHangNgay.Remove(donhang);
                            model.SaveChanges();
                            UpdateCart();
                            return Content("NOTEXIST");
                        }
                        if (tonkho == null)
                        {
                            model.DonHangVuonRauMuaSamVaMenuHangNgay.Remove(donhang);
                            model.SaveChanges();
                            UpdateCart();
                            return Content("NOTEXIST");
                        }
                        if (tonkho.soluong < soluong)
                        {
                            model.DonHangVuonRauMuaSamVaMenuHangNgay.Remove(donhang);
                            model.SaveChanges();
                            UpdateCart();
                            return Content("VUOTSOLUONG");
                        }

                        int soluongton = tonkho.soluong;
                        tonkho.soluong = soluongton - soluong;
                        model.Entry(tonkho).State = EntityState.Modified;
                        model.SaveChanges();

                        ChiTietDonHangSanPhamMuaSam dhSP = new ChiTietDonHangSanPhamMuaSam();
                        dhSP.id_donhangvuonraumuasamvamenuhangngay = idDH;
                        dhSP.id_sanphammuasam = idsp;
                        dhSP.hinhanh = spmuasam.hinhanh;
                        dhSP.video = spmuasam.video;
                        dhSP.tensanpham = spmuasam.tensanpham;
                        dhSP.mota = spmuasam.mota;
                        dhSP.tenloaitonkho = tonkho.tenloai;
                        dhSP.gia = tonkho.gia;
                        dhSP.soluongmua = soluong;

                        lstSpDonHangMuaSam.Add(dhSP);
                    }
                }
                //Vườn rau
                var lstSpVuonRau = Session["giohang-vuonrau"] as List<string>;
                List<ChiTietDonHangSanPhamRauNhaTrong> lstSpDonHangVuonRau = new List<ChiTietDonHangSanPhamRauNhaTrong>();

                if (lstSpVuonRau != null)
                {
                    foreach (var item in lstSpVuonRau)
                    {
                        int idsp = Int32.Parse(item.Split('#')[0]);
                        int soluong = Int32.Parse(item.Split('#')[1]);

                        var spvuonrau = model.SanPhamRauNhaTrong.Find(idsp);
                        if (spvuonrau == null)
                        {
                            model.DonHangVuonRauMuaSamVaMenuHangNgay.Remove(donhang);
                            model.SaveChanges();
                            UpdateCart();
                            return Content("NOTEXIST");
                        }
                        if (spvuonrau.giatritrendonvi < soluong)
                        {
                            model.DonHangVuonRauMuaSamVaMenuHangNgay.Remove(donhang);
                            model.SaveChanges();
                            UpdateCart();
                            return Content("VUOTSOLUONG");
                        }

                        int soluongton = spvuonrau.giatritrendonvi;
                        spvuonrau.giatritrendonvi = soluongton - soluong;
                        model.Entry(spvuonrau).State = EntityState.Modified;
                        model.SaveChanges();

                        ChiTietDonHangSanPhamRauNhaTrong dhSP = new ChiTietDonHangSanPhamRauNhaTrong();
                        dhSP.id_donhangvuonraumuasamvamenuhangngay = idDH;
                        dhSP.id_sanphamraunhatrong = idsp;
                        dhSP.hinhanh = spvuonrau.hinhanh;
                        dhSP.video = spvuonrau.video;
                        dhSP.tensanpham = spvuonrau.tensanpham;
                        dhSP.donvi = spvuonrau.donvi;
                        dhSP.giatritrendonvi = spvuonrau.giatritrendonvi;
                        dhSP.gia = spvuonrau.gia;
                        dhSP.mota = spvuonrau.mota;
                        dhSP.soluongmua = soluong;

                        lstSpDonHangVuonRau.Add(dhSP);
                    }
                }
                //Vườn tdhn
                var lstSpTDHN = Session["giohang-thucdonhangngay"] as List<string>;
                List<ChiTietDonHangSanPhamThucDonHangNgay> lstSpDonHangTDHN = new List<ChiTietDonHangSanPhamThucDonHangNgay>();

                if (lstSpTDHN != null)
                {
                    foreach (var item in lstSpTDHN)
                    {
                        int idsp = Int32.Parse(item.Split('#')[0]);
                        int soluong = Int32.Parse(item.Split('#')[1]);

                        var sptdhn = model.SanPhamThucDonHangNgay.Find(idsp);
                        if (sptdhn == null)
                        {
                            model.DonHangVuonRauMuaSamVaMenuHangNgay.Remove(donhang);
                            model.SaveChanges();
                            UpdateCart();
                            return Content("NOTEXIST");
                        }

                        if (sptdhn.conhang == false)
                        {
                            model.DonHangVuonRauMuaSamVaMenuHangNgay.Remove(donhang);
                            model.SaveChanges();
                            UpdateCart();
                            return Content("VUOTSOLUONG");
                        }

                        ChiTietDonHangSanPhamThucDonHangNgay dhSP = new ChiTietDonHangSanPhamThucDonHangNgay();
                        dhSP.id_donhangvuonraumuasamvamenuhangngay = idDH;
                        dhSP.id_sanphamthucdonhangngay = idsp;
                        dhSP.hinhanh = sptdhn.hinhanh;
                        dhSP.video = sptdhn.video;
                        dhSP.tensanpham = sptdhn.tensanpham;
                        dhSP.gia = sptdhn.gia;
                        dhSP.mota = sptdhn.mota;
                        dhSP.soluongmua = soluong;

                        lstSpDonHangTDHN.Add(dhSP);
                    }
                }

                if (lstSpDonHangMuaSam.Count > 0)
                {
                    model.ChiTietDonHangSanPhamMuaSam.AddRange(lstSpDonHangMuaSam);
                    model.SaveChanges();
                }

                if (lstSpDonHangVuonRau.Count > 0)
                {
                    model.ChiTietDonHangSanPhamRauNhaTrong.AddRange(lstSpDonHangVuonRau);
                    model.SaveChanges();
                }

                if (lstSpDonHangTDHN.Count > 0)
                {
                    model.ChiTietDonHangSanPhamThucDonHangNgay.AddRange(lstSpDonHangTDHN);
                    model.SaveChanges();
                }

                TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay ttdh = new TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay();
                ttdh.id_donhangvuonraumuasamvathucdonhangngay = idDH;
                ttdh.tieude = "Chờ duyệt";
                ttdh.noidung = "Đang đợi duyệt đơn hàng";
                ttdh.thoigian = DateTime.Now;
                model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Add(ttdh);
                model.SaveChanges();

                Session["giohang-muasam"] = null;
                Session["giohang-vuonrau"] = null;
                Session["giohang-thucdonhangngay"] = null;

                if (idtk != null)
                {
                    var giohangmuasamlst = model.GioHangMuaSam.Where(g => g.id_taikhoankhachhang == tkkh.id).ToList();
                    if (tkkh.GioHangMuaSam.Count > 0)
                        model.GioHangMuaSam.RemoveRange(giohangmuasamlst);

                    var giohangvuonraulst = model.GioHangVuonRauBean.Where(g => g.id_taikhoankhachhang == tkkh.id).ToList();
                    if (tkkh.GioHangVuonRauBean.Count > 0)
                        model.GioHangVuonRauBean.RemoveRange(giohangvuonraulst);

                    var giohangtdhnlst = model.GioHangThucDonHangNgay.Where(g => g.id_taikhoankhachhang == tkkh.id).ToList();
                    if (tkkh.GioHangThucDonHangNgay.Count > 0)
                        model.GioHangThucDonHangNgay.RemoveRange(giohangtdhnlst);

                    model.SaveChanges();
                }

                string bodyMail = string.Empty;
                using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoDonDatHang.html")))
                {
                    bodyMail = reader.ReadToEnd();
                }

                bodyMail = bodyMail.Replace("{HoVaTen}", hoten);
                bodyMail = bodyMail.Replace("{SoDienThoai}", sodienthoai);
                bodyMail = bodyMail.Replace("{MaDonHang}", madonhang);

                using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                {
                    mailMessage.Subject = "[BEANFAMILY] ĐƠN ĐẶT HÀNG MỚI";
                    mailMessage.IsBodyHtml = true;
                    mailMessage.Body = bodyMail;

                    using (SmtpClient smtp = new SmtpClient())
                    {
                        smtp.Host = "smtp.gmail.com";
                        smtp.EnableSsl = true;
                        NetworkCredential cred = new NetworkCredential("beanfamilyshop@gmail.com", "qwyxakxwvxtspdhr");
                        smtp.UseDefaultCredentials = true;
                        smtp.Credentials = cred;
                        smtp.Port = 587;

                        smtp.Send(mailMessage);
                    }
                }

                if (!string.IsNullOrEmpty(email))
                {

                    bodyMail = string.Empty;
                    using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoDonDatHangChoKhach.html")))
                    {
                        bodyMail = reader.ReadToEnd();
                    }

                    bodyMail = bodyMail.Replace("{MaDonHang}", madonhang);

                    using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", email))
                    {
                        mailMessage.Subject = "[BEANFAMILY] ĐẶT HÀNG THÀNH CÔNG";
                        mailMessage.IsBodyHtml = true;
                        mailMessage.Body = bodyMail;

                        using (SmtpClient smtp = new SmtpClient())
                        {
                            smtp.Host = "smtp.gmail.com";
                            smtp.EnableSsl = true;
                            NetworkCredential cred = new NetworkCredential("beanfamilyshop@gmail.com", "qwyxakxwvxtspdhr");
                            smtp.UseDefaultCredentials = true;
                            smtp.Credentials = cred;
                            smtp.Port = 587;

                            smtp.Send(mailMessage);
                        }
                    }
                }


                model = new BeanfamilyEntities();
                var donhangmuassam = donhang.ChiTietDonHangSanPhamMuaSam.ToList();
                var donhangvuonrau = donhang.ChiTietDonHangSanPhamRauNhaTrong.ToList();
                var donhangthucdonhangngay = donhang.ChiTietDonHangSanPhamThucDonHangNgay.ToList();

                decimal tongTien = donhangmuassam.Sum(s => s.gia * s.soluongmua)
                    + donhangvuonrau.Sum(s => s.soluongmua * s.gia)
                    + donhangthucdonhangngay.Sum(s => s.soluongmua * s.gia);

                string strTongTien = "";
                if (tongTien > 0) { strTongTien = tongTien.ToString("0,0") + " VNĐ"; }
                else { strTongTien = "0"; }

                string strUrl = HttpContext.Request.Url.AbsoluteUri.Replace(HttpContext.Request.Url.PathAndQuery, "/");
                string imgZalo = strUrl.Substring(0, strUrl.Length - 1) + Url.Content("~/API/Zalo/img/bannerDDH.png");
                string urlZalo = strUrl.Substring(0, strUrl.Length - 1) + Url.Content("~/admin/dondathang");
                var zaloApi = new SendMessageOrder();

                if (pttt.Equals("Thanh toán qua MOMO"))
                {
                    return Json(new
                    {
                        ReturnStatus = "redirect",
                        url = Url.Action("CreateMomoPayment", "DatHang"),
                        data = new
                        {
                            orderId = madonhang,
                            requestId = madonhang,
                            orderInfo = "Thanh toán đơn hàng: #" + madonhang,
                            amount = strTongTien.Replace(",", "").Replace(".", "").Replace(" VNĐ", "")
                        }
                    }, JsonRequestBehavior.AllowGet);
                }

                zaloApi.ThongBaoDonDatHang(ngaydathang.ToString("HH:mm dd/MM/yyyy"), madonhang, hoten, sodienthoai, thongtindiachi, pttt, strTongTien, imgZalo, urlZalo);

                return Json(new { ReturnStatus = "content", contents = "SUCCESS-" + madonhang }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                if (idTemp != 0)
                {
                    var spMuaSam = model.ChiTietDonHangSanPhamMuaSam.Where(w => w.id_donhangvuonraumuasamvamenuhangngay == idTemp).ToList();
                    if (spMuaSam.Count > 0)
                        model.ChiTietDonHangSanPhamMuaSam.RemoveRange(spMuaSam);

                    var spVuonRau = model.ChiTietDonHangSanPhamRauNhaTrong.Where(w => w.id_donhangvuonraumuasamvamenuhangngay == idTemp).ToList();
                    if (spVuonRau.Count > 0)
                        model.ChiTietDonHangSanPhamRauNhaTrong.RemoveRange(spVuonRau);

                    var spTDHN = model.ChiTietDonHangSanPhamThucDonHangNgay.Where(w => w.id_donhangvuonraumuasamvamenuhangngay == idTemp).ToList();
                    if (spTDHN.Count > 0)
                        model.ChiTietDonHangSanPhamThucDonHangNgay.RemoveRange(spTDHN);

                    var tinhtrangdonhang = model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.FirstOrDefault(t => t.id_donhangvuonraumuasamvathucdonhangngay == idTemp);
                    if (tinhtrangdonhang != null)
                        model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Remove(tinhtrangdonhang);

                    model.SaveChanges();
                    var dh = model.DonHangVuonRauMuaSamVaMenuHangNgay.Find(idTemp);
                    if (dh != null)
                        model.DonHangVuonRauMuaSamVaMenuHangNgay.Remove(dh);
                    model.SaveChanges();
                }

                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateMomoPayment(string orderId, string requestId, string orderInfo, string amount)
        {
            string rawHash = $"accessKey={MomoConfig.accessKey}&amount={amount}&extraData=&ipnUrl={MomoConfig.ipnUrl}" +
                 $"&orderId={orderId}&orderInfo=Thanh toán đơn hàng&partnerCode={MomoConfig.partnerCode}" +
                 $"&redirectUrl={MomoConfig.redirectUrl}&requestId={requestId}&requestType={MomoConfig.requestType}";

            string signature = ComputeHmacSha256(rawHash, MomoConfig.secretKey);

            var message = new
            {
                partnerCode = MomoConfig.partnerCode,
                accessKey = MomoConfig.accessKey,
                requestId = requestId,
                amount = amount,
                orderId = orderId,
                orderInfo = orderInfo,
                redirectUrl = MomoConfig.redirectUrl,
                ipnUrl = MomoConfig.ipnUrl,
                extraData = "",
                requestType = MomoConfig.requestType,
                signature = signature,
                lang = "vi"
            };

            using (var client = new HttpClient())
            {
                var content = new StringContent(JsonConvert.SerializeObject(message), Encoding.UTF8, "application/json");
                var response = await client.PostAsync(MomoConfig.endpoint, content);
                var responseString = await response.Content.ReadAsStringAsync();
                dynamic json = JsonConvert.DeserializeObject(responseString);

                //Lỗi chuyển hướng thanh toán momo
                if (string.IsNullOrEmpty((string)json.payUrl))
                {
                    //Gửi mail báo lỗi gì cho admin
                    using (MailMessage mailMessage = new MailMessage("info@aendy.net", "dv.tuan3010@gmail.com"))
                    {
                        mailMessage.Subject = "LỖI THANH TOÁN MOMO - [BEANFAMILY.VN]";
                        mailMessage.IsBodyHtml = true;
                        mailMessage.Body = responseString;
                        mailMessage.Priority = MailPriority.High;

                        using (SmtpClient smtp = new SmtpClient())
                        {
                            smtp.Host = "mail49.vietnix.vn";
                            smtp.EnableSsl = true;
                            NetworkCredential cred = new NetworkCredential("Info@aendy.net", "Aendy3010dvt.2kkk");
                            smtp.UseDefaultCredentials = true;
                            smtp.Credentials = cred;
                            smtp.Port = 587;

                            smtp.Send(mailMessage);
                        }
                    }
                    //Chuyển hướng thanh toán thành công như bình thường.
                    return View("ThanhToanThatBai", model.DonHangVuonRauMuaSamVaMenuHangNgay.FirstOrDefault(f => f.madonhang.Equals(orderId)));

                }

                return Redirect((string)json.payUrl);
            }
        }

        public ActionResult MomoPaymentResult()
        {
            // MoMo sẽ redirect về returnUrl với query string chứa các tham số
            string orderId = Request.QueryString["orderId"];
            string resultCode = Request.QueryString["resultCode"];

            // Kiểm tra resultCode
            // Thanh toán thành công
            if (resultCode == "0")
                return View("ThanhToanThanhCong", model.DonHangVuonRauMuaSamVaMenuHangNgay.FirstOrDefault(f => f.madonhang.Equals(orderId)));
            // Thanh toán thất bại hoặc bị hủy
            else
                return View("ThanhToanThatBai", model.DonHangVuonRauMuaSamVaMenuHangNgay.FirstOrDefault(f => f.madonhang.Equals(orderId)));
        }

        public ActionResult MomoPaymentNotify()
        {
            // Nhận dữ liệu MoMo gửi về
            string requestBody;
            using (var reader = new StreamReader(Request.InputStream, Encoding.UTF8))
                requestBody = reader.ReadToEnd();

            var data = JObject.Parse(requestBody);
            string resultCode = data["resultCode"]?.ToString();
            string orderId = data["orderId"]?.ToString();
            string message = data["message"]?.ToString();

            decimal momoAmount = 0;
            var amountToken = data["amount"];
            momoAmount = (amountToken != null
                && decimal.TryParse(amountToken.ToString(), out decimal parsedAmount))
                ? parsedAmount : 0; //Không lấy được từ momo thì lấy số tiền cần thanh toán trước đó

            try
            {
                string signature = data["signature"]?.ToString();
                string rawHash =
                        "accessKey=" + MomoConfig.accessKey +
                        "&amount=" + (data["amount"] ?? "") +
                        "&extraData=" + (data["extraData"] ?? "") +
                        "&message=" + (data["message"] ?? "") +
                        "&orderId=" + (data["orderId"] ?? "") +
                        "&orderInfo=" + (data["orderInfo"] ?? "") +
                        "&orderType=" + (data["orderType"] ?? "") +
                        "&partnerCode=" + (data["partnerCode"] ?? "") +
                        "&payType=" + (data["payType"] ?? "") +
                        "&requestId=" + (data["requestId"] ?? "") +
                        "&responseTime=" + (data["responseTime"] ?? "") +
                        "&resultCode=" + (data["resultCode"] ?? "") +
                        "&transId=" + (data["transId"] ?? "");

                // Verify chữ ký
                if (!VerifyMomoSignature(rawHash, signature))
                    return new HttpStatusCodeResult(403, "Invalid signature");

                var dh = model.DonHangVuonRauMuaSamVaMenuHangNgay.FirstOrDefault(f => f.madonhang.Equals(orderId));

                //Đơn hàng tồn tại thì điều chỉnh lại là đã thanh toán
                if (dh != null)
                {
                    if (resultCode == "0")
                    {
                        var donhangmuassam = dh.ChiTietDonHangSanPhamMuaSam.ToList();
                        var donhangvuonrau = dh.ChiTietDonHangSanPhamRauNhaTrong.ToList();
                        var donhangthucdonhangngay = dh.ChiTietDonHangSanPhamThucDonHangNgay.ToList();

                        decimal tongTien = donhangmuassam.Sum(s => s.gia * s.soluongmua)
                            + donhangvuonrau.Sum(s => s.soluongmua * s.gia)
                            + donhangthucdonhangngay.Sum(s => s.soluongmua * s.gia);

                        LichSuThanhToanDonHangTongHop lstt = new LichSuThanhToanDonHangTongHop();
                        lstt.madonhang = dh.madonhang;
                        lstt.id_donhangvuonraumuasamvamenuhangngay = dh.id;
                        lstt.id_taikhoanbean = 1;
                        lstt.sotien = tongTien;
                        lstt.thoigian = DateTime.Now;
                        lstt.tieude = "Thanh toán đơn đặt hàng " + "[" + dh.madonhang + "]";
                        lstt.noidung = dh.hoten + " | " + dh.dienthoai + " đã thanh toán cho đơn hàng [" + dh.madonhang + "]. Thực hiện bởi chính khách hàng";
                        lstt.tenkhachhang = dh.hoten;
                        lstt.sdtkhachhang = dh.dienthoai;

                        model.LichSuThanhToanDonHangTongHop.Add(lstt);
                        model.SaveChanges();
                    }
                }
                else
                {
                    if (resultCode == "0")
                    {
                        using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                        {
                            mailMessage.Subject = "[BEANFAMILY.VN] ĐƠN HÀNG ĐÃ ĐƯỢC THANH TOÁN NHƯNG KHÔNG TỒN TẠI";
                            mailMessage.IsBodyHtml = true;
                            mailMessage.Body = "Đơn hàng: <b>" + orderId + "</b> đã được thanh toán số tiền "
                                    + (momoAmount.ToString("0,0").Equals("00") ? "0" : momoAmount.ToString("0,0"))
                                    + "đ bởi khách hàng nhưng không tìm thấy dữ liệu đơn hàng trên hệ thống. " +
                                    "Vui lòng kiểm tra lại hoặc liên hệ bộ phận hỗ trợ website để tiến hành kiểm tra." +
                                    "<br><br>" +
                                    "Momo Messages: " + message;

                            using (SmtpClient smtp = new SmtpClient())
                            {
                                smtp.Host = "smtp.gmail.com";
                                smtp.EnableSsl = true;
                                NetworkCredential cred = new NetworkCredential("beanfamilyshop@gmail.com", "qwyxakxwvxtspdhr");
                                smtp.UseDefaultCredentials = true;
                                smtp.Credentials = cred;
                                smtp.Port = 587;

                                smtp.Send(mailMessage);
                            }
                        }
                    }
                }
            }
            catch (Exception Ex)
            {
                if (resultCode == "0")
                {
                    using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                    {
                        mailMessage.Subject = "[BEANFAMILY.VN] ĐƠN HÀNG ĐÃ ĐƯỢC THANH TOÁN NHƯNG KHÔNG TỒN TẠI";
                        mailMessage.IsBodyHtml = true;
                        mailMessage.Body = "Đơn hàng: <b>" + orderId + "</b> đã được thanh toán số tiền "
                                + (momoAmount.ToString("0,0").Equals("00") ? "0" : momoAmount.ToString("0,0"))
                                + "đ bởi khách hàng nhưng đã gặp lỗi về cập nhật trạng thái của đơn hàng. " +
                                "Vui lòng kiểm tra lại và cập nhật lại trang thái đơn hàng hoặc liên hệ bộ phận hỗ trợ website để tiến hành kiểm tra." +
                                "<br><br>" +
                                "Momo Messages: " + message +
                                "<br><br>" +
                                "System Messages: " + Ex.Message + (Ex.InnerException != null ? " - " + Ex.InnerException.Message : "");

                        using (SmtpClient smtp = new SmtpClient())
                        {
                            smtp.Host = "smtp.gmail.com";
                            smtp.EnableSsl = true;
                            NetworkCredential cred = new NetworkCredential("beanfamilyshop@gmail.com", "qwyxakxwvxtspdhr");
                            smtp.UseDefaultCredentials = true;
                            smtp.Credentials = cred;
                            smtp.Port = 587;

                            smtp.Send(mailMessage);
                        }
                    }
                }
            }

            // Xử lý thông báo từ Momo server
            return new HttpStatusCodeResult(200);
        }

        public bool VerifyMomoSignature(string rawHash, string signatureFromMomo)
        {
            string mySignature = ComputeHmacSha256(rawHash, MomoConfig.secretKey);
            return mySignature.Equals(signatureFromMomo, StringComparison.InvariantCultureIgnoreCase);
        }

        private string ComputeHmacSha256(string rawData, string key)
        {
            using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(key)))
            {
                byte[] hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }
    }
}