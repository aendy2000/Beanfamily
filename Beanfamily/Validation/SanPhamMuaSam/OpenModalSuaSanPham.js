$(document).ready(function () {
    //Open sủa sp
    $('body').on('click', '[id^="btnsuasp"]', function (e) {
        var formData = new FormData();
        var id = $(this).attr('name').trim();
        formData.append('id', id);
        $.ajax({
            url: $('#requestPath').val() + "admin/sanphammuasam/opensuasanpham",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false,
            error: function (ex) {
                console.log(ex);
            },
        }).done(function (ketqua) {
            if (ketqua == "KHONGTONTAI") {
                Swal.fire({
                    title: "Thông báo!",
                    text: "Sản phẩm này vừa mới được xóa bỏ.",
                    icon: "warning"
                }).then(() => {
                    window.location.reload();
                });
            }
            else if (ketqua.indexOf("Chi tiết lỗi:") != -1) {
                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                    text: ketqua,
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
                $('#SuaSanPhamModalPartial').replaceWith(ketqua);
                $('#titleSuaSanPham').text('Chỉnh sửa món "' + $('#inpMaSanPham' + id).val() + '"');
                $('#SuaSanPhamModal').modal('toggle');
            }
        });
    });
});