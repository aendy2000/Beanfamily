﻿$(document).ready(function () {
    $('body').on('click', '[id^="btnSubmitLienHeDatBan"]', function () {
        var btn = $(this);
        Swal.fire({
            title: 'Gửi thông tin?',
            text: 'Sau khi xác nhận gửi. Chúng tôi sẽ liên hệ lại với bạn để xác nhận đặt bàn',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Gửi ngay!",
            cancelButtonText: "Không gửi"
        }).then((result) => {
            if (result.isConfirmed) {
                var btn = $(this);
                btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
                btn.css('pointer-events', 'none');

                var soban = $('body').find('[id="soban"]').val().trim();
                var hovaten = $('body').find('[id="hovaten"]').val().trim();
                var sodienthoai = $('body').find('[id="sodienthoai"]').val().trim();
                var email = $('body').find('[id="email"]').val().trim();
                var ngaytochuc = $('body').find('[id="ngaytochuc"]').val().trim();
                var giotochuc = $('body').find('[id="selectThoiGianDatBan"] :selected').val();
                var ghichu = $('body').find('[id="ghichu"]').val().trim();

                $('body').find('[id="soban"]').removeClass('valid-was-validated');
                $('body').find('[id="hovaten"]').removeClass('valid-was-validated');
                $('body').find('[id="sodienthoai"]').removeClass('valid-was-validated');
                $('body').find('[id="email"]').removeClass('valid-was-validated');
                $('body').find('[id="ngaytochuc"]').removeClass('valid-was-validated');
                $('body').find('[id="ghichu"]').removeClass('valid-was-validated');

                $('body').find('[id="invalid-soban-feedback"]').prop('hidden', true);
                $('body').find('[id="invalid-hovaten-feedback"]').prop('hidden', true);
                $('body').find('[id="invalid-sodienthoai-feedback"]').prop('hidden', true);
                $('body').find('[id="invalid-email-feedback"]').prop('hidden', true);
                $('body').find('[id="invalid-ngaytochuc-feedback"]').prop('hidden', true);
                $('body').find('[id="invalid-ghichu-feedback"]').prop('hidden', true);

                var check = true;

                if (soban.length < 1) {
                    check = false;
                    $('body').find('[id="soban"]').addClass('valid-was-validated');
                    $('body').find('[id="invalid-soban-feedback"]').text("Vui lòng nhập số bàn muốn đặt.").prop('hidden', false);
                    $('body').find('[id="soban"]').focus();

                    btn.html('Gửi Thông Tin');
                    btn.css('pointer-events', 'all');
                }

                if (hovaten.length < 1) {
                    check = false;
                    $('body').find('[id="hovaten"]').addClass('valid-was-validated');
                    $('body').find('[id="invalid-hovaten-feedback"]').text("Vui lòng nhập Họ và Tên của bạn.").prop('hidden', false);
                    $('body').find('[id="hovaten"]').focus();

                    btn.html('Gửi Thông Tin');
                    btn.css('pointer-events', 'all');
                }
                else if (hovaten.length > 200) {
                    check = false;
                    $('body').find('[id="hovaten"]').addClass('valid-was-validated');
                    $('body').find('[id="invalid-hovaten-feedback"]').text("Họ và Tên không quá 200 ký tự").prop('hidden', false);
                    $('body').find('[id="hovaten"]').focus();

                    btn.html('Gửi Thông Tin');
                    btn.css('pointer-events', 'all');
                }

                if (sodienthoai.length < 1) {
                    check = false;
                    $('body').find('[id="sodienthoai"]').addClass('valid-was-validated');
                    $('body').find('[id="invalid-sodienthoai-feedback"]').text("Vui lòng nhập số điện thoại của bạn.").prop('hidden', false);
                    $('body').find('[id="sodienthoai"]').focus();

                    btn.html('Gửi Thông Tin');
                    btn.css('pointer-events', 'all');
                }
                else if (sodienthoai.length != 10) {
                    check = false;
                    $('body').find('[id="sodienthoai"]').addClass('valid-was-validated');
                    $('body').find('[id="invalid-sodienthoai-feedback"]').text("Số điện thoại chưa hợp lệ.").prop('hidden', false);
                    $('body').find('[id="sodienthoai"]').focus();

                    btn.html('Gửi Thông Tin');
                    btn.css('pointer-events', 'all');
                }

                var validationMail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (email.length > 0) {
                    if (validationMail.test(email) == false) {
                        check = false;
                        $('body').find('[id="email"]').addClass('valid-was-validated');
                        $('body').find('[id="invalid-email-feedback"]').text("Email chưa hợp lệ.").prop('hidden', false);
                        $('body').find('[id="email"]').focus();

                        btn.html('Gửi Thông Tin');
                        btn.css('pointer-events', 'all');
                    }
                }

                if (ghichu.length > 0) {
                    if (ghichu.length > 200) {
                        check = false;
                        $('body').find('[id="ghichu"]').addClass('valid-was-validated');
                        $('body').find('[id="invalid-ghichu-feedback"]').text("Ghi chú không quá 200 ký tự.").prop('hidden', false);
                        $('body').find('[id="ghichu"]').focus();

                        btn.html('Gửi Thông Tin');
                        btn.css('pointer-events', 'all');
                    }
                }

                if (check == true) {
                    var formData = new FormData();
                    formData.append('soban', soban);
                    formData.append('hovaten', hovaten);
                    formData.append('sodienthoai', sodienthoai);
                    formData.append('email', email);
                    formData.append('ngaytochuc', ngaytochuc);
                    formData.append('giotochuc', giotochuc);
                    formData.append('ghichu', ghichu);

                    $.ajax({
                        url: $('#requestPath').val() + "home/GuiFormDatBan",
                        data: formData,
                        dataType: 'html',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        error: function (ex) {
                            console.log(ex);
                        },
                    }).done(function (ketqua) {
                        if (ketqua == "SUCCESS") {
                            btn.html('Gửi Thông Tin');
                            btn.css('pointer-events', 'all');
                            var madonhang = ketqua.split('-')[1];
                            Swal.fire({
                                title: "Đã Gửi Thông Tin!",
                                text: "Cảm ơn bạn liên hệ, chúng tôi đã nhận được thông tin và sẽ sớm liên hệ lại với bạn để xác nhận đặt bàn.",
                                icon: "success"
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (ketqua == "SMALLDATE") {
                            $('body').find('[id="ngaytochuc"]').addClass('valid-was-validated');
                            $('body').find('[id="invalid-ngaytochuc-feedback"]').text("Thời gian bắt đầu ít nhất 1 ngày kể từ ngày đặt").prop('hidden', false);

                            btn.html('Gửi Thông Tin');
                            btn.css('pointer-events', 'all');
                        }
                        else {
                            btn.html('Gửi Thông Tin');
                            btn.css('pointer-events', 'all');

                            Swal.fire({
                                title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                                text: ketqua,
                                icon: "error"
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                    });
                }
            }
        });
    });
});