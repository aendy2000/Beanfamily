using Beanfamily.Middlewall;
using Beanfamily.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class ChinhSachController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();

        // GET: Admin/ChinhSachBean
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
            Session["active-ddbb"] = "collapsed # # ";
            Session["active-lhdb"] = "collapsed # # ";
            Session["active-hab"] = "collapsed # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # ";
            Session["active-ndt"] = "collapsed # # "; 
            Session["active-cs"] = " # # ";

            if (Session["lhdb"] == null)
                return RedirectToAction("index", "dashboard");

            var cs = model.ChinhSachBean.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("lhdb"));
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

            return View("Index", cs.OrderByDescending(o => o.id).ToList());
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ThemMoi(string tenchinhsach, string noidung, bool hienthi, string sothutu)
        {
            try
            {
                var checkExist = model.ChinhSachBean.FirstOrDefault(d => d.tenchinhsach.ToLower().Equals(tenchinhsach.ToLower().Trim()));
                if (checkExist != null)
                    return Content("EXIST");

                ChinhSachBean cs = new ChinhSachBean();
                cs.tenchinhsach = tenchinhsach;
                cs.noidung = noidung;
                cs.hienthi = hienthi;
                if (!string.IsNullOrEmpty(sothutu))
                    cs.sothutu = Int32.Parse(sothutu);
                else
                    cs.sothutu = 0;

                model.ChinhSachBean.Add(cs);
                model.SaveChanges();
                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ChinhSua(int id, string tenchinhsach, string noidung, bool hienthi, string sothutu)
        {
            try
            {
                var checkExist = model.ChinhSachBean.FirstOrDefault(d => d.tenchinhsach.ToLower().Equals(tenchinhsach.ToLower().Trim()) && d.id != id);
                if (checkExist != null)
                    return Content("EXIST");

                var cs = model.ChinhSachBean.Find(id);
                if (cs == null)
                    return Content("KHONGTONTAI");

                cs.tenchinhsach = tenchinhsach;
                cs.noidung = noidung;
                cs.hienthi = hienthi;
                if (!string.IsNullOrEmpty(sothutu))
                    cs.sothutu = Int32.Parse(sothutu);
                else
                    cs.sothutu = 0;

                model.Entry(cs).State = System.Data.Entity.EntityState.Modified;
                model.SaveChanges();
                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Xoa(int id)
        {
            try
            {
                var cs = model.ChinhSachBean.Find(id);
                if (cs == null)
                    return Content("KHONGTONTAI");
                model.ChinhSachBean.Remove(cs);
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
                        var cs = model.ChinhSachBean.Find(id);
                        model.ChinhSachBean.Remove(cs);
                        model.SaveChanges();
                    }
                }
                else
                {
                    int id = Int32.Parse(lstId);
                    var cs = model.ChinhSachBean.Find(id);
                    model.ChinhSachBean.Remove(cs);
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