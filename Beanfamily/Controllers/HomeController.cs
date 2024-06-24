using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using System.Data.Entity;
using PagedList;
using System.Web.Helpers;
using System.IO;
using System.Net.Mail;
using System.Net;
using System.Web.Razor.Parser.SyntaxTree;

namespace Beanfamily.Controllers
{
    public class HomeController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        public ActionResult Index()
        {
            Session["sanphammoi-nhahang"] = model.SanPhamThucDonHangNgay.OrderByDescending(o => o.id).Take(3).ToList();
            Session["sanphammoi-vuonrau"] = model.SanPhamRauNhaTrong.OrderByDescending(o => o.id).Take(3).ToList();
            Session["sanphammoi-muasam"] = model.SanPhamMuaSam.OrderByDescending(o => o.id).Take(3).ToList();

            Session["sanphamnoibat-nhahang"] = model.SanPhamThucDonHangNgay.OrderByDescending(o => o.luotxem).Take(3).ToList();
            Session["sanphamnoibat-vuonrau"] = model.SanPhamRauNhaTrong.OrderByDescending(o => o.luotxem).Take(3).ToList();
            Session["sanphamnoibat-muasam"] = model.SanPhamMuaSam.OrderByDescending(o => o.luotxem).Take(3).ToList();

            return View("index");
        }

        public ActionResult About()
        {
            return View("about");
        }

        public ActionResult Restaurant()
        {
            return RedirectToAction("index", "nhahangbean");
        }

        public ActionResult Garden(int? pageNum, int? pageSize)
        {
            return RedirectToAction("index", "vuonrau");
        }
        public ActionResult Shopping(int? pageNum, int? pageSize)
        {
            return RedirectToAction("index", "muasam");
        }

        [HttpPost]
        public ActionResult DangNhap(string sodienthoai, string matkhau)
        {
            try
            {
                var taikhoan = model.TaiKhoanKhachHang.FirstOrDefault(t => t.sodienthoai.Equals(sodienthoai) && t.password.Equals(matkhau));
                if (taikhoan == null)
                {
                    return Content("INVALID");
                }
                else
                {
                    if (taikhoan.taikhoankhoa == true)
                    {
                        return Content("LOCKED");
                    }
                    else
                    {
                        taikhoan.dangnhaplancuoi = DateTime.Now;
                        model.Entry(taikhoan).State = EntityState.Modified;
                        model.SaveChanges();

                        int idtk = taikhoan.id;
                        if (taikhoan.GioHangThucDonHangNgay.Count < 1 && taikhoan.GioHangMuaSam.Count < 1 && taikhoan.GioHangVuonRauBean.Count < 1)
                        {
                            var giohangmuasam = Session["giohang-muasam"] as List<string>;
                            if (giohangmuasam != null)
                            {
                                foreach (var item in giohangmuasam)
                                {
                                    int idsp = Int32.Parse(item.Split('#')[0]);
                                    int idloai = Int32.Parse(item.Split('#')[1]);
                                    int soluong = Int32.Parse(item.Split('#')[2]);

                                    int tonKhoConLai = model.TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == idloai).soluong;
                                    Session["soluongmax-muasam-" + idsp + "-" + idloai] = null;
                                    Session["tonkhoconlai-muasam-" + idsp + "-" + idloai] = tonKhoConLai;

                                    GioHangMuaSam ghmuasam = new GioHangMuaSam();
                                    ghmuasam.id_sanpham = idsp;
                                    ghmuasam.id_loaitonkho = idloai;
                                    ghmuasam.id_taikhoankhachhang = idtk;
                                    ghmuasam.soluong = soluong > tonKhoConLai ? tonKhoConLai : soluong;
                                    ghmuasam.addDate = DateTime.Now;

                                    model.GioHangMuaSam.Add(ghmuasam);
                                    model.SaveChanges();
                                }
                            }

                            var giohangthucdonhangngay = Session["giohang-thucdonhangngay"] as List<string>;
                            if (giohangthucdonhangngay != null)
                            {
                                foreach (var item in giohangthucdonhangngay)
                                {
                                    int idsp = Int32.Parse(item.Split('#')[0]);
                                    int soluong = Int32.Parse(item.Split('#')[1]);

                                    GioHangThucDonHangNgay ghtdhn = new GioHangThucDonHangNgay();
                                    ghtdhn.id_sanpham = idsp;
                                    ghtdhn.id_taikhoankhachhang = idtk;
                                    ghtdhn.soluong = soluong > 100 ? 100 : soluong;
                                    ghtdhn.addDate = DateTime.Now;

                                    model.GioHangThucDonHangNgay.Add(ghtdhn);
                                    model.SaveChanges();
                                }
                            }

                            var giohangvuonrau = Session["giohang-vuonrau"] as List<string>;
                            if (giohangvuonrau != null)
                            {
                                foreach (var item in giohangvuonrau)
                                {
                                    int idsp = Int32.Parse(item.Split('#')[0]);
                                    int soluong = Int32.Parse(item.Split('#')[1]);

                                    int tonKhoConLai = model.SanPhamRauNhaTrong.FirstOrDefault(t => t.id == idsp).giatritrendonvi;
                                    Session["soluongmax-vuonrau-" + idsp] = null;
                                    Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;

                                    GioHangVuonRauBean ghvr = new GioHangVuonRauBean();
                                    ghvr.id_sanpham = idsp;
                                    ghvr.id_taikhoankhachhang = idtk;
                                    ghvr.soluong = soluong > tonKhoConLai ? tonKhoConLai : soluong;
                                    ghvr.addDate = DateTime.Now;

                                    model.GioHangVuonRauBean.Add(ghvr);
                                    model.SaveChanges();
                                }
                            }
                        }
                        else
                        {
                            var giohangmuasams = new List<string>();
                            foreach (var item in taikhoan.GioHangMuaSam.ToList())
                            {
                                int tonKhoConLai = model.TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == item.id_loaitonkho).soluong;
                                Session["soluongmax-muasam-" + item.id_sanpham + "-" + item.id_loaitonkho] = null;
                                Session["tonkhoconlai-muasam-" + item.id_sanpham + "-" + item.id_loaitonkho] = tonKhoConLai;
                                int soluong = item.soluong;
                                giohangmuasams.Add(item.id_sanpham + "#" + item.id_loaitonkho + "#" + (soluong > tonKhoConLai ? tonKhoConLai : soluong));
                            }
                            Session["giohang-muasam"] = giohangmuasams;

                            var giohangthucdonhangngays = new List<string>();
                            foreach (var item in taikhoan.GioHangThucDonHangNgay.ToList())
                            {
                                int soluong = item.soluong;
                                giohangthucdonhangngays.Add(item.id_sanpham + "#" + (soluong > 100 ? 100 : soluong));
                            }
                            Session["giohang-thucdonhangngay"] = giohangthucdonhangngays;

                            var giohangvuonraus = new List<string>();
                            foreach (var item in taikhoan.GioHangVuonRauBean.ToList())
                            {
                                int tonKhoConLai = model.SanPhamRauNhaTrong.FirstOrDefault(t => t.id == item.id_sanpham).giatritrendonvi;
                                Session["soluongmax-vuonrau-" + item.id_sanpham] = null;
                                Session["tonkhoconlai-vuonrau-" + item.id_sanpham] = tonKhoConLai;
                                int soluong = item.soluong;
                                giohangvuonraus.Add(item.id_sanpham + "#" + (soluong > tonKhoConLai ? tonKhoConLai : soluong));
                            }
                            Session["giohang-vuonrau"] = giohangvuonraus;
                        }

                        Session["user-data"] = taikhoan;
                        Session["user-dangnhap"] = true;
                        return PartialView("_addCart");
                    }
                }
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        public ActionResult DangXuat()
        {
            try
            {
                Session["user-dangnhap"] = null;

                Session["giohang-muasam"] = null;
                Session["giohang-thucdonhangngay"] = null;
                Session["giohang-vuonrau"] = null;
                Session["user-data"] = null;

                return PartialView("_addCart");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult DangKy(string sodienthoai, string matkhau, string email, string hoten)
        {
            try
            {
                var checkMail = model.TaiKhoanKhachHang.FirstOrDefault(e => e.email.ToLower().Equals(email.ToLower()));
                if (checkMail != null)
                    return Content("EMAILEXIST");

                var checkPhone = model.TaiKhoanKhachHang.FirstOrDefault(e => e.sodienthoai.ToLower().Equals(sodienthoai.ToLower()));
                if (checkMail != null)
                    return Content("SDTEXIST");

                var taikhoan = new TaiKhoanKhachHang();
                taikhoan.hovaten = hoten;
                taikhoan.sodienthoai = sodienthoai;
                taikhoan.email = email;
                taikhoan.password = matkhau;
                taikhoan.ngaytao = DateTime.Now;
                taikhoan.dangnhaplancuoi = DateTime.Now;
                taikhoan.taikhoankhoa = false;

                model.TaiKhoanKhachHang.Add(taikhoan);
                model.SaveChanges();

                int idtk = taikhoan.id;

                var giohangmuasam = Session["giohang-muasam"] as List<string>;
                if (giohangmuasam != null)
                {
                    foreach (var item in giohangmuasam)
                    {
                        int idsp = Int32.Parse(item.Split('#')[0]);
                        int idloai = Int32.Parse(item.Split('#')[1]);
                        int soluong = Int32.Parse(item.Split('#')[2]);

                        int tonKhoConLai = model.TonKhoSanPhamMuaSam.FirstOrDefault(t => t.id == idloai).soluong;
                        Session["soluongmax-muasam-" + idsp + "-" + idloai] = null;
                        Session["tonkhoconlai-muasam-" + idsp + "-" + idloai] = tonKhoConLai;

                        GioHangMuaSam ghmuasam = new GioHangMuaSam();
                        ghmuasam.id_sanpham = idsp;
                        ghmuasam.id_loaitonkho = idloai;
                        ghmuasam.id_taikhoankhachhang = idtk;
                        ghmuasam.soluong = soluong > tonKhoConLai ? tonKhoConLai : soluong;
                        ghmuasam.addDate = DateTime.Now;

                        model.GioHangMuaSam.Add(ghmuasam);
                        model.SaveChanges();
                    }
                }

                var giohangthucdonhangngay = Session["giohang-thucdonhangngay"] as List<string>;
                if (giohangthucdonhangngay != null)
                {
                    foreach (var item in giohangthucdonhangngay)
                    {
                        int idsp = Int32.Parse(item.Split('#')[0]);
                        int soluong = Int32.Parse(item.Split('#')[1]);

                        GioHangThucDonHangNgay ghtdhn = new GioHangThucDonHangNgay();
                        ghtdhn.id_sanpham = idsp;
                        ghtdhn.id_taikhoankhachhang = idtk;
                        ghtdhn.soluong = soluong > 100 ? 100 : soluong;
                        ghtdhn.addDate = DateTime.Now;

                        model.GioHangThucDonHangNgay.Add(ghtdhn);
                        model.SaveChanges();
                    }
                }

                var giohangvuonrau = Session["giohang-vuonrau"] as List<string>;
                if (giohangvuonrau != null)
                {
                    foreach (var item in giohangvuonrau)
                    {
                        int idsp = Int32.Parse(item.Split('#')[0]);
                        int soluong = Int32.Parse(item.Split('#')[1]);

                        int tonKhoConLai = model.SanPhamRauNhaTrong.FirstOrDefault(t => t.id == idsp).giatritrendonvi;
                        Session["soluongmax-vuonrau-" + idsp] = null;
                        Session["tonkhoconlai-vuonrau-" + idsp] = tonKhoConLai;

                        GioHangVuonRauBean ghvr = new GioHangVuonRauBean();
                        ghvr.id_sanpham = idsp;
                        ghvr.id_taikhoankhachhang = idtk;
                        ghvr.soluong = soluong > tonKhoConLai ? tonKhoConLai : soluong;
                        ghvr.addDate = DateTime.Now;

                        model.GioHangVuonRauBean.Add(ghvr);
                        model.SaveChanges();
                    }
                }

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult LayMaQuenMatKhau(string email)
        {
            try
            {
                var tk = model.TaiKhoanKhachHang.FirstOrDefault(t => t.email.ToLower().Equals(email.ToLower().Trim()));

                if (tk == null)
                    return Content("INVALID");

                Random generator = new Random();
                String ma = generator.Next(0, 1000000).ToString("D6");
                var thoihanma = DateTime.Now.AddMinutes(10);

                tk.maxacnhan = ma;
                tk.thoihanma = thoihanma;
                model.Entry(tk).State = EntityState.Modified;
                model.SaveChanges();

                Session["email-xacnhan"] = email;

                string bodyMail = string.Empty;
                using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/MailGuiMaXacNhan.html")))
                {
                    bodyMail = reader.ReadToEnd();
                }

                bodyMail = bodyMail.Replace("{MaKhoiPhuc}", ma);
                bodyMail = bodyMail.Replace("{ThoiHanMa}", thoihanma.ToString("HH:mm:ss") + " ngày " + thoihanma.ToString("dd/MM/yyyy"));

                using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", email))
                {
                    mailMessage.Subject = "[BEANFAMILY] MÃ KHÔI PHỤC TÀI KHOẢN";
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

                return PartialView("_NhapMaXacNhan");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult GuiMaQuenMatKhau(string ma, string email)
        {
            try
            {
                var tk = model.TaiKhoanKhachHang.FirstOrDefault(t => t.email.ToLower().Equals(email.ToLower().Trim()));

                if (tk == null)
                    return Content("NOTEXIST");

                var curma = tk.maxacnhan;
                if (!curma.Equals(ma))
                {
                    if (tk.thoihanma.Value.Subtract(DateTime.Now).TotalMinutes <= 0)
                    {
                        tk.maxacnhan = null;
                        tk.thoihanma = null;
                        model.Entry(tk).State = EntityState.Modified;
                        model.SaveChanges();

                        return Content("TIMEOUT");
                    }
                    else
                    {
                        return Content("INVALID");
                    }
                }
                return PartialView("_DatLaiMatKhau");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        public ActionResult GuiLaiMaXacNhan()
        {
            try
            {
                string email = Session["email-xacnhan"].ToString();
                var tk = model.TaiKhoanKhachHang.FirstOrDefault(t => t.email.ToLower().Equals(email.ToLower().Trim()));

                if (tk == null)
                    return Content("INVALID");

                if (tk.thoihanma.Value != null)
                {
                    if (tk.thoihanma.Value.Subtract(DateTime.Now).TotalMinutes <= 7)
                    {
                        Random generator = new Random();
                        String ma = generator.Next(0, 1000000).ToString("D6");
                        tk.maxacnhan = ma;
                        tk.thoihanma = DateTime.Now.AddMinutes(10);
                        model.Entry(tk).State = EntityState.Modified;
                        model.SaveChanges();

                        return Content("SUCCESS");
                    }
                    else
                    {
                        return Content("WAIT");
                    }
                }
                else
                {
                    Random generator = new Random();
                    String ma = generator.Next(0, 1000000).ToString("D6");
                    tk.maxacnhan = ma;
                    tk.thoihanma = DateTime.Now.AddMinutes(10);
                    model.Entry(tk).State = EntityState.Modified;
                    model.SaveChanges();

                    return Content("SUCCESS");
                }
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult DatLaiMatKhau(string pass, string email)
        {
            try
            {
                var tk = model.TaiKhoanKhachHang.FirstOrDefault(t => t.email.ToLower().Equals(email.ToLower()));
                if (tk == null)
                    return Content("INVALID");

                tk.password = pass;
                tk.maxacnhan = null;
                tk.thoihanma = null;
                model.Entry(tk).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
        [HttpPost]
        public ActionResult UpdateInfo(int id, string hoten, string sodienthoai, string email, string ngaysinh, string gioitinh, string diachi)
        {
            try
            {
                var tk = model.TaiKhoanKhachHang.Find(id);
                if (tk == null)
                    return Content("NOTEXIST");

                tk.hovaten = hoten;
                tk.sodienthoai = sodienthoai;
                tk.email = email;
                tk.ngaysinh = ngaysinh;
                tk.gioitinh = gioitinh;
                tk.diachi = diachi;

                model.Entry(tk).State = EntityState.Modified;
                model.SaveChanges();

                Session["user-data"] = tk;

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
        [HttpPost]
        public ActionResult UpdatePass(int id, string matkhaucu, string matkhaumoi)
        {
            try
            {
                var tk = model.TaiKhoanKhachHang.Find(id);
                if (tk == null)
                    return Content("NOTEXIST");

                if (!tk.password.Equals(matkhaucu))
                    return Content("INVALID");

                tk.password = matkhaumoi;

                model.Entry(tk).State = EntityState.Modified;
                model.SaveChanges();

                Session["user-data"] = tk;

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        public ActionResult TraCuuDonHang(int? pageNum, int? pageSize, string id)
        {
            if (pageSize == null)
                pageSize = 10;
            if (pageNum == null)
                pageNum = 1;

            if(!string.IsNullOrEmpty(id))
            {
                var tkkh = Session["user-data"] as TaiKhoanKhachHang;
                if (tkkh == null)
                    return View("tracuudonhang",  model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(d => d.madonhang.ToLower().Equals(id.ToLower())).ToList().OrderByDescending(o => o.id).ToPagedList((int)pageNum, (int)pageSize));
                else
                    return View("tracuudonhang", model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(d => d.id_taikhoankhkachhang == tkkh.id && d.madonhang.ToLower().Equals(id.ToLower())).ToList().OrderByDescending(o => o.id).ToPagedList((int)pageNum, (int)pageSize));
            }
            else
            {
                var tkkh = Session["user-data"] as TaiKhoanKhachHang;
                if (tkkh == null)
                    return View("tracuudonhang", new List<DonHangVuonRauMuaSamVaMenuHangNgay>().ToPagedList((int)pageNum, (int)pageSize));
                else
                    return View("tracuudonhang", model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(d => d.id_taikhoankhkachhang == tkkh.id).ToList().OrderByDescending(o => o.id).ToPagedList((int)pageNum, (int)pageSize));
            }
            
        }

        [HttpPost]
        public ActionResult TimKiemDonHang(int? pageNum, int? pageSize, string content)
        {
            if (pageSize == null)
                pageSize = 10;
            if (pageNum == null)
                pageNum = 1;

            if (string.IsNullOrEmpty(content))
            {
                var tkkh = Session["user-data"] as TaiKhoanKhachHang;
                if (tkkh == null)
                    return PartialView("_timkiemdonhang", new List<DonHangVuonRauMuaSamVaMenuHangNgay>().ToPagedList((int)pageNum, (int)pageSize));
                else
                    return PartialView("_timkiemdonhang", model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(d => d.id_taikhoankhkachhang == tkkh.id).ToList().ToPagedList((int)pageNum, (int)pageSize));
            }
            else
            {
                var tkkh = Session["user-data"] as TaiKhoanKhachHang;
                if (tkkh == null)
                    return PartialView("_timkiemdonhang", model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(d => d.madonhang.ToLower().Equals(content.ToLower())).ToList().ToPagedList((int)pageNum, (int)pageSize));
                else
                    return PartialView("_timkiemdonhang", model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(d => d.id_taikhoankhkachhang == tkkh.id && d.madonhang.ToLower().Contains(content.ToLower())).ToList().ToPagedList((int)pageNum, (int)pageSize));
            }
        }

        [HttpPost]
        public ActionResult XemChiTietDonHang(int id)
        {
            try
            {
                var dh = model.DonHangVuonRauMuaSamVaMenuHangNgay.Find(id);
                if (dh == null)
                    return Content("NOTEXIST");

                return PartialView("_ChiTietDonHang", dh);
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }

        }

        [HttpPost]
        public ActionResult HuyDonHang(int id)
        {
            try
            {
                var dh = model.DonHangVuonRauMuaSamVaMenuHangNgay.Find(id);
                if (dh == null)
                    return Content("NOTEXIST");

                var ttdh = model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.FirstOrDefault(t => t.id_donhangvuonraumuasamvathucdonhangngay == dh.id);
                ttdh.tieude = "Đã hủy";
                ttdh.noidung = "Đơn hàng được hủy bởi người mua";
                ttdh.thoigian = DateTime.Now;
                model.Entry(ttdh).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }

        }
    }
}