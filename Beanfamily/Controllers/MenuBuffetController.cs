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
using System.Web.Services.Description;
using System.Xml.Linq;
using System.IO;

namespace Beanfamily.Controllers
{
    public class MenuBuffetController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: MenuBuffet
        public ActionResult Index()
        {
            var lstSanPham = model.DanhMucMenuBuffetCap1.Where(s => s.hienthi == true).OrderBy(o => o.tendanhmuc).ToList();
            return View("index", lstSanPham);
        }

        [HttpPost]
        public ActionResult DatBan(string lstId)
        {
            try
            {
                var LstIdPro = lstId.Split('-');
                List<SanPhamMenuBuffet> lstSp = new List<SanPhamMenuBuffet>();
                foreach (var item in LstIdPro)
                {
                    var pro = model.SanPhamMenuBuffet.Find(Int32.Parse(item));
                    lstSp.Add(pro);
                }

                Session["lst-sanpham-datban-buffet"] = lstSp;
                Session["lst-sanpham-datban-buffet-dmpv"] = model.DanhMucPhucVuMenuTiecBanVaMenuBuffet.Where(w => w.apdungmenubuffet == true).ToList();

                return PartialView("_DatBanModal", lstSp);
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult GuiFormDatBan(int soban, string hovaten, string sodienthoai, string email, string ngaytochuc, string giotochuc, string ghichu)
        {
            try
            {
                DonHangMenuBuffet donhang = new DonHangMenuBuffet();
                donhang.ngaytao = DateTime.Now;
                donhang.soban = soban;
                donhang.hoten = hovaten;
                donhang.sdt = sodienthoai;
                donhang.email = email;
                donhang.giamon = 0;

                var ngaystart = Convert.ToDateTime(ngaytochuc.ToString().Split('/')[2] + "-" + ngaytochuc.ToString().Split('/')[1] + "-" + ngaytochuc.ToString().Split('/')[0]);
                var currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                if (ngaystart.CompareTo(currentDate) <= 0)
                    return Content("SMALLDATE");

                donhang.ngaybatdau = ngaystart;
                donhang.giobatdau = giotochuc;
                donhang.ghichukhachhang = ghichu;

                model.DonHangMenuBuffet.Add(donhang);
                model.SaveChanges();

                int idDH = donhang.id;
                string madonhang = "MBF" + idDH + DateTime.Now.ToString("mmHHddMMyyyy");

                donhang.madonhang = madonhang;
                model.Entry(donhang).State = System.Data.Entity.EntityState.Modified;
                model.SaveChanges();

                var lstDmpv = Session["lst-sanpham-datban-buffet-dmpv"] as List<DanhMucPhucVuMenuTiecBanVaMenuBuffet>;
                List<DonHangDanhMucPhucVuMenuBuffet> lstDmPvDH = new List<DonHangDanhMucPhucVuMenuBuffet>();
                foreach (var item in lstDmpv)
                {
                    DonHangDanhMucPhucVuMenuBuffet dmPvDH = new DonHangDanhMucPhucVuMenuBuffet();
                    dmPvDH.id_donhangmenubuffet = idDH;
                    dmPvDH.id_danhmucphucvu = item.id;
                    dmPvDH.tendanhmuc = item.tendanhmuc;
                    dmPvDH.gia = item.gia;
                    dmPvDH.giatheosoban = item.giatheosoban;
                    dmPvDH.ngaytao = item.ngaytao;
                    dmPvDH.ngaysuadoi = item.ngaysuadoi;
                    dmPvDH.apdungmenutiecban = item.apdungmenutiecban;
                    dmPvDH.apdungmenubuffet = item.apdungmenubuffet;
                    lstDmPvDH.Add(dmPvDH);
                }
                if (lstDmPvDH.Count > 0)
                {
                    model.DonHangDanhMucPhucVuMenuBuffet.AddRange(lstDmPvDH);
                    model.SaveChanges();
                }

                var lstSp = Session["lst-sanpham-datban-buffet"] as List<SanPhamMenuBuffet>;
                List<DonHangSanPhamMenuBuffet> lstDhSP = new List<DonHangSanPhamMenuBuffet>();
                foreach (var item in lstSp)
                {
                    DonHangSanPhamMenuBuffet dhSP = new DonHangSanPhamMenuBuffet();
                    dhSP.id_donhangmenubuffet = idDH;
                    dhSP.id_sanphammenubuffet = item.id;
                    dhSP.hinhanh = item.hinhanh;
                    dhSP.tensanpham = item.tensanpham;
                    lstDhSP.Add(dhSP);
                }
                if (lstDhSP.Count > 0)
                {
                    model.DonHangSanPhamMenuBuffet.AddRange(lstDhSP);
                    model.SaveChanges();
                }

                LichSuDonHangMenuBuffet lsdh = new LichSuDonHangMenuBuffet();
                lsdh.id_donhangmenubuffet = idDH;
                lsdh.tieude = "Tạo Đơn Đặt Bàn";
                lsdh.noidung = hovaten + " - " + sodienthoai + " đã tạo đơn đặt bàn " + madonhang;
                lsdh.thoigian = DateTime.Now;
                model.LichSuDonHangMenuBuffet.Add(lsdh);
                model.SaveChanges();

                TinhTrangDonHangMenuBuffet ttdh = new TinhTrangDonHangMenuBuffet();
                ttdh.id_donhangmenubuffet = idDH;
                ttdh.tieude = "Chờ duyệt";
                ttdh.noidung = "Đang đợi duyệt đơn hàng";
                ttdh.thoigian = DateTime.Now;
                model.TinhTrangDonHangMenuBuffet.Add(ttdh);
                model.SaveChanges();

                string bodyMail = string.Empty;
                using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/index.html")))
                {
                    bodyMail = reader.ReadToEnd();
                }

                bodyMail = bodyMail.Replace("{TitleMenu}", "MENU BUFFET");
                bodyMail = bodyMail.Replace("{HoVaTen}", hovaten);
                bodyMail = bodyMail.Replace("{SoDienThoai}", sodienthoai);
                bodyMail = bodyMail.Replace("{SoBan}", soban.ToString());
                bodyMail = bodyMail.Replace("{MaDonHang}", madonhang); 
                bodyMail = bodyMail.Replace("{LoaiDon}", "Menu Buffet");

                using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                {
                    mailMessage.Subject = "[BEANFAMILY] ĐƠN ĐẶT BÀN MENU BUFFET MỚI";
                    mailMessage.IsBodyHtml = true;
                    //mailMessage.Body = "<b>" + hovaten + " | " + sodienthoai + "</b> đã đặt " + soban + " bàn Menu Buffet.<br/><br/>Mã đơn: <b>" + madonhang + "</b>.<br/><br/>Hãy nhanh chóng liên hệ lại với <b>" + hovaten + "</b> để xác nhận đơn đặt bàn!";
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

                return Content("SUCCESS-" + madonhang);
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
    }
}