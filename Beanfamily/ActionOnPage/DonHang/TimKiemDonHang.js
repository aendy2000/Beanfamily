$(document).ready(function () {
    $('body').find('[id="BtnTimkiemdonhang"]').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Đang tải...');
        btn.css('pointer-events', 'none');

        $('body').find('[id="validate-timkiemdonhang-timkiem"]').text('').css('margin-bottom', '20px');

        var inp = $('body').find('[id="timkiemdonhang"]').val().trim();

        var formData = new FormData();
        formData.append('content', inp);

        $.ajax({
            url: $('body').find('[id="requestPath"]').val() + 'home/timkiemdonhang',
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false,
        }).done(function (ketqua) {
            if (ketqua.indexOf("Chi tiết lỗi:") !== -1) {
                btn.css('pointer-events', 'auto');
                btn.html('Tìm kiếm');
                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau.",
                    text: ketqua,
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
                btn.css('pointer-events', 'auto');
                btn.html('Tìm kiếm');

                $('body').find('[id="content-order-load"]').replaceWith(ketqua);
            }
        });
    });

    $('body').find('[id="timkiemdonhang"]').on('input', function () {
        $('body').find('[id="validate-timkiemdonhang-timkiem"]').text('').css('margin-bottom', '20px');
    });
});