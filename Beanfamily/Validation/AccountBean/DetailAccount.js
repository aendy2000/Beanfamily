$(document).ready(function () {
    $('[id^="opentDetail"]').on('click', function () {
        var id = $(this).attr('name');
        $('#btnxemchitiet' + id).click();
    });

    $('body').on('click', '[id^="btnxemchitiet"]', function () {
        var id = $(this).attr('name');

        var formData = new FormData();
        formData.append('id', id);
        $.ajax({
            url: $('#requestPath').val() + "admin/accountbean/detailaccount",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            if (ketqua.indexOf("Chi tiết lỗi:") != -1) {
                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                    text: ketqua,
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else if (ketqua == 'KHONGTONTAI') {

                Swal.fire({
                    title: "Thông báo!",
                    text: "Tài khoản này vừa mới được xóa bỏ.",
                    icon: "warning"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
                $('#contentChiTietModal').replaceWith(ketqua);
                $('#chitiettaikhoanModal').modal('toggle');
            }
        });
    });

    //Luu them moi
    $('#btnluuthemtaikhoan').on('click', function () {
        $('#btnluuthemtaikhoan').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Đang tải...');
        $('#btnluuthemtaikhoan').prop('disabled', true);

        var tendangnhap = $('#tendangnhap').val().trim();
        var matkhau = $('#matkhau').val().trim();
        var hovaten = $('#hovaten').val().trim();
        var phanquyen = $('#phanquyen :selected').val().trim();
        var email = $('#email').val().trim();
        var chucdanh = $('#chucdanh').val().trim();
        var sodienthoai = $('#sodienthoai').val().trim();
        var ngaysinh = $('#ngaysinh').val().trim();
        var gioitinh = $('#gioitinh :selected').val().trim();
        var diachi = $('#diachi').val().trim();

        $("#tendangnhap").removeClass('valid-was-validated');
        $("#matkhau").removeClass('valid-was-validated');
        $("#hovaten").removeClass('valid-was-validated');
        $("#phanquyen").removeClass('valid-was-validated');
        $("#email").removeClass('valid-was-validated');
       

        $('#invalid-tendangnhap-feedback').prop('hidden', true);
        $('#invalid-matkhau-feedback').prop('hidden', true);
        $('#invalid-hovaten-feedback').prop('hidden', true);
        $('#invalid-phanquyen-feedback').prop('hidden', true);
        $('#invalid-email-feedback').prop('hidden', true);

        var validationMail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var check = true;

        if (tendangnhap.length < 1) {
            check = false;
            $("#tendangnhap").addClass('valid-was-validated');
            $('#invalid-tendangnhap-feedback').text("Vui lòng nhập tên đăng nhập.").prop('hidden', false);
            $("#tendangnhap").focus();

            $('#btnluuthemtaikhoan').html('Lưu thông tin');
            $('#btnluuthemtaikhoan').prop('disabled', false);
        }
        else if (tendangnhap.indexOf(' ') != -1) {
            check = false;
            $('#invalid-tendangnhap-feedback').text("Tên đăng nhập không hợp lệ.").prop('hidden', false);
            $("#tendangnhap").focus();
            $("#tendangnhap").addClass('valid-was-validated');

            $('#btnluuthemtaikhoan').html('Lưu thông tin');
            $('#btnluuthemtaikhoan').prop('disabled', false);
        }

        if (matkhau.length < 1) {
            check = false;
            $("#matkhau").addClass('valid-was-validated');
            $('#invalid-matkhau-feedback').text("Vui lòng nhập mật khẩu đăng nhập.").prop('hidden', false);
            $("#matkhau").focus();

            $('#btnluuthemtaikhoan').html('Lưu thông tin');
            $('#btnluuthemtaikhoan').prop('disabled', false);
        }

        if (hovaten.length < 1) {
            check = false;
            $("#hovaten").addClass('valid-was-validated');
            $('#invalid-hovaten-feedback').text("Vui lòng nhập họ và tên.").prop('hidden', false);
            $("#hovaten").focus();

            $('#btnluuthemtaikhoan').html('Lưu thông tin');
            $('#btnluuthemtaikhoan').prop('disabled', false);
        }

        if (phanquyen.length < 1) {
            check = false;
            $("#phanquyen").addClass('valid-was-validated');
            $('#invalid-phanquyen-feedback').text("Vui lòng chọn quyền tài khoản.").prop('hidden', false);
            $("#phanquyen").focus();

            $('#btnluuthemtaikhoan').html('Lưu thông tin');
            $('#btnluuthemtaikhoan').prop('disabled', false);
        }

        if (email.length < 1) {
            check = false;
            $("#email").addClass('valid-was-validated');
            $('#invalid-email-feedback').text("Vui lòng chọn nhập địa chỉ Email.").prop('hidden', false);
            $("#email").focus();

            $('#btnluuthemtaikhoan').html('Lưu thông tin');
            $('#btnluuthemtaikhoan').prop('disabled', false);
        }
        else if (validationMail.test(email) == false) {
            check = false;
            $('#email').focus();
            $("#email").addClass('valid-was-validated');
            $('#invalid-email-feedback').text("Địa chỉ Email chưa đúng định dạng.").prop('hidden', false);

            $('#btnluuthemtaikhoan').html('Lưu thông tin');
            $('#btnluuthemtaikhoan').prop('disabled', false);
        }

        if (check == true) {

            var formData = new FormData();
            formData.append('avatar', $("#selectFiles")[0].files[0]);
            formData.append('tendangnhap', tendangnhap);
            formData.append('matkhau', matkhau);
            formData.append('hovaten', hovaten);
            formData.append('phanquyen', phanquyen);
            formData.append('email', email);
            formData.append('chucdanh', chucdanh);
            formData.append('sodienthoai', sodienthoai);
            formData.append('ngaysinh', ngaysinh);
            formData.append('gioitinh', gioitinh);
            formData.append('diachi', diachi);
            $.ajax({
                url: $('#requestPath').val() + "admin/accountbean/addaccount",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {

                    $('#btnluuthemtaikhoan').html('Lưu thông tin');
                    $('#btnluuthemtaikhoan').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã thêm một tài khoản mới.",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "USERNAMETONTAI") {
                    $("#tendangnhap").addClass('valid-was-validated');
                    $('#invalid-tendangnhap-feedback').text("Tên đăng nhập đã được dùng ở một tài khoản khác.").prop('hidden', false);
                    $("#tendangnhap").focus();

                    $('#btnluuthemtaikhoan').html('Lưu thông tin');
                    $('#btnluuthemtaikhoan').prop('disabled', false);
                }
                else if (ketqua == "EMAILTONTAI") {
                    $("#email").addClass('valid-was-validated');
                    $('#invalid-email-feedback').text("Email đã được dùng ở một tài khoản khác.").prop('hidden', false);
                    $("#email").focus();

                    $('#btnluuthemtaikhoan').html('Lưu thông tin');
                    $('#btnluuthemtaikhoan').prop('disabled', false);
                }
                else {

                    $('#btnluuthemtaikhoan').html('Lưu thông tin');
                    $('#btnluuthemtaikhoan').prop('disabled', false);

                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                        text: "Chi tiết lỗi: " + ketqua,
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
            });
        }
    });
});