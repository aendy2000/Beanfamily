$(document).ready(function () {
    $('#btnluuthemDmMtb').on('click', function () {
        $('#btnluuthemDmMtb').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
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

            $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                url: $('#requestPath').val() + "admin/dmcap1menutiecban/themdm",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua.indexOf("Chi tiết lỗi") !== -1) {
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
                else if (ketqua == "EXIST") {
                    $("#tendanhmuc").addClass('valid-was-validated');
                    $('#invalid-tendanhmuc-feedback').text("Danh mục này đã tồn tại.").prop('hidden', false);
                    $("#tendanhmuc").focus();

                    $('#btnluuthemDmMtb').html('Lưu thông tin');
                    $('#btnluuthemDmMtb').prop('disabled', false);
                }
                else {
                    var table = $('#lstDmMtbTable').DataTable();
                    table.row.add($(ketqua)).draw(false);
                    $('#ThemDmMtbModal').modal('toggle');

                    $('#btnluuthemDmMtb').html('Lưu thông tin');
                    $('#btnluuthemDmMtb').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã thêm một danh mục mới.",
                        icon: "success"
                    });
                }
            });
        }
    });
});