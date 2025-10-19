$(document).ready(function () {
    const quills = new Quill('#suanoidung', {
        modules: {
            syntax: true,
            toolbar: '#toolbar-container-edit',
        },
        placeholder: 'Nhập nội dung chính sách...',
        theme: 'snow',
    });

    $('body').on('click', '[id^="btnsua"]', function () {

        var id = $(this).attr("name");

        $('#suaidchinhsach').val(id);
        $('#suatenchinhsach').val($("#inpTen" + id).val());
        quills.root.innerHTML = $("#inpNoidung" + id).val();
        $('#suasothutu').val($("#inpSothutu" + id).val());
        if ($("#inpHienthi" + id).val() == "true") {
            $('#suahienthi').prop("checked", true);
        }
        else {
            $('#suahienthi').prop("checked", false);
        }

        $('#suastridchinhsach').val($('#inpMa' + id).val());
        $('#ChinhSuaModal').modal('toggle');
    });

    $('#btnluuSua').on('click', function () {
        $('#btnluuSua').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluuSua').prop('disabled', true);

        var tenchinhsach = $('#suatenchinhsach').val().trim();
        var noidung = quills.root.innerHTML /* quill.getContents()*/;
        var sothutu = $('#suasothutu').val().trim();

        $("#suatenchinhsach").removeClass('valid-was-validated');
        $("#suanoidung").removeClass('valid-was-validated');

        $('#invalid-suatenchinhsach-feedback').prop('hidden', true);
        $('#invalid-suanoidung-feedback').prop('hidden', true);

        var check = true;

        if (tenchinhsach.length < 1) {
            check = false;
            $("#suatenchinhsach").addClass('valid-was-validated');
            $('#invalid-suatenchinhsach-feedback').text("Vui lòng nhập tên chính sách.").prop('hidden', false);
            $("#suatenchinhsach").focus();

            $('#btnluuSua').html('Lưu thông tin');
            $('#btnluuSua').prop('disabled', false);
        }

        if (quills.getText().trim().length < 1) {
            check = false;

            $("#suanoidung").addClass('valid-was-validated');
            $('#invalid-suanoidung-feedback').text("Vui lòng nhập nội dung chính sách.").prop('hidden', false);
            $("#suanoidung").focus();

            $('#btnluuSua').html('Lưu thông tin');
            $('#btnluuSua').prop('disabled', false);
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('id', $('#suaidchinhsach').val());
            formData.append('tenchinhsach', tenchinhsach);
            formData.append('noidung', noidung);
            formData.append('hienthi', $('#suahienthi').prop('checked'));
            formData.append('sothutu', sothutu);
           
            $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                url: $('#requestPath').val() + "admin/chinhsach/chinhsua",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua.indexOf("Chi tiết lỗi") !== -1) {
                    $('#btnluuSua').html('Lưu thông tin');
                    $('#btnluuSua').prop('disabled', false);

                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                        text: ketqua,
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "EXIST") {
                    $("#suatenchinhsach").addClass('valid-was-validated');
                    $('#invalid-suatenchinhsach-feedback').text("Chính sách này đã tồn tại.").prop('hidden', false);
                    $("#suatenchinhsach").focus();

                    $('#btnluuSua').html('Lưu thông tin');
                    $('#btnluuSua').prop('disabled', false);
                }
                else if (ketqua == "KHONGTONTAI") {
                    $('#btnluuSua').html('Lưu thông tin');
                    $('#btnluuSua').prop('disabled', false);

                    Swal.fire({
                        title: "Thông báo!",
                        text: "Chính sách này vừa mới được xóa bỏ.",
                        icon: "warning"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else {
                    var table = $('#lstDataTable').DataTable();
                    var rowId = '#row-' + $('#suaidchinhsach').val();

                    var row = table.row(rowId);
                    if (row.length > 0) {
                        var newRowHtml = $(ketqua);

                        var cellData = [];
                        newRowHtml.find('td').each(function () {
                            cellData.push($(this).html());
                        });

                        row.data(cellData).draw(false);
                        $(rowId).find('[data-bs-toggle="tooltip"]').tooltip();
                    }

                    $('#ChinhSuaModal').modal('toggle');

                    $('#btnluuSua').html('Lưu thông tin');
                    $('#btnluuSua').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: 'Đã lưu cập nhật chính sách "' + $('#suastridchinhsach').val() + '".',
                        icon: "success"
                    });
                }
            });
        }
    });
});