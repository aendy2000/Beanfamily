$(document).ready(function () {

    $('body').on('click', '[id^="btnXemHinhAnhItem"]', function (e) {
        var id = $(this).attr('name');
        var formData = new FormData();
        formData.append('id', id);

        $.ajax({
            url: $('#requestPath').val() + "admin/sanphammuasam/xemhinhanh",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false,
            error: function (er) {
                console.log(er);
            }
        }).done(function (ketqua) {
            if (ketqua == "KHONGTONTAI") {
                Swal.fire({
                    title: "Thông báo!",
                    text: "Sản phẩm này vừa mới được xóa bỏ.",
                    icon: "warning"
                });
            }
            else if (ketqua.indexOf("Chi tiết lỗi") != -1) {
                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                    text: ketqua,
                    icon: "error"
                });
            }
            else {
                $('#XemHinhAnhSanPhamModalPartial').replaceWith(ketqua);
                $('#titleHinhAnhSanPham').text('Hình ảnh món "' + $('#inpMaSanPham' + id).val() + '".');
                $('#XemHinhAnhSanPhamModal').modal('toggle');
            }
        });
    });
});