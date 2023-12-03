$(document).ready(function () {
    $('#btnluuthemDmtdhn').on('click', function () {
        $('#btnluuthemDmtdhn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Đang tải...');
        $('#btnluuthemDmtdhn').prop('disabled', true);

        var tendanhmuc = $('#tendanhmuc').val().trim();
        var sothutu = $('#sothutu').val().trim();

        $("#tendanhmuc").removeClass('valid-was-validated');
        $("#sothutu").removeClass('valid-was-validated');

        $('#invalid-tendanhmuc-feedback').prop('hidden', true);
        $('#invalid-sothutu-feedback').prop('hidden', true);

        var check = true;
        if (/\D/g.test(sothutu)) {
            check = false;
            $("#sothutu").addClass('valid-was-validated');
            $('#invalid-sothutu-feedback').text("Số thứ tự không đúng định dạng.").prop('hidden', false);
            $("#sothutu").focus();

            $('#btnluuthemDmtdhn').html('Lưu thông tin');
            $('#btnluuthemDmtdhn').prop('disabled', false);
        }

        if (tendanhmuc.length < 1) {
            check = false;
            $("#tendanhmuc").addClass('valid-was-validated');
            $('#invalid-tendanhmuc-feedback').text("Vui lòng nhập tên danh mục.").prop('hidden', false);
            $("#tendanhmuc").focus();

            $('#btnluuthemDmtdhn').html('Lưu thông tin');
            $('#btnluuthemDmtdhn').prop('disabled', false);
        }


        if (check == true) {
            var formData = new FormData();
            formData.append('tendanhmuc', tendanhmuc);
            formData.append('hienthi', $('#hienthi').prop('checked'));
            formData.append('sothutu', sothutu);

            $.ajax({
                url: $('#requestPath').val() + "admin/dmcap1menuhangngay/themdm",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    $('#btnluuthemDmtdhn').html('Lưu thông tin');
                    $('#btnluuthemDmtdhn').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã thêm một danh mục mới.",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "EXIST") {
                    $("#tendanhmuc").addClass('valid-was-validated');
                    $('#invalid-tendanhmuc-feedback').text("Danh mục này đã tồn tại.").prop('hidden', false);
                    $("#tendanhmuc").focus();

                    $('#btnluuthemDmtdhn').html('Lưu thông tin');
                    $('#btnluuthemDmtdhn').prop('disabled', false);
                }
                else {
                    $('#btnluuthemDmtdhn').html('Lưu thông tin');
                    $('#btnluuthemDmtdhn').prop('disabled', false);

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