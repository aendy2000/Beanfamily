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

                $('body').find('[id="content-spnb-modal"]').replaceWith($(ketqua));

                $('body').find('[id="lstDataTableSPNB"]').DataTable();
                var table = $('body').find('[id="lstDataTableSPNB"]').DataTable();

                var soluong = table.column(0).nodes().to$().find('input[type="checkbox"]:checked').length;
                soluong = $(document).find('#checkAlls').prop('checked') ? soluong-- : soluong;
                $('#checkbox-dachon').text('Đã chọn ' + soluong + ' sản phẩm');

                $('body').find('[id="SuaSpnbModal"]').modal('toggle');

            }
        });
    });

    $(document).on('click', '#lstDataTableSPNB #checkAlls', function () {
        $('body').find('[id="lstDataTableSPNB"]').DataTable()
            .column(0)
            .nodes()
            .to$()
            .find('input[type=checkbox]')
            .prop('checked', this.checked);
    });

    $(document).on('change', '#lstDataTableSPNB .form-check-input', function () {
        var table = $('#lstDataTableSPNB').DataTable();
        var soluong = table.column(0).nodes().to$().find('input[type="checkbox"]:checked').length;
        soluong = $(document).find('#checkAlls').prop('checked') ? soluong-- : soluong;

        $('#checkbox-dachon').text('Đã chọn ' + soluong + ' sản phẩm');
    });

    $('#btnluuSua').on('click', function () {
        $('#btnluuSua').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluuSua').prop('disabled', true);

        var soluong = 0;
        var lstId = "";
        $('body').find('[id="lstDataTableSPNB"]').DataTable()
            .column(0)
            .nodes()
            .to$()
            .find('input[id^="checkitem"]:checked').each(function () {
                soluong++;
                lstId += $(this).attr("name") + "#";
            });
        if (lstId.length > 0) lstId = lstId.substring(0, lstId.length - 1);

        var check = true;
        if (soluong < 6) {
            check = false;

            $('#btnluuSua').html('Lưu thông tin');
            $('#btnluuSua').prop('disabled', false);

            Swal.fire({
                title: "Chọn tối thiểu 6 món",
                text: "Vui lòng chọn ít nhất 6 món ăn nổi bật",
                icon: "warning"
            });
        }
        //var strId = "";
        //$('body').find('[id^="sanpham-"]').each(function () {
        //    if ($(this).prop('checked'))
        //        strId += $(this).attr('name') + "#";
        //});
        //var idtdhn = strId.length > 0 ? strId.substring(0, strId.length - 1) : strId;

        if (check == true) {
            var formData = new FormData();
            formData.append('idthucdon', lstId);

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
                        text: 'Đã cập nhật danh sách sản phẩm nổi bật.',
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
        }
    });
});