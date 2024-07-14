$(document).ready(function () {
    $('#btnLuuThongTin').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var giomocua = $('#giomocua').val().trim();
        var ngaymocua = $('#ngaymocua').val().trim();
        var sodienthoai = $('#sodienthoai').val().trim();
        var email = $('#email').val().trim();
        var diachi = $('#diachi').val().trim();
        var facebook = $('#facebook').val().trim();
        var mess = $('#mess').val().trim();
        var zalo = $('#zalo').val().trim();
        var ig = $('#ig').val().trim();
        var tiktok = $('#tiktok').val().trim();
        var chiduong = $('#linkchiduong').val().trim();

        var toado = $('#htmltoado').val().trim();
        if (toado.length > 0) {
            toado = toado.replace(/ /g, '').replace(/(?:\r\n|\r|\n)/g, '');
            toado = toado.split(`"`)[1];
        }

        var tenmien = $('#tenmien').val().trim();

        var formData = new FormData();
        formData.append('giomocua', giomocua);
        formData.append('ngaymocua', ngaymocua);
        formData.append('sodienthoai', sodienthoai);
        formData.append('email', email);
        formData.append('diachi', diachi);
        formData.append('facebook', facebook);
        formData.append('mess', mess);
        formData.append('zalo', zalo);
        formData.append('ig', ig);
        formData.append('tiktok', tiktok);
        formData.append('chiduong', chiduong);
        formData.append('toado', toado);
        formData.append('tenmien', tenmien);

        $.ajax({
            error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
            url: $('#requestPath').val() + "admin/thongtinweb/capnhat",
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
                    text: "Đã lưu cập nhật thông tin Web.",
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