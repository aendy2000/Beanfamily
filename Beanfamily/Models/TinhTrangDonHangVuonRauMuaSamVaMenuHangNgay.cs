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
    
    public partial class TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay
    {
        public int id { get; set; }
        public int id_donhangvuonraumuasamvathucdonhangngay { get; set; }
        public Nullable<int> id_taikhoanbean { get; set; }
        public string tieude { get; set; }
        public string noidung { get; set; }
        public System.DateTime thoigian { get; set; }
    
        public virtual DonHangVuonRauMuaSamVaMenuHangNgay DonHangVuonRauMuaSamVaMenuHangNgay { get; set; }
        public virtual TaiKhoanBean TaiKhoanBean { get; set; }
    }
}
