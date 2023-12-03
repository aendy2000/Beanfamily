$(document).ready(function () {
    $('body').on('click', '[id^="btnsuadm"]', function () {
        var id = $(this).attr("name");

        $('#suaiddanhmuc').val(id);
        $('#suatendanhmuc').val($("#inpTendanhmuc" + id).val());
        $('#suasothutu').val($("#inpSothutu" + id).val());
        if ($("#inpHienthi" + id).val() == "true") {
            $('#suahienthi').prop("checked", true);
        }
        else {
            $('#suahienthi').prop("checked", false);
        }

        $('#suastriddanhmuc').val($('#inpMadanhmuc' + id).val());
        $('#SuaDmTdhnModal').modal('toggle');
    });

    $('#btnluuSuaDmtdhn').on('click', function () {
        $('#btnluuSuaDmtdhn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Đang tải...');
        $('#btnluuSuaDmtdhn').prop('disabled', true);

        var tendanhmuc = $('#suatendanhmuc').val().trim();
        var sothutu = $('#suasothutu').val().trim();

        $("#suatendanhmuc").removeClass('valid-was-validated');
        $("#suasothutu").removeClass('valid-was-validated');

        $('#invalid-suatendanhmuc-feedback').prop('hidden', true);
        $('#invalid-suasothutu-feedback').prop('hidden', true);

        var check = true;
        if (/\D/g.test(sothutu)) {
            check = false;
            $("#suasothutu").addClass('valid-was-validated');
            $('#invalid-suasothutu-feedback').text("Số thứ tự không đúng định dạng.").prop('hidden', false);
            $("#suasothutu").focus();

            $('#btnluuSuaDmtdhn').html('Lưu thông tin');
            $('#btnluuSuaDmtdhn').prop('disabled', false);
        }

        if (tendanhmuc.length < 1) {
            check = false;
            $("#suatendanhmuc").addClass('valid-was-validated');
            $('#invalid-suatendanhmuc-feedback').text("Vui lòng nhập tên danh mục.").prop('hidden', false);
            $("#tendanhmuc").focus();

            $('#btnluuSuaDmtdhn').html('Lưu thông tin');
            $('#btnluuSuaDmtdhn').prop('disabled', false);
        }


        if (check == true) {
            var formData = new FormData();
            formData.append('id', $('#suaiddanhmuc').val());
            formData.append('tendanhmuc', tendanhmuc);
            formData.append('hienthi', $('#suahienthi').prop('checked'));
            formData.append('sothutu', sothutu);

            $.ajax({
                url: $('#requestPath').val() + "admin/dmcap1menuhangngay/suadm",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    $('#btnluuSuaDmtdhn').html('Lưu thông tin');
                    $('#btnluuSuaDmtdhn').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: 'Đã lưu cập nhật danh mục "' + $('#suastriddanhmuc').val() + '".',
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "EXIST") {
                    $("#suatendanhmuc").addClass('valid-was-validated');
                    $('#invalid-suatendanhmuc-feedback').text("Danh mục này đã tồn tại.").prop('hidden', false);
                    $("#suatendanhmuc").focus();

                    $('#btnluuSuaDmtdhn').html('Lưu thông tin');
                    $('#btnluuSuaDmtdhn').prop('disabled', false);
                }
                else if (ketqua == "KHONGTONTAI") {
                    $('#btnluuSuaDmtdhn').html('Lưu thông tin');
                    $('#btnluuSuaDmtdhn').prop('disabled', false);

                    Swal.fire({
                        title: "Thông báo!",
                        text: "Danh mục này vừa mới được xóa bỏ.",
                        icon: "warning"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else {
                    $('#btnluuSuaDmtdhn').html('Lưu thông tin');
                    $('#btnluuSuaDmtdhn').prop('disabled', false);

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