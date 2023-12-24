$(document).ready(function () {
    $('#btnluuthemDmMtb').on('click', function () {
        $('#btnluuthemDmMtb').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Đang tải...');
        $('#btnluuthemDmMtb').prop('disabled', true);

        var tendanhmuc = $('#tendanhmuc').val().trim();
        var sothutu = $('#sothutu').val().trim();

        $("#tendanhmuc").removeClass('valid-was-validated');

        $('#invalid-tendanhmuc-feedback').prop('hidden', true);

        var check = true;

        if (tendanhmuc.length < 1) {
            check = false;
            $("#tendanhmuc").addClass('valid-was-validated');
            $('#invalid-tendanhmuc-feedback').text("Vui lòng nhập tên danh mục.").prop('hidden', false);
            $("#tendanhmuc").focus();

            $('#btnluuthemDmMtb').html('Lưu thông tin');
            $('#btnluuthemDmMtb').prop('disabled', false);
        }


        if (check == true) {
            var formData = new FormData();
            formData.append('tendanhmuc', tendanhmuc);
            formData.append('hienthi', $('#hienthi').prop('checked'));
            formData.append('sothutu', sothutu);

            var lstIdPv = "";
            $('[id^="iddmpv"]').each(function () {
                $(this).attr('name');
                if ($(this).prop('checked')) lstIdPv += $(this).attr('name') + "-";
            });

            if (lstIdPv.length < 1)
                formData.append('idPv', lstIdPv);
            else 
                formData.append('idPv', lstIdPv.substring(0, lstIdPv.length - 1));

            $.ajax({
                url: $('#requestPath').val() + "admin/dmcap1menubuffet/themdm",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    $('#btnluuthemDmMtb').html('Lưu thông tin');
                    $('#btnluuthemDmMtb').prop('disabled', false);

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

                    $('#btnluuthemDmMtb').html('Lưu thông tin');
                    $('#btnluuthemDmMtb').prop('disabled', false);
                }
                else {
                    $('#btnluuthemDmMtb').html('Lưu thông tin');
                    $('#btnluuthemDmMtb').prop('disabled', false);

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