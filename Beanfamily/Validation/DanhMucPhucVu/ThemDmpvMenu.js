$(document).ready(function () {
    $('#btnluuthemDmpv').on('click', function () {
        $('#btnluuthemDmpv').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluuthemDmpv').prop('disabled', true);

        var tendanhmuc = $('#tendanhmuc').val().trim();
        var gia = $('#gia').val().trim();
        var sothutu = $('#sothutu').val().trim();

        $("#tendanhmuc").removeClass('valid-was-validated');
        $("#gia").removeClass('valid-was-validated');

        $('#invalid-tendanhmuc-feedback').prop('hidden', true);
        $('#invalid-gia-feedback').prop('hidden', true);

        var check = true;

        if (gia.length < 1) {
            check = false;
            $("#gia").addClass('valid-was-validated');
            $('#invalid-gia-feedback').text("Vui lòng nhập giá dịch vụ.").prop('hidden', false);
            $("#gia").focus();

            $('#btnluuthemDmpv').html('Lưu thông tin');
            $('#btnluuthemDmpv').prop('disabled', false);
        }

        if (tendanhmuc.length < 1) {
            check = false;
            $("#tendanhmuc").addClass('valid-was-validated');
            $('#invalid-tendanhmuc-feedback').text("Vui lòng nhập tên danh mục.").prop('hidden', false);
            $("#tendanhmuc").focus();

            $('#btnluuthemDmpv').html('Lưu thông tin');
            $('#btnluuthemDmpv').prop('disabled', false);
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('tendanhmuc', tendanhmuc);
            formData.append('gia', gia);
            formData.append('giatheosoban', $('body').find('[id="giatheosoban"]').prop('checked'));

            formData.append('tiecban', $('body').find('[id="menutiecban"]').prop('checked'));
            formData.append('buffet', $('body').find('[id="menubuffet"]').prop('checked'));

            formData.append('hienthi', $('#hienthi').prop('checked'));
            formData.append('sothutu', sothutu);

            $.ajax({
                url: $('#requestPath').val() + "admin/danhmucphucvu/themdm",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    $('#btnluuthemDmpv').html('Lưu thông tin');
                    $('#btnluuthemDmpv').prop('disabled', false);

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

                    $('#btnluuthemDmpv').html('Lưu thông tin');
                    $('#btnluuthemDmpv').prop('disabled', false);
                }
                else {
                    $('#btnluuthemDmpv').html('Lưu thông tin');
                    $('#btnluuthemDmpv').prop('disabled', false);

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