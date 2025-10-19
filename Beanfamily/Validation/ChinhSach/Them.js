$(document).ready(function () {
    const quill = new Quill('#noidung', {
        modules: {
            syntax: true,
            toolbar: '#toolbar-container',
        },
        placeholder: 'Nhập nội dung chính sách...',
        theme: 'snow',
    });

    $('#btnluuthem').on('click', function () {
        $('#btnluuthem').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluuthem').prop('disabled', true);

        var tenchinhsach = $('#tenchinhsach').val().trim();
        var noidung = quill.root.innerHTML /* quill.getContents()*/;
        var sothutu = $('#sothutu').val().trim();

        $("#tenchinhsach").removeClass('valid-was-validated');
        $("#noidung").removeClass('valid-was-validated');

        $('#invalid-tenchinhsach-feedback').prop('hidden', true);
        $('#invalid-noidung-feedback').prop('hidden', true);

        var check = true;

        if (tenchinhsach.length < 1) {
            check = false;
            $("#tenchinhsach").addClass('valid-was-validated');
            $('#invalid-tenchinhsach-feedback').text("Vui lòng nhập tên chính sách.").prop('hidden', false);
            $("#tenchinhsach").focus();

            $('#btnluuthem').html('Lưu thông tin');
            $('#btnluuthem').prop('disabled', false);
        }

        if (quill.getText().trim().length < 1) {
            check = false;

            $("#noidung").addClass('valid-was-validated');
            $('#invalid-noidung-feedback').text("Vui lòng nhập nội dung chính sách.").prop('hidden', false);
            $("#noidung").focus();

            $('#btnluuthem').html('Lưu thông tin');
            $('#btnluuthem').prop('disabled', false);
        }


        if (check == true) {
            var formData = new FormData();
            formData.append('tenchinhsach', tenchinhsach);
            formData.append('noidung', noidung);
            formData.append('hienthi', $('#hienthi').prop('checked'));
            formData.append('sothutu', sothutu);

            $.ajax({
                error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
                url: $('#requestPath').val() + "admin/chinhsach/themmoi",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua.indexOf("Chi tiết lỗi") !== -1) {
                    $('#btnluuthem').html('Lưu thông tin');
                    $('#btnluuthem').prop('disabled', false);

                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                        text: ketqua,
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "EXIST") {
                    $("#tenchinhsach").addClass('valid-was-validated');
                    $('#invalid-tenchinhsach-feedback').text("Chính sách này đã tồn tại.").prop('hidden', false);
                    $("#tenchinhsach").focus();

                    $('#btnluuthem').html('Lưu thông tin');
                    $('#btnluuthem').prop('disabled', false);
                }
                else {
                    var table = $('#lstDataTable').DataTable();
                    table.row.add($(ketqua)).draw(false);
                    $('#ThemMoiModal').modal('toggle');

                    $('#btnluuthem').html('Lưu thông tin');
                    $('#btnluuthem').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã thêm một chính sách mới.",
                        icon: "success"
                    });
                }
            });
        }
    });
});