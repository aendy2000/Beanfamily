$(document).ready(function () {
    $('#btnLuuThongTin').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var title = $('#title').val().trim();
        var keyword = $('#keyword').val().trim();
        var desc = $('#desc').val();

        var formData = new FormData();
        formData.append('title', title);
        formData.append('keyword', keyword);
        formData.append('desc', desc);

        $.ajax({
            error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
            url: $('#requestPath').val() + "admin/seopageconfig/capnhatseopage",
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
                    text: "Đã lưu thông tin SEO Page.",
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