$(document).ready(function () {
    $('body').on('click', '[id^="btnTaoDonTiec"]', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Vui lòng chờ...');
        btn.prop('disabled', true);

        var id = $(this).attr("name");

        var formData = new FormData();
        formData.append('id', id);
        $.ajax({
            error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
            url: $('#requestPath').val() + "admin/lienhedatban/opentaodontiecban",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            if (ketqua.indexOf("Chi tiết lỗi") != -1) {
                btn.html('<i class="bi bi-plus-circle me-2"></i> Tạo đơn Tiệc Bàn');
                btn.prop('disabled', false);

                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                    text: ketqua,
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
                btn.html('<i class="bi bi-plus-circle me-2"></i> Tạo đơn Tiệc Bàn');
                btn.prop('disabled', false);

                $('body').find('[id="TaoDonTiecBanModalPartial"]').replaceWith(ketqua);
                $('body').find('[id="TaoDonTiecBanModal"]').modal('toggle');
            }
        });
    });
});