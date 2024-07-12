using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beanfamily.Middlewall
{
    public class AdminLoginverification : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                if (filterContext.HttpContext.Session["user-id"] == null)
                {
                    filterContext.HttpContext.Response.StatusCode = 403;
                    filterContext.Result = new JsonResult { Data = "SystemLoginAgain", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                    return;
                }
            }
            else
            {
                if (filterContext.HttpContext.Session["user-id"] == null)
                {
                    filterContext.Result = new RedirectResult("~/admin/dangnhap");
                    return;
                }
            }
        }
    }
}