$(document).ready(function () {
    $('#btnluuchinhsua').on('click', function () {
        $('#btnluuchinhsua').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Đang tải...');
        $('#btnluuchinhsua').prop('disabled', true);

        var tendangnhap = $('#tendangnhap').val().trim();
        var hovaten = $('#hovaten').val().trim();
        var email = $('#email').val().trim();
        var sodienthoai = $('#sodienthoai').val().trim();
        var ngaysinh = $('#ngaysinh').val();
        var gioitinh = $('#gioitinh :selected').val();
        var diachi = $('#diachi').val().trim();

        $("#tendangnhap").removeClass('valid-was-validated');
        var validTendangnhap = $('#invalid-updateemail-feedback');
        validTendangnhap.hide();
        $("#hovaten").removeClass('valid-was-validated');
        var validHovaten = $('#invalid-updateemail-feedback');
        validHovaten.hide();
        $("#email").removeClass('valid-was-validated');
        var validEmail = $('#invalid-updateemail-feedback');
        validEmail.hide();

        var validationMail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        var check = true;
        if (email.length < 1) {
            check = false;
            $('#email').focus();
            $("#email").addClass('valid-was-validated');
            validEmail.text("Địa chỉ Email không được bỏ trống.").show();

            $('#btnluuchinhsua').html('Lưu thông tin');
            $('#btnluuchinhsua').prop('disabled', false);
        }
        else if (validationMail.test(email) == false) {
            check = false;
            $('#email').focus();
            $("#email").addClass('valid-was-validated');
            validEmail.text("Địa chỉ Email chưa đúng định dạng.").show();

            $('#btnluuchinhsua').html('Lưu thông tin');
            $('#btnluuchinhsua').prop('disabled', false);
        }

        if (hovaten.length < 1) {
            check = false;
            $('#hovaten').focus();
            $("#hovaten").addClass('valid-was-validated');
            validHovaten.text("Họ và Tên không được bỏ trống.").show();

            $('#btnluuchinhsua').html('Lưu thông tin');
            $('#btnluuchinhsua').prop('disabled', false);
        }

        if (tendangnhap.length < 1) {
            check = false;
            $('#email').focus();
            $("#email").addClass('valid-was-validated');
            validEmail.text("Địa chỉ Email không được bỏ trống.").show();

            $('#btnluuchinhsua').html('Lưu thông tin');
            $('#btnluuchinhsua').prop('disabled', false);
        }
        else if (tendangnhap.indexOf(' ') != -1) {
            check = false;
            $('#tendangnhap').focus();
            $("#tendangnhap").addClass('valid-was-validated');
            validTendangnhap.text("Tên đăng nhập không hợp lệ.").show();

            $('#btnluuchinhsua').html('Lưu thông tin');
            $('#btnluuchinhsua').prop('disabled', false);
        }

        if (check == true) {

            var formData = new FormData();
            formData.append('avatar', $("#selectFiles")[0].files[0]);
            formData.append('tendangnhap', tendangnhap);
            formData.append('hovaten', hovaten);
            formData.append('email', email);
            formData.append('sodienthoai', sodienthoai);
            formData.append('ngaysinh', ngaysinh);
            formData.append('gioitinh', gioitinh);
            formData.append('diachi', diachi);

            if ($('#previewImage').attr('src').indexOf("profile-img.jpg") != -1) {
                formData.append('xoahinhdaidien', 'yes');
            }
            else {
                formData.append('xoahinhdaidien', 'no');
            }

            $.ajax({
                url: $('#requestPath').val() + "accountprofile/updateinfor",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    $('#btnluuchinhsua').html('Lưu thông tin');
                    $('#btnluuchinhsua').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Thông tin cá nhân đã được thay đổi.",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else {
                    $('#btnluuchinhsua').html('Lưu thông tin');
                    $('#btnluuchinhsua').prop('disabled', false);

                    window.location.reload();
                }
            });
        }
    });

    $('#btndoimatkhau').on('click', function () {
        $('#btndoimatkhau').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Đang tải...');
        $('#btndoimatkhau').prop('disabled', true);

        var matkhauhientai = $('#matkhauhientai').val();
        var matkhaumoi = $('#matkhaumoi').val();
        var nhaplaimatkhaumoi = $('#nhaplaimatkhaumoi').val();

        $("#matkhauhientai").removeClass('valid-was-validated');
        $("#matkhaumoi").removeClass('valid-was-validated');
        $("#nhaplaimatkhaumoi").removeClass('valid-was-validated');

        var validatematkhauhientai = $('#invalid-matkhauhientai-feedback');
        validatematkhauhientai.hide();
        var validatematkhaumoi = $('#invalid-matkhaumoi-feedback');
        validatematkhaumoi.hide();
        var validatenhaplaimatkhaumoi = $('#invalid-nhaplaimatkhaumoi-feedback');
        validatenhaplaimatkhaumoi.hide();

        var check = true;
        if (nhaplaimatkhaumoi.length < 1) {
            check = false;
            $('#nhaplaimatkhaumoi').focus();
            $("#nhaplaimatkhaumoi").addClass('valid-was-validated');
            validatenhaplaimatkhaumoi.text("Hãy nhập lại mật khẩu mới để xác nhận.").show();

            $('#btndoimatkhau').html('Lưu thông tin');
            $('#btndoimatkhau').prop('disabled', false);
        }
        else if (nhaplaimatkhaumoi !== matkhaumoi) {
            check = false;
            $('#nhaplaimatkhaumoi').focus();
            $("#nhaplaimatkhaumoi").addClass('valid-was-validated');
            validatenhaplaimatkhaumoi.text("Mật khẩu mới không trùng khớp.").show();

            $('#btndoimatkhau').html('Lưu thông tin');
            $('#btndoimatkhau').prop('disabled', false);
        }

        if (matkhaumoi.length < 1) {
            check = false;
            $('#matkhaumoi').focus();
            $("#matkhaumoi").addClass('valid-was-validated');
            validatematkhaumoi.text("Vui lòng nhập mật khẩu mới.").show();

            $('#btndoimatkhau').html('Lưu thông tin');
            $('#btndoimatkhau').prop('disabled', false);
        }

        if (matkhauhientai.length < 1) {
            check = false;
            $('#matkhauhientai').focus();
            $("#matkhauhientai").addClass('valid-was-validated');
            validatematkhauhientai.text("Vui lòng nhập mật khẩu hiện tại.").show();

            $('#btndoimatkhau').html('Lưu thông tin');
            $('#btndoimatkhau').prop('disabled', false);
        }

        if (check == true) {

            var formData = new FormData();
            formData.append('matkhauhientai', matkhauhientai);
            formData.append('matkhaumoi', matkhaumoi);
            formData.append('nhaplaimatkhaumoi', nhaplaimatkhaumoi);

            $.ajax({
                url: $('#requestPath').val() + "admin/accountprofile/updatepassword",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {

                    $('#matkhauhientai').val('');
                    $('#matkhaumoi').val('');
                    $('#nhaplaimatkhaumoi').val('');

                    $('#btndoimatkhau').html('Lưu thông tin');
                    $('#btndoimatkhau').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Mật khẩu đăng nhập đã được thay đổi.",
                        icon: "success"
                    });
                }
                else if (ketqua == "MKHIENTAIKHONGDUNG") {
                    $('#matkhauhientai').focus();
                    $("#matkhauhientai").addClass('valid-was-validated');
                    validatematkhauhientai.text("Mật khẩu hiện tại chưa chính xác.").show();

                    $('#btndoimatkhau').html('Lưu thông tin');
                    $('#btndoimatkhau').prop('disabled', false);
                }
                else if (ketqua == "INDEX") {
                    $('#btndoimatkhau').html('Lưu thông tin');
                    $('#btndoimatkhau').prop('disabled', false);

                    window.location.reload();
                }
            });
        }
    });

    $('#themhinhdaidien').on('click', function () {
        $('#selectFiles').click();
    });

    $('#xoahinhdaidien').on('click', function () {
        $('#selectFiles').val(null);
        $('#previewImage').attr('src', $('#requestPath').val() + 'Content/AdminAreas/assets/img/profile-img.jpg');
    });
});