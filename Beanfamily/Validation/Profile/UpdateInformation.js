$(document).ready(function () {
    $('#btnluuchinhsua').on('click', function () {
        var hovaten = $('#hovaten').val().trim();
        var chucdanh = $('#chucdanh').val().trim();
        var sodienthoai = $('#sodienthoai').val().trim();
        var email = $('#email').val().trim();
        var ngaysinh = $('#ngaysinh').val().trim();
        var gioitinh = $('#gioitinh :selected').val();
        var diachi = $('#diachi').val().trim();

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
        }
        else if (validationMail.test(email) == false) {
            check = false;
            $('#email').focus();
            $("#email").addClass('valid-was-validated');
            validEmail.text("Địa chỉ Email chưa đúng định dạng.").show();
        }

        if (check == true) {

            var formData = new FormData();
            formData.append('avatar', $("#selectFiles")[0].files[0]);
            formData.append('hovaten', hovaten);
            formData.append('chucdanh', chucdanh);
            formData.append('sodienthoai', sodienthoai);
            formData.append('email', email);
            formData.append('ngaysinh', ngaysinh);
            formData.append('gioitinh', gioitinh);
            formData.append('diachi', diachi);

            $.ajax({
                url: $('#requestPath').val() + "accountprofile/updateinfor",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    Swal.fire({
                        title: "Thành công!",
                        text: "Thông tin cá nhân đã được thay đổi.",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else {
                    window.location.reload();
                }
            });
        }
    });

    $('#btndoimatkhau').on('click', function () {
        var matkhauhientai = $('#matkhauhientai').val();
        var matkhaumoi = $('#matkhaumoi').val().trim();
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
        }
        else if (nhaplaimatkhaumoi !== matkhaumoi) {
            check = false;
            $('#nhaplaimatkhaumoi').focus();
            $("#nhaplaimatkhaumoi").addClass('valid-was-validated');
            validatenhaplaimatkhaumoi.text("Mật khẩu mới không trùng khớp.").show();
        }

        if (matkhaumoi.length < 1) {
            check = false;
            $('#matkhaumoi').focus();
            $("#matkhaumoi").addClass('valid-was-validated');
            validatematkhaumoi.text("Vui lòng nhập mật khẩu mới.").show();
        }

        if (matkhauhientai.length < 1) {
            check = false;
            $('#matkhauhientai').focus();
            $("#matkhauhientai").addClass('valid-was-validated');
            validatematkhauhientai.text("Vui lòng nhập mật khẩu hiện tại.").show();
        }

        if (check == true) {

            var formData = new FormData();
            formData.append('matkhauhientai', matkhauhientai);
            formData.append('matkhaumoi', matkhaumoi);
            formData.append('nhaplaimatkhaumoi', nhaplaimatkhaumoi);

            $.ajax({
                url: $('#requestPath').val() + "accountprofile/updatepassword",
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
                }
                else if (ketqua == "INDEX") {
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