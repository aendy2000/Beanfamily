$(document).ready(function () {
    $('body').find('[id="submitDatBan"]').on('click', function () {
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

            btn.html('Đặt Bàn Ngay');
            btn.css('pointer-events', 'all');
        }

        if (hovaten.length < 1) {
            check = false;
            $('body').find('[id="hovaten"]').addClass('valid-was-validated');
            $('body').find('[id="invalid-hovaten-feedback"]').text("Vui lòng nhập Họ và Tên của bạn.").prop('hidden', false);
            $('body').find('[id="hovaten"]').focus();

            btn.html('Đặt Bàn Ngay');
            btn.css('pointer-events', 'all');
        }
        else if (hovaten.length > 200) {
            check = false;
            $('body').find('[id="hovaten"]').addClass('valid-was-validated');
            $('body').find('[id="invalid-hovaten-feedback"]').text("Họ và Tên không quá 200 ký tự").prop('hidden', false);
            $('body').find('[id="hovaten"]').focus();

            btn.html('Đặt Bàn Ngay');
            btn.css('pointer-events', 'all');
        }

        if (sodienthoai.length < 1) {
            check = false;
            $('body').find('[id="sodienthoai"]').addClass('valid-was-validated');
            $('body').find('[id="invalid-sodienthoai-feedback"]').text("Vui lòng nhập số điện thoại của bạn.").prop('hidden', false);
            $('body').find('[id="sodienthoai"]').focus();

            btn.html('Đặt Bàn Ngay');
            btn.css('pointer-events', 'all');
        }
        else if (sodienthoai.length > 12) {
            check = false;
            $('body').find('[id="sodienthoai"]').addClass('valid-was-validated');
            $('body').find('[id="invalid-sodienthoai-feedback"]').text("Số điện thoại chưa hợp lệ.").prop('hidden', false);
            $('body').find('[id="sodienthoai"]').focus();

            btn.html('Đặt Bàn Ngay');
            btn.css('pointer-events', 'all');
        }

        var validationMail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (email.length > 0) {
            if (validationMail.test(email) == false) {
                check = false;
                $('body').find('[id="email"]').addClass('valid-was-validated');
                $('body').find('[id="invalid-email-feedback"]').text("Email chưa hợp lệ.").prop('hidden', false);
                $('body').find('[id="email"]').focus();

                btn.html('Đặt Bàn Ngay');
                btn.css('pointer-events', 'all');
            }
        }

        if (ghichu.length > 0) {
            if (ghichu.length > 200) {
                check = false;
                $('body').find('[id="ghichu"]').addClass('valid-was-validated');
                $('body').find('[id="invalid-ghichu-feedback"]').text("Ghi chú không quá 200 ký tự.").prop('hidden', false);
                $('body').find('[id="ghichu"]').focus();

                btn.html('Đặt Bàn Ngay');
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
                url: $('#requestPath').val() + "menutiecban/GuiFormDatBan",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false,
                error: function (ex) {
                    console.log(ex);
                },
            }).done(function (ketqua) {
                if (ketqua.indexOf("SUCCESS") !== -1) {
                    btn.html('Đặt Bàn Ngay');
                    btn.css('pointer-events', 'all');
                    var madonhang = ketqua.split('-')[1];
                    Swal.fire({
                        title: "Đặt Bàn Thành Công!",
                        text: "Cảm ơn bạn đã đặt bàn, chúng tôi đã nhận được thông tin và sẽ sớm liên hệ lại với bạn để xác nhận đơn đặt bàn này. \nMã đơn đặt bàn: " + madonhang,
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "SMALLDATE") {
                    $('body').find('[id="ngaytochuc"]').addClass('valid-was-validated');
                    $('body').find('[id="invalid-ngaytochuc-feedback"]').text("Thời gian bắt đầu ít nhất 1 ngày kể từ ngày đặt").prop('hidden', false);

                    btn.html('Đặt Bàn Ngay');
                    btn.css('pointer-events', 'all');
                }
                else {
                    btn.html('Đặt Bàn Ngay');
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
    });

    /*[ Select ]
    ===========================================================*/
    $('body').find(".selection-1").select2({
        minimumResultsForSearch: 20,
        dropdownParent: $('body').find('[id="datBanTiecModal"]')
    });

    /*[ Daterangepicker ]
    ===========================================================*/
    $('body').find('.my-calendar').daterangepicker({
        "singleDatePicker": true,
        "showDropdowns": true,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });

    /* Cộng giá bàn ghế */
    $('body').find('[id="soban"]').on('input', function () {
        var qtt = $(this).val() + "";

        if (qtt.length < 1) {
            qtt = Number(0);
        }

        //tam tinh gia mon
        var giamon = $('body').find('[id^="tamtinhgiamon"]').attr('price');
        var tongtamtinhgiamon = Number(qtt) * Number(giamon);
        var formatgiamon = formatCurrencys(giamon);
        var formattonggiamon = formatCurrencys(tongtamtinhgiamon);
        $('body').find('[id="tamtinhgiamon"]').text(formatgiamon + ' x ' + qtt + ' bàn = ' + formattonggiamon + ' đ');

        //tam tinh gia phuc vu
        $('body').find('[id^="tamtinhgiaphucvu-"]').each(function () {
            var itemphucvu = $(this);
            var state = itemphucvu.attr('priceType');
            if (state == "true") {
                var giapv = itemphucvu.attr('price');
                var tongtamtinhgiapv = Number(qtt) * Number(giapv);
                var formatgiapv = formatCurrencys(giapv);
                var formattonggiapv = formatCurrencys(tongtamtinhgiapv);
                itemphucvu.text(formatgiapv + ' x ' + qtt + ' bàn = ' + formattonggiapv + ' đ');
            }
        });

        //tong tam tinh
        var giatong = $('body').find('[id^="tongtamtinh"]').attr('price');
        var giadvcodinh = 0;
        $('body').find('[id^="tamtinhgiaphucvu"]').each(function () {
            var itemphucvu = $(this);
            var state = itemphucvu.attr('priceType');
            if (state == "false") {
                var giapv = itemphucvu.attr('price');
                giadvcodinh = Number(giadvcodinh) + Number(giapv);
            }
        });

        var tongtamtinhgiatong = (Number(qtt) * Number(giatong)) + Number(giadvcodinh);
        var formattong = formatCurrencys(tongtamtinhgiatong);
        $('body').find('[id="tongtamtinh"]').html(formattong + ' đ ' + '<small style="font-weight: normal">(tạm tính)</small>');

    });

    function formatCurrencys(input) {
        var input_val = input + "";

        if (input_val === "") { return; }

        if (input_val.indexOf(".") >= 0) {

            var decimal_pos = input_val.indexOf(".");

            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);

            left_side = formatNumber(left_side);
            right_side = formatNumber(right_side);

            right_side = right_side.substring(0, 2);
            input_val = left_side + "." + right_side;

        } else {
            input_val = formatNumber(input_val);
            input_val = input_val;
        }
        return input_val;
    }
    function formatNumber(n) {
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }


});