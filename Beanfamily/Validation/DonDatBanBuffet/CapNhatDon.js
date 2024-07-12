$(document).ready(function () {
    $('body').on('click', '[id^="btncapnhatdon"]', function () {
        var id = $(this).attr("name");
        var name = $('body').find('[id="inpMaDonHang' + id + '"]').val();

        var trangthai = $('body').find('[id="inpTrangThaiDonHang' + id + '"]').val();

        var formData = new FormData();
        formData.append('id', id);
        $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
            url: $('#requestPath').val() + "admin/dondatbanbuffet/CapNhatDonHang",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            if (ketqua == "NOTEXIST") {
                Swal.fire({
                    title: "Không tồn tại",
                    text: "Đơn đặt bàn này không tồn tại trong hệ thống.",
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else if (ketqua.indexOf("Chi tiết lỗi") != -1) {
                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                    text: ketqua,
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
                $('body').find('[id="content-CapNhatDonHangModal"]').replaceWith(ketqua);
                $('body').find('[id="TitleCapNhatDonHangModal"]').html("Chi tiết đơn đặt bàn <b>" + name + "</b>");

                $('body').find('[id="trangthaidonhang-chitiet"]').attr('class', '');
                $('body').find('[id="trangthaidonhang-chitiet"]').text(trangthai).addClass('badge ' + $('body').find('[id="mauChuTrangThai' + id + '"]').val());

                $('body').find('[id="CapNhatDonHangModal"]').modal('toggle');
                $('body').find('[id="footer-modal-capnhatdonhang"]').prop('hidden', false);

            }
        });

    });
    $('body').on('click', '[id="btnThanhToan"]', function () {
        var btn = $(this);

        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var id = $(this).attr('name');

        var formData = new FormData();
        formData.append('id', id);

        $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
            url: $('#requestPath').val() + "admin/dondatbanbuffet/thanhtoan",
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

                $('body').find('[id="content-CapNhatDonHangModal"]').replaceWith(ketqua);
                $('body').find('[id="footer-modal-capnhatdonhang"]').prop('hidden', true);
            }
        });
    });

    $('body').on('click', '[id="btnCapNhatThongTinDonHang"]', function () {
        var btn = $(this);

        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var id = $(this).attr('name');

        var formData = new FormData();
        formData.append('id', id);

        $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
            url: $('#requestPath').val() + "admin/dondatbanbuffet/capnhatthongtindonhang",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            if (ketqua == "NOTEXIST") {
                btn.html('Cập nhật thông tin');
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
                btn.html('Cập nhật thông tin');
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
                btn.html('Cập nhật thông tin');
                btn.prop('disabled', false);

                $('body').find('[id="content-CapNhatDonHangModal"]').replaceWith(ketqua);
                $('body').find('[id="footer-modal-capnhatdonhang"]').prop('hidden', true);
            }
        });
    });

    $('body').find('[id="btnLuuCapNhatDonHang"]').on('click', function () {
        var btn = $(this);

        var trangthai = $('body').find('[id="capnhat-trangthai"] :selected').val();
        var ghichu = $('body').find('[id="capnhat-ghichuthem"]').val();

        var name = $('body').find('[id="capnhat-trangthai"]').attr('name');
        var id = name.split('-')[0];
        var madonhang = name.split('-')[1];

        var notify = "";
        if (trangthai == "hoanthanh") {
            notify = 'Xác nhận kết thúc bữa tiệc cho đơn đặt bàn "' + madonhang + '"';
        }
        else {
            notify = 'Xác nhận cập nhật đơn đặt bàn "' + madonhang + '"';
        }
        Swal.fire({
            title: 'Cập nhật đơn đặt bàn?',
            text: notify,
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {

                btn.focus();
                btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
                btn.prop('disabled', true);

                var formData = new FormData();
                formData.append('id', id);
                formData.append('trangthai', trangthai);
                formData.append('ghichu', ghichu);

                $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                    url: $('#requestPath').val() + "admin/dondatbanbuffet/submitcapnhatdonhang",
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {
                    if (ketqua == "SUCCESS") {
                        btn.html('Lưu thông tin');
                        btn.prop('disabled', false);

                        Swal.fire({
                            title: "Thành công!",
                            text: 'Đơn đặt bàn "' + madonhang + '" đã được cập nhật.',
                            icon: "success"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
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
                });
            }
        });
    });
});