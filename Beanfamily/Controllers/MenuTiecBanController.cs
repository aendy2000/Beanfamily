using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Mvc;
using Beanfamily.Models;
using PagedList;

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

                return PartialView("_DatBanModal", lstSp);
            }
            catch (Exception Ex)
            {
                return Content("Chi tiết lỗi: " + Ex.Message);
            }
        }
    }
}