﻿$(document).ready(function () {
    $('#checkAlls').on('click', function () {
        $('.datatable').DataTable()
            .column(0)
            .nodes()
            .to$()
            .find('input[type=checkbox]')
            .prop('checked', this.checked);
    });

    $('body').find('[id="locdonhang"]').on('change', function () {
        var filter = $('#locdonhang :selected').val();

        var formData = new FormData();
        formData.append('filter', filter);

        $.ajax({
            url: $('#requestPath').val() + "admin/dondathang/locdonhang",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            if (ketqua.indexOf("Chi tiết lỗi:") != -1) {
                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                    text: ketqua,
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
                $('body').find('[id="content-table"]').replaceWith(ketqua);
            }
        });
    });
});