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
    
    public partial class SanPhamMenuBuffet
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SanPhamMenuBuffet()
        {
            this.ChiTietDonHangSanPhamMenuBuffet = new HashSet<ChiTietDonHangSanPhamMenuBuffet>();
        }
    
        public int id { get; set; }
        public int id_danhmucmenubuffetcap1 { get; set; }
        public int sothutu { get; set; }
        public string hinhanh { get; set; }
        public string tensanpham { get; set; }
        public bool hienthi { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietDonHangSanPhamMenuBuffet> ChiTietDonHangSanPhamMenuBuffet { get; set; }
        public virtual DanhMucMenuBuffetCap1 DanhMucMenuBuffetCap1 { get; set; }
    }
}
