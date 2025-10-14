using System;
using System.Data;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using Microsoft.SqlServer.Server;
using PagedList;
using System.Net.Mail;
using System.Net;
using System.IO;
using Beanfamily.ZaloAPI;

namespace Beanfamily.Controllers
{
    public class MenuTiecBanController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: MenuTiecBan
        public ActionResult Index()
        {
            var lstSanPham = model.DanhMucMenuTiecBanCap1.Where(s => s.hienthi == true).OrderBy(o => o.tendanhmuc).ToList();
            return View("index", lstSanPham);
        }

        [HttpPost]
        public ActionResult DatBan(string lstId)
        {
            try
            {
                var LstIdPro = lstId.Split('-');
                List<SanPhamMenuTiecBan> lstSp = new List<SanPhamMenuTiecBan>();
                foreach (var item in LstIdPro)
                {
                    var pro = model.SanPhamMenuTiecBan.Find(Int32.Parse(item));
                    lstSp.Add(pro);
                }

                Session["lst-sanpham-datban-tiecban"] = lstSp;
                Session["lst-sanpham-datban-dmpv"] = model.DanhMucPhucVuMenuTiecBanVaMenuBuffet.Where(w => w.apdungmenutiecban == true).ToList();

                return PartialView("_DatBanModal", lstSp);
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }


        [HttpPost]
        public ActionResult GuiFormDatBan(int soban, string hovaten, string sodienthoai, string email, string ngaytochuc, string giotochuc, string ghichu, string idpv)
        {
            try
            {
                var ngaydathang = DateTime.Now;

                DonHangMenuTiecBan donhang = new DonHangMenuTiecBan();
                donhang.ngaytao = ngaydathang;
                donhang.soban = soban;
                donhang.hoten = hovaten;
                donhang.sdt = sodienthoai;
                donhang.email = email;

                var ngaystart = Convert.ToDateTime(ngaytochuc.ToString().Split('/')[2] + "-" + ngaytochuc.ToString().Split('/')[1] + "-" + ngaytochuc.ToString().Split('/')[0]);
                var currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                if ((ngaystart - currentDate).Days <= 0)
                    return Content("SMALLDATE");

                donhang.ngaybatdau = ngaystart;
                donhang.giobatdau = giotochuc;
                donhang.ghichukhachhang = ghichu;

                model.DonHangMenuTiecBan.Add(donhang);
                model.SaveChanges();

                int idDH = donhang.id;
                string madonhang = "MTB" + idDH + DateTime.Now.ToString("ddMMyyyy");

                donhang.madonhang = madonhang;
                model.Entry(donhang).State = System.Data.Entity.EntityState.Modified;
                model.SaveChanges();

                if (!string.IsNullOrEmpty(idpv))
                {
                    if (idpv.Length > 0)
                    {
                        var lstDmpv = Session["lst-sanpham-datban-dmpv"] as List<DanhMucPhucVuMenuTiecBanVaMenuBuffet>;
                        List<ChiTietDonHangDanhMucPhucVuMenuTiecBan> lstDmPvDH = new List<ChiTietDonHangDanhMucPhucVuMenuTiecBan>();
                        foreach (var item in idpv.Split('-').ToList())
                        {
                            var idPvs = Int32.Parse(item);
                            var dmpvm = lstDmpv.Find(f => f.id == idPvs);

                            if (dmpvm == null)
                                continue;

                            ChiTietDonHangDanhMucPhucVuMenuTiecBan dmPvDH = new ChiTietDonHangDanhMucPhucVuMenuTiecBan();
                            dmPvDH.id_donhangmenutiecban = idDH;
                            dmPvDH.id_danhmucphucvu = dmpvm.id;
                            dmPvDH.tendanhmuc = dmpvm.tendanhmuc;
                            dmPvDH.gia = dmpvm.gia;
                            dmPvDH.giatheosoban = dmpvm.giatheosoban;
                            dmPvDH.ngaytao = dmpvm.ngaytao;
                            dmPvDH.ngaysuadoi = dmpvm.ngaysuadoi;
                            dmPvDH.apdungmenutiecban = dmpvm.apdungmenutiecban;
                            dmPvDH.apdungmenubuffet = dmpvm.apdungmenubuffet;
                            lstDmPvDH.Add(dmPvDH);
                        }

                        if (lstDmPvDH.Count > 0)
                        {
                            model.ChiTietDonHangDanhMucPhucVuMenuTiecBan.AddRange(lstDmPvDH);
                            model.SaveChanges();
                        }
                    }
                }

                var lstSp = Session["lst-sanpham-datban-tiecban"] as List<SanPhamMenuTiecBan>;
                List<ChiTietDonHangSanPhamMenuTiecBan> lstDhSP = new List<ChiTietDonHangSanPhamMenuTiecBan>();
                foreach (var item in lstSp)
                {
                    ChiTietDonHangSanPhamMenuTiecBan dhSP = new ChiTietDonHangSanPhamMenuTiecBan();
                    dhSP.id_donhangmenutiecban = idDH;
                    dhSP.id_sanphammenutiecban = item.id;
                    dhSP.hinhanh = item.hinhanh;
                    dhSP.tensanpham = item.tensanpham;
                    dhSP.gia = item.gia;
                    lstDhSP.Add(dhSP);
                }
                if (lstDhSP.Count > 0)
                {
                    model.ChiTietDonHangSanPhamMenuTiecBan.AddRange(lstDhSP);
                    model.SaveChanges();
                }

                TinhTrangDonHangMenuTiecBan ttdh = new TinhTrangDonHangMenuTiecBan();
                ttdh.id_donhangmenutiecban = idDH;
                ttdh.tieude = "Chờ duyệt";
                ttdh.noidung = "Đang đợi duyệt đơn hàng";
                ttdh.thoigian = DateTime.Now;
                model.TinhTrangDonHangMenuTiecBan.Add(ttdh);
                model.SaveChanges();

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

                string strUrl = HttpContext.Request.Url.AbsoluteUri.Replace(HttpContext.Request.Url.PathAndQuery, "/");
                string imgZalo = strUrl.Substring(0, strUrl.Length - 1) + Url.Content("~/API/Zalo/img/bannerDDB.png");
                string urlZalo = strUrl.Substring(0, strUrl.Length - 1) + Url.Content("~/admin/dondatbantiec");
                var zaloApi = new SendMessageOrder();
                zaloApi.ThongBaoDonDatBan(ngaydathang.ToString("HH:mm dd/MM/yyyy"), madonhang, "TIỆC", soban.ToString(), hovaten, sodienthoai, giotochuc + " " + ngaytochuc, ghichu, imgZalo, urlZalo);
               
                return Content("SUCCESS-" + madonhang);
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
    }
}