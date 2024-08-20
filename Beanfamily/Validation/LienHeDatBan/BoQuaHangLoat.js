$(document).ready(function () {
    $('body').on('click', '[id="btnBoQuaHangLoat"]', function () {
        var btn = $(this);

        var soluong = 0;
        var lstId = "";
        $('.datatable').DataTable()
            .column(0)
            .nodes()
            .to$()
            .find('input[id^="checkitem"]:checked').each(function () {
                soluong++;
                lstId += $(this).attr("name") + "-";
            });
        if (lstId.length > 0) lstId = lstId.substring(0, lstId.length - 1);

        if (soluong > 0) {
            Swal.fire({
                title: 'Bỏ Qua Liên Hệ?',
                text: 'Bạn có chắc muốn bỏ qua ' + soluong + ' liên hệ đã chọn?',
                icon: "question",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: "Xác nhận",
                cancelButtonText: "Hủy bỏ"
            }).then((result) => {
                if (result.isConfirmed) {

                    btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
                    btn.prop('disabled', true);

                    var formData = new FormData();
                    formData.append('lstId', lstId);
                    $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                        url: $('#requestPath').val() + "admin/lienhedatban/boquahangloat",
                        data: formData,
                        dataType: 'html',
                        type: 'POST',
                        processData: false,
                        contentType: false
                    }).done(function (ketqua) {
                        if (ketqua == "SUCCESS") {
                            btn.html('<i class="bi bi-ban me-2"></i>Bỏ qua liên hệ đã chọn');
                            btn.prop('disabled', false);

                            Swal.fire({
                                title: "Thành công!",
                                text: soluong + ' liên hệ đã được bỏ qua.',
                                icon: "success"
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (ketqua.indexOf("Chi tiết lỗi:") !== -1) {
                            btn.html('<i class="bi bi-ban me-2"></i>Bỏ qua liên hệ đã chọn');
                            btn.prop('disabled', false);

                            Swal.fire({
                                title: "Đã xảy ra lỗi, vui lòng thử lại sau.",
                                text: ketqua,
                                icon: "error"
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                    });
                }
                
            });
        }
    });
});