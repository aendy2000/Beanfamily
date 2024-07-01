$(document).ready(function () {
    //Đặt lại mật khẩu
    $('body').find('[id="submit-user-datlaimatkhau"]').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.css('pointer-events', 'none');

        var pass = $('body').find('[id="matkhau-datlaimatkhau"]').val().trim();
        var repass = $('body').find('[id="nhaplaimatkhau-datlaimatkhau"]').val().trim();
        var email = $('body').find('[id="matkhau-datlaimatkhau"]').attr('usermail');

        $('body').find('[id="validate-matkhau-datlaimatkhau"]').prop('hidden', true);
        $('body').find('[id="validate-nhaplaimatkhau-datlaimatkhau"]').prop('hidden', true);

        var check = true;

        if (pass.length < 1) {
            check = false;
            $('body').find('[id="validate-matkhau-datlaimatkhau"]').text('Mật khẩu không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Xác nhận");
        }
        else if (pass.length < 8) {
            check = false;
            $('body').find('[id="validate-matkhau-datlaimatkhau"]').text('Mật khẩu tối thiểu 8 ký tự.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Xác nhận");
        }

        if (repass !== pass) {
            check = false;
            $('body').find('[id="validate-nhaplaimatkhau-datlaimatkhau"]').text('Mật khẩu không trùng khớp.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Xác nhận");
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('pass', pass);
            formData.append('email', email);

            $.ajax({
                url: $('body').find('[id="requestPath"]').val() + 'home/DatLaiMatKhau',
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false,
            }).done(function (ketqua) {
                if (ketqua == "INVALID" || ketqua.indexOf("Chi tiết lỗi") != -1) {
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
                    Swal.fire({
                        title: "Thành Công",
                        text: 'Đã đặt lại mật khẩu mới, hãy đăng nhập lại.',
                        icon: "success"
                    }).then(() => {
                        $('body').find('[id="userDangNhapQuenMatKhauModal"]').modal('toggle');
                        window.location.reload();
                    });
                }
            });
        }
    });
});