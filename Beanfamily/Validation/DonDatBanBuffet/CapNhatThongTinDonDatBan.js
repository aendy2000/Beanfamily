$(document).ready(function () {
    $("#timkiemmon").keyup(function () {
        var filter = $(this).val().trim();
        $('[id="lst-sanpham"]').find('.item-sanpham').each(function () {

            if ($(this).find('.item-sanpham-tenmon').text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut(100);
            } else {
                $(this).fadeIn(100);
            }
        });
    });

    $(document).on('change', '[id^="chonmon-"]', function () {
        var inpCheck = $(this);
        var id = inpCheck.attr('name');

        if (inpCheck.prop('checked')) {
            $('[id="parentDiv-' + id + '"]').css('background', '#dbdcff');
        }
        else {
            $('[id="parentDiv-' + id + '"]').css('background', '#ffffff');
        }
    });

    $(document).on('change', '[id^="chonphucvu-"]', function () {
        var inpCheck = $(this);
        var id = inpCheck.attr('name');

        if (inpCheck.prop('checked')) {
            $('[id="parentDivPhucVu-' + id + '"]').css('background', '#dbdcff');
        }
        else {
            $('[id="parentDivPhucVu-' + id + '"]').css('background', '#ffffff');
        }
    });

    $('body').on('click', '[id^="btnSubMitCapNhat"]', function () {
        Swal.fire({
            title: 'Lưu cập nhật?',
            text: 'Bạn có chắc muốn cập nhật thông tin đơn đặt bàn này?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var btn = $(this);
                btn.focus();
                btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
                btn.prop('disabled', true);

                var id = $(this).attr("name");
                var soban = $('body').find('[id="soban"]').val();
                var ghichu = $('body').find('[id="ghichu"]').val().trim();
                var giotochuc = $('body').find('[id="giotochuc"] :selected').val();
                var ngaytochuc = $('body').find('[id="ngaytochuc"]').val();
                var email = $('body').find('[id="email"]').val();
                var sodienthoai = $('body').find('[id="sodienthoai"]').val();
                var hovaten = $('body').find('[id="hovaten"]').val();

                $('#invalid-soban-capnhatdonhang').prop('hidden', true);
                $('#invalid-ghichu-capnhatdonhang').prop('hidden', true);
                $('#invalid-giotochuc-capnhatdonhang').prop('hidden', true);
                $('#invalid-ngaytochuc-capnhatdonhang').prop('hidden', true);
                $('#invalid-email-capnhatdonhang').prop('hidden', true);
                $('#invalid-sodienthoai-capnhatdonhang').prop('hidden', true);
                $('#invalid-hovaten-capnhatdonhang').prop('hidden', true);

                var validationMail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                var check = true;
                if (soban.length < 1) {
                    btn.html('Lưu thông tin');
                    btn.prop('disabled', false);

                    check = false;
                    $('body').find('[id="soban"]').focus();
                    $('body').find('[id="invalid-soban-capnhatdonhang"]').text('Vui lòng nhập số bàn khách đặt.').prop('hidden', false);
                }

                if (ghichu.length > 0) {
                    if (ghichu.length > 200) {
                        btn.html('Lưu thông tin');
                        btn.prop('disabled', false);

                        check = false;
                        $('body').find('[id="ghichu"]').focus();
                        $('body').find('[id="invalid-ghichu-capnhatdonhang"]').text('Ghi chú không quá 200 ký tự').prop('hidden', false);
                    }
                }

                if (ngaytochuc.length < 1) {
                    btn.html('Lưu thông tin');
                    btn.prop('disabled', false);

                    check = false;
                    $('body').find('[id="ngaytochuc"]').focus();
                    $('body').find('[id="invalid-ngaytochuc-capnhatdonhang"]').text('Vui lòng chọn ngày bắt đầu mở tiệc').prop('hidden', false);
                }

                if (email.length > 0) {
                    if (validationMail.test(email) == false) {
                        btn.html('Lưu thông tin');
                        btn.prop('disabled', false);

                        check = false;
                        $('body').find('[id="email"]').focus();
                        $('body').find('[id="invalid-email-capnhatdonhang"]').text('Địa chỉ email chưa hợp lệ').prop('hidden', false);
                    }
                }

                if (sodienthoai.length < 1) {
                    btn.html('Lưu thông tin');
                    btn.prop('disabled', false);

                    check = false;
                    $('body').find('[id="sodienthoai"]').focus();
                    $('body').find('[id="invalid-sodienthoai-capnhatdonhang"]').text('Vui lòng nhập số điện thoại').prop('hidden', false);
                }
                else if (sodienthoai.length != 10) {
                    btn.html('Lưu thông tin');
                    btn.prop('disabled', false);

                    check = false;
                    $('body').find('[id="sodienthoai"]').focus();
                    $('body').find('[id="invalid-sodienthoai-capnhatdonhang"]').text('Số điện thoại chưa hợp lệ').prop('hidden', false);
                }

                if (hovaten.length < 1) {
                    btn.html('Lưu thông tin');
                    btn.prop('disabled', false);

                    check = false;
                    $('body').find('[id="hovaten"]').focus();
                    $('body').find('[id="invalid-hovaten-capnhatdonhang"]').text('Vui lòng nhập họ tên khách hàng').prop('hidden', false);
                }

                var lstIdMon = "";
                $('body').find('[id^="chonmon-"]').each(function () {
                    if ($(this).prop('checked')) {
                        var id = $(this).attr('name');
                        lstIdMon += id + "-";
                    }
                });
                lstIdMon = lstIdMon.substring(0, lstIdMon.length - 1);
                if (lstIdMon.length < 1) {
                    btn.html('Lưu thông tin');
                    btn.prop('disabled', false);

                    check = false;
                    $('body').find('[id="lst-sanpham"]').focus();
                    Swal.fire({
                        title: "Chưa chọn món!",
                        text: "Vui lòng chọn ít nhất 1 món trong danh sách!",
                        icon: "warning"
                    });
                }

                if (check == true) {
                    var formData = new FormData();
                    formData.append('id', id);
                    formData.append('soban', soban);
                    formData.append('ghichu', ghichu);
                    formData.append('giotochuc', giotochuc);
                    formData.append('ngaytochuc', ngaytochuc);
                    formData.append('email', email);
                    formData.append('sodienthoai', sodienthoai);
                    formData.append('hovaten', hovaten);
                    formData.append('lstMonAn', lstIdMon);

                    $.ajax({
                        url: $('#requestPath').val() + "admin/dondatbanbuffet/SubmitCapNhatThongTinDonHang",
                        data: formData,
                        dataType: 'html',
                        type: 'POST',
                        processData: false,
                        contentType: false
                    }).done(function (ketqua) {
                        if (ketqua == "NOTEXIST") {
                            btn.html('Lưu thông tin');
                            btn.prop('disabled', false);

                            Swal.fire({
                                title: "Không tồn tại",
                                text: "Đơn đặt bàn này không tồn tại trong hệ thống.",
                                icon: "error"
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (ketqua == "SMALLDATE") {
                            btn.html('Lưu thông tin');
                            btn.prop('disabled', false);

                            $('body').find('[id="ngaytochuc"]').focus();
                            $('body').find('[id="invalid-ngaytochuc-capnhatdonhang"]').text('Ngày tổ chức ít nhất phải từ hôm nay trở lên').prop('hidden', false);
                        }
                        else if (ketqua.indexOf("Chi tiết lỗi") != -1) {
                            btn.html('Lưu thông tin');
                            btn.prop('disabled', false);

                            Swal.fire({
                                title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                                text: ketqua,
                                icon: "error"
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else {
                            btn.html('Lưu thông tin');
                            btn.prop('disabled', false);

                            Swal.fire({
                                title: "Thành công",
                                text: 'Đã cập nhật thông tin đơn đặt bàn',
                                icon: "success"
                            }).then(() => {
                                var formDatas = new FormData();
                                formDatas.append("id", id);

                                $.ajax({
                                    url: $('#requestPath').val() + "admin/dondatbanbuffet/capnhatdonhang",
                                    data: formDatas,
                                    dataType: 'html',
                                    type: 'POST',
                                    processData: false,
                                    contentType: false
                                }).done(function (ketqua) {
                                    $('body').find('[id="content-CapNhatDonHangModal"]').replaceWith(ketqua);
                                    $('body').find('[id="footer-modal-capnhatdonhang"]').prop('hidden', false);
                                });
                            });

                        }
                    });
                }
            }
        });
    });

    $('body').on('click', '[id^="btnHuyCapNhat"]', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var id = $(this).attr("name");
        var formData = new FormData();
        formData.append("id", id);

        $.ajax({
            url: $('#requestPath').val() + "admin/dondatbanbuffet/capnhatdonhang",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            $('body').find('[id="content-CapNhatDonHangModal"]').replaceWith(ketqua);
            $('body').find('[id="footer-modal-capnhatdonhang"]').prop('hidden', false);
        });
    });
});
