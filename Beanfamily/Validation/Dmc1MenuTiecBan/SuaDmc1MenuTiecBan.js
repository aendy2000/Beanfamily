﻿$(document).ready(function () {
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


        $('[id^="suaiddmpv"]').each(function () {
            $(this).prop('checked', false);
        });
        var dmPv = $('#inpDmpv' + id).val();
        if (dmPv.length > 0) {
            var lstDmpv = dmPv.split("-");
            for (var i = 0; i < lstDmpv.length; i++) {
                $('#suaiddmpv' + lstDmpv[i]).prop('checked', true);
            }
        }

        $('#suastriddanhmuc').val($('#inpMadanhmuc' + id).val());
        $('#SuaDmMtbModal').modal('toggle');
    });

    $('#btnluuSuaDmMtb').on('click', function () {
        $('#btnluuSuaDmMtb').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Đang tải...');
        $('#btnluuSuaDmMtb').prop('disabled', true);

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

            $('#btnluuSuaDmMtb').html('Lưu thông tin');
            $('#btnluuSuaDmMtb').prop('disabled', false);
        }


        if (check == true) {
            var formData = new FormData();
            formData.append('id', $('#suaiddanhmuc').val());
            formData.append('tendanhmuc', tendanhmuc);
            formData.append('hienthi', $('#suahienthi').prop('checked'));
            formData.append('sothutu', sothutu);

            var lstIdPv = "";
            $('[id^="suaiddmpv"]').each(function () {
                $(this).attr('name');
                if ($(this).prop('checked')) lstIdPv += $(this).attr('name') + "-";
            });

            if (lstIdPv.length < 1)
                formData.append('idPv', lstIdPv);
            else
                formData.append('idPv', lstIdPv.substring(0, lstIdPv.length - 1));

            $.ajax({
                url: $('#requestPath').val() + "admin/dmcap1menutiecban/suadm",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    $('#btnluuSuaDmMtb').html('Lưu thông tin');
                    $('#btnluuSuaDmMtb').prop('disabled', false);

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

                    $('#btnluuSuaDmMtb').html('Lưu thông tin');
                    $('#btnluuSuaDmMtb').prop('disabled', false);
                }
                else if (ketqua == "KHONGTONTAI") {
                    $('#btnluuSuaDmMtb').html('Lưu thông tin');
                    $('#btnluuSuaDmMtb').prop('disabled', false);

                    Swal.fire({
                        title: "Thông báo!",
                        text: "Danh mục này vừa mới được xóa bỏ.",
                        icon: "warning"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else {
                    $('#btnluuSuaDmMtb').html('Lưu thông tin');
                    $('#btnluuSuaDmMtb').prop('disabled', false);

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