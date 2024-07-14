$(document).ready(function () {

    $('body').on('change', '[id="chonnamthongke"]', function () {
        var year = $('body').find('[id="chonnamthongke"] :selected').val();
        var month = $('body').find('[id="chonthangthongke"] :selected').val();
        var formData = new FormData();
        formData.append('year', year);
        formData.append('month', month);

        $('body').find('[id="chonnamthongke"] :selected').html('Vui lòng chờ...');
        $('body').find('[id="chonnamthongke"]').prop('disabled', true);

        $.ajax({
            error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
            url: $('#requestPath').val() + "admin/Dashboard/DoanhThuTheoNam",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false,
        }).done(function (ketqua) {
            if (ketqua.indexOf("Chi tiết lỗi") != -1) {
                $('body').find('[id="chonnamthongke"] :selected').html('Doanh Thu Năm ' + year);
                $('body').find('[id="chonnamthongke"]').prop('disabled', false);

                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                    text: ketqua,
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
                $('body').find('[id="chonnamthongke"] :selected').html('Doanh Thu Năm ' + year);
                $('body').find('[id="chonnamthongke"]').prop('disabled', false);

                $('body').find('[id="content-doanhthu-append"]').replaceWith(ketqua);
                $('body').find('[id="tieude-doanhthu"]').text("THỐNG KÊ DOANH THU NĂM " + year);
            }
        });

    });

    $('body').on('change', '[id="chonthangthongke"]', function () {
        var year = $('body').find('[id="chonnamthongke"] :selected').val();
        var month = $('body').find('[id="chonthangthongke"] :selected').val();
        var formData = new FormData();
        formData.append('year', year);
        formData.append('month', month);

        $('body').find('[id="chonthangthongke"] :selected').html('Vui lòng chờ...');
        $('body').find('[id="chonthangthongke"]').prop('disabled', true);

        $.ajax({
            error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
            url: $('#requestPath').val() + "admin/Dashboard/DoanhThuTheoThang",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false,
        }).done(function (ketqua) {
            if (ketqua.indexOf("Chi tiết lỗi") != -1) {
                $('body').find('[id="chonthangthongke"] :selected').html('Doanh Thu Tháng ' + month + '/' + year);
                $('body').find('[id="chonthangthongke"]').prop('disabled', false);

                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                    text: ketqua,
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
                $('body').find('[id="chonthangthongke"] :selected').html('Doanh Thu Tháng ' + month + '/' + year);
                $('body').find('[id="chonthangthongke"]').prop('disabled', false);

                $('body').find('[id="content-doanhthu-append"]').replaceWith(ketqua);
            }
        });

    });

    $('body').on('click', '[id="xuat-thong-ke"]', function () {
        var tableHtml = $('body').find('[id="download-table-doanhthu"]');
        var year = tableHtml.attr('slyear');
        var month = tableHtml.attr('slmonth');

        tableHtml.table2excel({
            exclude: ".noExl",
            name: "Doanh Thu",
            filename: "thong-ke-doanh-thu-thang-" + month + "-" + year + ".xls", // do include extension
            fileext: ".xls",
            preserveColors: false // set to true if you want background colors and font colors preserved
        });
    });
});