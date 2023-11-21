$(document).ready(function () {
    $('#loginsubmit').on('click', function () {
        var usname = $("#yourUsername").val().trim();
        var pass = $('#yourPassword').val().trim();

        $("#yourUsername").removeClass('valid-was-validated');
        $("#yourPassword").removeClass('valid-was-validated');

        $('#invalid-username-feedback').hide();
        $('#invalid-password-feedback').hide();

        var check = true;

        if (pass.length < 1) {
            check = false;
            $('#invalid-password-feedback').text("Vui lòng nhập mật khẩu đăng nhập của bạn.").show();
            $("#yourPassword").focus();
        }

        if (usname.length < 1) {
            check = false;
            $('#invalid-username-feedback').text("Vui lòng nhập tên đăng nhập của bạn.").show();
            $("#yourUsername").focus();
        }
        else if (usname.indexOf(" ") != -1) {
            check = false;
            $('#invalid-username-feedback').text("Tên đăng nhập không hợp lệ.").show();
            $("#yourUsername").focus();
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('username', usname);
            formData.append('password', pass);

            $.ajax({
                url: $('#requestPath').val() + "dangnhap/login",
                data: formData,
                type: 'POST',
                dataType: 'html',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    window.location.href = $('#requestPath').val() + "admin";
                }
                else if (ketqua == "KHONGTONTAI") {
                    $("#yourUsername").addClass('valid-was-validated');

                    $('#invalid-username-feedback').text("Không tìm thấy tài khoản.").show();
                    $("#yourUsername").focus();
                }
                else if (ketqua == "SAIMATKHAU") {
                    $("#yourPassword").addClass('valid-was-validated');

                    $('#invalid-password-feedback').text("Mật khẩu không chính xác.").show();
                    $("#yourPassword").focus();
                }
                else if (ketqua == "BIKHOA") {
                    $("#yourUsername").addClass('valid-was-validated');
                    $("#yourPassword").addClass('valid-was-validated');

                    $('#invalid-password-feedback').text("Tài khoản của bạn đã bị khóa.").show();
                    $("#yourUsername").focus();
                }
            });
        }
    });
});