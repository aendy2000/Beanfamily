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
    
    public partial class DonHangMenuBuffet
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DonHangMenuBuffet()
        {
            this.ChiTietDonHangDanhMucPhucVuMenuBuffet = new HashSet<ChiTietDonHangDanhMucPhucVuMenuBuffet>();
            this.ChiTietDonHangSanPhamMenuBuffet = new HashSet<ChiTietDonHangSanPhamMenuBuffet>();
            this.LichSuThanhToanDonHangTongHop = new HashSet<LichSuThanhToanDonHangTongHop>();
            this.LienHeDatBan = new HashSet<LienHeDatBan>();
            this.TinhTrangDonHangMenuBuffet = new HashSet<TinhTrangDonHangMenuBuffet>();
        }
    
        public int id { get; set; }
        public string madonhang { get; set; }
        public decimal giamon { get; set; }
        public System.DateTime ngaytao { get; set; }
        public int soban { get; set; }
        public string hoten { get; set; }
        public string sdt { get; set; }
        public string email { get; set; }
        public System.DateTime ngaybatdau { get; set; }
        public string giobatdau { get; set; }
        public string ghichukhachhang { get; set; }
        public string ghichuquantrivien { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietDonHangDanhMucPhucVuMenuBuffet> ChiTietDonHangDanhMucPhucVuMenuBuffet { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietDonHangSanPhamMenuBuffet> ChiTietDonHangSanPhamMenuBuffet { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LichSuThanhToanDonHangTongHop> LichSuThanhToanDonHangTongHop { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LienHeDatBan> LienHeDatBan { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TinhTrangDonHangMenuBuffet> TinhTrangDonHangMenuBuffet { get; set; }
    }
}
