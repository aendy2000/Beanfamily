$(document).ready(function () {

    $('body').find('[id="user-dangky"]').on('click', function () {
        $('body').find('[id="userDangNhapModal"]').modal('toggle');
        $('body').find('[id="userDangKyModal"]').modal('toggle');
    });

    $('body').find('[id="user-dangnhaps"]').on('click', function () {
        $('body').find('[id="userDangNhapModal"]').modal('toggle');
        $('body').find('[id="userDangKyModal"]').modal('toggle');
    });

    $('body').find('[id="user-dangnhap-quenmatkhau"]').on('click', function () {
        $('body').find('[id="userDangNhapModal"]').modal('toggle');
        $('body').find('[id="userDangNhapQuenMatKhauModal"]').modal('toggle');

    });
    $('body').find('[id="huy-user-quenmatkhau"]').on('click', function () {
        $('body').find('[id="userDangNhapQuenMatKhauModal"]').modal('toggle');
        $('body').find('[id="userDangNhapModal"]').modal('toggle');
    });

    $('body').find('[id="user-dangnhap"]').on('click', function () {
        $('body').find('[id="userDangNhapModal"]').modal('toggle');
    });

    //Đăng nhập
    $('body').find('[id="submit-user-dangnhap"]').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Đang tải...');
        btn.css('pointer-events', 'none');

        var sdt = $('body').find('[id="sodienthoai-dangnhap"]').val().trim();
        var mk = $('body').find('[id="matkhau-dangnhap"]').val();

        $('body').find('[id="validate-sodienthoai-dangnhap"]').prop('hidden', true);
        $('body').find('[id="validate-matkhau-dangnhap"]').prop('hidden', true);

        var check = true;
        if (sdt.length < 1) {
            check = false;
            $('body').find('[id="validate-sodienthoai-dangnhap"]').text('Số điện thoại không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("ĐĂNG NHẬP");
        }

        if (mk.length < 1) {
            check = false;
            $('body').find('[id="validate-matkhau-dangnhap"]').text('Mật khẩu đăng nhập không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("ĐĂNG NHẬP");
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('sodienthoai', sdt);
            formData.append('matkhau', mk);

            $.ajax({
                url: $('body').find('[id="requestPath"]').val() + 'home/DangNhap',
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false,
            }).done(function (ketqua) {
                if (ketqua == "INVALID") {
                    btn.css('pointer-events', 'auto');
                    btn.html("ĐĂNG NHẬP");
                    $('body').find('[id="validate-matkhau-dangnhap"]').text('Tài khoản hoặc mật khẩu không chính xác.').prop('hidden', false);
                }
                else if (ketqua == "LOCKED") {
                    btn.css('pointer-events', 'auto');
                    btn.html("ĐĂNG NHẬP");
                    $('body').find('[id="validate-sodienthoai-dangnhap"]').text('Tài khoản của bạn đã bị khóa.').prop('hidden', false);
                }
                else if (ketqua.indexOf("Chi tiết lỗi:") !== -1) {
                    btn.css('pointer-events', 'auto');
                    btn.html("ĐĂNG NHẬP");
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
                    btn.html("ĐĂNG NHẬP");
                    $('body').find('[id="userDangNhapModal"]').modal('toggle');

                    $('body').find('[id="cart-content-load"]').replaceWith(ketqua);

                    Swal.fire({
                        title: "Đăng Nhập Thành Công",
                        icon: "success"
                    }).then(() => {
                        window.location.href = $('#requestPath').val() + "home/index";

                    });
                }
            });
        }
    });

    //Đăng ký
    $('body').find('[id="submit-user-dangky"]').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Đang tải...');
        btn.css('pointer-events', 'none');
        var testMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        var hoten = $('body').find('[id="hoten-dangky"]').val().trim();
        var email = $('body').find('[id="email-dangky"]').val().trim();
        var sdt = $('body').find('[id="sodienthoai-dangky"]').val().trim();
        var mk = $('body').find('[id="matkhau-dangky"]').val();

        $('body').find('[id="validate-hoten-dangky"]').prop('hidden', true);
        $('body').find('[id="validate-email-dangky"]').prop('hidden', true);
        $('body').find('[id="validate-sodienthoai-dangky"]').prop('hidden', true);
        $('body').find('[id="validate-matkhau-dangky"]').prop('hidden', true);

        var check = true;
        if (sdt.length < 1) {
            check = false;
            $('body').find('[id="validate-sodienthoai-dangky"]').text('Số điện thoại không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("ĐĂNG KÝ");
        }
        else if (sdt.length != 10) {
            check = false;
            $('body').find('[id="validate-sodienthoai-dangky"]').text('Số điện thoại chưa đúng.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("ĐĂNG KÝ");
        }

        if (mk.length < 1) {
            check = false;
            $('body').find('[id="validate-matkhau-dangky"]').text('Mật khẩu đăng nhập không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("ĐĂNG KÝ");
        }
        else if (mk.length < 8) {
            check = false;
            $('body').find('[id="validate-matkhau-dangky"]').text('Mật khẩu tối thiểu 8 ký tự.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("ĐĂNG KÝ");
        }

        if (email.length < 1) {
            check = false;
            $('body').find('[id="validate-email-dangky"]').text('Email không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("ĐĂNG KÝ");
        }
        else if (testMail.test(email) == false) {
            check = false;
            $('body').find('[id="validate-email-dangky"]').text('Email chưa đúng định dạng.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("ĐĂNG KÝ");
        }

        if (hoten.length < 1) {
            check = false;
            $('body').find('[id="validate-hoten-dangky"]').text('Họ & Tên không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("ĐĂNG KÝ");
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('sodienthoai', sdt);
            formData.append('matkhau', mk);
            formData.append('email', email);
            formData.append('hoten', hoten);

            $.ajax({
                url: $('body').find('[id="requestPath"]').val() + 'home/DangKy',
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false,
            }).done(function (ketqua) {
                if (ketqua == "EMAILEXIST") {
                    btn.css('pointer-events', 'auto');
                    btn.html("ĐĂNG KÝ");
                    $('body').find('[id="validate-email-dangky"]').text('Email đã được sử dụng.').prop('hidden', false);
                }
                else if (ketqua == "SDTEXIST") {
                    btn.css('pointer-events', 'auto');
                    btn.html("ĐĂNG KÝ");
                    $('body').find('[id="validate-sodienthoai-dangky"]').text('Số điện thoại đã được sử dụng.').prop('hidden', false);
                }
                else if (ketqua == "SUCCESS") {
                    btn.css('pointer-events', 'auto');
                    btn.html("ĐĂNG KÝ");

                    Swal.fire({
                        title: "Đăng Ký Thành Công",
                        text: "Đã đăng ký tài khoản, hãy đăng nhập lại.",
                        icon: "success"
                    }).then(() => {
                        $('body').find('[id="userDangNhapModal"]').modal('toggle');
                        $('body').find('[id="userDangKyModal"]').modal('toggle');
                    });
                }
                else {
                    btn.css('pointer-events', 'auto');
                    btn.html("ĐĂNG KÝ");
                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau.",
                        text: ketqua,
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
            });
        }
    });

    //Đăng xuất
    $('body').find('[id="user-dangxuat"]').on('click', function () {
        Swal.fire({
            title: 'Đăng Xuất?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Đăng xuất",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: $('body').find('[id="requestPath"]').val() + 'home/DangXuat',
                    dataType: 'html',
                    type: 'GET',
                    processData: false,
                    contentType: false,
                }).done(function (ketqua) {
                    if (ketqua.indexOf("Chi tiết lỗi:") !== -1) {
                        Swal.fire({
                            title: "Đã xảy ra lỗi, vui lòng thử lại sau.",
                            text: ketqua,
                            icon: "error"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
                        $('body').find('[id="cart-content-load"]').replaceWith(ketqua);

                        Swal.fire({
                            title: "Đã Đăng Xuất",
                            icon: "success"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                });
            }
        });
    });

    //Lấy mã quên mật khẩu
    $('body').find('[id="submit-user-quenmatkhau"]').on('click', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Đang tải...');
        btn.css('pointer-events', 'none');
        var testMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        var email = $('body').find('[id="email-quenmatkhau"]').val().trim();
        $('body').find('[id="validate-email-quenmatkhau"]').prop('hidden', true);

        var check = true;
        if (email.length < 1) {
            check = false;
            $('body').find('[id="validate-email-quenmatkhau"]').text('Email không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Gửi mã xác nhận");
        }
        else if (testMail.test(email) == false) {
            check = false;
            $('body').find('[id="validate-email-quenmatkhau"]').text('Email chưa đúng định dạng.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Gửi mã xác nhận");
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('email', email);

            $.ajax({
                url: $('body').find('[id="requestPath"]').val() + 'home/LayMaQuenMatKhau',
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false,
            }).done(function (ketqua) {
                if (ketqua == "INVALID") {
                    btn.css('pointer-events', 'auto');
                    btn.html("Gửi mã xác nhận");
                    $('body').find('[id="validate-email-quenmatkhau"]').text('Không tìm thấy tài khoản.').prop('hidden', false);
                }
                else if (ketqua.indexOf("Chi tiết lỗi") != -1) {
                    btn.css('pointer-events', 'auto');
                    btn.html("Gửi mã xác nhận");

                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau.",
                        text: ketqua,
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else {
                    $('body').find('[id="contentQuenMatKhau"]').replaceWith(ketqua);
                }
            });
        }
    });
});