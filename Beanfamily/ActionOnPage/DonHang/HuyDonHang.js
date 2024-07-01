$(document).ready(function () {
    $('body').find('[id^="huybodonhang-"]').on('click', function () {
        Swal.fire({
            title: 'Hủy đơn?',
            text: 'Bạn có chắc muốn hủy đơn? Sau khi hủy không thể hoàn tác đơn hàng này.',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Không hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var btn = $(this);
                btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
                btn.css('pointer-events', 'none');

                var id = $(this).attr('name');

                var formData = new FormData();
                formData.append('id', id);

                $.ajax({
                    url: $('body').find('[id="requestPath"]').val() + 'home/huydonhang',
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false,
                }).done(function (ketqua) {
                    if (ketqua.indexOf("Chi tiết lỗi:") !== -1) {
                        btn.css('pointer-events', 'auto');
                        btn.html('Hủy đơn');
                        Swal.fire({
                            title: "Đã xảy ra lỗi, vui lòng thử lại sau.",
                            text: ketqua,
                            icon: "error"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else if (ketqua == "NOTEXIST") {
                        btn.css('pointer-events', 'auto');
                        btn.html('Hủy đơn');
                        Swal.fire({
                            title: "Không tồn tại",
                            text: "Đơn hàng không tồn tại, vui lòng kiểm tra lại",
                            icon: "error"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
                        btn.html('Hủy đơn');
                        btn.css('pointer-events', 'all');
                        Swal.fire({
                            title: "Thành công",
                            text: "Đơn hàng đã được hủy",
                            icon: "success"
                        }).then(() => {
                            window.location.reload();
                        });

                    }
                });
            }
        });
    });
});