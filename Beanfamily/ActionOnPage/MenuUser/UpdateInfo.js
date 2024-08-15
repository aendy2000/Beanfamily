$(document).ready(function () {
    //Đổi thông tin cá nhân
    $('body').find('[id="submit-info-luuthongtin"]').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.css('pointer-events', 'none');

        var hoten = $('body').find('[id="info-hoten"]').val().trim();
        var id = $('body').find('[id="info-hoten"]').attr('idtk');
        var sodienthoai = $('body').find('[id="info-sodienthoai"]').val().trim();
        var email = $('body').find('[id="info-email"]').val().trim();
        var ngaysinh = $('body').find('[id="info-ngaysinh"]').val().trim();
        var gioitinh = $('body').find('[id="info-gioitinh"]').val().trim();
        var diachi = $('body').find('[id="info-diachi"]').val().trim();

        $('body').find('[id="validate-info-hoten"]').prop('hidden', true);
        $('body').find('[id="validate-info-sodienthoai"]').prop('hidden', true);
        $('body').find('[id="validate-info-email"]').prop('hidden', true);

        var testMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        var check = true;
        if (hoten.length < 1) {
            check = false;
            $('body').find('[id="validate-info-hoten"]').text('Họ và Tên không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Lưu thông tin");
        }

        if (sodienthoai.length < 1) {
            check = false;
            $('body').find('[id="validate-info-sodienthoai"]').text('Số điện thoại không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Lưu thông tin");
        }
        else if (sodienthoai.length !== 10) {
            check = false;
            $('body').find('[id="validate-info-sodienthoai"]').text('Số điện thoại chưa đúng.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Lưu thông tin");
        }

        if (email.length < 1) {
            check = false;
            $('body').find('[id="validate-info-email"]').text('Địa chỉ Email không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Lưu thông tin");
        }
        else if (testMail.test(email) == false) {
            check = false;
            $('body').find('[id="validate-info-email"]').text('Địa chỉ Email không hợp lệ.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Lưu thông tin");
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('id', id);
            formData.append('hoten', hoten);
            formData.append('sodienthoai', sodienthoai);
            formData.append('email', email);
            formData.append('ngaysinh', ngaysinh);
            formData.append('gioitinh', gioitinh);
            formData.append('diachi', diachi);

            $.ajax({
                url: $('body').find('[id="requestPath"]').val() + 'home/updateinfo',
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false,
            }).done(function (ketqua) {
                if (ketqua == "NOTEXIST") {
                    btn.css('pointer-events', 'auto');
                    btn.html("Lưu thông tin");

                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau.",
                        text: "Chi tiết lỗi: Không tìm thấy dữ liệu tài khoản. Hãy thử đăng nhập lại",
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua.indexOf("Chi tiết lỗi:") !== -1) {
                    btn.css('pointer-events', 'auto');
                    btn.html("Lưu thông tin");
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
                    btn.html("Lưu thông tin");

                    Swal.fire({
                        title: "Thành Công",
                        text: "Đã cập nhật thông tin cá nhân",
                        icon: "success"
                    });
                }
            });
        }
    });

    //Đăng ký
    $('body').find('[id="submit-info-doimatkhau"]').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.css('pointer-events', 'none');

        var id = $('body').find('[id="info-matkhauhientai"]').attr('idtk');
        var matkhaucu = $('body').find('[id="info-matkhauhientai"]').val().trim();
        var matkhaumoi = $('body').find('[id="info-matkhaumoi"]').val().trim();
        var rematkhaumoi = $('body').find('[id="info-nhaplaimatkhaumoi"]').val().trim();

        $('body').find('[id="validate-info-matkhauhientai"]').prop('hidden', true);
        $('body').find('[id="validate-info-matkhaumoi"]').prop('hidden', true);
        $('body').find('[id="validate-info-nhaplaimatkhaumoi"]').prop('hidden', true);

        var check = true;
        if (matkhaucu.length < 1) {
            check = false;
            $('body').find('[id="validate-info-matkhauhientai"]').text('Mật khẩu cũ không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Đổi mật khẩu");
        }

        if (matkhaumoi.length < 1) {
            check = false;
            $('body').find('[id="validate-info-matkhaumoi"]').text('Mật khẩu mới không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Đổi mật khẩu");
        }

        if (matkhaumoi !== rematkhaumoi) {
            check = false;
            $('body').find('[id="validate-info-nhaplaimatkhaumoi"]').text('Mật khẩu mới không trùng khớp.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Đổi mật khẩu");
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('id', id);
            formData.append('matkhaucu', matkhaucu);
            formData.append('matkhaumoi', matkhaumoi);

            $.ajax({
                url: $('body').find('[id="requestPath"]').val() + 'home/UpdatePass',
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false,
            }).done(function (ketqua) {
                if (ketqua == "NOTEXIST") {
                    btn.css('pointer-events', 'auto');
                    btn.html("Đổi mật khẩu");

                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau.",
                        text: "Chi tiết lỗi: Không tìm thấy dữ liệu tài khoản. Hãy thử đăng nhập lại",
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "INVALID") {
                    btn.css('pointer-events', 'auto');
                    btn.html("Đổi mật khẩu");

                    $('body').find('[id="validate-info-matkhauhientai"]').text('Mật khẩu cũ không chính xác.').prop('hidden', false);
                }
                else if (ketqua.indexOf("Chi tiết lỗi:") !== -1) {
                    btn.css('pointer-events', 'auto');
                    btn.html("Đổi mật khẩu");

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
                    btn.html("Đổi mật khẩu");

                    Swal.fire({
                        title: "Thành Công",
                        text: "Đã cập nhật mật khẩu mới",
                        icon: "success"
                    });
                }
            });
        }
    });
});