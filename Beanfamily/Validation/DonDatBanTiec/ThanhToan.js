$(document).ready(function () {
    $('body').on('click', '[id^="btnSubmitThanhToan"]', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var id = $(this).attr("name");
        var sotienconlai = $('body').find('[id="sotienConLai"]').attr('name');
        var sotiendathanhtoan = $('body').find('[id="sotienDaThanhToan"]').attr('name');
        var madonhang = $('body').find('[id="sotienConLai"]').attr('madonhang');

        $('body').find('[id="invalid-inpSoTien-thanhtoan"]').prop('hidden', true);
        $('body').find('[id="invalid-inpNoiDung-thanhtoan"]').prop('hidden', true);

        var loai = $('body').find('[id="inpLoaiTien"] :selected').val();
        var sotien = $('body').find('[id="inpSoTien"]').val();
        var ghichu = $('body').find('[id="inpNoiDung"]').val().trim();

        var check = true;
        if (ghichu.length < 1) {
            btn.html('Thanh toán');
            btn.prop('disabled', false);

            check = false;
            $('body').find('[id="inpNoiDung"]').focus();
            $('body').find('[id="invalid-inpNoiDung-thanhtoan"]').text('Vui lòng nhập nội dung thanh toán.').prop('hidden', false);
        }

        if (loai == "thu") {
            if (sotien.length < 1) {
                btn.html('Thanh toán');
                btn.prop('disabled', false);

                check = false;
                $('body').find('[id="inpSoTien"]').focus();
                $('body').find('[id="invalid-inpSoTien-thanhtoan"]').text('Vui lòng nhập số tiền thanh toán.').prop('hidden', false);
            }
            else if (Number(sotien.replace(/,/g, '')) > Number(sotienconlai)) {
                btn.html('Thanh toán');
                btn.prop('disabled', false);

                check = false;
                $('body').find('[id="inpSoTien"]').focus();
                $('body').find('[id="invalid-inpSoTien-thanhtoan"]').text('Số tiền vượt quá khoản còn lại.').prop('hidden', false);
            }
        }
        else {
            if (sotien.length < 1) {
                btn.html('Thanh toán');
                btn.prop('disabled', false);

                check = false;
                $('body').find('[id="inpSoTien"]').focus();
                $('body').find('[id="invalid-inpSoTien-thanhtoan"]').text('Vui lòng nhập số tiền hoàn trả.').prop('hidden', false);
            }
            else if (Number(sotien.replace(/,/g, '')) > Number(sotiendathanhtoan)) {
                btn.html('Thanh toán');
                btn.prop('disabled', false);

                check = false;
                $('body').find('[id="inpSoTien"]').focus();
                $('body').find('[id="invalid-inpSoTien-thanhtoan"]').text('Số tiền trả lại vượt quá khoản đã thu.').prop('hidden', false);
            }
        }

        if (check == true) {

            var formData = new FormData();
            formData.append('id', id);
            formData.append('loai', loai);
            formData.append('sotien', sotien);
            formData.append('ghichu', ghichu);

            $.ajax({
                url: $('#requestPath').val() + "admin/dondatbantiec/submitthanhtoan",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "NOTEXIST") {
                    btn.html('Thanh toán');
                    btn.prop('disabled', false);

                    Swal.fire({
                        title: "Không tồn tại",
                        text: "Đơn đặt bàn này không tồn tại trong hệ thống.",
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua.indexOf("Chi tiết lỗi") != -1) {
                    btn.html('Thanh toán');
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
                    btn.html('Thanh toán');
                    btn.prop('disabled', false);

                    var loaitb = "";
                    if (loai == "thu") {
                        loaitb = "thanh toán ";
                    }
                    else {
                        loaitb = "hoàn trả ";
                    }
                    Swal.fire({
                        title: "Thành công",
                        text: 'Đã ' + loaitb + sotien + 'đ cho đơn đặt bàn "' + madonhang + '"',
                        icon: "success"
                    }).then(() => {
                        var formDatas = new FormData();
                        formDatas.append("id", id);

                        $.ajax({
                            url: $('#requestPath').val() + "admin/dondatbantiec/capnhatdonhang",
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
    });

    $('body').find('[class="item-inpLoaiTien"]').on('click', function () {
        var text = $(this).text();
        var name = $(this).attr('name');

        $('body').find('[id="inpLoaiTien"]').html(text);
        $('body').find('[id="inpLoaiTien"]').attr('name', name);
    });

    $('body').on('click', '[id^="btnHuyThanhToan"]', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var id = $(this).attr("name");
        var formData = new FormData();
        formData.append("id", id);

        $.ajax({
            url: $('#requestPath').val() + "admin/dondatbantiec/capnhatdonhang",
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