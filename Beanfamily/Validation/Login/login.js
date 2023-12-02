$(document).ready(function () {
    function login() {
        $('#loginsubmit').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Đang tải...');
        $('#loginsubmit').prop('disabled', true);

        var usname = $("#yourUsername").val().trim();
        var pass = $('#yourPassword').val().trim();

        $("#yourUsername").removeClass('valid-was-validated');
        $("#yourPassword").removeClass('valid-was-validated');

        $('#invalid-username-feedback').hide();
        $('#invalid-password-feedback').hide();

        var check = true;

        if (pass.length < 1) {
            check = false;
            $("#yourPassword").addClass('valid-was-validated');
            $('#invalid-password-feedback').text("Vui lòng nhập mật khẩu đăng nhập của bạn.").show();
            $("#yourPassword").focus();

            $('#loginsubmit').html('Đăng nhập');
            $('#loginsubmit').prop('disabled', false);
        }

        if (usname.length < 1) {
            check = false;
            $('#invalid-username-feedback').text("Vui lòng nhập tên đăng nhập của bạn.").show();
            $("#yourUsername").focus();
            $("#yourUsername").addClass('valid-was-validated');

            $('#loginsubmit').html('Đăng nhập');
            $('#loginsubmit').prop('disabled', false);
        }
        else if (usname.indexOf(" ") != -1) {
            check = false;
            $('#invalid-username-feedback').text("Tên đăng nhập không hợp lệ.").show();
            $("#yourUsername").focus();
            $("#yourUsername").addClass('valid-was-validated');

            $('#loginsubmit').html('Đăng nhập');
            $('#loginsubmit').prop('disabled', false);
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

                    $('#loginsubmit').html('Đăng nhập');
                    $('#loginsubmit').prop('disabled', false);
                }
                else if (ketqua == "SAIMATKHAU") {
                    $("#yourPassword").addClass('valid-was-validated');

                    $('#invalid-password-feedback').text("Mật khẩu không chính xác.").show();
                    $("#yourPassword").focus();

                    $('#loginsubmit').html('Đăng nhập');
                    $('#loginsubmit').prop('disabled', false);
                }
                else if (ketqua == "BIKHOA") {
                    $("#yourUsername").addClass('valid-was-validated');
                    $("#yourPassword").addClass('valid-was-validated');

                    $('#invalid-password-feedback').text("Tài khoản của bạn đã bị khóa.").show();
                    $("#yourUsername").focus();

                    $('#loginsubmit').html('Đăng nhập');
                    $('#loginsubmit').prop('disabled', false);
                }
            });
        }
    };
    $('#loginsubmit').on('click', function () {
        login();
    });

    $('input').bind("enterKey", function (e) {
        login();
    });
    $('input').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});