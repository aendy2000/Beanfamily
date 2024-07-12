$(document).ready(function () {
    $('body').on('click', '[id^="btnhuydon"]', function () {
        var btn = $(this);

        var id = $(this).attr("name");
        var name = $('body').find('[id="inpMaDonHang' + id + '"').val();

        Swal.fire({
            title: 'Hủy đơn?',
            text: 'Bạn có chắc muốn hủy đơn đặt bàn "' + name + '" không?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Hủy ngay!",
            cancelButtonText: "Không hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>');
                btn.prop('disabled', true);

                var formData = new FormData();
                formData.append('id', id);
                $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                    url: $('#requestPath').val() + "admin/dondatbantiec/huydon",
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {
                    if (ketqua == "SUCCESS") {
                        btn.html('<i class="bi bi-x-square-fill"></i>');
                        btn.prop('disabled', false);

                        Swal.fire({
                            title: "Thành công!",
                            text: 'Đơn đặt bàn "' + name + '" đã được hủy.',
                            icon: "success"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else if (ketqua == "NOTEXIST") {
                        btn.html('<i class="bi bi-x-square-fill"></i>');
                        btn.prop('disabled', false);
                        Swal.fire({
                            title: "Không tồn tại",
                            text: "Đơn đặt bàn này không tồn tại trong hệ thống.",
                            icon: "error"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
                        btn.html('<i class="bi bi-x-square-fill"></i>');
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