﻿$(document).ready(function () {
    //Open sủa sp
    $('body').on('click', '[id^="btnsuasp"]', function (e) {
        var formData = new FormData();
        var id = $(this).attr('name').trim();
        formData.append('id', id);
        $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
            url: $('#requestPath').val() + "admin/monanmenubuffet/OpenSuaMon",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false,
        }).done(function (ketqua) {
            if (ketqua == "KHONGTONTAI") {
                Swal.fire({
                    title: "Thông báo!",
                    text: "Món này vừa mới được xóa bỏ.",
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
                $('#SuaMonModalPartial').replaceWith(ketqua);
                $('#titleSuaMonAn').text('Chỉnh sửa món "' + $('#inpMamonan' + id).val() + '"');
                $('#SuaMonAnModal').modal('toggle');
            }
        });
    });
});