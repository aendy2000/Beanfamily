$(document).ready(function () {
    $('body').find('[id="xacNhanDatHang"]').on('click', function () {
        Swal.fire({
            title: 'Đặt Hàng?',
            text: 'Xác nhận tạo đơn đặt hàng',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var btn = $(this);
                btn.html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"> </span> Đang tải...');
                btn.css('pointer-events', 'none');

                var testMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

                $('body').find('[id="validate-tienhanhdathang-hoten"]').prop('hidden', true);
                $('body').find('[id="validate-tienhanhdathang-sodienthoai"]').prop('hidden', true);
                $('body').find('[id="validate-tienhanhdathang-email"]').prop('hidden', true);
                $('body').find('[id="validate-tienhanhdathang-ghichu"]').prop('hidden', true);

                $('body').find('[id="validate-tienhanhdathang-diachi"]').prop('hidden', true);
                $('body').find('[id="validate-tienhanhdathang-city"]').prop('hidden', true);
                $('body').find('[id="validate-tienhanhdathang-district"]').prop('hidden', true);
                $('body').find('[id="validate-tienhanhdathang-ward"]').prop('hidden', true);

                var hoten = $('body').find('[id="hoten"]').val().trim();
                var sodienthoai = $('body').find('[id="sodienthoai"]').val();
                var email = $('body').find('[id="email"]').val().trim();
                var ghichu = $('body').find('[id="ghichu"]').val().trim();

                var diachi = $('body').find('[id="diachi"]').val().trim();
                var tinh = $('body').find('[id="city"] :selected').text();
                var quanhuyen = $('body').find('[id="district"] :selected').text();
                var phuongxa = $('body').find('[id="ward"] :selected').text();

                var giaotannoi = false;
                var pttt = "";
                if ($('body').find('[id="ttknh"]').prop("checked")) {
                    pttt = "Thanh toán khi nhận hàng";
                }
                else if ($('body').find('[id="ttmm"]').prop("checked")) {
                    pttt = "Thanh toán qua MOMO";
                }
                else if ($('body').find('[id="ttnh"]').prop("checked")) {
                    pttt = "Thanh toán qua Ngân hàng";
                }

                var check = true;
                if (hoten.length < 1) {
                    check = false;
                    $('body').find('[id="hoten"]').focus();
                    $('body').find('[id="validate-tienhanhdathang-hoten"]').text('Họ & Tên không được bỏ trống.').prop('hidden', false);
                    btn.css('pointer-events', 'auto');
                    btn.html("Xác nhận đặt hàng");
                }

                if (sodienthoai.length < 1) {
                    check = false;
                    $('body').find('[id="sodienthoai"]').focus();
                    $('body').find('[id="validate-tienhanhdathang-sodienthoai"]').text('Số điện thoại không được bỏ trống.').prop('hidden', false);
                    btn.css('pointer-events', 'auto');
                    btn.html("Xác nhận đặt hàng");
                }
                else if (sodienthoai.length != 10) {
                    check = false;
                    $('body').find('[id="sodienthoai"]').focus();
                    $('body').find('[id="validate-tienhanhdathang-sodienthoai"]').text('Số điện thoại chưa đúng.').prop('hidden', false);
                    btn.css('pointer-events', 'auto');
                    btn.html("Xác nhận đặt hàng");
                }

                if (email.length < 1) {
                    check = false;
                    $('body').find('[id="email"]').focus();
                    $('body').find('[id="validate-tienhanhdathang-email"]').text('Địa chỉ Email không được bỏ trống.').prop('hidden', false);
                    btn.css('pointer-events', 'auto');
                    btn.html("Xác nhận đặt hàng");
                }
                else if (testMail.test(email) == false) {
                    check = false;
                    $('body').find('[id="email"]').focus();
                    $('body').find('[id="validate-tienhanhdathang-email"]').text('Địa chỉ Email chưa đúng.').prop('hidden', false);
                    btn.css('pointer-events', 'auto');
                    btn.html("Xác nhận đặt hàng");
                }

                if (ghichu.length > 0) {
                    if (ghichu.length > 200) {
                        check = false;
                        $('body').find('[id="ghichu"]').focus();
                        $('body').find('[id="validate-tienhanhdathang-ghichu"]').text('Ghi chú tối đa 200 ký tự.').prop('hidden', false);
                        btn.css('pointer-events', 'auto');
                        btn.html("Xác nhận đặt hàng");
                    }
                }

                if ($('body').find('[id="giaotannoi"]').prop('checked')) {
                    giaotannoi = true;

                    if (diachi.length < 1) {
                        check = false;
                        $('body').find('[id="diachi"]').focus();
                        $('body').find('[id="validate-tienhanhdathang-diachi"]').text('Địa chỉ không được bỏ trống.').prop('hidden', false);
                        btn.css('pointer-events', 'auto');
                        btn.html("Xác nhận đặt hàng");
                    }

                    if (tinh == "Chọn tỉnh thành") {
                        check = false;
                        $('body').find('[id="city"]').focus();
                        $('body').find('[id="validate-tienhanhdathang-city"]').text('Tỉnh thành không được bỏ trống.').prop('hidden', false);
                        btn.css('pointer-events', 'auto');
                        btn.html("Xác nhận đặt hàng");
                    }

                    if (quanhuyen == "Chọn quận huyện") {
                        check = false;
                        $('body').find('[id="district"]').focus();
                        $('body').find('[id="validate-tienhanhdathang-district"]').text('Quận huyện không được bỏ trống.').prop('hidden', false);
                        btn.css('pointer-events', 'auto');
                        btn.html("Xác nhận đặt hàng");
                    }

                    if (phuongxa == "Chọn phường xã") {
                        check = false;
                        $('body').find('[id="ward"]').focus();
                        $('body').find('[id="validate-tienhanhdathang-ward"]').text('Phường xã không được bỏ trống.').prop('hidden', false);
                        btn.css('pointer-events', 'auto');
                        btn.html("Xác nhận đặt hàng");
                    }
                }

                if (check == true) {
                    var formData = new FormData();
                    formData.append('hoten', hoten);
                    formData.append('sodienthoai', sodienthoai);
                    formData.append('email', email);
                    formData.append('ghichu', ghichu);

                    formData.append('diachi', diachi);
                    formData.append('tinh', tinh);
                    formData.append('quanhuyen', quanhuyen);
                    formData.append('phuongxa', phuongxa);

                    formData.append('pttt', pttt);
                    formData.append('giaotannoi', giaotannoi);

                    $.ajax({
                        url: $('body').find('[id="requestPath"]').val() + 'dathang/xacnhandathang',
                        data: formData,
                        dataType: 'html',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                    }).done(function (ketqua) {
                        if (ketqua.indexOf('SUCCESS-') !== -1) {
                            btn.html('Xác nhận đặt hàng');
                            btn.css('pointer-events', 'auto');
                            var madonhang = ketqua.split('-')[1];
                            Swal.fire({
                                title: "Đặt hàng Thành Công!",
                                text: "Cảm ơn bạn đã đặt hàng, chúng tôi đã nhận được thông tin và sẽ sớm liên hệ lại với bạn để xác nhận đơn đặt hàng này. \nMã đơn hàng: " + madonhang,
                                icon: "success"
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (ketqua.indexOf("Chi tiết lỗi:") !== -1) {
                            btn.css('pointer-events', 'auto');
                            btn.html('Xác nhận đặt hàng');
                            Swal.fire({
                                title: "Đã xảy ra lỗi, vui lòng thử lại sau.",
                                text: ketqua,
                                icon: "error"
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (ketqua == "NOTEXIST") {
                            btn.css('pointer-events', 'auto');
                            btn.html('Xác nhận đặt hàng');
                            Swal.fire({
                                title: "Có Sản Phẩm Đã Bị Xóa",
                                text: "Một sản phẩm đã được xóa bỏ bởi quản trị nhà hàng, hãy kiểm tra lại giỏ hàng trước!",
                                icon: "warning"
                            }).then(() => {
                                $.ajax({
                                    url: $('body').find('[id="requestPath"]').val() + 'dathang/UpdateInfoCart',
                                    dataType: 'html',
                                    type: 'GET',
                                    processData: false,
                                    contentType: false,
                                }).done(function (ketqua) {
                                    $('body').find('[id="content-chitiet-giohang"]').replaceWith(ketqua);
                                    window.location = $('#requestPath').val() + "gio-hang";
                                });
                            });
                        }
                        else if (ketqua == "VUOTSOLUONG") {
                            btn.css('pointer-events', 'auto');
                            btn.html('Xác nhận đặt hàng');
                            Swal.fire({
                                title: "Số Lượng Vượt Tồn Kho",
                                text: "Có sản phẩm tồn kho đã giảm hơn so với số lượng mua, hãy kiểm tra lại giỏ hàng của bạn.",
                                icon: "warning"
                            }).then(() => {
                                $.ajax({
                                    url: $('body').find('[id="requestPath"]').val() + 'dathang/UpdateInfoCart',
                                    dataType: 'html',
                                    type: 'GET',
                                    processData: false,
                                    contentType: false,
                                }).done(function (ketqua) {
                                    $('body').find('[id="content-chitiet-giohang"]').replaceWith(ketqua);
                                    window.location = $('#requestPath').val() + "gio-hang";
                                });
                            });
                        }
                    });
                }
            }
        });
    });

    $('body').find('[id="giaotannoi"]').on('change', function () {
        var check = $(this).prop('checked');
        if (check == true) {
            $('body').find('[id="chongiaotannoi"]').prop('hidden', false);
            $('body').find('[id="chontaicuahang"]').prop('hidden', true);
        }
    });
    $('body').find('[id="taicuahang"]').on('change', function () {
        var check = $(this).prop('checked');
        if (check == true) {
            $('body').find('[id="chongiaotannoi"]').prop('hidden', true);
            $('body').find('[id="chontaicuahang"]').prop('hidden', false);
        }
    });
});