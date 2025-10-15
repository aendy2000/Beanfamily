using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Beanfamily.Models;
using Beanfamily.Middlewall;
using System.Data.Entity.Core.Objects;
using System.IO;
using System.Net.Mail;
using System.Net;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class LienHeDatBanController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/LienHeDatBan
        public ActionResult Index()
        {
            Session["active-dashboard"] = "collapsed # # ";
            Session["active-mtb-dmc1"] = "collapsed # # ";
            Session["active-mtb-qlm"] = "collapsed # # ";
            Session["active-mb-dmc1"] = "collapsed # # ";
            Session["active-mb-qlm"] = "collapsed # # ";
            Session["active-dmpv"] = "collapsed # # ";
            Session["active-mhn-dmc1"] = "collapsed # # ";
            Session["active-mhn-qlm"] = "collapsed # # ";
            Session["active-vrb-dmc1"] = "collapsed # # ";
            Session["active-vrb-spr"] = "collapsed # # ";
            Session["active-vrb-qltc"] = "collapsed # # ";
            Session["active-chtl-dmc1"] = "collapsed # # ";
            Session["active-chtl-sp"] = "collapsed # # ";
            Session["active-tkb-pq"] = "collapsed # # ";
            Session["active-tkb-tk"] = "collapsed # # ";
            Session["active-ddh"] = "collapsed # # ";
            Session["active-ddbt"] = "collapsed # # ";
            Session["active-ddbb"] = "collapsed # # ";
            Session["active-hab"] = "collapsed # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # ";
            Session["active-ndt"] = "collapsed # # "; 
            Session["active-cs"] = "collapsed # # ";Session["active-spnb"] = "collapsed # # "; Session["active-ttsk"] = "collapsed # # ";
            Session["active-lhdb"] = " # # ";

            model = new BeanfamilyEntities(); var donhangTB = model.LienHeDatBan.ToList();
            int numTB = donhangTB.Where(w => w.id_donhangmenubuffet == null && w.id_donhangmenutiecban == null && !w.trangthai.Equals("cancel")).ToList().Count;

            Session["new-lienhedatban"] = numTB;

            if (Session["lhdb"] == null)
                return RedirectToAction("index", "dashboard");

            var dh = model.LienHeDatBan.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("lhdb"));
            if (chophepthemsuaxoa != null)
            {
                Session["chophep-them"] = chophepthemsuaxoa.chophepthem;
                Session["chophep-sua"] = chophepthemsuaxoa.chophepsua;
                Session["chophep-xoa"] = chophepthemsuaxoa.chophepxoa;
            }
            else
            {
                return RedirectToAction("index", "dashboard");
            }

            return View("Index", dh.OrderByDescending(o => o.id).ToList());
        }

        [HttpPost]
        public ActionResult BoQuaLienHe(int id)
        {
            try
            {
                var dm = model.LienHeDatBan.Find(id);
                if (dm == null)
                    return Content("KHONGTONTAI");

                dm.trangthai = "cancel";
                dm.id_donhangmenubuffet = null;
                dm.id_donhangmenutiecban = null;

                model.Entry(dm).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult BoQuaHangLoat(string lstId)
        {
            try
            {
                if (lstId.IndexOf("-") != -1)
                {
                    foreach (var item in lstId.Split('-'))
                    {
                        int id = Int32.Parse(item);
                        var dm = model.LienHeDatBan.Find(id);
                        dm.trangthai = "cancel";
                        dm.id_donhangmenubuffet = null;
                        dm.id_donhangmenutiecban = null;

                        model.Entry(dm).State = EntityState.Modified;
                        model.SaveChanges();
                    }
                }
                else
                {
                    int id = Int32.Parse(lstId);
                    var dm = model.LienHeDatBan.Find(id);
                    dm.trangthai = "cancel";
                    dm.id_donhangmenubuffet = null;
                    dm.id_donhangmenutiecban = null;

                    model.Entry(dm).State = EntityState.Modified;
                    model.SaveChanges();
                }

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult OpenTaoDonTiecBan(int id)
        {
            try
            {
                return PartialView("_OpenTaoDonTiecBan", id);
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SubmitTaoDonTiecBan(int id, int soban, string hovaten, string sodienthoai, string email, string ngaytochuc, string giotochuc, string ghichu, string lstMonAn, string lstDv)
        {
            try
            {
                var donhang = new DonHangMenuTiecBan();

                donhang.soban = soban;
                donhang.hoten = hovaten;
                donhang.sdt = sodienthoai;
                donhang.email = email;

                var ngaystart = Convert.ToDateTime(ngaytochuc);
                var currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                if ((ngaystart - currentDate).Days < 0)
                    return Content("SMALLDATE");

                donhang.ngaybatdau = ngaystart;
                donhang.giobatdau = giotochuc;
                donhang.ghichukhachhang = ghichu;
                donhang.ngaytao = DateTime.Now;

                model.DonHangMenuTiecBan.Add(donhang);
                model.SaveChanges();

                int idDh = donhang.id;
                string madonhang = "MTB" + idDh + DateTime.Now.ToString("ddMMyyyy");
                donhang.madonhang = madonhang;
                model.Entry(donhang).State = EntityState.Modified;
                model.SaveChanges();

                var lh = model.LienHeDatBan.Find(id);
                lh.trangthai = "active";
                lh.id_donhangmenutiecban = idDh;
                lh.id_donhangmenubuffet = null;
                model.Entry(lh).State = EntityState.Modified;
                model.SaveChanges();

                List<ChiTietDonHangSanPhamMenuTiecBan> lstDhSP = new List<ChiTietDonHangSanPhamMenuTiecBan>();
                foreach (var item in lstMonAn.Split('-').ToList())
                {
                    int idSP = Int32.Parse(item);
                    var sp = model.SanPhamMenuTiecBan.Find(idSP);
                    ChiTietDonHangSanPhamMenuTiecBan dhSP = new ChiTietDonHangSanPhamMenuTiecBan();
                    dhSP.id_donhangmenutiecban = idDh;
                    dhSP.id_sanphammenutiecban = idSP;
                    dhSP.hinhanh = sp.hinhanh;
                    dhSP.tensanpham = sp.tensanpham;
                    dhSP.gia = sp.gia;

                    lstDhSP.Add(dhSP);
                }
                if (lstDhSP.Count > 0)
                {
                    model.ChiTietDonHangSanPhamMenuTiecBan.AddRange(lstDhSP);
                    model.SaveChanges();
                }

                TinhTrangDonHangMenuTiecBan ttdh = new TinhTrangDonHangMenuTiecBan();
                ttdh.id_donhangmenutiecban = idDh;
                ttdh.tieude = "Chờ duyệt";
                ttdh.noidung = "Đang đợi duyệt đơn hàng";
                ttdh.thoigian = DateTime.Now;
                model.TinhTrangDonHangMenuTiecBan.Add(ttdh);
                model.SaveChanges();

                if (!string.IsNullOrEmpty(lstDv))
                {
                    List<ChiTietDonHangDanhMucPhucVuMenuTiecBan> lstDhDv = new List<ChiTietDonHangDanhMucPhucVuMenuTiecBan>();
                    foreach (var item in lstDv.Split('-').ToList())
                    {
                        int idSP = Int32.Parse(item);
                        var sp = model.DanhMucPhucVuMenuTiecBanVaMenuBuffet.Find(idSP);
                        ChiTietDonHangDanhMucPhucVuMenuTiecBan dhSP = new ChiTietDonHangDanhMucPhucVuMenuTiecBan();
                        dhSP.id_donhangmenutiecban = idDh;
                        dhSP.id_danhmucphucvu = sp.id;
                        dhSP.tendanhmuc = sp.tendanhmuc;
                        dhSP.gia = sp.gia;
                        dhSP.giatheosoban = sp.giatheosoban;
                        dhSP.ngaytao = sp.ngaytao;
                        dhSP.ngaysuadoi = sp.ngaysuadoi;
                        dhSP.apdungmenutiecban = sp.apdungmenutiecban;
                        dhSP.apdungmenubuffet = sp.apdungmenubuffet;

                        lstDhDv.Add(dhSP);
                    }
                    if (lstDhDv.Count > 0)
                    {
                        model.ChiTietDonHangDanhMucPhucVuMenuTiecBan.AddRange(lstDhDv);
                        model.SaveChanges();
                    }
                }

                string bodyMail = string.Empty;
                using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoDonDatBan.html")))
                {
                    bodyMail = reader.ReadToEnd();
                }

                bodyMail = bodyMail.Replace("{TitleMenu}", "TIỆC");
                bodyMail = bodyMail.Replace("{HoVaTen}", hovaten);
                bodyMail = bodyMail.Replace("{SoDienThoai}", sodienthoai);
                bodyMail = bodyMail.Replace("{SoBan}", soban.ToString());
                bodyMail = bodyMail.Replace("{MaDonHang}", madonhang);
                bodyMail = bodyMail.Replace("{LoaiDon}", "Tiệc");

                using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                {
                    if (string.IsNullOrEmpty(email))
                        mailMessage.To.Add(email);
                    mailMessage.Subject = "[BEANFAMILY] ĐƠN ĐẶT BÀN TIỆC MỚI";
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
                    using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoDonDatBanChoKhach.html")))
                    {
                        bodyMail = reader.ReadToEnd();
                    }

                    bodyMail = bodyMail.Replace("{TitleMenu}", "TIỆC");
                    bodyMail = bodyMail.Replace("{SoBan}", soban.ToString());
                    bodyMail = bodyMail.Replace("{MaDonHang}", madonhang);
                    bodyMail = bodyMail.Replace("{LoaiDon}", "Tiệc");

                    using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", email))
                    {
                        mailMessage.Subject = "[BEANFAMILY] ĐẶT BÀN TIỆC THÀNH CÔNG";
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

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult OpenTaoDonBuffet(int id)
        {
            try
            {
                return PartialView("_OpenTaoDonBuffet", id);
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SubmitTaoDonBuffet(int id, int soban, string hovaten, string sodienthoai, string email, string ngaytochuc, string giotochuc, string ghichu, string lstMonAn, string lstDv)
        {
            try
            {
                var donhang = new DonHangMenuBuffet();

                donhang.soban = soban;
                donhang.hoten = hovaten;
                donhang.sdt = sodienthoai;
                donhang.email = email;

                var ngaystart = Convert.ToDateTime(ngaytochuc);
                var currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                if ((ngaystart - currentDate).Days < 0)
                    return Content("SMALLDATE");

                donhang.ngaybatdau = ngaystart;
                donhang.giobatdau = giotochuc;
                donhang.ghichukhachhang = ghichu;
                donhang.ngaytao = DateTime.Now;

                model.DonHangMenuBuffet.Add(donhang);
                model.SaveChanges();

                int idDh = donhang.id;
                string madonhang = "MBF" + idDh + DateTime.Now.ToString("ddMMyyyy");
                donhang.madonhang = madonhang;
                model.Entry(donhang).State = EntityState.Modified;
                model.SaveChanges();

                var lh = model.LienHeDatBan.Find(id);
                lh.trangthai = "active";
                lh.id_donhangmenutiecban = null;
                lh.id_donhangmenubuffet = idDh;
                model.Entry(lh).State = EntityState.Modified;
                model.SaveChanges();

                List<ChiTietDonHangSanPhamMenuBuffet> lstDhSP = new List<ChiTietDonHangSanPhamMenuBuffet>();
                foreach (var item in lstMonAn.Split('-').ToList())
                {
                    int idSP = Int32.Parse(item);
                    var sp = model.SanPhamMenuTiecBan.Find(idSP);
                    ChiTietDonHangSanPhamMenuBuffet dhSP = new ChiTietDonHangSanPhamMenuBuffet();
                    dhSP.id_donhangmenubuffet = idDh;
                    dhSP.id_sanphammenubuffet = idSP;
                    dhSP.hinhanh = sp.hinhanh;
                    dhSP.tensanpham = sp.tensanpham;

                    lstDhSP.Add(dhSP);
                }
                if (lstDhSP.Count > 0)
                {
                    model.ChiTietDonHangSanPhamMenuBuffet.AddRange(lstDhSP);
                    model.SaveChanges();
                }

                TinhTrangDonHangMenuBuffet ttdh = new TinhTrangDonHangMenuBuffet();
                ttdh.id_donhangmenubuffet = idDh;
                ttdh.tieude = "Chờ duyệt";
                ttdh.noidung = "Đang đợi duyệt đơn hàng";
                ttdh.thoigian = DateTime.Now;
                model.TinhTrangDonHangMenuBuffet.Add(ttdh);
                model.SaveChanges();

                if (!string.IsNullOrEmpty(lstDv))
                {
                    List<ChiTietDonHangDanhMucPhucVuMenuBuffet> lstDhDv = new List<ChiTietDonHangDanhMucPhucVuMenuBuffet>();
                    foreach (var item in lstDv.Split('-').ToList())
                    {
                        int idSP = Int32.Parse(item);
                        var sp = model.DanhMucPhucVuMenuTiecBanVaMenuBuffet.Find(idSP);
                        ChiTietDonHangDanhMucPhucVuMenuBuffet dhSP = new ChiTietDonHangDanhMucPhucVuMenuBuffet();
                        dhSP.id_donhangmenubuffet = idDh;
                        dhSP.id_danhmucphucvu = sp.id;
                        dhSP.tendanhmuc = sp.tendanhmuc;
                        dhSP.gia = sp.gia;
                        dhSP.giatheosoban = sp.giatheosoban;
                        dhSP.ngaytao = sp.ngaytao;
                        dhSP.ngaysuadoi = sp.ngaysuadoi;
                        dhSP.apdungmenutiecban = sp.apdungmenutiecban;
                        dhSP.apdungmenubuffet = sp.apdungmenubuffet;

                        lstDhDv.Add(dhSP);
                    }
                    if (lstDhDv.Count > 0)
                    {
                        model.ChiTietDonHangDanhMucPhucVuMenuBuffet.AddRange(lstDhDv);
                        model.SaveChanges();
                    }
                }

                string bodyMail = string.Empty;
                using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoDonDatBan.html")))
                {
                    bodyMail = reader.ReadToEnd();
                }

                bodyMail = bodyMail.Replace("{TitleMenu}", "BUFFET");
                bodyMail = bodyMail.Replace("{HoVaTen}", hovaten);
                bodyMail = bodyMail.Replace("{SoDienThoai}", sodienthoai);
                bodyMail = bodyMail.Replace("{SoBan}", soban.ToString());
                bodyMail = bodyMail.Replace("{MaDonHang}", madonhang);
                bodyMail = bodyMail.Replace("{LoaiDon}", "Buffet");

                using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                {
                    mailMessage.Subject = "[BEANFAMILY] ĐƠN ĐẶT BÀN BUFFET MỚI";
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
                    using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoDonDatBanChoKhach.html")))
                    {
                        bodyMail = reader.ReadToEnd();
                    }

                    bodyMail = bodyMail.Replace("{TitleMenu}", "BUFFET");
                    bodyMail = bodyMail.Replace("{SoBan}", soban.ToString());
                    bodyMail = bodyMail.Replace("{MaDonHang}", madonhang);
                    bodyMail = bodyMail.Replace("{LoaiDon}", "Buffet");

                    using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", email))
                    {
                        mailMessage.Subject = "[BEANFAMILY] ĐẶT BÀN BUFFET THÀNH CÔNG";
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

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
    }
}