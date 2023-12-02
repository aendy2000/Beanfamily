$(document).ready(function () {
    $('[id^="btnxoaquyen"]').on('click', function () {
        var id = $(this).attr('name');
        var name = $('#tenquyen' + id).val();
        Swal.fire({
            title: 'Xóa bỏ?',
            text: 'Bạn có chắc muốn xóa quyền "' + name + '" không?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa ngay!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var formData = new FormData();
                formData.append('id', id);
                $.ajax({
                    url: $('#requestPath').val() + "admin/role/removerole",
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {
                    if (ketqua == "SUCCESS") {
                        Swal.fire({
                            title: "Thành công!",
                            text: 'Phân quyền "' + name + '" đã được xóa bỏ.',
                            icon: "success"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else if (ketqua == "KHONGTONTAI") {
                        Swal.fire({
                            title: "Thông báo",
                            text: "Phân quyền này vừa mới được xóa bỏ.",
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