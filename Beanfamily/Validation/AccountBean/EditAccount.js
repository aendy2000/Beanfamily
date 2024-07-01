$(document).ready(function () {
    $('#themhinhdaidienedit').on('click', function () {
        $('#selectFilesEdit').click();
    });

    $('#xoahinhdaidienedit').on('click', function () {
        $('#selectFilesEdit').val(null);
        $('#previewImageEdit').attr('src', $('#requestPath').val() + 'Content/AdminAreas/assets/img/profile-img.jpg');
    });

    //Luu them moi
    $('#btnluuedittaikhoan').on('click', function () {
        $('#btnluuedittaikhoan').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluuedittaikhoan').prop('disabled', true);

        var tendangnhap = $('#tendangnhapedit').val().trim();
        var hovaten = $('#hovatenedit').val().trim();
        var phanquyen = $('#phanquyenedit :selected').val().trim();
        var email = $('#emailedit').val().trim();
        var chucdanh = $('#chucdanhedit').val().trim();
        var sodienthoai = $('#sodienthoaiedit').val().trim();
        var ngaysinh = $('#ngaysinhedit').val();
        var gioitinh = $('#gioitinhedit :selected').val().trim();
        var diachi = $('#diachiedit').val().trim();

        $("#tendangnhapedit").removeClass('valid-was-validated');
        $("#hovatenedit").removeClass('valid-was-validated');
        $("#phanquyenedit").removeClass('valid-was-validated');
        $("#emailedit").removeClass('valid-was-validated');

        $('#invalid-tendangnhapedit-feedback').prop('hidden', true);
        $('#invalid-matkhauedit-feedback').prop('hidden', true);
        $('#invalid-hovatenedit-feedback').prop('hidden', true);
        $('#invalid-phanquyenedit-feedback').prop('hidden', true);
        $('#invalid-emailedit-feedback').prop('hidden', true);

        var validationMail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var check = true;

        if (tendangnhap.length < 1) {
            check = false;
            $("#tendangnhapedit").addClass('valid-was-validated');
            $('#invalid-tendangnhapedit-feedback').text("Vui lòng nhập tên đăng nhập.").prop('hidden', false);
            $("#tendangnhapedit").focus();

            $('#btnluuedittaikhoan').html('Lưu thông tin');
            $('#btnluuedittaikhoan').prop('disabled', false);
        }
        else if (tendangnhap.indexOf(' ') != -1) {
            check = false;
            $('#invalid-tendangnhapedit-feedback').text("Tên đăng nhập không hợp lệ.").prop('hidden', false);
            $("#tendangnhapedit").focus();
            $("#tendangnhapedit").addClass('valid-was-validated');

            $('#btnluuedittaikhoan').html('Lưu thông tin');
            $('#btnluuedittaikhoan').prop('disabled', false);
        }

        if (hovaten.length < 1) {
            check = false;
            $("#hovatenedit").addClass('valid-was-validated');
            $('#invalid-hovatenedit-feedback').text("Vui lòng nhập họ và tên.").prop('hidden', false);
            $("#hovatenedit").focus();

            $('#btnluuedittaikhoan').html('Lưu thông tin');
            $('#btnluuedittaikhoan').prop('disabled', false);
        }

        if (phanquyen.length < 1) {
            check = false;
            $("#phanquyenedit").addClass('valid-was-validated');
            $('#invalid-phanquyenedit-feedback').text("Vui lòng chọn quyền tài khoản.").prop('hidden', false);
            $("#phanquyenedit").focus();

            $('#btnluuthemtaikhoan').html('Lưu thông tin');
            $('#btnluuthemtaikhoan').prop('disabled', false);
        }

        if (email.length < 1) {
            check = false;
            $("#emailedit").addClass('valid-was-validated');
            $('#invalid-emailedit-feedback').text("Vui lòng chọn nhập địa chỉ Email.").prop('hidden', false);
            $("#emailedit").focus();

            $('#btnluuedittaikhoan').html('Lưu thông tin');
            $('#btnluuedittaikhoan').prop('disabled', false);
        }
        else if (validationMail.test(email) == false) {
            check = false;
            $('#emailedit').focus();
            $("#emailedit").addClass('valid-was-validated');
            $('#invalid-emailedit-feedback').text("Địa chỉ Email chưa đúng định dạng.").prop('hidden', false);

            $('#btnluuedittaikhoan').html('Lưu thông tin');
            $('#btnluuedittaikhoan').prop('disabled', false);
        }

        if (check == true) {

            var formData = new FormData();
            formData.append('avatar', $("#selectFilesEdit")[0].files[0]);
            formData.append('id', $('#idacc').val());
            formData.append('tendangnhap', tendangnhap);
            formData.append('hovaten', hovaten);
            formData.append('phanquyen', phanquyen);
            formData.append('email', email);
            formData.append('chucdanh', chucdanh);
            formData.append('sodienthoai', sodienthoai);
            formData.append('ngaysinh', ngaysinh);
            formData.append('gioitinh', gioitinh);
            formData.append('diachi', diachi);
            if ($('#previewImageEdit').attr('src').indexOf("profile-img.jpg") != -1) {
                formData.append('xoahinhdaidien', 'yes');
            }
            else {
                formData.append('xoahinhdaidien', 'no');
            }

            $.ajax({
                url: $('#requestPath').val() + "admin/accountbean/editaccount",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {

                    $('#btnluuedittaikhoan').html('Lưu thông tin');
                    $('#btnluuedittaikhoan').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã cập nhật thông tin tài khoản.",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "USERNAMETONTAI") {
                    $("#tendangnhapedit").addClass('valid-was-validated');
                    $('#invalid-tendangnhapedit-feedback').text("Tên đăng nhập đã được dùng ở một tài khoản khác.").prop('hidden', false);
                    $("#tendangnhapedit").focus();

                    $('#btnluuedittaikhoan').html('Lưu thông tin');
                    $('#btnluuedittaikhoan').prop('disabled', false);
                }
                else if (ketqua == "EMAILTONTAI") {
                    $("#emailedit").addClass('valid-was-validated');
                    $('#invalid-emailedit-feedback').text("Email đã được dùng ở một tài khoản khác.").prop('hidden', false);
                    $("#emailedit").focus();

                    $('#btnluuedittaikhoan').html('Lưu thông tin');
                    $('#btnluuedittaikhoan').prop('disabled', false);
                }
                else {

                    $('#btnluuedittaikhoan').html('Lưu thông tin');
                    $('#btnluuedittaikhoan').prop('disabled', false);

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

    //Cap lai mk
    $('#btncaplaimatkhau').on('click', function () {
        var matkhaumoi = $('#caplaimatkhaumoi').val();
        var nhaplaimatkhaumoi = $('#caplainhaplaimatkhaumoi').val();

        $("#caplaimatkhaumoi").removeClass('valid-was-validated');
        $("#caplainhaplaimatkhaumoi").removeClass('valid-was-validated');

        var validatematkhaumoi = $('#invalid-caplaimatkhaumoi-feedback');
        validatematkhaumoi.prop('hidden', true);
        var validatenhaplaimatkhaumoi = $('#invalid-caplainhaplaimatkhaumoi-feedback');
        validatenhaplaimatkhaumoi.prop('hidden', true);

        var check = true;
        if (nhaplaimatkhaumoi.length < 1) {
            check = false;
            $('#caplainhaplaimatkhaumoi').focus();
            $("#caplainhaplaimatkhaumoi").addClass('valid-was-validated');
            validatenhaplaimatkhaumoi.text("Hãy nhập lại mật khẩu mới để xác nhận.").prop('hidden', false);

            $('#btncaplaimatkhau').html('Lưu thông tin');
            $('#btncaplaimatkhau').prop('disabled', false);
        }
        else if (nhaplaimatkhaumoi !== matkhaumoi) {
            check = false;
            $('#caplainhaplaimatkhaumoi').focus();
            $("#caplainhaplaimatkhaumoi").addClass('valid-was-validated');
            validatenhaplaimatkhaumoi.text("Mật khẩu mới không trùng khớp.").prop('hidden', false);

            $('#btncaplaimatkhau').html('Lưu thông tin');
            $('#btncaplaimatkhau').prop('disabled', false);
        }

        if (matkhaumoi.length < 1) {
            check = false;
            $('#caplaimatkhaumoi').focus();
            $("#caplaimatkhaumoi").addClass('valid-was-validated');
            validatematkhaumoi.text("Vui lòng nhập mật khẩu mới.").prop('hidden', false);

            $('#btncaplaimatkhau').html('Lưu thông tin');
            $('#btncaplaimatkhau').prop('disabled', false);
        }

        if (check == true) {
            var idacc = $('#idacc').val();

            $('#chitiettaikhoanModal').on('shown.bs.modal', function () {
                $(document).off('focusin.modal');
            });

            Swal.fire({
                inputLabel: "Nhập mật khẩu đăng nhập để tiếp tục",
                input: "password",
                inputPlaceholder: "Nhập mật khẩu đăng nhập của bạn",
                inputAttributes: {
                    maxlength: "10",
                    autocapitalize: "off",
                    autocorrect: "off",
                },
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: "Xác nhận",
                cancelButtonText: "Hủy",
                preConfirm: async (validationPass) => {
                    Swal.showLoading();
                    if (validationPass.length < 1) {
                        Swal.hideLoading();
                        return Swal.showValidationMessage(`Vui lòng nhập mật khẩu đăng nhập của bạn.`);
                    }

                    var formResult = new FormData();
                    formResult.append('pass', validationPass);

                    var resultMain = await $.ajax({
                        url: $('#requestPath').val() + "admin/accountbean/passverify",
                        data: formResult,
                        dataType: 'html',
                        type: 'POST',
                        processData: false,
                        contentType: false
                    }).done(function (result) {
                        return result + "";
                    });

                    if (resultMain == "SUCCESS") {
                        var formData = new FormData();
                        formData.append('id', idacc);
                        formData.append('matkhau', matkhaumoi);

                        await $.ajax({
                            url: $('#requestPath').val() + "admin/accountbean/repassword",
                            data: formData,
                            dataType: 'html',
                            type: 'POST',
                            processData: false,
                            contentType: false
                        }).done(function (ketqua) {
                            if (ketqua == "SUCCESS") {
                                Swal.hideLoading();
                                Swal.fire({
                                    title: "Thành công!",
                                    text: 'Mật khẩu đã được thay đổi. Hãy liên hệ với nhân viên "' + $('#stridacc').val() + '" để cấp lại mật khẩu vừa đặt lại!',
                                    icon: "success"
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (ketqua == "KHONGTONTAI") {
                                Swal.hideLoading();
                                Swal.fire({
                                    title: "Thông báo",
                                    text: "Tài khoản này vừa mới được xóa bỏ.",
                                    icon: "warning"
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else {
                                Swal.hideLoading();
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
                    else if (resultMain == "INVALID") {
                        Swal.hideLoading();
                        return Swal.showValidationMessage("Mật khẩu đăng nhập không chính xác.");
                    }
                    else if (resultMain == "INDEX") {
                        Swal.hideLoading();
                        window.location.reload();
                    }
                    else if (resultMain == "KHONGTONTAI") {
                        Swal.hideLoading();
                        Swal.fire({
                            title: "Thông báo",
                            text: "Tài khoản này vừa mới được xóa bỏ.",
                            icon: "warning"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
                        Swal.hideLoading();
                        Swal.fire({
                            title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                            text: "Chi tiết lỗi: " + resultMain,
                            icon: "error"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                }
            });
        }
    });
});