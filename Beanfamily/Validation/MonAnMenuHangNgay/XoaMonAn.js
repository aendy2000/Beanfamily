$(document).ready(function () {
    $('body').on('click', '[id^="btnxoasp"]', function () {
        var id = $(this).attr('name');
        var idmon = $('#inpMamonan' + id).val();
        Swal.fire({
            title: 'Xóa bỏ?',
            text: 'Bạn có chắc muốn xóa món "' + idmon + '" không?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa ngay!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var formData = new FormData();
                formData.append('id', id);
                $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                    url: $('#requestPath').val() + "admin/monanmenuhangngay/xoamon",
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {
                    if (ketqua == "SUCCESS") {
                        var table = $('#lstMonAnMenuHangNgayTable').DataTable();

                        var rowSelector = '#row-' + id;
                        var row = table.row(rowSelector);
                        if (row.length) {
                            row.remove().draw(false);
                        }

                        Swal.fire({
                            title: "Thành công!",
                            text: 'Món "' + idmon + '" đã được xóa bỏ.',
                            icon: "success"
                        });
                    }
                    else if (ketqua == "KHONGTONTAI") {
                        Swal.fire({
                            title: "Thông báo",
                            text: "Món này vừa mới được xóa bỏ.",
                            icon: "warning"
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
    });
});