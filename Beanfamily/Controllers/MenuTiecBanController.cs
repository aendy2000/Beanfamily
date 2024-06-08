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
        public ActionResult GuiFormDatBan(int soban, string hovaten, string sodienthoai, string email, string ngaytochuc, string giotochuc, string ghichu)
        {
            try
            {
                DonHangMenuTiecBan donhang = new DonHangMenuTiecBan();
                donhang.ngaytao = DateTime.Now;
                donhang.soban = soban;
                donhang.hoten = hovaten;
                donhang.sdt = sodienthoai;
                donhang.email = email;

                var ngaystart = Convert.ToDateTime(ngaytochuc.ToString().Split('/')[2] + "-" + ngaytochuc.ToString().Split('/')[1] + "-" + ngaytochuc.ToString().Split('/')[0]);
                var currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                if (ngaystart.CompareTo(currentDate) <= 0)
                    return Content("SMALLDATE");

                donhang.ngaybatdau = ngaystart;
                donhang.giobatdau = giotochuc;
                donhang.ghichukhachhang = ghichu;

                model.DonHangMenuTiecBan.Add(donhang);
                model.SaveChanges();

                int idDH = donhang.id;
                string madonhang = "MTB" + idDH + DateTime.Now.ToString("mmHHddMMyyyy");

                donhang.madonhang = madonhang;
                model.Entry(donhang).State = System.Data.Entity.EntityState.Modified;
                model.SaveChanges();

                var lstDmpv = Session["lst-sanpham-datban-dmpv"] as List<DanhMucPhucVuMenuTiecBanVaMenuBuffet>;
                List<DonHangDanhMucPhucVuMenuTiecBan> lstDmPvDH = new List<DonHangDanhMucPhucVuMenuTiecBan>();
                foreach (var item in lstDmpv)
                {
                    DonHangDanhMucPhucVuMenuTiecBan dmPvDH = new DonHangDanhMucPhucVuMenuTiecBan();
                    dmPvDH.id_donhangmenutiecban = idDH;
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
                    model.DonHangDanhMucPhucVuMenuTiecBan.AddRange(lstDmPvDH);
                    model.SaveChanges();
                }

                var lstSp = Session["lst-sanpham-datban-tiecban"] as List<SanPhamMenuTiecBan>;
                List<DonHangSanPhamMenuTiecBan> lstDhSP = new List<DonHangSanPhamMenuTiecBan>();
                foreach (var item in lstSp)
                {
                    DonHangSanPhamMenuTiecBan dhSP = new DonHangSanPhamMenuTiecBan();
                    dhSP.id_donhangmenutiecban = idDH;
                    dhSP.id_sanphammenutiecban = item.id;
                    dhSP.hinhanh = item.hinhanh;
                    dhSP.tensanpham = item.tensanpham;
                    dhSP.gia = item.gia;
                    lstDhSP.Add(dhSP);
                }
                if (lstDhSP.Count > 0)
                {
                    model.DonHangSanPhamMenuTiecBan.AddRange(lstDhSP);
                    model.SaveChanges();
                }

                LichSuDonHangMenuTiecBan lsdh = new LichSuDonHangMenuTiecBan();
                lsdh.id_donhangmenutiecban = idDH;
                lsdh.tieude = "Tạo Đơn Đặt Bàn";
                lsdh.noidung = hovaten + " - " + sodienthoai + " đã tạo đơn đặt bàn " + madonhang;
                lsdh.thoigian = DateTime.Now;
                model.LichSuDonHangMenuTiecBan.Add(lsdh);
                model.SaveChanges();

                TinhTrangDonHangMenuTiecBan ttdh = new TinhTrangDonHangMenuTiecBan();
                ttdh.id_donhangmenutiecban = idDH;
                ttdh.tieude = "Chờ duyệt";
                ttdh.noidung = "Đang đợi duyệt đơn hàng";
                ttdh.thoigian = DateTime.Now;
                model.TinhTrangDonHangMenuTiecBan.Add(ttdh);
                model.SaveChanges();

                string bodyMail = string.Empty;
                using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/index.html")))
                {
                    bodyMail = reader.ReadToEnd();
                }

                bodyMail = bodyMail.Replace("{HoVaTen}", hovaten);
                bodyMail = bodyMail.Replace("{SoDienThoai}", sodienthoai);
                bodyMail = bodyMail.Replace("{SoBan}", soban.ToString());
                bodyMail = bodyMail.Replace("{MaDonHang}", madonhang);
                bodyMail = bodyMail.Replace("{LoaiDon}", "Menu Tiệc Bàn");

                using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "dv.tuan3010@gmail.com"))
                {
                    mailMessage.Subject = "ĐƠN ĐẶT BÀN MENU TIỆC MỚI";
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

                return Content("SUCCESS-" + madonhang);
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
    }
}