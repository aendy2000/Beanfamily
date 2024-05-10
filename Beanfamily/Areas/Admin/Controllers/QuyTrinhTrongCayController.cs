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
    public class QuyTrinhTrongCayController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/QuyTrinhTrongCay
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
            Session["active-vrb-dmc1"] = " # show # ";
            Session["active-vrb-spr"] = " # show # ";
            Session["active-vrb-qltc"] = " # show # active";
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

            if (Session["vrb-qltc"] == null)
                return RedirectToAction("index", "dashboard");

            var quytrinh = model.QuyTrinhTrongCay.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("vrb-qltc"));
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

            return View("index", quytrinh);
        }

        [HttpPost]
        public ActionResult ThemQuyTrinh(List<HttpPostedFileBase> images, bool addurlvideo, string urlVideo, HttpPostedFileBase video, string tenquytrinh, bool hienthi, string lstTenBuoc, string lstMotaBuoc, string lstCoHinh)
        {
            try
            {
                var checkExist = model.QuyTrinhTrongCay.FirstOrDefault(s => s.tenquytrinhtrongcay.ToLower().Equals(tenquytrinh.ToLower().Trim()));
                if (checkExist != null)
                    return Content("DATONTAI");

                QuyTrinhTrongCay quytrinh = new QuyTrinhTrongCay();
                quytrinh.tenquytrinhtrongcay = tenquytrinh;
                quytrinh.ngaytao = DateTime.Now;
                quytrinh.ngaysuadoi = DateTime.Now;
                quytrinh.luotxem = 0;
                quytrinh.hienthi = hienthi;

                model.QuyTrinhTrongCay.Add(quytrinh);
                model.SaveChanges();

                int id = quytrinh.id;
                string path = "";
                string pathDirectory = "";
                string strVideo = "";
                if (addurlvideo == true)
                {
                    strVideo = urlVideo;
                }
                else
                {
                    if (video != null)
                    {
                        if (video.ContentLength > 0)
                        {
                            pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/QuyTrinhTrong/QuyTrinh_" + id));
                            if (!Directory.Exists(pathDirectory))
                            {
                                Directory.CreateDirectory(pathDirectory);
                            }
                            path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/QuyTrinhTrong/QuyTrinh_" + id), video.FileName);
                            video.SaveAs(path);
                            strVideo += "~/Content/AdminAreas/images/QuyTrinhTrong/QuyTrinh_" + id + "/" + video.FileName;
                        }
                    }
                }

                if (!string.IsNullOrEmpty(strVideo))
                {
                    model = new BeanfamilyEntities();
                    var videoQuyTrinh = model.QuyTrinhTrongCay.Find(id);
                    videoQuyTrinh.video = strVideo;

                    model.Entry(videoQuyTrinh).State = EntityState.Modified;
                    model.SaveChanges();
                }

                int idQuyTrinh = quytrinh.id;
                if (lstTenBuoc.IndexOf("#") != -1)
                {
                    var lstTenBuocs = lstTenBuoc.Split('#').ToList();
                    var lstMotaBuocs = lstMotaBuoc.Split('#').ToList();
                    var lstCoHinhs = lstCoHinh.Split('#').ToList();
                    int indexImg = 0;

                    for (int i = 0; i < lstTenBuocs.Count; i++)
                    {
                        string strListImages = "";
                        path = "";
                        pathDirectory = "";

                        CacBuocQuyTrinhTrongCay buoc = new CacBuocQuyTrinhTrongCay();
                        buoc.id_quytrinhtrongcay = idQuyTrinh;
                        buoc.ngaytao = DateTime.Now;
                        buoc.ngaysuadoi = DateTime.Now;
                        buoc.sobuoc = lstTenBuocs[i];
                        buoc.motabuoc = lstMotaBuocs[i];

                        if (lstCoHinhs[i].Equals("Co"))
                        {
                            var item = images[indexImg];
                            indexImg++;
                            if (item != null)
                            {
                                if (item.ContentLength > 0)
                                {
                                    pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/QuyTrinhTrongCay/QuyTrinh_" + idQuyTrinh));
                                    if (!Directory.Exists(pathDirectory))
                                    {
                                        Directory.CreateDirectory(pathDirectory);
                                    }
                                    path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/QuyTrinhTrongCay/QuyTrinh_" + idQuyTrinh), item.FileName);
                                    item.SaveAs(path);
                                    strListImages = "~/Content/AdminAreas/images/QuyTrinhTrongCay/QuyTrinh_" + idQuyTrinh + "/" + item.FileName;
                                }
                            }
                        }
                        buoc.hinhanh = strListImages;
                        model.CacBuocQuyTrinhTrongCay.Add(buoc);
                    }
                }
                else
                {
                    string strListImages = "";
                    path = "";
                    pathDirectory = "";

                    CacBuocQuyTrinhTrongCay buoc = new CacBuocQuyTrinhTrongCay();
                    buoc.id_quytrinhtrongcay = idQuyTrinh;
                    buoc.ngaytao = DateTime.Now;
                    buoc.ngaysuadoi = DateTime.Now;
                    buoc.sobuoc = lstTenBuoc;
                    buoc.motabuoc = lstMotaBuoc;

                    if (lstCoHinh.Equals("Co"))
                    {
                        var item = images[0];
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/QuyTrinhTrongCay/QuyTrinh_" + idQuyTrinh));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/QuyTrinhTrongCay/QuyTrinh_" + idQuyTrinh), item.FileName);
                                item.SaveAs(path);
                                strListImages = "~/Content/AdminAreas/images/QuyTrinhTrongCay/QuyTrinh_" + idQuyTrinh + "/" + item.FileName;
                            }
                        }
                    }
                    buoc.hinhanh = strListImages;
                    model.CacBuocQuyTrinhTrongCay.Add(buoc);
                }
                model.SaveChanges();
                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult OpenSua(int id)
        {
            try
            {
                var quytrinh = model.QuyTrinhTrongCay.Find(id);
                if (quytrinh == null)
                    return Content("KHONGTONTAI");

                return PartialView("_OpenSua", quytrinh);
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult SuaQuyTrinh(List<HttpPostedFileBase> images, bool addurlvideo, string urlVideo, HttpPostedFileBase video, int id, string tenquytrinh, bool hienthi, string lstTenBuoc, string lstMotaBuoc, string lstCoHinh, string videoCu)
        {
            try
            {
                var checkExist = model.QuyTrinhTrongCay.FirstOrDefault(s => s.tenquytrinhtrongcay.ToLower().Equals(tenquytrinh.ToLower().Trim()) && s.id != id);
                if (checkExist != null)
                    return Content("DATONTAI");

                var quytrinh = model.QuyTrinhTrongCay.Find(id);
                if (quytrinh == null)
                    return Content("KHONGTONTAI");

                string path = "";
                string pathDirectory = "";
                string strVideo = "";
                if (addurlvideo == true) //Thêm video ngoài
                {
                    if (string.IsNullOrEmpty(urlVideo))
                    {
                        if (!string.IsNullOrEmpty(videoCu) && videoCu.IndexOf("~/Content") == -1)
                        {
                            strVideo = videoCu;
                        }
                    }
                    else
                    {
                        strVideo = urlVideo;
                    }
                }
                else // Tải lên video
                {
                    if (video != null)
                    {
                        if (video.ContentLength > 0)
                        {
                            pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/QuyTrinhTrong/QuyTrinh_" + id));
                            if (!Directory.Exists(pathDirectory))
                            {
                                Directory.CreateDirectory(pathDirectory);
                            }
                            path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/QuyTrinhTrong/QuyTrinh_" + id), video.FileName);
                            video.SaveAs(path);
                            strVideo += "~/Content/AdminAreas/images/QuyTrinhTrong/QuyTrinh_" + id + "/" + video.FileName;
                        }
                        else
                        {
                            if (!string.IsNullOrEmpty(videoCu) && videoCu.IndexOf("~/Content") != -1)
                            {
                                strVideo = videoCu;
                            }
                        }
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(videoCu) && videoCu.IndexOf("~/Content") != -1)
                        {
                            strVideo = videoCu;
                        }
                    }
                }
                quytrinh.video = strVideo;
                quytrinh.tenquytrinhtrongcay = tenquytrinh;
                quytrinh.ngaysuadoi = DateTime.Now;
                quytrinh.hienthi = hienthi;
                model.Entry(quytrinh).State = EntityState.Modified;
                model.CacBuocQuyTrinhTrongCay.RemoveRange(quytrinh.CacBuocQuyTrinhTrongCay);
                model.SaveChanges();

                int idQuyTrinh = id;
                if (lstTenBuoc.IndexOf("#") != -1)
                {
                    var lstTenBuocs = lstTenBuoc.Split('#').ToList();
                    var lstMotaBuocs = lstMotaBuoc.Split('#').ToList();
                    var lstCoHinhs = lstCoHinh.Split('#').ToList();
                    int indexImg = 0;

                    for (int i = 0; i < lstTenBuocs.Count; i++)
                    {
                        string strListImages = "";
                        path = "";
                        pathDirectory = "";

                        CacBuocQuyTrinhTrongCay buoc = new CacBuocQuyTrinhTrongCay();
                        buoc.id_quytrinhtrongcay = idQuyTrinh;
                        buoc.ngaytao = DateTime.Now;
                        buoc.ngaysuadoi = DateTime.Now;
                        buoc.sobuoc = lstTenBuocs[i];
                        buoc.motabuoc = lstMotaBuocs[i];

                        if (lstCoHinhs[i].Equals("Co"))
                        {
                            var item = images[indexImg];
                            indexImg++;
                            if (item != null)
                            {
                                if (item.ContentLength > 0)
                                {
                                    pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/QuyTrinhTrongCay/QuyTrinh_" + idQuyTrinh));
                                    if (!Directory.Exists(pathDirectory))
                                    {
                                        Directory.CreateDirectory(pathDirectory);
                                    }
                                    path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/QuyTrinhTrongCay/QuyTrinh_" + idQuyTrinh), item.FileName);
                                    item.SaveAs(path);
                                    strListImages = "~/Content/AdminAreas/images/QuyTrinhTrongCay/QuyTrinh_" + idQuyTrinh + "/" + item.FileName;
                                }
                            }
                        }
                        else
                        {
                            strListImages = lstCoHinhs[i];
                        }
                        buoc.hinhanh = strListImages;
                        model.CacBuocQuyTrinhTrongCay.Add(buoc);
                    }
                }
                else
                {
                    string strListImages = "";
                    path = "";
                    pathDirectory = "";

                    CacBuocQuyTrinhTrongCay buoc = new CacBuocQuyTrinhTrongCay();
                    buoc.id_quytrinhtrongcay = idQuyTrinh;
                    buoc.ngaytao = DateTime.Now;
                    buoc.ngaysuadoi = DateTime.Now;
                    buoc.sobuoc = lstTenBuoc;
                    buoc.motabuoc = lstMotaBuoc;

                    if (lstCoHinh.Equals("Co"))
                    {
                        var item = images[0];
                        if (item != null)
                        {
                            if (item.ContentLength > 0)
                            {
                                pathDirectory = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/QuyTrinhTrongCay/QuyTrinh_" + idQuyTrinh));
                                if (!Directory.Exists(pathDirectory))
                                {
                                    Directory.CreateDirectory(pathDirectory);
                                }
                                path = Path.Combine(Server.MapPath("~/Content/AdminAreas/images/QuyTrinhTrongCay/QuyTrinh_" + idQuyTrinh), item.FileName);
                                item.SaveAs(path);
                                strListImages = "~/Content/AdminAreas/images/QuyTrinhTrongCay/QuyTrinh_" + idQuyTrinh + "/" + item.FileName;
                            }
                        }
                    }
                    else
                    {
                        strListImages = lstCoHinh;
                    }
                    buoc.hinhanh = strListImages;
                    model.CacBuocQuyTrinhTrongCay.Add(buoc);
                }
                model.SaveChanges();
                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult XoaQuyTrinh(int id)
        {
            try
            {
                var sanpham = model.QuyTrinhTrongCay.Find(id);
                if (sanpham == null)
                    return Content("KHONGTONTAI");

                var lstSp = model.SanPhamRauNhaTrong.Where(r => r.id_quytrinhtrongcay == id).ToList();
                foreach (var item in lstSp)
                {
                    item.id_quytrinhtrongcay = null;
                    model.Entry(item).State = EntityState.Modified;
                }
                model.SaveChanges();

                model.CacBuocQuyTrinhTrongCay.RemoveRange(sanpham.CacBuocQuyTrinhTrongCay);
                model.QuyTrinhTrongCay.Remove(sanpham);
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
                        var sanpham = model.QuyTrinhTrongCay.Find(id);
                        if (sanpham == null)
                            return Content("KHONGTONTAI");

                        var lstSp = model.SanPhamRauNhaTrong.Where(r => r.id_quytrinhtrongcay == id).ToList();
                        foreach (var items in lstSp)
                        {
                            items.id_quytrinhtrongcay = null;
                            model.Entry(items).State = EntityState.Modified;
                        }
                        model.SaveChanges();

                        model.CacBuocQuyTrinhTrongCay.RemoveRange(sanpham.CacBuocQuyTrinhTrongCay);
                        model.QuyTrinhTrongCay.Remove(sanpham);
                        model.SaveChanges();
                    }
                }
                else
                {
                    int id = Int32.Parse(lstId);
                    var sanpham = model.QuyTrinhTrongCay.Find(id);
                    if (sanpham == null)
                        return Content("KHONGTONTAI");

                    var lstSp = model.SanPhamRauNhaTrong.Where(r => r.id_quytrinhtrongcay == id).ToList();
                    foreach (var item in lstSp)
                    {
                        item.id_quytrinhtrongcay = null;
                        model.Entry(item).State = EntityState.Modified;
                    }
                    model.SaveChanges();

                    model.CacBuocQuyTrinhTrongCay.RemoveRange(sanpham.CacBuocQuyTrinhTrongCay);
                    model.QuyTrinhTrongCay.Remove(sanpham);
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