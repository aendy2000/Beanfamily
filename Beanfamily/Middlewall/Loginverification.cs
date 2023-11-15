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
            if (filterContext.HttpContext.Session["user-role"] == null)
            {
                filterContext.Result = new RedirectResult("~/admin/account/dangnhap");
                return;
            }
            else
            {
                filterContext.Result = new RedirectResult("~/admin");
                return;
            }
        }
    }
}