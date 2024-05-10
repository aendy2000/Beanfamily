$(document).ready(function () {
    //Đặt bàn
    $('[id^="btnDatBan-"]').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Đang tải...');
        btn.css('pointer-events', 'none');

        var idMenu = $(this).attr('name');
        var lstId = "";
        $('[id^="monantiecban-' + idMenu + '-"]').each(function () {
            var idPro = $(this).attr('id').split('-')[2];
            if (idPro !== "all") {
                if ($(this).prop('checked')) {
                    lstId += idPro + "-";
                }
            }
        });

        var check = true;
        if (lstId.length < 1) {
            check = false;
            btn.css('pointer-events', 'auto');
            btn.html("Đặt Bàn");
            Swal.fire({
                title: "Chưa chọn món!",
                text: "Vui lòng chọn ít nhất 1 món trong Menu!",
                icon: "warning"
            });
        }
        else {
            lstId = lstId.substring(0, lstId.length - 1);
        }
    });
});