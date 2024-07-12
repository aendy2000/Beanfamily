$(document).ready(function () {

    $('body').on('click', '[id^="hinhanhbean-show-"]', function () {
        var src = $(this).attr('data-src');
        var id = $(this).attr('name');

        $('body').find('[id="show-img-xoa"]').attr('name', id);
        $('body').find('[id="show-img-xoa"]').attr('src', src);

        $('[id="XemHinhAnhModal"]').modal('toggle');
    });
    $('body').on('click', '[id="btnLuuXoa"]', function () {
        Swal.fire({
            title: 'Xóa ảnh?',
            text: 'Bạn có chắc muốn xóa hình ảnh này?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa ngay!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var btn = $(this);
                btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
                btn.prop('disabled', true);

                var id = $('body').find('[id^="show-img-xoa"]').attr('name');
                var src = $('body').find('[id^="show-img-xoa"]').attr('data-src');

                var formData = new FormData();
                formData.append('id', id);
                formData.append('src', src);

                $.ajax({
                    error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
                    url: $('#requestPath').val() + "admin/hinhanhbean/xoahinhanh",
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {
                    if (ketqua.indexOf("Chi tiết lỗi:") != -1) {
                        btn.html('Xóa ảnh');
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
                        btn.html('Xóa ảnh');
                        btn.prop('disabled', false);

                        Swal.fire({
                            title: "Thành công",
                            text: "Đã xóa bỏ 1 hình ảnh!",
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