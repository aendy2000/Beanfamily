$(document).ready(function () {
    $('body').on('click', '[id^="danhsachmonan"]', function () {
        var id = $(this).attr("name");
        var formData = new FormData();
        formData.append('id', id);

        $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
            url: $('#requestPath').val() + "admin/dmcap1menutiecban/showdanhsachmon",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            if (ketqua == "KHONGTONTAI") {
                Swal.fire({
                    title: "Thông báo!",
                    text: "Danh mục này vừa mới được xóa bỏ.",
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
                $('#XemDanhSachMonModalPartial').replaceWith(ketqua);
                $('#titleDanhSachMonDanhMuc').text('Danh sách món của danh mục "' + $('#inpMadanhmuc' + id).val() + '".');
                $('#XemDanhSachMonModal').modal('toggle');
            }
        });
    });
});