//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Beanfamily.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ChiTietDonHangSanPhamMenuTiecBan
    {
        public int id { get; set; }
        public int id_donhangmenutiecban { get; set; }
        public int id_sanphammenutiecban { get; set; }
        public string hinhanh { get; set; }
        public string tensanpham { get; set; }
        public decimal gia { get; set; }
    
        public virtual DonHangMenuTiecBan DonHangMenuTiecBan { get; set; }
        public virtual SanPhamMenuTiecBan SanPhamMenuTiecBan { get; set; }
    }
}
