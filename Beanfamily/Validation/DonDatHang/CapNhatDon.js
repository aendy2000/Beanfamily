$(document).ready(function () {
    $('body').on('click', '[id^="btncapnhatdon"]', function () {
        var id = $(this).attr("name");
        var name = $('body').find('[id="inpMaDonHang' + id + '"]').val();
        var trangthai = $('body').find('[id="inpTrangThaiDonHang' + id + '"]').val();

        var formData = new FormData();
        formData.append('id', id);
        $.ajax({
            url: $('#requestPath').val() + "admin/dondathang/CapNhatDonHang",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            if (ketqua == "NOTEXIST") {
                Swal.fire({
                    title: "Không tồn tại",
                    text: "Đơn hàng này không tồn tại trong hệ thống.",
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
                $('body').find('[id="TitleCapNhatDonHangModal"]').html("Chi tiết đơn hàng <b>" + name + "</b>");

                if (trangthai.toLowerCase() == "chờ duyệt") {
                    $('body').find('[id="trangthaidonhang-chitiet"]').text(trangthai).addClass('bg-warning');
                }
                else if (trangthai.toLowerCase() == "đã hủy" || trangthai.toLowerCase() == "không thành công") {
                    $('body').find('[id="trangthaidonhang-chitiet"]').text(trangthai).addClass('bg-danger');
                }
                else if (trangthai.toLowerCase() == "hoàn thành") {
                    $('body').find('[id="trangthaidonhang-chitiet"]').text(trangthai).addClass('bg-success');
                }
                else {
                    $('body').find('[id="trangthaidonhang-chitiet"]').text(trangthai).addClass('bg-primary');
                }
                $('body').find('[id="CapNhatDonHangModal"]').modal('toggle');
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
        if (trangthai == "thanhcong") {
            notify = 'Xác nhận Đã thanh toán và Giao thành công đơn hàng"' + madonhang + '"';
        }
        else {
            notify = 'Xác nhận cập nhật Trạng thái đơn hàng "' + madonhang + '"';
        }
        Swal.fire({
            title: 'Cập nhật đơn hàng?',
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

                $.ajax({
                    url: $('#requestPath').val() + "admin/dondathang/submitcapnhatdonhang",
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
                            text: 'Đơn hàng "' + madonhang + '" đã được cập nhật.',
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