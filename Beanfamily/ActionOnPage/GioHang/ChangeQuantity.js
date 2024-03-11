$(document).ready(function () {

    $('body').on('click', '[id^="tangsoluonggiohang-"]', function () {
        var id = $(this).attr('name');
        var inpSL = Number($('body').find('[id="soluonggiohang-' + id + '"]').val());
        if ($('[id="giasanpham-' + id + '"]').attr('dongia') != "CHONPHANLOAI") {
            var chinhsuagia
        }
        if (inpSL < 100) {
            var soluong = inpSL + 1;
            var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
            if (dongia != "CHONPHANLOAI") {
                var chinhsuagia = Number(Number(dongia) * (inpSL + 1)) + "";
                if (chinhsuagia === "") { return; }

                if (chinhsuagia.indexOf(".") != -1) {

                    var decimal_pos = chinhsuagia.indexOf(".");

                    var left_side = chinhsuagia.substring(0, decimal_pos);
                    var right_side = chinhsuagia.substring(decimal_pos);

                    left_side = left_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    right_side = right_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                    right_side = right_side.substring(0, 2);
                    chinhsuagia = left_side + "." + right_side;

                } else {
                    chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    chinhsuagia = chinhsuagia;
                }
                $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
                $('body').find('[id="soluonggiohang-' + id + '"]').val(inpSL + 1);

                var formData = new FormData();
                formData.append('soluong', soluong);
                formData.append('id', id);

                $.ajax({
                    url: $('#requestPath').val() + "admin/giohang/updategiohang",
                    data: formData,
                    type: 'POST',
                    dataType: 'html',
                    contentType: false,
                    processData: false
                }).done(function (data) {
                    if (data.indexOf("Chi tiết lỗi") != -1) {

                    }
                });
            }
        }
    });
    $('body').on('click', '[id^="giamsoluonggiohang-"]', function () {
        var id = $(this).attr('name');
        var inpSL = Number($('body').find('[id="soluonggiohang-' + id + '"]').val());
        if (inpSL > 1) {
            var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
            if (dongia != "CHONPHANLOAI") {
                var chinhsuagia = Number(Number(dongia) * (inpSL - 1)) + "";
                if (chinhsuagia === "") { return; }

                if (chinhsuagia.indexOf(".") != -1) {

                    var decimal_pos = chinhsuagia.indexOf(".");

                    var left_side = chinhsuagia.substring(0, decimal_pos);
                    var right_side = chinhsuagia.substring(decimal_pos);

                    left_side = left_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    right_side = right_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                    right_side = right_side.substring(0, 2);
                    chinhsuagia = left_side + "." + right_side;

                } else {
                    chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    chinhsuagia = chinhsuagia;
                }
                $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
                $('body').find('[id="soluonggiohang-' + id + '"]').val(inpSL - 1);
            }
        }
    });
    $('body').on('input', '[id^="soluonggiohang-"]', function () {
        var sl = $(this).val();
        if (sl.length > 0) {
            if (Number(sl) < 1 || Number(sl) > 100) {
                $(this).val('1');
            }
        }
    });
    $('body').on('keydown', '[id^="soluonggiohang-"]', function (e) {
        var id = $(this).attr('name');
        if (e.keyCode == '38') { //up
            var inpSL = Number($('body').find('[id^="soluonggiohang-' + id + '"]').val());
            if (inpSL < 100) {
                var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
                if (dongia != "CHONPHANLOAI") {
                    var chinhsuagia = Number(Number(dongia) * (inpSL + 1)) + "";
                    if (chinhsuagia === "") { return; }

                    if (chinhsuagia.indexOf(".") != -1) {

                        var decimal_pos = chinhsuagia.indexOf(".");

                        var left_side = chinhsuagia.substring(0, decimal_pos);
                        var right_side = chinhsuagia.substring(decimal_pos);

                        left_side = left_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        right_side = right_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                        right_side = right_side.substring(0, 2);
                        chinhsuagia = left_side + "." + right_side;

                    } else {
                        chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        chinhsuagia = chinhsuagia;
                    }
                    $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohang-' + id + '"]').val(inpSL + 1);
                }
            }
        }
        else if (e.keyCode == '40') { //down
            var inpSL = Number($('body').find('[id^="soluonggiohang-' + id + '"]').val());
            if (inpSL > 1) {
                var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
                if (dongia != "CHONPHANLOAI") {
                    var chinhsuagia = Number(Number(dongia) * (inpSL - 1)) + "";
                    if (chinhsuagia === "") { return; }

                    if (chinhsuagia.indexOf(".") != -1) {

                        var decimal_pos = chinhsuagia.indexOf(".");

                        var left_side = chinhsuagia.substring(0, decimal_pos);
                        var right_side = chinhsuagia.substring(decimal_pos);

                        left_side = left_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        right_side = right_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                        right_side = right_side.substring(0, 2);
                        chinhsuagia = left_side + "." + right_side;

                    } else {
                        chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        chinhsuagia = chinhsuagia;
                    }
                    $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohang-' + id + '"]').val(inpSL - 1);
                }
            }
        }
    });

    $('body').on('focusout', '[id^="soluonggiohang-"]', function () {
        if ($(this).val().trim().length < 1) {
            var id = $(this).attr('name');
            $('body').find('[id="soluonggiohang-' + id + '"]').val('1');
        }
    });

});