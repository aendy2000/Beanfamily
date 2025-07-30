$(document).ready(function () {
    $('body').on('click', '[id^="btnSuaSpnbModal"]', function () {
        $('#btnSuaSpnbModal').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnSuaSpnbModal').prop('disabled', true);

        $.ajax({
            error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
            url: $('#requestPath').val() + "admin/sanphamnoibat/opensua",
            dataType: 'html',
            type: 'GET',
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            if (ketqua.indexOf("Chi tiết lỗi") != -1) {
                $('#btnSuaSpnbModal').html('<i class="bi bi-pencil-square me-1"> </i> Chọn sản phẩm');
                $('#btnSuaSpnbModal').prop('disabled', false);

                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                    text: ketqua,
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
                $('#btnSuaSpnbModal').html('<i class="bi bi-pencil-square me-1"> </i> Chọn sản phẩm');
                $('#btnSuaSpnbModal').prop('disabled', false);

                $('body').find('[id="content-spnb-modal"]').replaceWith(ketqua);

                $('#sptdhn').select2({ dropdownParent: $('#SuaSpnbModal') });
                $('#spvr').select2({ dropdownParent: $('#SuaSpnbModal') });
                $('#spms').select2({ dropdownParent: $('#SuaSpnbModal') });

                $('#sptdhn2').select2({ dropdownParent: $('#SuaSpnbModal') });
                $('#spvr2').select2({ dropdownParent: $('#SuaSpnbModal') });
                $('#spms2').select2({ dropdownParent: $('#SuaSpnbModal') });

                $('body').find('[id="SuaSpnbModal"]').modal('toggle');

            }
        });
    });

    $('#btnluuSua').on('click', function () {
        $('#btnluuSua').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluuSua').prop('disabled', true);

        var idtdhn = $('body').find('[id="sptdhn"]').val();
        var idvr = $('body').find('[id="spvr"]').val();
        var idms = $('body').find('[id="spms"]').val();

        var idtdhn2 = $('body').find('[id="sptdhn2"]').val();
        var idvr2 = $('body').find('[id="spvr2"]').val();
        var idms2 = $('body').find('[id="spms2"]').val();

        var formData = new FormData();
        formData.append('thucdon', idtdhn);
        formData.append('vuonrau', idvr);
        formData.append('muasam', idms);

        formData.append('thucdon2', idtdhn2);
        formData.append('vuonrau2', idvr2);
        formData.append('muasam2', idms2);

        $.ajax({
            error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
            url: $('#requestPath').val() + "admin/sanphamnoibat/luuchinhsua",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            if (ketqua == "SUCCESS") {
                $('#btnluuSua').html('Lưu thông tin');
                $('#btnluuSua').prop('disabled', false);

                Swal.fire({
                    title: "Thành công!",
                    text: 'Đã cập nhật danh sách sản phẩm nỗi bật.',
                    icon: "success"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
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
        });
    });
});