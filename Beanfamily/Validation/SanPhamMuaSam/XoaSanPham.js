$(document).ready(function () {
    $('body').on('click', '[id^="btnxoasp"]', function () {
        var id = $(this).attr('name');
        var idsp = $('#inpMaSanPham' + id).val();
        Swal.fire({
            title: 'Xóa bỏ?',
            text: 'Bạn có chắc muốn xóa sản phẩm "' + idsp + '" không?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa ngay!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var formData = new FormData();
                formData.append('id', id);
                $.ajax({
                    url: $('#requestPath').val() + "admin/sanphammuasam/xoasanpham",
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {
                    if (ketqua == "SUCCESS") {
                        Swal.fire({
                            title: "Thành công!",
                            text: 'Sản phẩm "' + idsp + '" đã được xóa bỏ.',
                            icon: "success"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else if (ketqua == "KHONGTONTAI") {
                        Swal.fire({
                            title: "Thông báo",
                            text: "Sản phẩm này vừa mới được xóa bỏ.",
                            icon: "warning"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
                        Swal.fire({
                            title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                            text: "Chi tiết lỗi: " + ketqua,
                            icon: "error"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                });
            }
        });
    });
});