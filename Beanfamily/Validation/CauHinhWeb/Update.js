﻿$(document).ready(function () {
    $('#btnLuuThongTin').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var googlesearchconsole = $('#googlesearchconsole').val().trim();
        var googleanalystFull = $('#googleanalyst').val().trim();
        var googleanalyst = "";
        if (googleanalystFull.length > 0) {
            googleanalyst = googleanalystFull.replace(/ /g, '').replace(/(?:\r\n|\r|\n)/g, '');
            googleanalyst = googleanalyst.substring(googleanalyst.indexOf(`gtag('config'`), googleanalyst.length - 12).replace(`gtag('config','`, '');
        }

        var formData = new FormData();
        formData.append('googlesearchconsole', googlesearchconsole);
        formData.append('googleanalyst', googleanalyst);

        $.ajax({
            error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
            url: $('#requestPath').val() + "admin/cauhinhweb/capnhat",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false,
        }).done(function (ketqua) {
            if (ketqua == "SUCCESS") {
                btn.html('Lưu thông tin');
                btn.prop('disabled', false);

                Swal.fire({
                    title: "Thành công!",
                    text: "Đã lưu thông tin cấu hình Web.",
                    icon: "success"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
                btn.html('Lưu thông tin');
                btn.prop('disabled', false);

                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                    text: ketqua,
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
        });

    });
});