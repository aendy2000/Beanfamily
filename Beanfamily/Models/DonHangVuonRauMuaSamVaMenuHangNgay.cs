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
    
    public partial class DonHangVuonRauMuaSamVaMenuHangNgay
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DonHangVuonRauMuaSamVaMenuHangNgay()
        {
            this.ChiTietDonHangVuonRauMuaSamVaMenuHangNgay = new HashSet<ChiTietDonHangVuonRauMuaSamVaMenuHangNgay>();
            this.TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay = new HashSet<TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay>();
        }
    
        public int id { get; set; }
        public Nullable<int> id_taikhoankhkachhang { get; set; }
        public string hoten { get; set; }
        public string dienthoai { get; set; }
        public string email { get; set; }
        public string diachi { get; set; }
        public System.DateTime ngaydat { get; set; }
        public string hinhthucthanhtoan { get; set; }
        public string tinhtrangdonhang { get; set; }
        public string ghichu { get; set; }
        public string yeucaukhac { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietDonHangVuonRauMuaSamVaMenuHangNgay> ChiTietDonHangVuonRauMuaSamVaMenuHangNgay { get; set; }
        public virtual TaiKhoanKhachHang TaiKhoanKhachHang { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay> TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay { get; set; }
    }
}