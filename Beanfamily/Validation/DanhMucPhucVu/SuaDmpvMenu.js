$(document).ready(function () {
    $('body').on('click', '[id^="btnsuadm"]', function () {
        var id = $(this).attr("name");

        $('#suaiddanhmuc').val(id);
        $('#suatendanhmuc').val($("#inpTendanhmuc" + id).val());
        $('#suagia').val($("#inpGiadanhmuc" + id).val());
        $('#suasothutu').val($("#inpSothutu" + id).val());
        if ($("#inpHienthi" + id).val() == "true") {
            $('#suahienthi').prop("checked", true);
        }
        else {
            $('#suahienthi').prop("checked", false);
        }

        $('#suastriddanhmuc').val($('#inpMadanhmuc' + id).val());
        $('#SuaDmMtbModal').modal('toggle');
    });

    $('#btnluuSuaDmpv').on('click', function () {
        $('#btnluuSuaDmpv').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Đang tải...');
        $('#btnluuSuaDmpv').prop('disabled', true);

        var tendanhmuc = $('#suatendanhmuc').val().trim();
        var gia = $('#suagia').val().trim();
        var sothutu = $('#suasothutu').val().trim();

        $("#suatendanhmuc").removeClass('valid-was-validated');
        $("#suagia").removeClass('valid-was-validated');

        $('#invalid-suatendanhmuc-feedback').prop('hidden', true);
        $('#invalid-gia-feedback').prop('hidden', true);

        var check = true;

        if (gia.length < 1) {
            check = false;
            $("#suagia").addClass('valid-was-validated');
            $('#invalid-suagia-feedback').text("Vui lòng nhập giá dịch vụ.").prop('hidden', false);
            $("#suagia").focus();

            $('#btnluuSuaDmpv').html('Lưu thông tin');
            $('#btnluuSuaDmpv').prop('disabled', false);
        }

        if (tendanhmuc.length < 1) {
            check = false;
            $("#suatendanhmuc").addClass('valid-was-validated');
            $('#invalid-suatendanhmuc-feedback').text("Vui lòng nhập tên danh mục.").prop('hidden', false);
            $("#tendanhmuc").focus();

            $('#btnluuSuaDmpv').html('Lưu thông tin');
            $('#btnluuSuaDmpv').prop('disabled', false);
        }


        if (check == true) {
            var formData = new FormData();
            formData.append('id', $('#suaiddanhmuc').val());
            formData.append('tendanhmuc', tendanhmuc);
            formData.append('gia', gia);
            formData.append('hienthi', $('#suahienthi').prop('checked'));
            formData.append('sothutu', sothutu);

            $.ajax({
                url: $('#requestPath').val() + "admin/danhmucphucvu/suadm",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    $('#btnluuSuaDmpv').html('Lưu thông tin');
                    $('#btnluuSuaDmpv').prop('disabled', false);

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

                    $('#btnluuSuaDmpv').html('Lưu thông tin');
                    $('#btnluuSuaDmpv').prop('disabled', false);
                }
                else if (ketqua == "KHONGTONTAI") {
                    $('#btnluuSuaDmpv').html('Lưu thông tin');
                    $('#btnluuSuaDmpv').prop('disabled', false);

                    Swal.fire({
                        title: "Thông báo!",
                        text: "Danh mục này vừa mới được xóa bỏ.",
                        icon: "warning"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else {
                    $('#btnluuSuaDmpv').html('Lưu thông tin');
                    $('#btnluuSuaDmpv').prop('disabled', false);

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