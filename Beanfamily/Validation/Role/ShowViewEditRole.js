$(document).ready(function () {
    $('[id^="btnsuaquyen"]').on('click', function () {
        var id = $(this).attr('name');
        var formData = new FormData();
        formData.append('id', id);
        $.ajax({
            url: $('#requestPath').val() + "admin/role/showviewedit",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            if (ketqua == "KHONGTONTAI") {
                Swal.fire({
                    title: "Thông báo!",
                    text: "Phân quyền này vừa mới được xóa bỏ.",
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
                $('#chinhsuaquyenpartial').replaceWith(ketqua);
                $('#SuaPhanQuyenModal').modal('toggle');
            }
        });
    });

});