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
    public class DonDatBanBuffetController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/DonDatBanBuffet
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
            Session["active-ddbb"] = " # # "; 
            Session["active-lhdb"] = "collapsed # # ";
            Session["active-hab"] = "collapsed # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # "; Session["active-ndt"] = "collapsed # # ";

            model = new BeanfamilyEntities(); var donhangTB = model.DonHangMenuBuffet.ToList();
            var donhangBF = model.DonHangMenuBuffet.ToList();
            int numBF = donhangBF.Count;
            foreach (var item in donhangBF.Where(w => w.TinhTrangDonHangMenuBuffet.Where(ws => ws.tieude == "Hoàn thành").Count() > 0).ToList())
            {
                if (item.LichSuThanhToanDonHangTongHop.Count() > 0)
                {
                    numBF--;
                }
            }
            Session["new-dondatbanbuffet"] = numBF;

            if (Session["ddbb"] == null)
                return RedirectToAction("index", "dashboard");

            var dh = model.DonHangMenuBuffet.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("ddbb"));
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

            return View("Index", dh);
        }

        [HttpPost]
        public ActionResult LocDonHang(string filter)
        {
            try
            {
                model = new BeanfamilyEntities();
                var donhangBF = model.DonHangMenuBuffet.ToList();
                int numBF = donhangBF.Count;
                foreach (var item in donhangBF.Where(w => w.TinhTrangDonHangMenuBuffet.Where(ws => ws.tieude == "Hoàn thành").Count() > 0).ToList())
                {
                    if (item.LichSuThanhToanDonHangTongHop.Count() > 0)
                    {
                        numBF--;
                    }
                }
                Session["new-dondatbanbuffet"] = numBF;

                var currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));

                if (filter.Equals("all"))
                {
                    var donhang = model.DonHangMenuBuffet.ToList();
                    return PartialView("_LocDonHang", donhang);
                }
                else if (filter.Equals("choduyet"))
                {
                    var donhang = model.DonHangMenuBuffet.Where(d => d.TinhTrangDonHangMenuBuffet.Where(w => w.tieude.Equals("Chờ duyệt")).Count() > 0).ToList();
                    return PartialView("_LocDonHang", donhang);
                }
                else if (filter.Equals("dangdienra"))
                {
                    var donhang = model.DonHangMenuBuffet.Where(d => d.ngaybatdau == currentDate
                    && d.TinhTrangDonHangMenuBuffet.Where(w => w.tieude.Equals("Đã xác nhận")).Count() > 0).ToList();
                    return PartialView("_LocDonHang", donhang);
                }
                else if (filter.Equals("sapdienra"))
                {
                    var donhang = model.DonHangMenuBuffet.Where(d => d.ngaybatdau > currentDate
                    && d.TinhTrangDonHangMenuBuffet.Where(w => w.tieude.Equals("Đã xác nhận")).Count() > 0).ToList();
                    return PartialView("_LocDonHang", donhang);
                }
                else if (filter.Equals("quahan"))
                {
                    var donhang = model.DonHangMenuBuffet.Where(d => d.ngaybatdau < currentDate
                    && d.TinhTrangDonHangMenuBuffet.Where(w => w.tieude.Equals("Đã xác nhận")).Count() > 0).ToList();
                    return PartialView("_LocDonHang", donhang);
                }
                else if (filter.Equals("chuathanhtoan"))
                {
                    var donhang = model.DonHangMenuBuffet.Where(w => w.TinhTrangDonHangMenuBuffet.Where(ws => ws.tieude == "Hoàn thành").Count() > 0).ToList();
                    var lstDonHang = new List<DonHangMenuBuffet>();
                    foreach (var item in donhang)
                    {
                        if (item.LichSuThanhToanDonHangTongHop.Sum(s => s.sotien)
                            < (item.giamon
                            + item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == true).Sum(s => s.gia * item.soban)
                            + item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == false).Sum(s => s.gia)))
                        {
                            lstDonHang.Add(item);
                        }
                    }
                    return PartialView("_LocDonHang", lstDonHang);
                }
                else if (filter.Equals("dahuy"))
                {
                    var donhang = model.DonHangMenuBuffet.Where(d => d.TinhTrangDonHangMenuBuffet.Where(w => w.tieude.Equals("Đã hủy")).Count() > 0).ToList();
                    return PartialView("_LocDonHang", donhang);
                }
                else
                {
                    var donhang = model.DonHangMenuBuffet.Where(w => w.TinhTrangDonHangMenuBuffet.Where(ws => ws.tieude == "Hoàn thành").Count() > 0).ToList();
                    var lstDonHang = new List<DonHangMenuBuffet>();
                    foreach (var item in donhang)
                    {
                        if (item.LichSuThanhToanDonHangTongHop.Sum(s => s.sotien)
                            >= (item.giamon
                            + item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == true).Sum(s => s.gia * item.soban)
                            + item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == false).Sum(s => s.gia)))
                        {
                            lstDonHang.Add(item);
                        }
                    }
                    return PartialView("_LocDonHang", lstDonHang);
                }
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult HuyDonHangLoat(string lstId)
        {
            try
            {
                foreach (var item in lstId.Split('-').ToList())
                {
                    int id = Convert.ToInt32(item);

                    var ttdh = model.TinhTrangDonHangMenuBuffet.FirstOrDefault(d => d.id_donhangmenubuffet == id);
                    if (ttdh != null)
                    {
                        ttdh.id_taikhoanbean = Int32.Parse(Session["user-id"].ToString());
                        ttdh.tieude = "Đã hủy";
                        ttdh.noidung = "Đã hủy bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                        ttdh.thoigian = DateTime.Now;
                        model.Entry(ttdh).State = EntityState.Modified;
                        model.SaveChanges();

                        string bodyMail = string.Empty;
                        using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoHuyDonDatBan.html")))
                        {
                            bodyMail = reader.ReadToEnd();
                        }

                        bodyMail = bodyMail.Replace("{TitleMenu}", "BUFFET");
                        bodyMail = bodyMail.Replace("{LoaiDon}", "Buffet");
                        bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                        bodyMail = bodyMail.Replace("{SoDienThoai}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                        bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);

                        using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                        {
                            //if (string.IsNullOrEmpty(email))
                            //    mailMessage.To.Add(email);
                            mailMessage.Subject = "[BEANFAMILY] ĐƠN ĐẶT BÀN BUFFET ĐÃ ĐƯỢC HỦY";
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

                        if (!string.IsNullOrEmpty(ttdh.DonHangMenuBuffet.email))
                        {
                            bodyMail = string.Empty;
                            using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoHuyDonDatBanChoKhach.html")))
                            {
                                bodyMail = reader.ReadToEnd();
                            }

                            bodyMail = bodyMail.Replace("{TitleMenu}", "BUFFET");
                            bodyMail = bodyMail.Replace("{LoaiDon}", "Buffet");
                            bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);

                            using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", ttdh.DonHangMenuBuffet.email))
                            {
                                mailMessage.Subject = "[BEANFAMILY] ĐƠN ĐẶT BÀN BUFFET ĐÃ ĐƯỢC HỦY";
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
                    }
                }

                model = new BeanfamilyEntities();
                var donhangBF = model.DonHangMenuBuffet.ToList();
                int numBF = donhangBF.Count;
                foreach (var item in donhangBF.Where(w => w.TinhTrangDonHangMenuBuffet.Where(ws => ws.tieude == "Hoàn thành").Count() > 0).ToList())
                {
                    if (item.LichSuThanhToanDonHangTongHop.Count() > 0)
                    {
                        numBF--;
                    }
                }
                Session["new-dondatbanbuffet"] = numBF;

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult HuyDon(int id)
        {
            try
            {
                var ttdh = model.TinhTrangDonHangMenuBuffet.FirstOrDefault(d => d.id_donhangmenubuffet == id);
                if (ttdh == null)
                    return Content("NOTEXIST");

                ttdh.id_taikhoanbean = Int32.Parse(Session["user-id"].ToString());
                ttdh.tieude = "Đã hủy";
                ttdh.noidung = "Đã hủy bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                ttdh.thoigian = DateTime.Now;
                model.Entry(ttdh).State = EntityState.Modified;
                model.SaveChanges();

                model = new BeanfamilyEntities();
                var donhangBF = model.DonHangMenuBuffet.ToList();
                int numBF = donhangBF.Count;
                foreach (var item in donhangBF.Where(w => w.TinhTrangDonHangMenuBuffet.Where(ws => ws.tieude == "Hoàn thành").Count() > 0).ToList())
                {
                    if (item.LichSuThanhToanDonHangTongHop.Count() > 0)
                    {
                        numBF--;
                    }
                }
                Session["new-dondatbanbuffet"] = numBF;

                string bodyMail = string.Empty;
                using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoHuyDonDatBan.html")))
                {
                    bodyMail = reader.ReadToEnd();
                }

                bodyMail = bodyMail.Replace("{TitleMenu}", "BUFFET");
                bodyMail = bodyMail.Replace("{LoaiDon}", "Buffet");
                bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                bodyMail = bodyMail.Replace("{SoDienThoai}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);

                using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                {
                    //if (string.IsNullOrEmpty(email))
                    //    mailMessage.To.Add(email);
                    mailMessage.Subject = "[BEANFAMILY] ĐƠN ĐẶT BÀN BUFFET ĐÃ ĐƯỢC HỦY";
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

                if (!string.IsNullOrEmpty(ttdh.DonHangMenuBuffet.email))
                {
                    bodyMail = string.Empty;
                    using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoHuyDonDatBanChoKhach.html")))
                    {
                        bodyMail = reader.ReadToEnd();
                    }

                    bodyMail = bodyMail.Replace("{TitleMenu}", "BUFFET");
                    bodyMail = bodyMail.Replace("{LoaiDon}", "Buffet");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);

                    using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", ttdh.DonHangMenuBuffet.email))
                    {
                        mailMessage.Subject = "[BEANFAMILY] ĐƠN ĐẶT BÀN BUFFET ĐÃ ĐƯỢC HỦY";
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
        public ActionResult CapNhatDonHang(int id)
        {
            try
            {
                var dh = model.DonHangMenuBuffet.Find(id);
                if (dh == null)
                    return Content("NOTEXIST");

                return PartialView("_CapNhatDonHang", dh);
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SubmitCapNhatDonHang(int id, string trangthai, string ghichu)
        {
            try
            {
                var dh = model.DonHangMenuBuffet.Find(id);
                if (dh == null)
                    return Content("NOTEXIST");

                dh.ghichuquantrivien = ghichu;
                model.Entry(dh).State = EntityState.Modified;
                model.SaveChanges();

                var ttdh = dh.TinhTrangDonHangMenuBuffet.FirstOrDefault(t => t.id_donhangmenubuffet == id);
                string trangthaihientại = ttdh.tieude;
                if (ttdh == null)
                {
                    TinhTrangDonHangMenuBuffet ttdhnew = new TinhTrangDonHangMenuBuffet();
                    ttdhnew.id_donhangmenubuffet = id;
                    ttdhnew.id_taikhoanbean = Int32.Parse(Session["user-id"].ToString());

                    if (trangthai.Equals("choduyet"))
                    {
                        ttdhnew.tieude = "Chờ duyệt";
                        ttdhnew.noidung = "Cập nhật thành [Chờ duyệt] bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("xacnhan"))
                    {
                        ttdhnew.tieude = "Đã xác nhận";
                        ttdhnew.noidung = "Đã được Xác nhận bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("lenmon"))
                    {
                        ttdhnew.tieude = "Đã lên món";
                        ttdhnew.noidung = "Đã bắt đầu Lên món bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("huydon"))
                    {
                        ttdhnew.tieude = "Đã hủy";
                        ttdhnew.noidung = "Đã hủy bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else
                    {
                        ttdhnew.tieude = "Hoàn thành";
                        ttdhnew.noidung = "Xác nhận đã hoàn thành bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    ttdhnew.thoigian = DateTime.Now;
                    model.TinhTrangDonHangMenuBuffet.Add(ttdhnew);
                    model.SaveChanges();
                }
                else
                {
                    ttdh.id_taikhoanbean = Int32.Parse(Session["user-id"].ToString());

                    if (trangthai.Equals("choduyet"))
                    {
                        ttdh.tieude = "Chờ duyệt";
                        ttdh.noidung = "Cập nhật thành [Chờ duyệt] bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("xacnhan"))
                    {
                        ttdh.tieude = "Đã xác nhận";
                        ttdh.noidung = "Đã được Xác nhận bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("lenmon"))
                    {
                        ttdh.tieude = "Đã lên món";
                        ttdh.noidung = "Đã bắt đầu Lên món bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("huydon"))
                    {
                        ttdh.tieude = "Đã hủy";
                        ttdh.noidung = "Đã hủy bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else
                    {
                        ttdh.tieude = "Hoàn thành";
                        ttdh.noidung = "Xác nhận đã hoàn thành bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    ttdh.thoigian = DateTime.Now;
                    model.Entry(ttdh).State = EntityState.Modified;
                    model.SaveChanges();
                }

                model = new BeanfamilyEntities();
                var donhangTB = model.DonHangMenuBuffet.ToList();
                int numTB = donhangTB.Count;
                foreach (var item in donhangTB.Where(w => w.TinhTrangDonHangMenuBuffet.Where(ws => ws.tieude == "Hoàn thành").Count() > 0).ToList())
                {
                    if (item.LichSuThanhToanDonHangTongHop.Sum(s => s.sotien)
                        >= (item.giamon
                        + item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == true).Sum(s => s.gia * item.soban)
                        + item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == false).Sum(s => s.gia)))
                    {
                        numTB--;
                    }
                }
                Session["new-dondatbantiec"] = numTB;

                string bodyMail = string.Empty;
                using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoTrangThaiDonDatBan.html")))
                {
                    bodyMail = reader.ReadToEnd();
                }

                if (trangthai.Equals("choduyet"))
                {
                    if (trangthaihientại.Equals("Chờ duyệt"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "BUFFET ĐÃ ĐƯỢC CẬP NHẬT");
                    bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                    bodyMail = bodyMail.Replace("{MaNhanVien}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                    bodyMail = bodyMail.Replace("{Content}", "đã đặt trạng thái đơn đặt bàn thành <b>Chờ duyệt</b>");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);
                }
                else if (trangthai.Equals("xacnhan"))
                {
                    if (trangthaihientại.Equals("Đã xác nhận"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "BUFFET ĐÃ ĐƯỢC XÁC NHẬN");
                    bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                    bodyMail = bodyMail.Replace("{MaNhanVien}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                    bodyMail = bodyMail.Replace("{Content}", "đã <b>Xác nhận</b> đơn đặt bàn");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);
                }
                else if (trangthai.Equals("lenmon"))
                {
                    return Content("SUCCESS");
                }
                else if (trangthai.Equals("huydon"))
                {
                    if (trangthaihientại.Equals("Đã hủy"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "BUFFET ĐÃ ĐƯỢC HỦY");
                    bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                    bodyMail = bodyMail.Replace("{MaNhanVien}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                    bodyMail = bodyMail.Replace("{Content}", "đã hủy đơn đặt bàn");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);
                }
                else
                {
                    if (trangthaihientại.Equals("Hoàn thành"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "BUFFET ĐÃ HOÀN THÀNH");
                    bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                    bodyMail = bodyMail.Replace("{MaNhanVien}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                    bodyMail = bodyMail.Replace("{Content}", "đã xác nhận hoàn thành và kết thúc bữa tiệc");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);
                }

                using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                {
                    //if (string.IsNullOrEmpty(email))
                    //    mailMessage.To.Add(email);
                    mailMessage.Subject = "[BEANFAMILY] ĐƠN ĐẶT BÀN BUFFET ĐÃ ĐƯỢC CẬP NHẬT";
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

                if (!string.IsNullOrEmpty(ttdh.DonHangMenuBuffet.email))
                {

                    bodyMail = string.Empty;
                    using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoTrangThaiDonDatBanChoKhach.html")))
                    {
                        bodyMail = reader.ReadToEnd();
                    }

                    if (trangthai.Equals("choduyet"))
                    {
                        if (trangthaihientại.Equals("Chờ duyệt"))
                            return Content("SUCCESS");

                        bodyMail = bodyMail.Replace("{TitleDonHang}", "BUFFET ĐÃ ĐƯỢC CẬP NHẬT");
                        bodyMail = bodyMail.Replace("{Content}", "Trạng thái đơn đặt bàn của bạn đã được đặt thành <b>Chờ duyệt</b>");
                        bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);
                    }
                    else if (trangthai.Equals("xacnhan"))
                    {
                        if (trangthaihientại.Equals("Đã xác nhận"))
                            return Content("SUCCESS");

                        bodyMail = bodyMail.Replace("{TitleDonHang}", "BUFFET ĐÃ ĐƯỢC XÁC NHẬN");
                        bodyMail = bodyMail.Replace("{Content}", "Đơn đặt bàn của bạn đã được <b>Xác nhận</b>");
                        bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);
                    }
                    else if (trangthai.Equals("lenmon"))
                    {
                        return Content("SUCCESS");
                    }
                    else if (trangthai.Equals("huydon"))
                    {
                        if (trangthaihientại.Equals("Đã hủy"))
                            return Content("SUCCESS");

                        bodyMail = bodyMail.Replace("{TitleDonHang}", "BUFFET ĐÃ ĐƯỢC HỦY");
                        bodyMail = bodyMail.Replace("{Content}", "Đơn hàng của bạn đã được <b>Hủy</b>");
                        bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);
                    }
                    else
                    {
                        if (trangthaihientại.Equals("Hoàn thành"))
                            return Content("SUCCESS");

                        bodyMail = bodyMail.Replace("{TitleDonHang}", "BUFFET ĐÃ KẾT THÚC");
                        bodyMail = bodyMail.Replace("{Content}", "Bữa tiệc của bạn đã kết thúc<br><br>Cảm ơn bạn đã luôn tin dùng sản phẩm và dịch vụ tại beanfamily.vn");
                        bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);
                    }
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangMenuBuffet.madonhang);

                    using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", ttdh.DonHangMenuBuffet.email))
                    {
                        mailMessage.Subject = "[BEANFAMILY] CẬP NHẬT ĐƠN ĐẶT BÀN BUFFET";
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
        public ActionResult ThanhToan(int id)
        {
            try
            {
                var dh = model.DonHangMenuBuffet.Find(id);
                if (dh == null)
                    return Content("NOTEXIST");

                return PartialView("_ThanhToan", dh);
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SubmitThanhToan(int id, string loai, string sotien, string ghichu)
        {
            try
            {
                var dh = model.DonHangMenuBuffet.Find(id);
                if (dh == null)
                    return Content("NOTEXIST");

                LichSuThanhToanDonHangTongHop lstt = new LichSuThanhToanDonHangTongHop();

                if (loai.Equals("thu"))
                {
                    lstt.madonhang = dh.madonhang;
                    lstt.id_donhangmenubuffet = id;
                    lstt.id_taikhoanbean = Int32.Parse(Session["user-id"].ToString());
                    lstt.sotien = Convert.ToDecimal(sotien.Replace(",", ""));
                    lstt.thoigian = DateTime.Now;
                    lstt.tieude = "Thanh toán đơn đặt bàn tiệc " + "[" + dh.madonhang + "]";
                    lstt.noidung = ghichu;
                    lstt.tenkhachhang = dh.hoten;
                    lstt.sdtkhachhang = dh.sdt;

                    model.LichSuThanhToanDonHangTongHop.Add(lstt);
                    model.SaveChanges();

                    string bodyMail = string.Empty;
                    using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoThanhToan.html")))
                    {
                        bodyMail = reader.ReadToEnd();
                    }

                    bodyMail = bodyMail.Replace("{TieuDeChinh}", "HÓA ĐƠN THANH TOÁN BÀN BUFFET");
                    bodyMail = bodyMail.Replace("{NoiDungChinh}", "Mã đơn: <strong>" + dh.madonhang + "</strong><br>" +
                                                                    "Số tiền: <strong>" + sotien + "đ</strong><br>" +
                                                                    "Ngày GD: <strong>" + DateTime.Now + "</strong><br>" +
                                                                    "Nội dung: <strong>" + ghichu + "</strong><br>" +
                                                                    "Bởi NV: <strong>" + Session["user-fullname"].ToString() + "</strong> | <strong>" +
                                                                    "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6") + "</strong><br><br>");

                    using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                    {
                        //if (string.IsNullOrEmpty(email))
                        //    mailMessage.To.Add(email);
                        mailMessage.Subject = "[BEANFAMILY] GIAO DỊCH THANH TOÁN";
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

                    if (!string.IsNullOrEmpty(dh.email))
                    {

                        bodyMail = string.Empty;
                        using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoThanhToanChoKhach.html")))
                        {
                            bodyMail = reader.ReadToEnd();
                        }

                        bodyMail = bodyMail.Replace("{TieuDeChinh}", "HÓA ĐƠN THANH TOÁN BÀN BUFFET");
                        bodyMail = bodyMail.Replace("{NoiDungChinh}", "Mã đơn: <strong>" + dh.madonhang + "</strong><br>" +
                                                                        "Số tiền: <strong>" + sotien + "đ</strong><br>" +
                                                                        "Ngày GD: <strong>" + DateTime.Now + "</strong><br>" +
                                                                        "Nội dung: <strong>" + ghichu + "</strong><br>" +
                                                                        "Bởi NV: <strong>" + Session["user-fullname"].ToString() + "</strong> | <strong>" +
                                                                        "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6") + "</strong><br><br>" +
                                                                        "Cảm ơn bạn đã luôn tin dùng sản phẩm và dịch vụ tại beanfamily.vn");


                        using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", dh.email))
                        {
                            mailMessage.Subject = "[BEANFAMILY] GIAO DỊCH THANH TOÁN";
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
                }
                else
                {
                    lstt.madonhang = dh.madonhang;
                    lstt.id_donhangmenubuffet = id;
                    lstt.id_taikhoanbean = Int32.Parse(Session["user-id"].ToString());
                    lstt.sotien = Convert.ToDecimal("-" + sotien.Replace(",", ""));
                    lstt.thoigian = DateTime.Now;
                    lstt.tieude = "Hoàn trả cho đơn đặt bàn tiệc " + "[" + dh.madonhang + "]. Thực hiện bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    lstt.noidung = ghichu;
                    lstt.tenkhachhang = dh.hoten;
                    lstt.sdtkhachhang = dh.sdt;

                    model.LichSuThanhToanDonHangTongHop.Add(lstt);
                    model.SaveChanges();

                    string bodyMail = string.Empty;
                    using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoThanhToan.html")))
                    {
                        bodyMail = reader.ReadToEnd();
                    }

                    bodyMail = bodyMail.Replace("{TieuDeChinh}", "HÓA ĐƠN HOÀN TRẢ DỊCH VỤ BÀN BUFFET");
                    bodyMail = bodyMail.Replace("{NoiDungChinh}", "Mã đơn: <strong>" + dh.madonhang + "</strong><br>" +
                                                                    "Số tiền: <strong>" + sotien + "đ</strong><br>" +
                                                                    "Ngày GD: <strong>" + DateTime.Now + "</strong><br>" +
                                                                    "Nội dung: <strong>" + ghichu + "</strong><br>" +
                                                                    "Bởi NV: <strong>" + Session["user-fullname"].ToString() + "</strong> | <strong>" +
                                                                    "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6") + "</strong><br><br>");

                    using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                    {
                        //if (string.IsNullOrEmpty(email))
                        //    mailMessage.To.Add(email);
                        mailMessage.Subject = "[BEANFAMILY] GIAO DỊCH HOÀN TRẢ";
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

                    if (!string.IsNullOrEmpty(dh.email))
                    {

                        bodyMail = string.Empty;
                        using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoThanhToanChoKhach.html")))
                        {
                            bodyMail = reader.ReadToEnd();
                        }

                        bodyMail = bodyMail.Replace("{TieuDeChinh}", "HÓA ĐƠN HOÀN TRẢ DỊCH VỤ BÀN BUFFET");
                        bodyMail = bodyMail.Replace("{NoiDungChinh}", "Mã đơn: <strong>" + dh.madonhang + "</strong><br>" +
                                                                        "Số tiền: <strong>" + sotien + "đ</strong><br>" +
                                                                        "Ngày GD: <strong>" + DateTime.Now + "</strong><br>" +
                                                                        "Nội dung: <strong>" + ghichu + "</strong><br>" +
                                                                        "Bởi NV: <strong>" + Session["user-fullname"].ToString() + "</strong> | <strong>" +
                                                                        "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6") + "</strong><br><br>" +
                                                                        "Cảm ơn bạn đã luôn tin dùng sản phẩm và dịch vụ tại beanfamily.vn");


                        using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", dh.email))
                        {
                            mailMessage.Subject = "[BEANFAMILY] GIAO DỊCH HOÀN TRẢ";
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
                }

                model = new BeanfamilyEntities();
                var donhangTB = model.DonHangMenuBuffet.ToList();
                int numTB = donhangTB.Count;
                foreach (var item in donhangTB.Where(w => w.TinhTrangDonHangMenuBuffet.Where(ws => ws.tieude == "Hoàn thành").Count() > 0).ToList())
                {
                    if (item.LichSuThanhToanDonHangTongHop.Sum(s => s.sotien)
                        >= (item.giamon
                        + item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == true).Sum(s => s.gia * item.soban)
                        + item.ChiTietDonHangDanhMucPhucVuMenuBuffet.Where(w => w.giatheosoban == false).Sum(s => s.gia)))
                    {
                        numTB--;
                    }
                }
                Session["new-dondatbantiec"] = numTB;

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult CapNhatThongTinDonHang(int id)
        {
            try
            {
                var dh = model.DonHangMenuBuffet.Find(id);
                if (dh == null)
                    return Content("NOTEXIST");

                return PartialView("_CapNhatThongTinDonHang", dh);
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SubmitCapNhatThongTinDonHang(int id, string giamon, int soban, string hovaten, string sodienthoai, string email, string ngaytochuc, string giotochuc, string ghichu, string lstMonAn, string lstDv)
        {
            try
            {
                var donhang = model.DonHangMenuBuffet.Find(id);

                if (donhang == null)
                    return Content("NOTEXIST");

                donhang.soban = soban;
                donhang.hoten = hovaten;
                donhang.sdt = sodienthoai;
                donhang.email = email;

                if(!string.IsNullOrEmpty(giamon))
                    donhang.giamon = Convert.ToDecimal(giamon.Replace(",", ""));

                var ngaystart = Convert.ToDateTime(ngaytochuc);
                var currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                if ((ngaystart - currentDate).Days < 0)
                    return Content("SMALLDATE");

                donhang.ngaybatdau = ngaystart;
                donhang.giobatdau = giotochuc;
                donhang.ghichukhachhang = ghichu;

                model.Entry(donhang).State = EntityState.Modified;
                model.ChiTietDonHangSanPhamMenuBuffet.RemoveRange(donhang.ChiTietDonHangSanPhamMenuBuffet);
                model.SaveChanges();

                List<ChiTietDonHangSanPhamMenuBuffet> lstDhSP = new List<ChiTietDonHangSanPhamMenuBuffet>();
                foreach (var item in lstMonAn.Split('-').ToList())
                {
                    int idSP = Int32.Parse(item);
                    var sp = model.SanPhamMenuBuffet.Find(idSP);
                    ChiTietDonHangSanPhamMenuBuffet dhSP = new ChiTietDonHangSanPhamMenuBuffet();
                    dhSP.id_donhangmenubuffet = id;
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

                if (!string.IsNullOrEmpty(lstDv))
                {
                    model.ChiTietDonHangDanhMucPhucVuMenuBuffet.RemoveRange(donhang.ChiTietDonHangDanhMucPhucVuMenuBuffet);
                    model.SaveChanges();

                    List<ChiTietDonHangDanhMucPhucVuMenuBuffet> lstDhDv = new List<ChiTietDonHangDanhMucPhucVuMenuBuffet>();
                    foreach (var item in lstDv.Split('-').ToList())
                    {
                        int idSP = Int32.Parse(item);
                        var sp = model.DanhMucPhucVuMenuTiecBanVaMenuBuffet.Find(idSP);
                        ChiTietDonHangDanhMucPhucVuMenuBuffet dhSP = new ChiTietDonHangDanhMucPhucVuMenuBuffet();
                        dhSP.id_donhangmenubuffet = id;
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

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
    }
}