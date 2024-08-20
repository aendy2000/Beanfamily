$(document).ready(function () {
    $('body').on('click', '[id^="btnBoQuaLH"]', function () {
        var btn = $(this);

        var id = $(this).attr("name");
        Swal.fire({
            title: 'Bỏ Qua Liên Hệ?',
            text: 'Bạn có chắc muốn bỏ qua liên hệ này không?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy bỏ"
        }).then((result) => {
            if (result.isConfirmed) {
                btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>');
                btn.prop('disabled', true);

                var formData = new FormData();
                formData.append('id', id);
                $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                    url: $('#requestPath').val() + "admin/lienhedatban/boqualienhe",
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {
                    if (ketqua == "SUCCESS") {
                        btn.html('<i class="bi bi-ban me-2"></i>Bỏ qua Liên hệ');
                        btn.prop('disabled', false);

                        Swal.fire({
                            title: "Thành công!",
                            text: 'Liên hệ đã được bỏ qua',
                            icon: "success"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else if (ketqua == "NOTEXIST") {
                        btn.html('<i class="bi bi-ban me-2"></i>Bỏ qua Liên hệ');
                        btn.prop('disabled', false);
                        Swal.fire({
                            title: "Không tồn tại",
                            text: "Liên hệ này không tồn tại trong hệ thống.",
                            icon: "error"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
                        btn.html('<i class="bi bi-ban me-2"></i>Bỏ qua Liên hệ');
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
            }
        });
    });
});