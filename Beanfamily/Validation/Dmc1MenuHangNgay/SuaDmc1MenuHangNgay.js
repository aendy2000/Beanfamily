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
        $('#btnluuSuaDmtdhn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluuSuaDmtdhn').prop('disabled', true);

        var tendanhmuc = $('#suatendanhmuc').val().trim();
        var sothutu = $('#suasothutu').val().trim();

        $("#suatendanhmuc").removeClass('valid-was-validated');

        $('#invalid-suatendanhmuc-feedback').prop('hidden', true);

        var check = true;

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

            $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                url: $('#requestPath').val() + "admin/dmcap1menuhangngay/suadm",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua.indexOf("Chi tiết lỗi") !== -1) {
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
                    var table = $('#lstDmTdhnTable').DataTable();
                    var rowId = '#row-' + $('#suaiddanhmuc').val();

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

                    $('#SuaDmTdhnModal').modal('toggle');

                    $('#btnluuSuaDmtdhn').html('Lưu thông tin');
                    $('#btnluuSuaDmtdhn').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: 'Đã lưu cập nhật danh mục "' + $('#suastriddanhmuc').val() + '".',
                        icon: "success"
                    });
                }
            });
        }
    });
});