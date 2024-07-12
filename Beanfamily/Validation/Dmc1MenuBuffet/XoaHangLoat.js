$(document).ready(function () {
    $('#checkAlls').on('click', function () {
        $('.datatable').DataTable()
            .column(0)
            .nodes()
            .to$()
            .find('input[type=checkbox]')
            .prop('checked', this.checked);
    });

    $('body').on('click', '[id="xoahangloat"]', function () {
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
                title: 'Xóa bỏ?',
                text: 'Bạn có chắc muốn xóa ' + soluong + ' danh mục đã chọn?',
                icon: "question",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: "Xóa ngay!",
                cancelButtonText: "Hủy"
            }).then((result) => {
                if (result.isConfirmed) {
                    var formData = new FormData();
                    formData.append('lstId', lstId);
                    $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                        url: $('#requestPath').val() + "admin/dmcap1menubuffet/xoahangloat",
                        data: formData,
                        dataType: 'html',
                        type: 'POST',
                        processData: false,
                        contentType: false
                    }).done(function (ketqua) {
                        if (ketqua == "SUCCESS") {
                            Swal.fire({
                                title: "Thành công!",
                                text: soluong + ' danh mục được chọn đã được xóa bỏ.',
                                icon: "success"
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else {
                            Swal.fire({
                                title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                                text: "Chi tiết lỗi: " + ketqua,
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