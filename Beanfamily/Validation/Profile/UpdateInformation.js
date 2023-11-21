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
                        window.location.href = $('#requestPath').val() + 'admin/accountprofile';
                    });
                }
                else {
                    window.location.href = $('#requestPath').val() + 'admin/accountprofile';
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