using System;
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
    public class MonAnMenuHangNgayController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/MonAnMenuHangNgay
        public ActionResult Index()
        {
            Session["active-dashboard"] = "collapsed # # ";
            Session["active-mtb-dmc1"] = "collapsed # # ";
            Session["active-mtb-qlm"] = "collapsed # # ";
            Session["active-mb-dmc1"] = "collapsed # # ";
            Session["active-mb-qlm"] = "collapsed # # ";
            Session["active-dmpv"] = "collapsed # # ";
            Session["active-mhn-dmc1"] = " # show # ";
            Session["active-mhn-qlm"] = " # show # active";
            Session["active-vrb-dmc1"] = "collapsed # # ";
            Session["active-vrb-spr"] = "collapsed # # ";
            Session["active-vrb-qltc"] = "collapsed # # ";
            Session["active-chtl-dmc1"] = "collapsed # # ";
            Session["active-chtl-sp"] = "collapsed # # ";
            Session["active-tkb-pq"] = "collapsed # # ";
            Session["active-tkb-tk"] = "collapsed # # ";
            Session["active-ddh"] = "collapsed # # ";
            Session["active-ddbt"] = "collapsed # # ";
            Session["active-ddbb"] = "collapsed # # "; Session["active-lhdb"] = "collapsed # # ";
            Session["active-hab"] = "collapsed # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # ";

            if (Session["mhn-qlm"] == null)
                return RedirectToAction("index", "dashboard");

            var monAn = model.SanPhamThucDonHangNgay.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("mhn-qlm"));
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

            return View("index", monAn);
        }

        [HttpPost]
        public ActionResult ThemMon(List<HttpPostedFileBase> images, HttpPostedFileBase video, string tenmon, string gia, int danhmuc, string mota, bool trangthai, bool hienthi)
        {
            try
            {
                var checkExist = model.SanPhamThucDonHangNgay.FirstOrDefault(s => s.tensanpham.ToLower().Equals(tenmon.ToLower().Trim()) && s.id_danhmucthucdonhangngaycap1 == danhmuc);
                if (checkExist != null)
                    return Content("DATONTAI");

                SanPhamThucDonHangNgay monan = new SanPhamThucDonHangNgay();
                monan.tensanpham = tenmon;
                monan.id_danhmucthucdonhangngaycap1 = danhmuc;
                monan.gia = Convert.ToDecimal(gia.Replace(",", ""));
                monan.mota = mota;
                monan.luotxem = 0;
                monan.conhang = trangthai;
                monan.hienthi = hienthi;
                model.SanPhamThucDonHangNgay.Add(monan);
                model.SaveChanges();

                int idMonAn = monan.id;
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
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMenuHangNgay/SanPham_" + idMonAn));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMenuHangNgay/SanPham_" + idMonAn), item.FileName);
                                item.SaveAs(path);
                                strListImages += "~/Content/AdminAreas/images/SanPhamMenuHangNgay/SanPham_" + idMonAn + "/" + item.FileName + "#";
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
                        pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMenuHangNgay/SanPham_" + idMonAn));
                        if (!Directory.Exists(pathDirectory))
                        {
                            Directory.CreateDirectory(pathDirectory);
                        }
                        path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMenuHangNgay/SanPham_" + idMonAn), video.FileName);
                        video.SaveAs(path);
                        strListVideo += "~/Content/AdminAreas/images/SanPhamMenuHangNgay/SanPham_" + idMonAn + "/" + video.FileName;
                    }
                }

                if (!string.IsNullOrEmpty(strListImages) || !string.IsNullOrEmpty(strListVideo))
                {
                    model = new BeanfamilyEntities();
                    var addImageVideoMonAn = model.SanPhamThucDonHangNgay.Find(idMonAn);
                    if (!string.IsNullOrEmpty(strListImages))
                        addImageVideoMonAn.hinhanh = strListImages.Substring(0, strListImages.Length - 1);
                    if (!string.IsNullOrEmpty(strListVideo))
                        addImageVideoMonAn.video = strListVideo;

                    model.Entry(addImageVideoMonAn).State = EntityState.Modified;
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
                var mon = model.SanPhamThucDonHangNgay.Find(id);
                if (mon == null)
                    return Content("KHONGTONTAI");

                return PartialView("_xemHinhAnhMon", mon);
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult XoaMon(int id)
        {
            try
            {
                var mon = model.SanPhamThucDonHangNgay.Find(id);
                if (mon == null)
                    return Content("KHONGTONTAI");

                model.SanPhamThucDonHangNgay.Remove(mon);
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult OpenSuaMon(int id)
        {
            try
            {
                var mon = model.SanPhamThucDonHangNgay.Find(id);
                if (mon == null)
                    return Content("KHONGTONTAI");

                return PartialView("_OpenSuaMonMenuHangNgay", mon);
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SuaMon(int id, List<HttpPostedFileBase> images, HttpPostedFileBase video, string tenmon, string gia, int danhmuc, string mota, bool trangthai, bool hienthi, string imageCu, string videoCu)
        {
            try
            {
                var checkExist = model.SanPhamThucDonHangNgay.FirstOrDefault(s => s.tensanpham.ToLower().Equals(tenmon.ToLower().Trim()) && s.id_danhmucthucdonhangngaycap1 == danhmuc && s.id != id);
                if (checkExist != null)
                    return Content("DATONTAI");

                var monan = model.SanPhamThucDonHangNgay.Find(id);
                if (monan == null)
                    return Content("KHONGTONTAI");

                monan.tensanpham = tenmon;
                monan.id_danhmucthucdonhangngaycap1 = danhmuc;
                monan.gia = Convert.ToDecimal(gia.Replace(",", ""));
                monan.mota = mota;
                monan.conhang = trangthai;
                monan.hienthi = hienthi;
                model.Entry(monan).State = EntityState.Modified;
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
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMenuHangNgay/SanPham_" + idMonAn));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMenuHangNgay/SanPham_" + idMonAn), item.FileName);
                                item.SaveAs(path);
                                strListImages += "~/Content/AdminAreas/images/SanPhamMenuHangNgay/SanPham_" + idMonAn + "/" + item.FileName + "#";
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
                        pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMenuHangNgay/SanPham_" + idMonAn));
                        if (!Directory.Exists(pathDirectory))
                        {
                            Directory.CreateDirectory(pathDirectory);
                        }
                        path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/SanPhamMenuHangNgay/SanPham_" + idMonAn), video.FileName);
                        video.SaveAs(path);
                        strListVideo += "~/Content/AdminAreas/images/SanPhamMenuHangNgay/SanPham_" + idMonAn + "/" + video.FileName;
                    }
                }

                model = new BeanfamilyEntities();
                var addImageVideoMonAn = model.SanPhamThucDonHangNgay.Find(idMonAn);
                if (!string.IsNullOrEmpty(strListImages))
                    addImageVideoMonAn.hinhanh = strListImages.Substring(0, strListImages.Length - 1);
                else
                    addImageVideoMonAn.hinhanh = imageCu;

                if (!string.IsNullOrEmpty(strListVideo))
                    addImageVideoMonAn.video = strListVideo;
                else
                    addImageVideoMonAn.video = videoCu;

                model.Entry(addImageVideoMonAn).State = EntityState.Modified;
                model.SaveChanges();


                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
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
                        var dm = model.SanPhamThucDonHangNgay.Find(id);
                        model.SanPhamThucDonHangNgay.Remove(dm);
                        model.SaveChanges();
                    }
                }
                else
                {
                    int id = Int32.Parse(lstId);
                    var dm = model.SanPhamThucDonHangNgay.Find(id);
                    model.SanPhamThucDonHangNgay.Remove(dm);
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