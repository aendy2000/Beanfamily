$(document).ready(function () {
    //Gửi mã xác nhận
    $('body').find('[id="submit-ma-quenmatkhau"]').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Đang tải...');
        btn.css('pointer-events', 'none');

        var ma = $('body').find('[id="guima-quenmatkhau"]').val().trim();
        var email = $('body').find('[id="guima-quenmatkhau"]').attr('diachiemail');
        $('body').find('[id="validate-guima-quenmatkhau"]').prop('hidden', true);
        $('body').find('[id="validate-guilaima-quenmatkhau"]').prop('hidden', true);

        var check = true;

        if (ma.length < 1) {
            check = false;
            $('body').find('[id="validate-guima-quenmatkhau"]').text('Mã xác nhận không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Xác nhận");
        }
        else if (ma.length != 6) {
            check = false;
            $('body').find('[id="validate-guima-quenmatkhau"]').text('Mã xác nhận gồm 6 chữ số.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Xác nhận");
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('ma', ma);
            formData.append('email', email);

            $.ajax({
                url: $('body').find('[id="requestPath"]').val() + 'home/GuiMaQuenMatKhau',
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false,
            }).done(function (ketqua) {
                if (ketqua == "NOTEXIST") {
                    btn.css('pointer-events', 'auto');
                    btn.html("Xác nhận");
                    $('body').find('[id="validate-guima-quenmatkhau"]').text('Không tìm thấy tài khoản.').prop('hidden', false);
                }
                else if (ketqua == "INVALID") {
                    btn.css('pointer-events', 'auto');
                    btn.html("Xác nhận");
                    $('body').find('[id="validate-guima-quenmatkhau"]').text('Mã xác nhận không đúng.').prop('hidden', false);
                }
                else if (ketqua == "TIMEOUT") {
                    btn.css('pointer-events', 'auto');
                    btn.html("Xác nhận");
                    $('body').find('[id="validate-guima-quenmatkhau"]').text('Mã xác nhận đã hết hạn.').prop('hidden', false);
                }
                else if (ketqua.indexOf("Chi tiết lỗi") != -1) {
                    btn.css('pointer-events', 'auto');
                    btn.html("Xác nhận");

                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau.",
                        text: ketqua,
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else {
                    $('body').find('[id="userDangNhapQuenMatKhauModalLabel2"]').text("ĐẶT LẠI MẬT KHẨU");
                    $('body').find('[id="contentQuenMatKhau"]').replaceWith(ketqua);
                }
            });
        }
    });

    //Gửi lại mã xác nhận
    $('body').find('[id="guilaima-quenmatkhau"]').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Đang tải...');
        btn.css('pointer-events', 'none');

        $('body').find('[id="validate-guima-quenmatkhau"]').prop('hidden', true);
        $('body').find('[id="validate-guilaima-quenmatkhau"]').prop('hidden', true);

        $.ajax({
            url: $('body').find('[id="requestPath"]').val() + 'home/GuiLaiMaXacNhan',
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false,
        }).done(function (ketqua) {
            if (ketqua == "INVALID") {
                btn.css('pointer-events', 'auto');
                btn.html("Gửi lại mã");

                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau",
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else if (ketqua == "WAIT") {
                btn.css('pointer-events', 'auto');
                btn.html("Gửi lại mã");
                $('body').find('[id="validate-guima-quenmatkhau"]').text('Vui lòng đợi ít phút trước khi yêu cầu mã mới.').prop('hidden', false);
            }
            else if (ketqua.indexOf("Chi tiết lỗi") != -1) {
                btn.css('pointer-events', 'auto');
                btn.html("Gửi lại mã");

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
                btn.html("Gửi lại mã");
                $('body').find('[id="validate-guilaima-quenmatkhau"]').text('Đã gửi lại mã xác nhận mới.').prop('hidden', false);
            }
        });
    });
});