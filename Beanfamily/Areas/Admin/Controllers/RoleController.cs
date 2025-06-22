using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using Beanfamily.Middlewall;
using System.Data.Entity;

namespace Beanfamily.Areas.Admin.Controllers
{
    [AdminLoginverification]
    public class RoleController : Controller
    {
        BeanfamilyEntities model = new BeanfamilyEntities();
        // GET: Admin/Role
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
            Session["active-tkb-pq"] = " # show # active";
            Session["active-tkb-tk"] = " # show # ";
            Session["active-ddh"] = "collapsed # # ";
            Session["active-ddbt"] = "collapsed # # ";
            Session["active-ddbb"] = "collapsed # # "; Session["active-lhdb"] = "collapsed # # ";
            Session["active-hab"] = "collapsed # # ";
            Session["active-qlsp"] = "collapsed # # ";
            Session["active-tlc-ttw"] = "collapsed # # ";
            Session["active-tlc-lkmxh"] = "collapsed # # "; Session["active-ndt"] = "collapsed # # "; Session["active-cs"] = "collapsed # # ";

            if (Session["tkb-pq"] == null)
                return RedirectToAction("index", "dashboard");

            var lstRole = model.QuyenTaiKhoanBean.ToList();

            int idRole = Int32.Parse(Session["user-role-id"].ToString());
            var chophepthemsuaxoa = model.ApDungChucNangChoQuyenTaiKhoan.FirstOrDefault(a => a.id_quyentaikhoanbean == idRole
            && a.ChucNangHeThongBean.keycode.Equals("tkb-pq"));
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

            return View("index", lstRole);
        }
        [HttpPost]
        public ActionResult AddRole(string name, string lstFunction)
        {
            try
            {
                var checkrole = model.QuyenTaiKhoanBean.FirstOrDefault(r => r.name.ToLower().Equals(name.ToLower().Trim()));
                if (checkrole != null)
                {
                    return Content("DATONTAI");
                }
                QuyenTaiKhoanBean role = new QuyenTaiKhoanBean();
                role.name = name;
                role.ngaytao = DateTime.Now;
                role.ngaysuadoi = DateTime.Now;

                model.QuyenTaiKhoanBean.Add(role);
                model.SaveChanges();

                int idRole = role.id;
                foreach (var lstFunc in lstFunction.Split('#').ToList())
                {
                    int idFunc = Convert.ToInt32(lstFunc.Split('-')[0]);
                    bool them = Convert.ToBoolean(lstFunc.Split('-')[1]);
                    bool sua = Convert.ToBoolean(lstFunc.Split('-')[2]);
                    bool xoa = Convert.ToBoolean(lstFunc.Split('-')[3]);
                    ApDungChucNangChoQuyenTaiKhoan apDung = new ApDungChucNangChoQuyenTaiKhoan();
                    apDung.id_chucnanghethongbean = idFunc;
                    apDung.id_quyentaikhoanbean = idRole;
                    apDung.chophepthem = them;
                    apDung.chophepsua = sua;
                    apDung.chophepxoa = xoa;
                    model.ApDungChucNangChoQuyenTaiKhoan.Add(apDung);
                }
                model.SaveChanges();
                return Content("SUCCESS");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult ShowViewEdit(int id)
        {
            try
            {
                var role = model.QuyenTaiKhoanBean.Find(id);
                if (role == null)
                    return Content("KHONGTONTAI");
                return PartialView("_EditView", role);
            }
            catch (Exception ex)
            {

                return Content("Chi tiết lỗi: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult EditRole(int id, string name, string lstFunction)
        {
            try
            {
                var checkrole = model.QuyenTaiKhoanBean.FirstOrDefault(r => r.name.ToLower().Equals(name.ToLower().Trim()) && r.id != id);
                if (checkrole != null)
                {
                    return Content("DATONTAI");
                }

                var role = model.QuyenTaiKhoanBean.Find(id);
                if (role == null)
                    return Content("KHONGTONTAI");

                role.name = name;
                role.ngaysuadoi = DateTime.Now;
                model.Entry(role).State = EntityState.Modified;
                model.ApDungChucNangChoQuyenTaiKhoan.RemoveRange(role.ApDungChucNangChoQuyenTaiKhoan);
                model.SaveChanges();

                foreach (var lstFunc in lstFunction.Split('#').ToList())
                {
                    int idFunc = Convert.ToInt32(lstFunc.Split('-')[0]);
                    bool them = Convert.ToBoolean(lstFunc.Split('-')[1]);
                    bool sua = Convert.ToBoolean(lstFunc.Split('-')[2]);
                    bool xoa = Convert.ToBoolean(lstFunc.Split('-')[3]);
                    ApDungChucNangChoQuyenTaiKhoan apDung = new ApDungChucNangChoQuyenTaiKhoan();
                    apDung.id_chucnanghethongbean = idFunc;
                    apDung.id_quyentaikhoanbean = id;
                    apDung.chophepthem = them;
                    apDung.chophepsua = sua;
                    apDung.chophepxoa = xoa;
                    model.ApDungChucNangChoQuyenTaiKhoan.Add(apDung);
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
        public ActionResult RemoveRole(int id)
        {
            try
            {
                var role = model.QuyenTaiKhoanBean.Find(id);
                if (role == null)
                    return Content("KHONGTONTAI");

                model.ApDungChucNangChoQuyenTaiKhoan.RemoveRange(role.ApDungChucNangChoQuyenTaiKhoan);
                model.QuyenTaiKhoanBean.Remove(role);
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
                        var dm = model.QuyenTaiKhoanBean.Find(id);
                        model.ApDungChucNangChoQuyenTaiKhoan.RemoveRange(dm.ApDungChucNangChoQuyenTaiKhoan);
                        model.QuyenTaiKhoanBean.Remove(dm);
                        model.SaveChanges();
                    }
                }
                else
                {
                    int id = Int32.Parse(lstId);
                    var dm = model.QuyenTaiKhoanBean.Find(id);
                    model.ApDungChucNangChoQuyenTaiKhoan.RemoveRange(dm.ApDungChucNangChoQuyenTaiKhoan);
                    model.QuyenTaiKhoanBean.Remove(dm);
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