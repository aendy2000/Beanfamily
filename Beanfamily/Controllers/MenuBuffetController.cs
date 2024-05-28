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
                DonHangMenuTiecBan donhang = new DonHangMenuTiecBan();
                donhang.ngaytao = DateTime.Now;
                donhang.trangthai = "new";
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

                return Content("SUCCESS-" + madonhang);
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
    }
}