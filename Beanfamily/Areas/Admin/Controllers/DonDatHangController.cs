using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Beanfamily.Models;
using Beanfamily.Middlewall;
using System.IO;
using System.Net.Mail;
using System.Net;
using System.Web.Helpers;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class DonDatHangController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        //Đơn đặt hàng: Vườn rau, mua sắm, tđ hằng ngày
        // GET: Admin/DonDatHang
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
            Session["active-ddh"] = " # # ";
            Session["active-ddbt"] = "collapsed # # ";
            Session["active-ddbb"] = "collapsed # # "; Session["active-lhdb"] = "collapsed # # ";
            Session["active-hab"] = "collapsed # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # "; Session["active-ndt"] = "collapsed # # ";

            Session["new-dondathang"] = model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => !w.tieude.Equals("Đã hủy") && !w.tieude.Equals("Không thành công") && !w.tieude.Equals("Hoàn thành")).Count();

            if (Session["ddh"] == null)
                return RedirectToAction("index", "dashboard");

            var dh = model.DonHangVuonRauMuaSamVaMenuHangNgay.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("ddh"));
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
                Session["new-dondathang"] = model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => !w.tieude.Equals("Đã hủy") && !w.tieude.Equals("Không thành công") && !w.tieude.Equals("Hoàn thành")).Count();
                if (filter.Equals("all"))
                {
                    var donhang = model.DonHangVuonRauMuaSamVaMenuHangNgay.ToList();
                    return PartialView("_LocDonHang", donhang);
                }
                else if (filter.Equals("choduyet"))
                {
                    var donhang = model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(d => d.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => w.tieude.Equals("Chờ duyệt")).Count() > 0).ToList();
                    return PartialView("_LocDonHang", donhang);
                }
                else if (filter.Equals("donggoi"))
                {
                    var donhang = model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(d => d.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => w.tieude.Equals("Đang đóng gói")).Count() > 0).ToList();
                    return PartialView("_LocDonHang", donhang);
                }
                else if (filter.Equals("danggiao"))
                {
                    var donhang = model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(d => d.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => w.tieude.Equals("Đang giao")).Count() > 0).ToList();
                    return PartialView("_LocDonHang", donhang);
                }
                else if (filter.Equals("thatbai"))
                {
                    var donhang = model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(d => d.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => w.tieude.Equals("Không thành công")).Count() > 0).ToList();
                    return PartialView("_LocDonHang", donhang);
                }
                else if (filter.Equals("dahuy"))
                {
                    var donhang = model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(d => d.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => w.tieude.Equals("Đã hủy")).Count() > 0).ToList();
                    return PartialView("_LocDonHang", donhang);
                }
                else
                {
                    var donhang = model.DonHangVuonRauMuaSamVaMenuHangNgay.Where(d => d.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => w.tieude.Equals("Hoàn thành")).Count() > 0).ToList();
                    return PartialView("_LocDonHang", donhang);
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

                    var ttdh = model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.FirstOrDefault(d => d.id_donhangvuonraumuasamvathucdonhangngay == id);
                    if (ttdh != null)
                    {
                        ttdh.id_taikhoanbean = Int32.Parse(Session["user-id"].ToString());
                        ttdh.tieude = "Đã hủy";
                        ttdh.noidung = "Đã hủy bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                        ttdh.thoigian = DateTime.Now;
                        model.Entry(ttdh).State = EntityState.Modified;
                        model.SaveChanges();

                        string bodyMail = string.Empty;
                        using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoHuyDonDatHang.html")))
                        {
                            bodyMail = reader.ReadToEnd();
                        }

                        bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                        bodyMail = bodyMail.Replace("{SoDienThoai}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                        bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);

                        using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                        {
                            //if (string.IsNullOrEmpty(email))
                            //    mailMessage.To.Add(email);
                            mailMessage.Subject = "[BEANFAMILY] ĐƠN HÀNG ĐÃ ĐƯỢC HỦY";
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

                        bodyMail = string.Empty;
                        using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoHuyDonDatHangChoKhach.html")))
                        {
                            bodyMail = reader.ReadToEnd();
                        }
                        bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);

                        using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.email))
                        {
                            mailMessage.Subject = "[BEANFAMILY] ĐƠN HÀNG ĐÃ ĐƯỢC HỦY";
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
                Session["new-dondathang"] = model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => !w.tieude.Equals("Đã hủy") && !w.tieude.Equals("Không thành công") && !w.tieude.Equals("Hoàn thành")).Count();

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
                var ttdh = model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.FirstOrDefault(d => d.id_donhangvuonraumuasamvathucdonhangngay == id);
                if (ttdh == null)
                    return Content("NOTEXIST");

                ttdh.id_taikhoanbean = Int32.Parse(Session["user-id"].ToString());
                ttdh.tieude = "Đã hủy";
                ttdh.noidung = "Đã hủy bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                ttdh.thoigian = DateTime.Now;
                model.Entry(ttdh).State = EntityState.Modified;
                model.SaveChanges();

                model = new BeanfamilyEntities();
                Session["new-dondathang"] = model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => !w.tieude.Equals("Đã hủy") && !w.tieude.Equals("Không thành công") && !w.tieude.Equals("Hoàn thành")).Count();

                string bodyMail = string.Empty;
                using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoHuyDonDatHang.html")))
                {
                    bodyMail = reader.ReadToEnd();
                }

                bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                bodyMail = bodyMail.Replace("{SoDienThoai}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);

                using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                {
                    //if (string.IsNullOrEmpty(email))
                    //    mailMessage.To.Add(email);
                    mailMessage.Subject = "[BEANFAMILY] ĐƠN HÀNG ĐÃ ĐƯỢC HỦY";
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

                bodyMail = string.Empty;
                using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoHuyDonDatHangChoKhach.html")))
                {
                    bodyMail = reader.ReadToEnd();
                }
                bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);

                using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.email))
                {
                    mailMessage.Subject = "[BEANFAMILY] ĐƠN HÀNG ĐÃ ĐƯỢC HỦY";
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
                var dh = model.DonHangVuonRauMuaSamVaMenuHangNgay.Find(id);
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
                var dh = model.DonHangVuonRauMuaSamVaMenuHangNgay.Find(id);
                if (dh == null)
                    return Content("NOTEXIST");

                dh.yeucaukhac = ghichu;
                model.Entry(dh).State = EntityState.Modified;
                model.SaveChanges();

                var ttdh = dh.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.FirstOrDefault(t => t.id_donhangvuonraumuasamvathucdonhangngay == id);
                string trangthaihientại = ttdh.tieude;
                if (ttdh == null)
                {
                    TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay ttdhnew = new TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay();
                    ttdhnew.id_donhangvuonraumuasamvathucdonhangngay = id;
                    ttdhnew.id_taikhoanbean = Int32.Parse(Session["user-id"].ToString());

                    if (trangthai.Equals("choduyet"))
                    {
                        ttdhnew.tieude = "Chờ duyệt";
                        ttdhnew.noidung = "Cập nhật thành [Chờ duyệt] bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("donggoi"))
                    {
                        ttdhnew.tieude = "Đang đóng gói";
                        ttdhnew.noidung = "Đang đóng gói bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("giaohang"))
                    {
                        ttdhnew.tieude = "Đang giao";
                        ttdhnew.noidung = "Đang giao bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("khongthanhcong"))
                    {
                        ttdhnew.tieude = "Không thành công";

                        ttdhnew.noidung = "Cập nhật giao thất bại bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("huydon"))
                    {
                        ttdhnew.tieude = "Đã hủy";
                        ttdhnew.noidung = "Đã hủy bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else
                    {
                        ttdhnew.tieude = "Hoàn thành";
                        ttdhnew.noidung = "Xác nhận giao thành công bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");

                        if (dh.hinhthucthanhtoan.ToLower().Equals("thanh toán khi nhận hàng"))
                        {
                            var donhangmuassam = dh.ChiTietDonHangSanPhamMuaSam.ToList();
                            var donhangvuonrau = dh.ChiTietDonHangSanPhamRauNhaTrong.ToList();
                            var donhangthucdonhangngay = dh.ChiTietDonHangSanPhamThucDonHangNgay.ToList();

                            decimal tongTien = donhangmuassam.Sum(s => s.gia * s.soluongmua)
                                + donhangvuonrau.Sum(s => s.soluongmua * s.gia)
                                + donhangthucdonhangngay.Sum(s => s.soluongmua * s.gia);

                            LichSuThanhToanDonHangTongHop lstt = new LichSuThanhToanDonHangTongHop();
                            lstt.madonhang = dh.madonhang;
                            lstt.id_donhangvuonraumuasamvamenuhangngay = id;
                            lstt.id_taikhoanbean = Int32.Parse(Session["user-id"].ToString());
                            lstt.sotien = tongTien;
                            lstt.thoigian = DateTime.Now;
                            lstt.tieude = "Thanh toán đơn đặt hàng " + "[" + dh.madonhang + "]";
                            lstt.noidung = dh.hoten + " | " + dh.dienthoai + " đã thanh toán cho đơn hàng [" + dh.madonhang + "]. Thực hiện bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                            lstt.tenkhachhang = dh.hoten;
                            lstt.sdtkhachhang = dh.dienthoai;

                            model.LichSuThanhToanDonHangTongHop.Add(lstt);
                        }
                    }
                    ttdhnew.thoigian = DateTime.Now;
                    model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Add(ttdhnew);
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
                    else if (trangthai.Equals("donggoi"))
                    {
                        ttdh.tieude = "Đang đóng gói";
                        ttdh.noidung = "Đang đóng gói bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("giaohang"))
                    {
                        ttdh.tieude = "Đang giao";
                        ttdh.noidung = "Đang giao bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("khongthanhcong"))
                    {
                        ttdh.tieude = "Không thành công";
                        ttdh.noidung = "Cập nhật giao thất bại bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else if (trangthai.Equals("huydon"))
                    {
                        ttdh.tieude = "Đã hủy";
                        ttdh.noidung = "Đã hủy bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    }
                    else
                    {
                        ttdh.tieude = "Hoàn thành";
                        ttdh.noidung = "Xác nhận giao thành công bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");

                        if (dh.hinhthucthanhtoan.ToLower().Equals("thanh toán khi nhận hàng"))
                        {
                            var donhangmuassam = dh.ChiTietDonHangSanPhamMuaSam.ToList();
                            var donhangvuonrau = dh.ChiTietDonHangSanPhamRauNhaTrong.ToList();
                            var donhangthucdonhangngay = dh.ChiTietDonHangSanPhamThucDonHangNgay.ToList();

                            decimal tongTien = donhangmuassam.Sum(s => s.gia * s.soluongmua)
                                + donhangvuonrau.Sum(s => s.soluongmua * s.gia)
                                + donhangthucdonhangngay.Sum(s => s.soluongmua * s.gia);

                            LichSuThanhToanDonHangTongHop lstt = new LichSuThanhToanDonHangTongHop();
                            lstt.madonhang = dh.madonhang;
                            lstt.id_donhangvuonraumuasamvamenuhangngay = id;
                            lstt.id_taikhoanbean = Int32.Parse(Session["user-id"].ToString());
                            lstt.sotien = tongTien;
                            lstt.thoigian = DateTime.Now;
                            lstt.tieude = "Thanh toán đơn đặt hàng " + "[" + dh.madonhang + "]";
                            lstt.noidung = dh.hoten + " | " + dh.dienthoai + " đã thanh toán cho đơn hàng [" + dh.madonhang + "]. Thực hiện bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                            lstt.tenkhachhang = dh.hoten;
                            lstt.sdtkhachhang = dh.dienthoai;

                            model.LichSuThanhToanDonHangTongHop.Add(lstt);
                        }
                    }
                    ttdh.thoigian = DateTime.Now;
                    model.Entry(ttdh).State = EntityState.Modified;
                    model.SaveChanges();
                }

                model = new BeanfamilyEntities();
                Session["new-dondathang"] = model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => !w.tieude.Equals("Đã hủy") && !w.tieude.Equals("Không thành công") && !w.tieude.Equals("Hoàn thành")).Count();

                string bodyMail = string.Empty;
                using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoTrangThaiDonHang.html")))
                {
                    bodyMail = reader.ReadToEnd();
                }

                if (trangthai.Equals("choduyet"))
                {
                    if (trangthaihientại.Equals("Chờ duyệt"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "ĐƯỢC CẬP NHẬT");
                    bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                    bodyMail = bodyMail.Replace("{MaNhanVien}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                    bodyMail = bodyMail.Replace("{Content}", "đã đặt trạng thái đơn hàng thành <b>Chờ duyệt</b>");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);
                }
                else if (trangthai.Equals("donggoi"))
                {
                    if (trangthaihientại.Equals("Đang đóng gói"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "ĐƯỢC ĐÓNG GÓI");
                    bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                    bodyMail = bodyMail.Replace("{MaNhanVien}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                    bodyMail = bodyMail.Replace("{Content}", "đã tiến hành <b>Đóng gói</b> đơn hàng");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);
                }
                else if (trangthai.Equals("giaohang"))
                {
                    if (trangthaihientại.Equals("Đang giao"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "ĐƯỢC TIẾN HÀNH GIAO");
                    bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                    bodyMail = bodyMail.Replace("{MaNhanVien}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                    bodyMail = bodyMail.Replace("{Content}", "đã tiến hành <b>Giao</b> đơn hàng");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);
                }
                else if (trangthai.Equals("khongthanhcong"))
                {
                    if (trangthaihientại.Equals("Không thành công"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "GIAO THẤT BẠI");
                    bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                    bodyMail = bodyMail.Replace("{MaNhanVien}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                    bodyMail = bodyMail.Replace("{Content}", "đã cập nhật trạng thái <b>Giao hàng thất bại</b>");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);
                }
                else if (trangthai.Equals("huydon"))
                {
                    if (trangthaihientại.Equals("Đã hủy"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "ĐƯỢC HỦY");
                    bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                    bodyMail = bodyMail.Replace("{MaNhanVien}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                    bodyMail = bodyMail.Replace("{Content}", "đã hủy đơn hàng");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);
                }
                else
                {
                    if (trangthaihientại.Equals("Hoàn thành"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "ĐƯỢC GIAO THÀNH CÔNG");
                    bodyMail = bodyMail.Replace("{HoVaTen}", Session["user-fullname"].ToString());
                    bodyMail = bodyMail.Replace("{MaNhanVien}", "NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6"));
                    bodyMail = bodyMail.Replace("{Content}", "đã hoàn tất giao hàng");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);
                }

                using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", "duongle15012000@gmail.com"))
                {
                    //if (string.IsNullOrEmpty(email))
                    //    mailMessage.To.Add(email);
                    mailMessage.Subject = "[BEANFAMILY] ĐƠN HÀNG ĐÃ ĐƯỢC CẬP NHẬT";
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

                bodyMail = string.Empty;
                using (StreamReader reader = new StreamReader(Server.MapPath("~/ActionOnPage/TemplateMail/ThongBaoTrangThaiDonHangChoKhach.html")))
                {
                    bodyMail = reader.ReadToEnd();
                }

                if (trangthai.Equals("choduyet"))
                {
                    if (trangthaihientại.Equals("Chờ duyệt"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "ĐƯỢC CẬP NHẬT");
                    bodyMail = bodyMail.Replace("{Content}", "Trạng thái đơn hàng của bạn đã được đặt thành <b>Chờ duyệt</b>");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);
                }
                else if (trangthai.Equals("donggoi"))
                {
                    if (trangthaihientại.Equals("Đang đóng gói"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "ĐƯỢC ĐÓNG GÓI");
                    bodyMail = bodyMail.Replace("{Content}", "Đơn hàng của bạn đã được <b>Đóng gói</b>");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);
                }
                else if (trangthai.Equals("giaohang"))
                {
                    if (trangthaihientại.Equals("Đang giao"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "ĐƯỢC TIẾN HÀNH GIAO");
                    bodyMail = bodyMail.Replace("{Content}", "Đơn hàng đang trên đường <b>Giao</b> đến bạn");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);
                }
                else if (trangthai.Equals("khongthanhcong"))
                {
                    if (trangthaihientại.Equals("Không thành công"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "GIAO THẤT BẠI");
                    bodyMail = bodyMail.Replace("{Content}", "Giao hàng <b>Không thành công</b>");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);
                }
                else if (trangthai.Equals("huydon"))
                {
                    if (trangthaihientại.Equals("Đã hủy"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "ĐƯỢC HỦY");
                    bodyMail = bodyMail.Replace("{Content}", "Đơn hàng của bạn đã được <b>Hủy</b>");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);
                }
                else
                {
                    if (trangthaihientại.Equals("Hoàn thành"))
                        return Content("SUCCESS");

                    bodyMail = bodyMail.Replace("{TitleDonHang}", "ĐƯỢC GIAO THÀNH CÔNG");
                    bodyMail = bodyMail.Replace("{Content}", "Đã hoàn tất giao hàng<br><br>Cảm ơn bạn đã luôn tin dùng sản phẩm và dịch vụ tại beanfamily.vn");
                    bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);
                }
                bodyMail = bodyMail.Replace("{MaDonHang}", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.madonhang);

                using (MailMessage mailMessage = new MailMessage("beanfamilyshop@gmail.com", ttdh.DonHangVuonRauMuaSamVaMenuHangNgay.email))
                {
                    mailMessage.Subject = "[BEANFAMILY] CẬP NHẬT TÌNH TRẠNG ĐƠN HÀNG";
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

                return Content("SUCCESS");
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }

        [HttpPost]
        public ActionResult TrangThaiThanhToan(int id, string loai)
        {
            try
            {
                var dh = model.DonHangVuonRauMuaSamVaMenuHangNgay.Find(id);
                if (dh == null)
                    return Content("NOTEXIST");

                model.LichSuThanhToanDonHangTongHop.RemoveRange(dh.LichSuThanhToanDonHangTongHop);
                model.SaveChanges();

                if (loai.Equals("dathanhtoan"))
                {
                    var donhangmuassam = dh.ChiTietDonHangSanPhamMuaSam.ToList();
                    var donhangvuonrau = dh.ChiTietDonHangSanPhamRauNhaTrong.ToList();
                    var donhangthucdonhangngay = dh.ChiTietDonHangSanPhamThucDonHangNgay.ToList();

                    decimal tongTien = donhangmuassam.Sum(s => s.gia * s.soluongmua)
                        + donhangvuonrau.Sum(s => s.soluongmua * s.gia)
                        + donhangthucdonhangngay.Sum(s => s.soluongmua * s.gia);

                    LichSuThanhToanDonHangTongHop lstt = new LichSuThanhToanDonHangTongHop();
                    lstt.madonhang = dh.madonhang;
                    lstt.id_donhangvuonraumuasamvamenuhangngay = id;
                    lstt.id_taikhoanbean = Int32.Parse(Session["user-id"].ToString());
                    lstt.sotien = tongTien;
                    lstt.thoigian = DateTime.Now;
                    lstt.tieude = "Thanh toán đơn đặt hàng " + "[" + dh.madonhang + "]";
                    lstt.noidung = dh.hoten + " | " + dh.dienthoai + " đã thanh toán cho đơn hàng [" + dh.madonhang + "]. Thực hiện bởi " + Session["user-fullname"].ToString() + " - NV" + Int32.Parse(Session["user-id"].ToString()).ToString("D6");
                    lstt.tenkhachhang = dh.hoten;
                    lstt.sdtkhachhang = dh.dienthoai;

                    model.LichSuThanhToanDonHangTongHop.Add(lstt);
                    model.SaveChanges();
                    model = new BeanfamilyEntities();
                }

                return PartialView("_CapNhatDonHang", dh);
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
    }
}