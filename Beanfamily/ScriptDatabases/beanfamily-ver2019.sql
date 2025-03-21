USE [Beanfamily]
GO
/****** Object:  Table [dbo].[ApDungChucNangChoQuyenTaiKhoan]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApDungChucNangChoQuyenTaiKhoan](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_chucnanghethongbean] [int] NOT NULL,
	[id_quyentaikhoanbean] [int] NOT NULL,
	[chophepthem] [bit] NOT NULL,
	[chophepsua] [bit] NOT NULL,
	[chophepxoa] [bit] NOT NULL,
 CONSTRAINT [PK_ApDungChucNangChoQuyenTaiKhoan] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CacBuocQuyTrinhTrongCay]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CacBuocQuyTrinhTrongCay](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_quytrinhtrongcay] [int] NOT NULL,
	[sobuoc] [nvarchar](max) NOT NULL,
	[motabuoc] [nvarchar](max) NULL,
	[hinhanh] [nvarchar](max) NULL,
	[ngaytao] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
 CONSTRAINT [PK_CacBuocQuyTrinhTrongCay] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietDonHangDanhMucPhucVuMenuBuffet]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietDonHangDanhMucPhucVuMenuBuffet](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_donhangmenubuffet] [int] NOT NULL,
	[id_danhmucphucvu] [int] NOT NULL,
	[tendanhmuc] [nvarchar](200) NOT NULL,
	[gia] [money] NOT NULL,
	[giatheosoban] [bit] NOT NULL,
	[ngaytao] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
	[apdungmenutiecban] [bit] NOT NULL,
	[apdungmenubuffet] [bit] NOT NULL,
 CONSTRAINT [PK_DonHangDanhMucPhucVuMenuBuffet] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietDonHangDanhMucPhucVuMenuTiecBan]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietDonHangDanhMucPhucVuMenuTiecBan](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_donhangmenutiecban] [int] NOT NULL,
	[id_danhmucphucvu] [int] NOT NULL,
	[tendanhmuc] [nvarchar](200) NOT NULL,
	[gia] [money] NOT NULL,
	[giatheosoban] [bit] NOT NULL,
	[ngaytao] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
	[apdungmenutiecban] [bit] NOT NULL,
	[apdungmenubuffet] [bit] NOT NULL,
 CONSTRAINT [PK_ChiTietDonHangDanhMucPhucVuMenuTiecBan] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietDonHangSanPhamMenuBuffet]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietDonHangSanPhamMenuBuffet](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_donhangmenubuffet] [int] NOT NULL,
	[id_sanphammenubuffet] [int] NOT NULL,
	[hinhanh] [nvarchar](max) NULL,
	[tensanpham] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK_ChiTietDonHangSanPhamMenuBuffet] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietDonHangSanPhamMenuTiecBan]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietDonHangSanPhamMenuTiecBan](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_donhangmenutiecban] [int] NOT NULL,
	[id_sanphammenutiecban] [int] NOT NULL,
	[hinhanh] [nvarchar](max) NULL,
	[tensanpham] [nvarchar](200) NOT NULL,
	[gia] [money] NOT NULL,
 CONSTRAINT [PK_ChiTietDonHangSanPhamMenuTiecBan] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietDonHangSanPhamMuaSam]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietDonHangSanPhamMuaSam](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_donhangvuonraumuasamvamenuhangngay] [int] NOT NULL,
	[id_sanphammuasam] [int] NOT NULL,
	[hinhanh] [nvarchar](max) NULL,
	[video] [nvarchar](max) NULL,
	[tensanpham] [nvarchar](200) NOT NULL,
	[mota] [nvarchar](max) NULL,
	[tenloaitonkho] [nvarchar](200) NOT NULL,
	[gia] [money] NOT NULL,
	[soluongmua] [int] NOT NULL,
 CONSTRAINT [PK_ChiTietDonHangSanPhamMuaSam] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietDonHangSanPhamRauNhaTrong]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietDonHangSanPhamRauNhaTrong](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_donhangvuonraumuasamvamenuhangngay] [int] NOT NULL,
	[id_sanphamraunhatrong] [int] NOT NULL,
	[hinhanh] [nvarchar](max) NULL,
	[video] [nvarchar](max) NULL,
	[tensanpham] [nvarchar](200) NOT NULL,
	[donvi] [nvarchar](200) NOT NULL,
	[giatritrendonvi] [int] NOT NULL,
	[gia] [money] NOT NULL,
	[mota] [nvarchar](max) NULL,
	[soluongmua] [int] NOT NULL,
 CONSTRAINT [PK_ChiTietDonHangSanPhamRauNhaTrong] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietDonHangSanPhamThucDonHangNgay]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietDonHangSanPhamThucDonHangNgay](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_donhangvuonraumuasamvamenuhangngay] [int] NOT NULL,
	[id_sanphamthucdonhangngay] [int] NOT NULL,
	[hinhanh] [nvarchar](max) NULL,
	[video] [nvarchar](max) NULL,
	[tensanpham] [nvarchar](200) NOT NULL,
	[gia] [money] NOT NULL,
	[mota] [nvarchar](max) NULL,
	[soluongmua] [int] NOT NULL,
 CONSTRAINT [PK_ChiTietDonHangSanPhamThucDonHangNgay] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChucNangHeThongBean]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChucNangHeThongBean](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tenchucnang] [nvarchar](200) NOT NULL,
	[hiethi] [bit] NOT NULL,
	[ngaytao] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
	[keycode] [varchar](50) NULL,
 CONSTRAINT [PK_ChucNangHeThongBean] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhMucMenuBuffetCap1]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhMucMenuBuffetCap1](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sothutu] [int] NOT NULL,
	[tendanhmuc] [nvarchar](200) NOT NULL,
	[ngaytao] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
	[hienthi] [bit] NOT NULL,
 CONSTRAINT [PK_DanhMucMenuBuffetCap1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhMucMenuTiecBanCap1]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhMucMenuTiecBanCap1](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sothutu] [int] NOT NULL,
	[tendanhmuc] [nvarchar](200) NOT NULL,
	[ngaytao] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
	[hienthi] [bit] NOT NULL,
 CONSTRAINT [PK_DanhMucMenuTiecBanCap1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhMucPhucVuMenuTiecBanVaMenuBuffet]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhMucPhucVuMenuTiecBanVaMenuBuffet](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sothutu] [int] NOT NULL,
	[tendanhmuc] [nvarchar](200) NOT NULL,
	[gia] [money] NOT NULL,
	[giatheosoban] [bit] NOT NULL,
	[ngaytao] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
	[hienthi] [bit] NOT NULL,
	[apdungmenutiecban] [bit] NOT NULL,
	[apdungmenubuffet] [bit] NOT NULL,
 CONSTRAINT [PK_DanhMucPhucVuMenuTiecBanVaMenuBuffet] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhMucSanPhamMuaSamCap1]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhMucSanPhamMuaSamCap1](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sothutu] [int] NOT NULL,
	[tendanhmuc] [nvarchar](200) NOT NULL,
	[ngaytao] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
	[hienthi] [bit] NOT NULL,
 CONSTRAINT [PK_DanhMucSanPhamMuaSamCap1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhMucSanPhamRauNhaTrongCap1]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhMucSanPhamRauNhaTrongCap1](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sothutu] [int] NOT NULL,
	[tendanhmuc] [nvarchar](200) NOT NULL,
	[ngaytao] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
	[hienthi] [bit] NOT NULL,
 CONSTRAINT [PK_DanhMucSanPhamRauNhaTrongCap1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhMucThucDocHangNgayCap1]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhMucThucDocHangNgayCap1](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sothutu] [int] NOT NULL,
	[tendanhmuc] [nvarchar](200) NOT NULL,
	[ngaytao] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
	[hienthi] [bit] NOT NULL,
 CONSTRAINT [PK_DanhMucThucDocHangNgay] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DonHangMenuBuffet]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DonHangMenuBuffet](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[madonhang] [nvarchar](200) NULL,
	[giamon] [money] NOT NULL,
	[ngaytao] [datetime] NOT NULL,
	[soban] [int] NOT NULL,
	[hoten] [nvarchar](200) NOT NULL,
	[sdt] [nvarchar](12) NOT NULL,
	[email] [nvarchar](max) NULL,
	[ngaybatdau] [datetime] NOT NULL,
	[giobatdau] [nvarchar](10) NOT NULL,
	[ghichukhachhang] [nvarchar](200) NULL,
	[ghichuquantrivien] [nvarchar](max) NULL,
 CONSTRAINT [PK_DonHangMenuBuffet] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DonHangMenuTiecBan]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DonHangMenuTiecBan](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[madonhang] [nvarchar](200) NULL,
	[ngaytao] [datetime] NOT NULL,
	[soban] [int] NOT NULL,
	[hoten] [nvarchar](200) NOT NULL,
	[sdt] [nvarchar](12) NOT NULL,
	[email] [nvarchar](max) NULL,
	[ngaybatdau] [datetime] NOT NULL,
	[giobatdau] [nvarchar](10) NOT NULL,
	[ghichukhachhang] [nvarchar](200) NULL,
	[ghichuquantrivien] [nvarchar](max) NULL,
 CONSTRAINT [PK_DonHangMenuTiecBan] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DonHangVuonRauMuaSamVaMenuHangNgay]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DonHangVuonRauMuaSamVaMenuHangNgay](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[madonhang] [nvarchar](200) NULL,
	[id_taikhoankhkachhang] [int] NULL,
	[hoten] [nvarchar](200) NOT NULL,
	[dienthoai] [nvarchar](12) NOT NULL,
	[email] [nvarchar](200) NOT NULL,
	[ghichu] [nvarchar](200) NULL,
	[diachi] [nvarchar](200) NULL,
	[tinh] [nvarchar](200) NULL,
	[quanhuyen] [nvarchar](200) NULL,
	[phuongxa] [nvarchar](200) NULL,
	[ngaydat] [datetime] NOT NULL,
	[hinhthucthanhtoan] [nvarchar](200) NOT NULL,
	[giaohangtannoi] [bit] NOT NULL,
	[yeucaukhac] [nvarchar](max) NULL,
 CONSTRAINT [PK_DonHangVuonRauMuaSamVaMenuHangNgay] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GioHangMuaSam]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GioHangMuaSam](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_sanpham] [int] NOT NULL,
	[id_loaitonkho] [int] NOT NULL,
	[id_taikhoankhachhang] [int] NOT NULL,
	[soluong] [int] NOT NULL,
	[addDate] [datetime] NOT NULL,
 CONSTRAINT [PK_GioHangMuaSam] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GioHangThucDonHangNgay]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GioHangThucDonHangNgay](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_taikhoankhachhang] [int] NOT NULL,
	[id_sanpham] [int] NOT NULL,
	[soluong] [int] NOT NULL,
	[addDate] [datetime] NOT NULL,
 CONSTRAINT [PK_GioHangThucDonHangNgay] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GioHangVuonRauBean]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GioHangVuonRauBean](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_sanpham] [int] NOT NULL,
	[id_taikhoankhachhang] [int] NOT NULL,
	[soluong] [int] NOT NULL,
	[addDate] [datetime] NOT NULL,
 CONSTRAINT [PK_GioHangVuonRauBean] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HinhAnhBean]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HinhAnhBean](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[url] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_HinhAnhBean] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LichSuThanhToanDonHangTongHop]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LichSuThanhToanDonHangTongHop](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[madonhang] [nvarchar](200) NOT NULL,
	[id_donhangmenutiecban] [int] NULL,
	[id_donhangmenubuffet] [int] NULL,
	[id_donhangvuonraumuasamvamenuhangngay] [int] NULL,
	[id_taikhoanbean] [int] NOT NULL,
	[sotien] [money] NOT NULL,
	[thoigian] [datetime] NOT NULL,
	[tieude] [nvarchar](200) NULL,
	[noidung] [nvarchar](max) NULL,
	[tenkhachhang] [nvarchar](200) NULL,
	[sdtkhachhang] [nvarchar](12) NULL,
 CONSTRAINT [PK_LichSuThanhToanDonHangTongHop] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NoiDungSEO]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NoiDungSEO](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[SEOtitle] [nvarchar](max) NULL,
	[SEOkeyword] [nvarchar](max) NULL,
	[SEOdescription] [nvarchar](max) NULL,
 CONSTRAINT [PK_NoiDungSeo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QuyenTaiKhoanBean]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuyenTaiKhoanBean](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](200) NOT NULL,
	[ngaytao] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
 CONSTRAINT [PK_QuyenTaiKhoanBean] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QuyTrinhTrongCay]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuyTrinhTrongCay](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tenquytrinhtrongcay] [nvarchar](200) NOT NULL,
	[video] [nvarchar](max) NULL,
	[ngaytao] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
	[luotxem] [decimal](18, 0) NOT NULL,
	[hienthi] [bit] NOT NULL,
 CONSTRAINT [PK_QuyTrinhTrongCay] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPhamMenuBuffet]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPhamMenuBuffet](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_danhmucmenubuffetcap1] [int] NOT NULL,
	[sothutu] [int] NOT NULL,
	[hinhanh] [nvarchar](max) NULL,
	[tensanpham] [nvarchar](200) NOT NULL,
	[hienthi] [bit] NOT NULL,
 CONSTRAINT [PK_SanPhamMenuBuffet] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPhamMenuTiecBan]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPhamMenuTiecBan](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_danhmucmenutiecbancap1] [int] NOT NULL,
	[sothutu] [int] NOT NULL,
	[hinhanh] [nvarchar](max) NULL,
	[tensanpham] [nvarchar](200) NOT NULL,
	[gia] [money] NOT NULL,
	[hienthi] [bit] NOT NULL,
 CONSTRAINT [PK_SanPhamMenuTiecBan] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPhamMuaSam]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPhamMuaSam](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_danhmucmuasamcap1] [int] NOT NULL,
	[hinhanh] [nvarchar](max) NULL,
	[video] [nvarchar](max) NULL,
	[tensanpham] [nvarchar](200) NOT NULL,
	[mota] [nvarchar](max) NULL,
	[luotxem] [decimal](18, 0) NOT NULL,
	[hienthi] [bit] NOT NULL,
 CONSTRAINT [PK_SanPhamMuaSam] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPhamRauNhaTrong]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPhamRauNhaTrong](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_danhmucsanphamraunhatrongcap1] [int] NOT NULL,
	[id_quytrinhtrongcay] [int] NULL,
	[hinhanh] [nvarchar](max) NULL,
	[video] [nvarchar](max) NULL,
	[tensanpham] [nvarchar](200) NOT NULL,
	[donvi] [nvarchar](200) NOT NULL,
	[giatritrendonvi] [int] NOT NULL,
	[gia] [money] NOT NULL,
	[mota] [nvarchar](max) NULL,
	[luotxem] [decimal](18, 0) NOT NULL,
	[hienthi] [bit] NOT NULL,
 CONSTRAINT [PK_SanPhamRauNhaTrong] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPhamThucDonHangNgay]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPhamThucDonHangNgay](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_danhmucthucdonhangngaycap1] [int] NOT NULL,
	[hinhanh] [nvarchar](max) NULL,
	[video] [nvarchar](max) NULL,
	[tensanpham] [nvarchar](200) NOT NULL,
	[gia] [money] NOT NULL,
	[mota] [nvarchar](max) NULL,
	[luotxem] [decimal](18, 0) NOT NULL,
	[hienthi] [bit] NOT NULL,
	[conhang] [bit] NOT NULL,
 CONSTRAINT [PK_SanPhamThucDonHangNgay] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaiKhoanBean]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaiKhoanBean](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](200) NOT NULL,
	[password] [nvarchar](200) NOT NULL,
	[hovaten] [nvarchar](200) NULL,
	[sodienthoai] [nvarchar](12) NULL,
	[email] [nvarchar](200) NULL,
	[ngaysinh] [nvarchar](10) NULL,
	[gioitinh] [nvarchar](10) NULL,
	[diachi] [nvarchar](max) NULL,
	[id_quyentaikhoanbean] [int] NOT NULL,
	[chucdanh] [nvarchar](200) NULL,
	[ngaythamgia] [datetime] NOT NULL,
	[ngaysuadoi] [datetime] NOT NULL,
	[khoataikhoan] [bit] NOT NULL,
	[solansaimatkhautoida] [int] NOT NULL,
	[solandasaimatkhau] [int] NOT NULL,
	[hinhdaidien] [nvarchar](max) NULL,
 CONSTRAINT [PK_TaiKhoanBean] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaiKhoanKhachHang]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaiKhoanKhachHang](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[password] [nvarchar](200) NOT NULL,
	[hovaten] [nvarchar](200) NOT NULL,
	[sodienthoai] [nvarchar](12) NOT NULL,
	[email] [nvarchar](200) NOT NULL,
	[ngaysinh] [nvarchar](10) NULL,
	[gioitinh] [nvarchar](10) NULL,
	[diachi] [nvarchar](max) NULL,
	[ngaytao] [datetime] NOT NULL,
	[dangnhaplancuoi] [datetime] NOT NULL,
	[taikhoankhoa] [bit] NOT NULL,
	[maxacnhan] [nvarchar](6) NULL,
	[thoihanma] [datetime] NULL,
 CONSTRAINT [PK_TaiKhoanKhachHang] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TinhTrangDonHangMenuBuffet]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TinhTrangDonHangMenuBuffet](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_donhangmenubuffet] [int] NOT NULL,
	[tieude] [nvarchar](200) NOT NULL,
	[noidung] [nvarchar](max) NOT NULL,
	[thoigian] [datetime] NOT NULL,
	[id_taikhoanbean] [int] NULL,
 CONSTRAINT [PK_TinhTrangDonHangMenuBuffet] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TinhTrangDonHangMenuTiecBan]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TinhTrangDonHangMenuTiecBan](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_donhangmenutiecban] [int] NOT NULL,
	[tieude] [nvarchar](200) NOT NULL,
	[noidung] [nvarchar](max) NOT NULL,
	[thoigian] [datetime] NOT NULL,
	[id_taikhoanbean] [int] NULL,
 CONSTRAINT [PK_TinhTrangDonHangMenuTiecBan] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_donhangvuonraumuasamvathucdonhangngay] [int] NOT NULL,
	[id_taikhoanbean] [int] NULL,
	[tieude] [nvarchar](200) NOT NULL,
	[noidung] [nvarchar](max) NOT NULL,
	[thoigian] [datetime] NOT NULL,
 CONSTRAINT [PK_TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TonKhoSanPhamMuaSam]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TonKhoSanPhamMuaSam](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_sanphammuasam] [int] NOT NULL,
	[tenloai] [nvarchar](200) NOT NULL,
	[soluong] [int] NOT NULL,
	[gia] [money] NOT NULL,
 CONSTRAINT [PK_TonKhoSanPhamMuaSam] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ThongTinCauHinh]    Script Date: 12/07/2024 16:06:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThongTinCauHinh](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[giomocua] [nvarchar](max) NULL,
	[ngaymocua] [nvarchar](max) NULL,
	[diachi] [nvarchar](max) NULL,
	[email] [nvarchar](max) NULL,
	[sodienthoai] [nvarchar](max) NULL,
	[facebook] [nvarchar](max) NULL,
	[messenger] [nvarchar](max) NULL,
	[zalo] [nvarchar](max) NULL,
	[instagram] [nvarchar](max) NULL,
	[tiktok] [nvarchar](max) NULL,
	[coppyright] [nvarchar](max) NULL,
	[linkchiduong] [nvarchar](max) NULL,
	[toadogooglemapiframe] [nvarchar](max) NULL,
	[googleanalyst] [nvarchar](max) NULL,
	[googlesearchconsole] [nvarchar](max) NULL,
 CONSTRAINT [PK_ThongTinCauHinh] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ON 

INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (1, 1, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (2, 2, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (3, 3, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (4, 4, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (5, 5, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (6, 6, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (7, 7, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (8, 8, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (9, 9, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (10, 10, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (11, 11, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (12, 12, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (13, 13, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (14, 14, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (15, 15, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (16, 16, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (17, 17, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (18, 18, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (19, 19, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (20, 20, 1, 1, 1, 1)
INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] ([id], [id_chucnanghethongbean], [id_quyentaikhoanbean], [chophepthem], [chophepsua], [chophepxoa]) VALUES (21, 21, 1, 1, 1, 1)
SET IDENTITY_INSERT [dbo].[ApDungChucNangChoQuyenTaiKhoan] OFF
GO
SET IDENTITY_INSERT [dbo].[ChucNangHeThongBean] ON 

INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (1, N'Menu Tiệc Bàn - Danh Mục Cấp 1', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'mtb-dmc1')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (2, N'Menu Tiệc Bàn - Quản Lý Món', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'mtb-qlm')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (3, N'Menu Buffet - Danh Mục Cấp 1', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'mb-dmc1')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (4, N'Menu Buffet - Quản Lý Món', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'mb-qlm')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (5, N'Danh Mục Phục Vụ', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'dmpv')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (6, N'Menu Hằng Ngày - Danh Mục Cấp 1', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'mhn-dmc1')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (7, N'Menu Hằng Ngày - Quản Lý Món', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'mhn-qlm')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (8, N'Vườn Rau Bean - Danh Mục Cấp 1', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'vrb-dmc1')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (9, N'Vườn Rau Bean - Sản Phẩm Rau', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'vrb-spr')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (10, N'Vườn Rau Bean - Quy Trình Trồng Cây', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'vrb-qltc')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (11, N'Cửa Hàng Tiện Lợi - Danh Mục Cấp 1', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'chtl-dmc1')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (12, N'Cửa Hàng Tiện Lợi - Sản Phẩm', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'chtl-sp')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (13, N'Tài Khoản Bean - Phân Quyền', 1, CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime), N'tkb-pq')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (14, N'Tài Khoản Bean - Tài Khoản', 1, CAST(N'2023-11-15T00:00:00.000' AS DateTime), CAST(N'2023-11-15T00:00:00.000' AS DateTime), N'tkb-tk')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (15, N'Đơn Đặt Hàng', 1, CAST(N'2023-11-15T00:00:00.000' AS DateTime), CAST(N'2023-11-15T00:00:00.000' AS DateTime), N'ddh')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (16, N'Đơn Đặt Bàn Tiệc', 1, CAST(N'2023-11-15T00:00:00.000' AS DateTime), CAST(N'2023-11-15T00:00:00.000' AS DateTime), N'ddbt')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (17, N'Đơn Đặt Bàn Buffet', 1, CAST(N'2023-11-15T00:00:00.000' AS DateTime), CAST(N'2023-11-15T00:00:00.000' AS DateTime), N'ddbb')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (18, N'Hình Ảnh Bean', 1, CAST(N'2023-11-15T00:00:00.000' AS DateTime), CAST(N'2023-11-15T00:00:00.000' AS DateTime), N'hab')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (19, N'Quản Lý SEO Page', 1, CAST(N'2023-11-15T00:00:00.000' AS DateTime), CAST(N'2023-11-15T00:00:00.000' AS DateTime), N'qlsp')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (20, N'Thiết Lập Chung - Thông Tin Website', 1, CAST(N'2023-11-15T00:00:00.000' AS DateTime), CAST(N'2023-11-15T00:00:00.000' AS DateTime), N'tlc-ttw')
INSERT [dbo].[ChucNangHeThongBean] ([id], [tenchucnang], [hiethi], [ngaytao], [ngaysuadoi], [keycode]) VALUES (21, N'Thiết Lập Chung - Liên Kết Mạng Xã Hội', 1, CAST(N'2023-11-15T00:00:00.000' AS DateTime), CAST(N'2023-11-15T00:00:00.000' AS DateTime), N'tlc-lkmxh')
SET IDENTITY_INSERT [dbo].[ChucNangHeThongBean] OFF
GO
SET IDENTITY_INSERT [dbo].[QuyenTaiKhoanBean] ON 

INSERT [dbo].[QuyenTaiKhoanBean] ([id], [name], [ngaytao], [ngaysuadoi]) VALUES (1, N'Người Sở Hữu', CAST(N'2023-11-15T16:20:03.000' AS DateTime), CAST(N'2023-11-15T16:20:03.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[QuyenTaiKhoanBean] OFF
GO
SET IDENTITY_INSERT [dbo].[TaiKhoanBean] ON 

INSERT [dbo].[TaiKhoanBean] ([id], [username], [password], [hovaten], [sodienthoai], [email], [ngaysinh], [gioitinh], [diachi], [id_quyentaikhoanbean], [chucdanh], [ngaythamgia], [ngaysuadoi], [khoataikhoan], [solansaimatkhautoida], [solandasaimatkhau], [hinhdaidien]) VALUES (1, N'admin', N'123', N'Adminstrator', N'', N'info@aendy.net', N'', N'', N'', 1, N'Quản trị hệ thống', CAST(N'2023-11-15T00:00:00.000' AS DateTime), CAST(N'2023-11-15T00:00:00.000' AS DateTime), 0, 5, 0, N'')
SET IDENTITY_INSERT [dbo].[TaiKhoanBean] OFF
GO
ALTER TABLE [dbo].[ApDungChucNangChoQuyenTaiKhoan]  WITH CHECK ADD  CONSTRAINT [FK_ApDungChucNangChoQuyenTaiKhoan_ChucNangHeThongBean] FOREIGN KEY([id_chucnanghethongbean])
REFERENCES [dbo].[ChucNangHeThongBean] ([id])
GO
ALTER TABLE [dbo].[ApDungChucNangChoQuyenTaiKhoan] CHECK CONSTRAINT [FK_ApDungChucNangChoQuyenTaiKhoan_ChucNangHeThongBean]
GO
ALTER TABLE [dbo].[ApDungChucNangChoQuyenTaiKhoan]  WITH CHECK ADD  CONSTRAINT [FK_ApDungChucNangChoQuyenTaiKhoan_QuyenTaiKhoanBean] FOREIGN KEY([id_quyentaikhoanbean])
REFERENCES [dbo].[QuyenTaiKhoanBean] ([id])
GO
ALTER TABLE [dbo].[ApDungChucNangChoQuyenTaiKhoan] CHECK CONSTRAINT [FK_ApDungChucNangChoQuyenTaiKhoan_QuyenTaiKhoanBean]
GO
ALTER TABLE [dbo].[CacBuocQuyTrinhTrongCay]  WITH CHECK ADD  CONSTRAINT [FK_CacBuocQuyTrinhTrongCay_QuyTrinhTrongCay] FOREIGN KEY([id_quytrinhtrongcay])
REFERENCES [dbo].[QuyTrinhTrongCay] ([id])
GO
ALTER TABLE [dbo].[CacBuocQuyTrinhTrongCay] CHECK CONSTRAINT [FK_CacBuocQuyTrinhTrongCay_QuyTrinhTrongCay]
GO
ALTER TABLE [dbo].[ChiTietDonHangDanhMucPhucVuMenuBuffet]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangDanhMucPhucVuMenuBuffet_DanhMucPhucVuMenuTiecBanVaMenuBuffet] FOREIGN KEY([id_danhmucphucvu])
REFERENCES [dbo].[DanhMucPhucVuMenuTiecBanVaMenuBuffet] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangDanhMucPhucVuMenuBuffet] CHECK CONSTRAINT [FK_ChiTietDonHangDanhMucPhucVuMenuBuffet_DanhMucPhucVuMenuTiecBanVaMenuBuffet]
GO
ALTER TABLE [dbo].[ChiTietDonHangDanhMucPhucVuMenuBuffet]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangDanhMucPhucVuMenuBuffet_DonHangMenuBuffet] FOREIGN KEY([id_donhangmenubuffet])
REFERENCES [dbo].[DonHangMenuBuffet] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangDanhMucPhucVuMenuBuffet] CHECK CONSTRAINT [FK_ChiTietDonHangDanhMucPhucVuMenuBuffet_DonHangMenuBuffet]
GO
ALTER TABLE [dbo].[ChiTietDonHangDanhMucPhucVuMenuTiecBan]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangDanhMucPhucVuMenuTiecBan_DanhMucPhucVuMenuTiecBanVaMenuBuffet] FOREIGN KEY([id_danhmucphucvu])
REFERENCES [dbo].[DanhMucPhucVuMenuTiecBanVaMenuBuffet] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangDanhMucPhucVuMenuTiecBan] CHECK CONSTRAINT [FK_ChiTietDonHangDanhMucPhucVuMenuTiecBan_DanhMucPhucVuMenuTiecBanVaMenuBuffet]
GO
ALTER TABLE [dbo].[ChiTietDonHangDanhMucPhucVuMenuTiecBan]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangDanhMucPhucVuMenuTiecBan_DonHangMenuTiecBan] FOREIGN KEY([id_donhangmenutiecban])
REFERENCES [dbo].[DonHangMenuTiecBan] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangDanhMucPhucVuMenuTiecBan] CHECK CONSTRAINT [FK_ChiTietDonHangDanhMucPhucVuMenuTiecBan_DonHangMenuTiecBan]
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamMenuBuffet]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangSanPhamMenuBuffet_DonHangMenuBuffet] FOREIGN KEY([id_donhangmenubuffet])
REFERENCES [dbo].[DonHangMenuBuffet] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamMenuBuffet] CHECK CONSTRAINT [FK_ChiTietDonHangSanPhamMenuBuffet_DonHangMenuBuffet]
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamMenuBuffet]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangSanPhamMenuBuffet_SanPhamMenuBuffet] FOREIGN KEY([id_sanphammenubuffet])
REFERENCES [dbo].[SanPhamMenuBuffet] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamMenuBuffet] CHECK CONSTRAINT [FK_ChiTietDonHangSanPhamMenuBuffet_SanPhamMenuBuffet]
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamMenuTiecBan]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangSanPhamMenuTiecBan_DonHangMenuTiecBan] FOREIGN KEY([id_donhangmenutiecban])
REFERENCES [dbo].[DonHangMenuTiecBan] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamMenuTiecBan] CHECK CONSTRAINT [FK_ChiTietDonHangSanPhamMenuTiecBan_DonHangMenuTiecBan]
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamMenuTiecBan]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangSanPhamMenuTiecBan_SanPhamMenuTiecBan] FOREIGN KEY([id_sanphammenutiecban])
REFERENCES [dbo].[SanPhamMenuTiecBan] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamMenuTiecBan] CHECK CONSTRAINT [FK_ChiTietDonHangSanPhamMenuTiecBan_SanPhamMenuTiecBan]
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamMuaSam]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangSanPhamMuaSam_DonHangVuonRauMuaSamVaMenuHangNgay] FOREIGN KEY([id_donhangvuonraumuasamvamenuhangngay])
REFERENCES [dbo].[DonHangVuonRauMuaSamVaMenuHangNgay] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamMuaSam] CHECK CONSTRAINT [FK_ChiTietDonHangSanPhamMuaSam_DonHangVuonRauMuaSamVaMenuHangNgay]
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamMuaSam]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangSanPhamMuaSam_SanPhamMuaSam] FOREIGN KEY([id_sanphammuasam])
REFERENCES [dbo].[SanPhamMuaSam] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamMuaSam] CHECK CONSTRAINT [FK_ChiTietDonHangSanPhamMuaSam_SanPhamMuaSam]
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamRauNhaTrong]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangSanPhamRauNhaTrong_DonHangVuonRauMuaSamVaMenuHangNgay] FOREIGN KEY([id_donhangvuonraumuasamvamenuhangngay])
REFERENCES [dbo].[DonHangVuonRauMuaSamVaMenuHangNgay] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamRauNhaTrong] CHECK CONSTRAINT [FK_ChiTietDonHangSanPhamRauNhaTrong_DonHangVuonRauMuaSamVaMenuHangNgay]
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamRauNhaTrong]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangSanPhamRauNhaTrong_SanPhamRauNhaTrong] FOREIGN KEY([id_sanphamraunhatrong])
REFERENCES [dbo].[SanPhamRauNhaTrong] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamRauNhaTrong] CHECK CONSTRAINT [FK_ChiTietDonHangSanPhamRauNhaTrong_SanPhamRauNhaTrong]
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamThucDonHangNgay]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangSanPhamThucDonHangNgay_DonHangVuonRauMuaSamVaMenuHangNgay] FOREIGN KEY([id_donhangvuonraumuasamvamenuhangngay])
REFERENCES [dbo].[DonHangVuonRauMuaSamVaMenuHangNgay] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamThucDonHangNgay] CHECK CONSTRAINT [FK_ChiTietDonHangSanPhamThucDonHangNgay_DonHangVuonRauMuaSamVaMenuHangNgay]
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamThucDonHangNgay]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHangSanPhamThucDonHangNgay_SanPhamThucDonHangNgay] FOREIGN KEY([id_sanphamthucdonhangngay])
REFERENCES [dbo].[SanPhamThucDonHangNgay] ([id])
GO
ALTER TABLE [dbo].[ChiTietDonHangSanPhamThucDonHangNgay] CHECK CONSTRAINT [FK_ChiTietDonHangSanPhamThucDonHangNgay_SanPhamThucDonHangNgay]
GO
ALTER TABLE [dbo].[DonHangVuonRauMuaSamVaMenuHangNgay]  WITH CHECK ADD  CONSTRAINT [FK_DonHangVuonRauMuaSamVaMenuHangNgay_TaiKhoanKhachHang] FOREIGN KEY([id_taikhoankhkachhang])
REFERENCES [dbo].[TaiKhoanKhachHang] ([id])
GO
ALTER TABLE [dbo].[DonHangVuonRauMuaSamVaMenuHangNgay] CHECK CONSTRAINT [FK_DonHangVuonRauMuaSamVaMenuHangNgay_TaiKhoanKhachHang]
GO
ALTER TABLE [dbo].[GioHangMuaSam]  WITH CHECK ADD  CONSTRAINT [FK_GioHangMuaSam_SanPhamMuaSam] FOREIGN KEY([id_sanpham])
REFERENCES [dbo].[SanPhamMuaSam] ([id])
GO
ALTER TABLE [dbo].[GioHangMuaSam] CHECK CONSTRAINT [FK_GioHangMuaSam_SanPhamMuaSam]
GO
ALTER TABLE [dbo].[GioHangMuaSam]  WITH CHECK ADD  CONSTRAINT [FK_GioHangMuaSam_TaiKhoanKhachHang] FOREIGN KEY([id_taikhoankhachhang])
REFERENCES [dbo].[TaiKhoanKhachHang] ([id])
GO
ALTER TABLE [dbo].[GioHangMuaSam] CHECK CONSTRAINT [FK_GioHangMuaSam_TaiKhoanKhachHang]
GO
ALTER TABLE [dbo].[GioHangMuaSam]  WITH CHECK ADD  CONSTRAINT [FK_GioHangMuaSam_TonKhoSanPhamMuaSam] FOREIGN KEY([id_loaitonkho])
REFERENCES [dbo].[TonKhoSanPhamMuaSam] ([id])
GO
ALTER TABLE [dbo].[GioHangMuaSam] CHECK CONSTRAINT [FK_GioHangMuaSam_TonKhoSanPhamMuaSam]
GO
ALTER TABLE [dbo].[GioHangThucDonHangNgay]  WITH CHECK ADD  CONSTRAINT [FK_GioHangThucDonHangNgay_SanPhamThucDonHangNgay] FOREIGN KEY([id_sanpham])
REFERENCES [dbo].[SanPhamThucDonHangNgay] ([id])
GO
ALTER TABLE [dbo].[GioHangThucDonHangNgay] CHECK CONSTRAINT [FK_GioHangThucDonHangNgay_SanPhamThucDonHangNgay]
GO
ALTER TABLE [dbo].[GioHangThucDonHangNgay]  WITH CHECK ADD  CONSTRAINT [FK_GioHangThucDonHangNgay_TaiKhoanKhachHang] FOREIGN KEY([id_taikhoankhachhang])
REFERENCES [dbo].[TaiKhoanKhachHang] ([id])
GO
ALTER TABLE [dbo].[GioHangThucDonHangNgay] CHECK CONSTRAINT [FK_GioHangThucDonHangNgay_TaiKhoanKhachHang]
GO
ALTER TABLE [dbo].[GioHangVuonRauBean]  WITH CHECK ADD  CONSTRAINT [FK_GioHangVuonRauBean_SanPhamRauNhaTrong] FOREIGN KEY([id_sanpham])
REFERENCES [dbo].[SanPhamRauNhaTrong] ([id])
GO
ALTER TABLE [dbo].[GioHangVuonRauBean] CHECK CONSTRAINT [FK_GioHangVuonRauBean_SanPhamRauNhaTrong]
GO
ALTER TABLE [dbo].[GioHangVuonRauBean]  WITH CHECK ADD  CONSTRAINT [FK_GioHangVuonRauBean_TaiKhoanKhachHang] FOREIGN KEY([id_taikhoankhachhang])
REFERENCES [dbo].[TaiKhoanKhachHang] ([id])
GO
ALTER TABLE [dbo].[GioHangVuonRauBean] CHECK CONSTRAINT [FK_GioHangVuonRauBean_TaiKhoanKhachHang]
GO
ALTER TABLE [dbo].[LichSuThanhToanDonHangTongHop]  WITH CHECK ADD  CONSTRAINT [FK_LichSuThanhToanDonHangTongHop_DonHangMenuBuffet] FOREIGN KEY([id_donhangmenubuffet])
REFERENCES [dbo].[DonHangMenuBuffet] ([id])
GO
ALTER TABLE [dbo].[LichSuThanhToanDonHangTongHop] CHECK CONSTRAINT [FK_LichSuThanhToanDonHangTongHop_DonHangMenuBuffet]
GO
ALTER TABLE [dbo].[LichSuThanhToanDonHangTongHop]  WITH CHECK ADD  CONSTRAINT [FK_LichSuThanhToanDonHangTongHop_DonHangMenuTiecBan] FOREIGN KEY([id_donhangmenutiecban])
REFERENCES [dbo].[DonHangMenuTiecBan] ([id])
GO
ALTER TABLE [dbo].[LichSuThanhToanDonHangTongHop] CHECK CONSTRAINT [FK_LichSuThanhToanDonHangTongHop_DonHangMenuTiecBan]
GO
ALTER TABLE [dbo].[LichSuThanhToanDonHangTongHop]  WITH CHECK ADD  CONSTRAINT [FK_LichSuThanhToanDonHangTongHop_DonHangVuonRauMuaSamVaMenuHangNgay] FOREIGN KEY([id_donhangvuonraumuasamvamenuhangngay])
REFERENCES [dbo].[DonHangVuonRauMuaSamVaMenuHangNgay] ([id])
GO
ALTER TABLE [dbo].[LichSuThanhToanDonHangTongHop] CHECK CONSTRAINT [FK_LichSuThanhToanDonHangTongHop_DonHangVuonRauMuaSamVaMenuHangNgay]
GO
ALTER TABLE [dbo].[LichSuThanhToanDonHangTongHop]  WITH CHECK ADD  CONSTRAINT [FK_LichSuThanhToanDonHangTongHop_TaiKhoanBean] FOREIGN KEY([id_taikhoanbean])
REFERENCES [dbo].[TaiKhoanBean] ([id])
GO
ALTER TABLE [dbo].[LichSuThanhToanDonHangTongHop] CHECK CONSTRAINT [FK_LichSuThanhToanDonHangTongHop_TaiKhoanBean]
GO
ALTER TABLE [dbo].[SanPhamMenuBuffet]  WITH CHECK ADD  CONSTRAINT [FK_SanPhamMenuBuffet_DanhMucMenuBuffetCap1] FOREIGN KEY([id_danhmucmenubuffetcap1])
REFERENCES [dbo].[DanhMucMenuBuffetCap1] ([id])
GO
ALTER TABLE [dbo].[SanPhamMenuBuffet] CHECK CONSTRAINT [FK_SanPhamMenuBuffet_DanhMucMenuBuffetCap1]
GO
ALTER TABLE [dbo].[SanPhamMenuTiecBan]  WITH CHECK ADD  CONSTRAINT [FK_SanPhamMenuTiecBan_DanhMucMenuTiecBanCap1] FOREIGN KEY([id_danhmucmenutiecbancap1])
REFERENCES [dbo].[DanhMucMenuTiecBanCap1] ([id])
GO
ALTER TABLE [dbo].[SanPhamMenuTiecBan] CHECK CONSTRAINT [FK_SanPhamMenuTiecBan_DanhMucMenuTiecBanCap1]
GO
ALTER TABLE [dbo].[SanPhamMuaSam]  WITH CHECK ADD  CONSTRAINT [FK_SanPhamMuaSam_DanhMucSanPhamMuaSamCap1] FOREIGN KEY([id_danhmucmuasamcap1])
REFERENCES [dbo].[DanhMucSanPhamMuaSamCap1] ([id])
GO
ALTER TABLE [dbo].[SanPhamMuaSam] CHECK CONSTRAINT [FK_SanPhamMuaSam_DanhMucSanPhamMuaSamCap1]
GO
ALTER TABLE [dbo].[SanPhamRauNhaTrong]  WITH CHECK ADD  CONSTRAINT [FK_SanPhamRauNhaTrong_DanhMucSanPhamRauNhaTrongCap1] FOREIGN KEY([id_danhmucsanphamraunhatrongcap1])
REFERENCES [dbo].[DanhMucSanPhamRauNhaTrongCap1] ([id])
GO
ALTER TABLE [dbo].[SanPhamRauNhaTrong] CHECK CONSTRAINT [FK_SanPhamRauNhaTrong_DanhMucSanPhamRauNhaTrongCap1]
GO
ALTER TABLE [dbo].[SanPhamRauNhaTrong]  WITH CHECK ADD  CONSTRAINT [FK_SanPhamRauNhaTrong_QuyTrinhTrongCay] FOREIGN KEY([id_quytrinhtrongcay])
REFERENCES [dbo].[QuyTrinhTrongCay] ([id])
GO
ALTER TABLE [dbo].[SanPhamRauNhaTrong] CHECK CONSTRAINT [FK_SanPhamRauNhaTrong_QuyTrinhTrongCay]
GO
ALTER TABLE [dbo].[SanPhamThucDonHangNgay]  WITH CHECK ADD  CONSTRAINT [FK_SanPhamThucDonHangNgay_SanPhamThucDonHangNgay1] FOREIGN KEY([id_danhmucthucdonhangngaycap1])
REFERENCES [dbo].[DanhMucThucDocHangNgayCap1] ([id])
GO
ALTER TABLE [dbo].[SanPhamThucDonHangNgay] CHECK CONSTRAINT [FK_SanPhamThucDonHangNgay_SanPhamThucDonHangNgay1]
GO
ALTER TABLE [dbo].[TaiKhoanBean]  WITH CHECK ADD  CONSTRAINT [FK_TaiKhoanBean_QuyenTaiKhoanBean] FOREIGN KEY([id_quyentaikhoanbean])
REFERENCES [dbo].[QuyenTaiKhoanBean] ([id])
GO
ALTER TABLE [dbo].[TaiKhoanBean] CHECK CONSTRAINT [FK_TaiKhoanBean_QuyenTaiKhoanBean]
GO
ALTER TABLE [dbo].[TinhTrangDonHangMenuBuffet]  WITH CHECK ADD  CONSTRAINT [FK_TinhTrangDonHangMenuBuffet_DonHangMenuBuffet] FOREIGN KEY([id_donhangmenubuffet])
REFERENCES [dbo].[DonHangMenuBuffet] ([id])
GO
ALTER TABLE [dbo].[TinhTrangDonHangMenuBuffet] CHECK CONSTRAINT [FK_TinhTrangDonHangMenuBuffet_DonHangMenuBuffet]
GO
ALTER TABLE [dbo].[TinhTrangDonHangMenuBuffet]  WITH CHECK ADD  CONSTRAINT [FK_TinhTrangDonHangMenuBuffet_TaiKhoanBean] FOREIGN KEY([id_taikhoanbean])
REFERENCES [dbo].[TaiKhoanBean] ([id])
GO
ALTER TABLE [dbo].[TinhTrangDonHangMenuBuffet] CHECK CONSTRAINT [FK_TinhTrangDonHangMenuBuffet_TaiKhoanBean]
GO
ALTER TABLE [dbo].[TinhTrangDonHangMenuTiecBan]  WITH CHECK ADD  CONSTRAINT [FK_TinhTrangDonHangMenuTiecBan_DonHangMenuTiecBan] FOREIGN KEY([id_donhangmenutiecban])
REFERENCES [dbo].[DonHangMenuTiecBan] ([id])
GO
ALTER TABLE [dbo].[TinhTrangDonHangMenuTiecBan] CHECK CONSTRAINT [FK_TinhTrangDonHangMenuTiecBan_DonHangMenuTiecBan]
GO
ALTER TABLE [dbo].[TinhTrangDonHangMenuTiecBan]  WITH CHECK ADD  CONSTRAINT [FK_TinhTrangDonHangMenuTiecBan_TaiKhoanBean] FOREIGN KEY([id_taikhoanbean])
REFERENCES [dbo].[TaiKhoanBean] ([id])
GO
ALTER TABLE [dbo].[TinhTrangDonHangMenuTiecBan] CHECK CONSTRAINT [FK_TinhTrangDonHangMenuTiecBan_TaiKhoanBean]
GO
ALTER TABLE [dbo].[TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay]  WITH CHECK ADD  CONSTRAINT [FK_TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay_DonHangVuonRauMuaSamVaMenuHangNgay] FOREIGN KEY([id_donhangvuonraumuasamvathucdonhangngay])
REFERENCES [dbo].[DonHangVuonRauMuaSamVaMenuHangNgay] ([id])
GO
ALTER TABLE [dbo].[TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay] CHECK CONSTRAINT [FK_TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay_DonHangVuonRauMuaSamVaMenuHangNgay]
GO
ALTER TABLE [dbo].[TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay]  WITH CHECK ADD  CONSTRAINT [FK_TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay_TaiKhoanBean] FOREIGN KEY([id_taikhoanbean])
REFERENCES [dbo].[TaiKhoanBean] ([id])
GO
ALTER TABLE [dbo].[TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay] CHECK CONSTRAINT [FK_TinhTrangDonHangVuonRauMuaSamVaMenuHangNgay_TaiKhoanBean]
GO
ALTER TABLE [dbo].[TonKhoSanPhamMuaSam]  WITH CHECK ADD  CONSTRAINT [FK_TonKhoSanPhamMuaSam_SanPhamMuaSam] FOREIGN KEY([id_sanphammuasam])
REFERENCES [dbo].[SanPhamMuaSam] ([id])
GO
ALTER TABLE [dbo].[TonKhoSanPhamMuaSam] CHECK CONSTRAINT [FK_TonKhoSanPhamMuaSam_SanPhamMuaSam]
GO
