﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Beanfamily.Models;
using Beanfamily.Middlewall;
using System.IO;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class SanPhamMuaSamController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/SanPhamMuaSam
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
            Session["active-chtl-dmc1"] = " # show # ";
            Session["active-chtl-sp"] = " # show # active";
            Session["active-tkb-pq"] = "collapsed # # ";
            Session["active-tkb-tk"] = "collapsed # # ";
            Session["active-ddh"] = "collapsed # # ";
            Session["active-ddbt"] = "collapsed # # ";
            Session["active-ddbb"] = "collapsed # # ";
            Session["active-hab"] = "collapsed # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # ";

            if (Session["chtl-sp"] == null)
                return RedirectToAction("index", "dashboard");

            var sanpham = model.SanPhamMuaSam.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("chtl-sp"));
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

            return View("index", sanpham);
        }
        [HttpPost]
        public ActionResult ThemSanPham(List<HttpPostedFileBase> images, HttpPostedFileBase video, string ten, int danhmuc, string mota, bool hienthi, string lstLoai, string lstSoLuong, string lstGia)
        {
            try
            {
                var checkExist = model.SanPhamMuaSam.FirstOrDefault(s => s.tensanpham.ToLower().Equals(ten.ToLower().Trim()));
                if (checkExist != null)
                    return Content("DATONTAI");

                SanPhamMuaSam sanpham = new SanPhamMuaSam();
                sanpham.tensanpham = ten;
                sanpham.id_danhmucmuasamcap1 = danhmuc;
                sanpham.mota = mota;
                sanpham.luotxem = 0;
                sanpham.hienthi = hienthi;
                model.SanPhamMuaSam.Add(sanpham);
                model.SaveChanges();

                int idSanPham = sanpham.id;
                string path = "";
                string pathDirectory = "";
                string strListImages = "";
                if (images != null)
                {
                    foreach (var item in images)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMuaSam/SanPham_" + idSanPham));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMuaSam/SanPham_" + idSanPham), item.FileName);
                                item.SaveAs(path);
                                strListImages += "~/Content/AdminAreas/images/SanPhamMuaSam/SanPham_" + idSanPham + "/" + item.FileName + "#";
                            }
                        }
                    }
                }
                path = "";
                string strListVideo = "";
                if (video != null)
                {
                    if (video.ContentLength > 0)
                    {
                        pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMuaSam/SanPham_" + idSanPham));
                        if (!Directory.Exists(pathDirectory))
                        {
                            Directory.CreateDirectory(pathDirectory);
                        }
                        path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMuaSam/SanPham_" + idSanPham), video.FileName);
                        video.SaveAs(path);
                        strListVideo += "~/Content/AdminAreas/images/SanPhamMuaSam/SanPham_" + idSanPham + "/" + video.FileName;
                    }
                }

                if (!string.IsNullOrEmpty(strListImages) || !string.IsNullOrEmpty(strListVideo))
                {
                    model = new BeanfamilyEntities();
                    var addImageVideoSanPham = model.SanPhamMuaSam.Find(idSanPham);
                    if (!string.IsNullOrEmpty(strListImages))
                        addImageVideoSanPham.hinhanh = strListImages.Substring(0, strListImages.Length - 1);
                    if (!string.IsNullOrEmpty(strListVideo))
                        addImageVideoSanPham.video = strListVideo;

                    model.Entry(addImageVideoSanPham).State = EntityState.Modified;
                    model.SaveChanges();
                }

                if (lstLoai.IndexOf("#") != -1)
                {
                    var lstLoais = lstLoai.Split('#').ToList();
                    var lstSoLuongs = lstSoLuong.Split('#').ToList();
                    var lstGias = lstGia.Split('#').ToList();

                    for (int i = 0; i < lstLoais.Count; i++)
                    {
                        TonKhoSanPham tonkho = new TonKhoSanPham();
                        tonkho.id_sanphammuasam = idSanPham;
                        tonkho.tenloai = lstLoais[i].Trim();
                        tonkho.soluong = Int32.Parse(lstSoLuongs[i].Trim());
                        tonkho.gia = Decimal.Parse(lstGias[i].Replace(",", "").Trim());
                        model.TonKhoSanPham.Add(tonkho);
                    }
                    model.SaveChanges();
                }
                else
                {
                    TonKhoSanPham tonkho = new TonKhoSanPham();
                    tonkho.id_sanphammuasam = idSanPham;
                    tonkho.tenloai = lstLoai.Trim();
                    tonkho.soluong = Int32.Parse(lstSoLuong.Trim());
                    tonkho.gia = Decimal.Parse(lstGia.Replace(",", "").Trim());
                    model.TonKhoSanPham.Add(tonkho);
                    model.SaveChanges();
                }
                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }
        [HttpPost]
        public ActionResult XemHinhAnh(int id)
        {
            try
            {
                var mon = model.SanPhamRauNhaTrong.Find(id);
                if (mon == null)
                    return Content("KHONGTONTAI");

                return PartialView("_xemHinhAnhSanPham", mon);
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }
        [HttpPost]
        public ActionResult OpenSuaSanPham(int id)
        {
            try
            {
                var mon = model.SanPhamRauNhaTrong.Find(id);
                if (mon == null)
                    return Content("KHONGTONTAI");

                return PartialView("_OpenSuaSanPham", mon);
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SuaSanPham(int id, List<HttpPostedFileBase> images, HttpPostedFileBase video, string ten, string gia, string donvi, int giatri, int danhmuc, string mota, bool hienthi, string imageCu, string videoCu)
        {
            try
            {
                var checkExist = model.SanPhamRauNhaTrong.FirstOrDefault(s => s.tensanpham.ToLower().Equals(ten.ToLower().Trim()) && s.id_danhmucsanphamraunhatrongcap1 == danhmuc && s.id != id);
                if (checkExist != null)
                    return Content("DATONTAI");

                var sanpham = model.SanPhamRauNhaTrong.Find(id);
                if (sanpham == null)
                    return Content("KHONGTONTAI");

                sanpham.tensanpham = ten;
                sanpham.id_danhmucsanphamraunhatrongcap1 = danhmuc;
                sanpham.gia = Convert.ToDecimal(gia.Replace(",", ""));
                sanpham.donvi = donvi;
                sanpham.giatritrendonvi = giatri;
                sanpham.mota = mota;
                sanpham.luotxem = 0;
                sanpham.hienthi = hienthi;
                model.Entry(sanpham).State = EntityState.Modified;
                model.SaveChanges();

                int idMonAn = id;
                string path = "";
                string pathDirectory = "";
                string strListImages = "";

                if (images != null)
                {
                    foreach (var item in images)
                    {
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamVuonRau/SanPham_" + idMonAn));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamVuonRau/SanPham_" + idMonAn), item.FileName);
                                item.SaveAs(path);
                                strListImages += "~/Content/AdminAreas/images/SanPhamVuonRau/SanPham_" + idMonAn + "/" + item.FileName + "#";
                            }
                        }
                    }
                }

                path = "";
                string strListVideo = "";
                if (video != null)
                {
                    if (video.ContentLength > 0)
                    {
                        pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamVuonRau/SanPham_" + idMonAn));
                        if (!Directory.Exists(pathDirectory))
                        {
                            Directory.CreateDirectory(pathDirectory);
                        }
                        path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamVuonRau/SanPham_" + idMonAn), video.FileName);
                        video.SaveAs(path);
                        strListVideo += "~/Content/AdminAreas/images/SanPhamVuonRau/SanPham_" + idMonAn + "/" + video.FileName;
                    }
                }

                model = new BeanfamilyEntities();
                var addImageVideoSanPham = model.SanPhamRauNhaTrong.Find(idMonAn);
                if (!string.IsNullOrEmpty(strListImages))
                    addImageVideoSanPham.hinhanh = strListImages.Substring(0, strListImages.Length - 1);
                else
                    addImageVideoSanPham.hinhanh = imageCu;

                if (!string.IsNullOrEmpty(strListVideo))
                    addImageVideoSanPham.video = strListVideo;
                else
                    addImageVideoSanPham.video = videoCu;

                model.Entry(addImageVideoSanPham).State = EntityState.Modified;
                model.SaveChanges();


                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }
        [HttpPost]
        public ActionResult XoaSanPham(int id)
        {
            try
            {
                var sanpham = model.SanPhamMuaSam.Find(id);
                if (sanpham == null)
                    return Content("KHONGTONTAI");
                model.TonKhoSanPham.RemoveRange(sanpham.TonKhoSanPham);
                model.SanPhamMuaSam.Remove(sanpham);
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        public ActionResult XoaHangLoat(string lstId)
        {
            try
            {
                if (lstId.IndexOf("-") != -1)
                {
                    foreach (var item in lstId.Split('-'))
                    {
                        int id = Int32.Parse(item);
                        var dm = model.SanPhamMuaSam.Find(id);
                        model.TonKhoSanPham.RemoveRange(dm.TonKhoSanPham);
                        model.SanPhamMuaSam.Remove(dm);
                        model.SaveChanges();
                    }
                }
                else
                {
                    int id = Int32.Parse(lstId);
                    var dm = model.SanPhamMuaSam.Find(id);
                    model.TonKhoSanPham.RemoveRange(dm.TonKhoSanPham);
                    model.SanPhamMuaSam.Remove(dm);
                    model.SaveChanges();
                }

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }
    }
}