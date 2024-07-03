$(document).ready(function () {
    $('body').on('click', '[id="huydonhangloat"]', function () {
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
                title: 'Hủy đơn?',
                text: 'Bạn có chắc muốn hủy ' + soluong + ' đơn đã chọn?',
                icon: "question",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: "Hủy ngay!",
                cancelButtonText: "Không hủy"
            }).then((result) => {
                if (result.isConfirmed) {

                    btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
                    btn.prop('disabled', true);

                    var formData = new FormData();
                    formData.append('lstId', lstId);
                    $.ajax({
                        url: $('#requestPath').val() + "admin/dondatbantiec/huydonhangloat",
                        data: formData,
                        dataType: 'html',
                        type: 'POST',
                        processData: false,
                        contentType: false
                    }).done(function (ketqua) {
                        if (ketqua == "SUCCESS") {
                            btn.html('<i class="bi bi-x-square-fill"> </i> Hủy Đơn Đã Chọn');
                            btn.prop('disabled', false);

                            Swal.fire({
                                title: "Thành công!",
                                text: soluong + ' đơn đặt bàn được chọn đã được hủy.',
                                icon: "success"
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (ketqua.indexOf("Chi tiết lỗi:") !== -1) {
                            btn.html('<i class="bi bi-x-square-fill"> </i> Hủy Đơn Đã Chọn');
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