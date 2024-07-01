$(document).ready(function () {
    //Đặt bàn
    $('#btnDatBanBuffet').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.css('pointer-events', 'none');

        var lstId = ""; //Định dạng: id Món 1 - id Món 2
        $('[id^="monanbuffet-"]').each(function () {
            var inpfr = $(this);
            if (inpfr.attr('id').split('-')[2] !== "all" && inpfr.prop('checked')) {
                lstId += inpfr.attr('id').split('-')[2] + "-";
            }
        });

        if (lstId.length < 1) {
            check = false;
            btn.css('pointer-events', 'auto');
            btn.html("ĐẶT BÀN");
            Swal.fire({
                title: "Chưa chọn món!",
                text: "Vui lòng chọn ít nhất 1 món trong Menu!",
                icon: "warning"
            });
        }
        else {
            lstId = lstId.substring(0, lstId.length - 1);
            var formData = new FormData();
            formData.append('lstId', lstId);

            $.ajax({
                url: $('#requestPath').val() + "menubuffet/datban",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                btn.html('ĐẶT BÀN');
                btn.css('pointer-events', 'all');

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
                    $('body').find('[id="contentDatBan"]').replaceWith(ketqua);
                    $('body').find('[id="datBanBuffetModal"]').modal("toggle");
                }
            });
        }
    });
});