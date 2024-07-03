using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using System.Data.Entity;

namespace Beanfamily.Areas.Admin.Controllers
{
    public class DangNhapController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();

        // GET: Admin/Account
        public ActionResult Index()
        {
            if (Session["user-id"] != null)
                return RedirectToAction("index", "dashboard");

            return View("index");
        }

        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            var taikhoan = model.TaiKhoanBean.FirstOrDefault(t => t.email.ToLower().Equals(username.ToLower().Trim()) || t.username.ToLower().Equals(username.ToLower().Trim()));
            if (taikhoan != null)
            {
                if (taikhoan.password.Equals(password))
                {
                    if (taikhoan.khoataikhoan == false)
                    {
                        taikhoan.solandasaimatkhau = 0;
                        model.Entry(taikhoan).State = EntityState.Modified;
                        model.SaveChanges();

                        Session["user-fullname"] = taikhoan.hovaten;
                        Session["user-id"] = taikhoan.id;
                        Session["user-email"] = taikhoan.email;
                        Session["user-chucdanh"] = taikhoan.chucdanh;
                        Session["user-role-id"] = taikhoan.id_quyentaikhoanbean;
                        Session["user-avatar"] = taikhoan.hinhdaidien + "";

                        //Nút thông báo nhỏ trên menu
                        Session["new-dondathang"] = model.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay.Where(w => !w.tieude.Equals("Đã hủy") && !w.tieude.Equals("Không thành công") && !w.tieude.Equals("Hoàn thành")).Count();

                        var donhangTB = model.DonHangMenuTiecBan.ToList();
                        int numTB = donhangTB.Count;
                        foreach (var item in donhangTB.Where(w => w.TinhTrangDonHangMenuTiecBan.Where(ws => ws.tieude == "Hoàn thành").Count() > 0).ToList())
                        {
                            if (item.LichSuThanhToanDonHangTongHop.Sum(s => s.sotien)
                                >= (item.ChiTietDonHangSanPhamMenuTiecBan.Sum(s => s.gia * item.soban)
                                + item.ChiTietDonHangDanhMucPhucVuMenuTiecBan.Where(w => w.giatheosoban == true).Sum(s => s.gia * item.soban)
                                + item.ChiTietDonHangDanhMucPhucVuMenuTiecBan.Where(w => w.giatheosoban == false).Sum(s => s.gia)))
                            {
                                numTB--;
                            }
                        }
                        Session["new-dondatbantiec"] = numTB;

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

                        //Set check function null
                        Session["mtb-dmc1"] = null;
                        Session["mtb-qlm"] = null;
                        Session["mb-dmc1"] = null;
                        Session["mb-qlm"] = null;
                        Session["dmpv"] = null;
                        Session["mhn-dmc1"] = null;
                        Session["mhn-qlm"] = null;
                        Session["vrb-dmc1"] = null;
                        Session["vrb-spr"] = null;
                        Session["vrb-qltc"] = null;
                        Session["chtl-dmc1"] = null;
                        Session["chtl-sp"] = null;
                        Session["tkb-pq"] = null;
                        Session["tkb-tk"] = null;
                        Session["ddh"] = null;
                        Session["ddbt"] = null;
                        Session["ddbb"] = null;
                        Session["hab"] = null;
                        Session["qlsp"] = null;
                        Session["tlc-ttw"] = null;
                        Session["tlc-lkmxh"] = null;

                        Session["chophep-them"] = null;
                        Session["chophep-sua"] = null;
                        Session["chophep-xoa"] = null;

                        //LstFunction for account accept
                        foreach (var item in taikhoan.QuyenTaiKhoanBean.ApDungChucNangChoQuyenTaiKhoan.ToList())
                        {
                            string keycodes = item.ChucNangHeThongBean.keycode.ToString();
                            if (keycodes.Equals("mtb-dmc1"))
                                Session["mtb-dmc1"] = true;
                            else if (keycodes.Equals("mtb-qlm"))
                                Session["mtb-qlm"] = true;

                            else if (keycodes.Equals("mb-dmc1"))
                                Session["mb-dmc1"] = true;
                            else if (keycodes.Equals("mb-qlm"))
                                Session["mb-qlm"] = true;

                            else if (keycodes.Equals("dmpv"))
                                Session["dmpv"] = true;

                            else if (keycodes.Equals("mhn-dmc1"))
                                Session["mhn-dmc1"] = true;
                            else if (keycodes.Equals("mhn-qlm"))
                                Session["mhn-qlm"] = true;

                            else if (keycodes.Equals("vrb-dmc1"))
                                Session["vrb-dmc1"] = true;
                            else if (keycodes.Equals("vrb-spr"))
                                Session["vrb-spr"] = true;
                            else if (keycodes.Equals("vrb-qltc"))
                                Session["vrb-qltc"] = true;

                            else if (keycodes.Equals("chtl-dmc1"))
                                Session["chtl-dmc1"] = true;
                            else if (keycodes.Equals("chtl-sp"))
                                Session["chtl-sp"] = true;

                            else if (keycodes.Equals("tkb-pq"))
                                Session["tkb-pq"] = true;
                            else if (keycodes.Equals("tkb-tk"))
                                Session["tkb-tk"] = true;

                            else if (keycodes.Equals("ddh"))
                                Session["ddh"] = true;

                            else if (keycodes.Equals("ddbt"))
                                Session["ddbt"] = true;

                            else if (keycodes.Equals("ddbb"))
                                Session["ddbb"] = true;

                            else if (keycodes.Equals("hab"))
                                Session["hab"] = true;

                            else if (keycodes.Equals("qlsp"))
                                Session["qlsp"] = true;

                            else if (keycodes.Equals("tlc-ttw"))
                                Session["tlc-ttw"] = true;
                            else if (keycodes.Equals("tlc-lkmxh"))
                                Session["tlc-lkmxh"] = true;
                        }

                        return Content("SUCCESS");
                    }
                    else
                    {
                        return Content("BIKHOA");
                    }
                }

                int soLanSaiMkToiDa = taikhoan.solansaimatkhautoida;
                int soLanDaSaiMk = taikhoan.solandasaimatkhau + 1;
                taikhoan.solandasaimatkhau = soLanDaSaiMk;

                if (soLanSaiMkToiDa <= soLanDaSaiMk)
                    taikhoan.khoataikhoan = true;

                model.Entry(taikhoan).State = EntityState.Modified;
                model.SaveChanges();

                return Content("SAIMATKHAU");
            }
            return Content("KHONGTONTAI");
        }

        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("index");
        }
    }
}