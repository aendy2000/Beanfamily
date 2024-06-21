$(document).ready(function () {
    $('body').find('[id="xacNhanDatHang"]').on('click', function () {
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
        if ($('body').find('[id="ttknh"]').prop("checked") == "true") {
            pttt = "Thanh toán khi nhận hàng";
        }
        else if ($('body').find('[id="ttmm"]').prop("checked") == "true") {
            pttt = "Thanh toán qua MOMO";
        }
        else if ($('body').find('[id="ttnh"]').prop("checked") == "true") {
            pttt = "Thanh toán qua Ngân hàng";
        }

        var check = true;
        if (hoten.length < 1) {
            check = false;
            $('body').find('[id="validate-tienhanhdathang-hoten"]').text('Họ & Tên không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Xác nhận");
        }

        if (sodienthoai.length < 1) {
            check = false;
            $('body').find('[id="validate-tienhanhdathang-sodienthoai"]').text('Số điện thoại không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Xác nhận");
        }
        else if (sodienthoai.length != 10) {
            check = false;
            $('body').find('[id="validate-tienhanhdathang-sodienthoai"]').text('Số điện thoại chưa đúng.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Xác nhận");
        }

        if (email.length < 1) {
            check = false;
            $('body').find('[id="validate-tienhanhdathang-email"]').text('Địa chỉ Email không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Xác nhận");
        }
        else if (testMail.test(email) == false) {
            check = false;
            $('body').find('[id="validate-tienhanhdathang-email"]').text('Địa chỉ Email chưa đúng.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Xác nhận");
        }

        if (ghichu.length > 0) {
            if (ghichu.length > 200) {
                check = false;
                $('body').find('[id="validate-tienhanhdathang-ghichu"]').text('Ghi chú tối đa 200 ký tự.').prop('hidden', false);
                btn.css('pointer-events', 'auto');
                btn.html("Xác nhận");
            }
        }

        if (diachi.length < 1) {
            check = false;
            $('body').find('[id="validate-tienhanhdathang-ghichu"]').text('Địa chỉ không được bỏ trống.').prop('hidden', false);
            btn.css('pointer-events', 'auto');
            btn.html("Xác nhận");
        }

        if ($('body').find('[id="giaotannoi"]').prop('checked') == "true") {
            giaotannoi = true;

            if (tinh == "Chọn tỉnh thành") {
                check = false;
                $('body').find('[id="validate-tienhanhdathang-city"]').text('Tỉnh thành không được bỏ trống.').prop('hidden', false);
                btn.css('pointer-events', 'auto');
                btn.html("Xác nhận");
            }

            if (quanhuyen == "Chọn quận huyện") {
                check = false;
                $('body').find('[id="validate-tienhanhdathang-district"]').text('Quận huyện không được bỏ trống.').prop('hidden', false);
                btn.css('pointer-events', 'auto');
                btn.html("Xác nhận");
            }

            if (phuongxa == "Chọn phường xã") {
                check = false;
                $('body').find('[id="validate-tienhanhdathang-ward"]').text('Phường xã không được bỏ trống.').prop('hidden', false);
                btn.css('pointer-events', 'auto');
                btn.html("Xác nhận");
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

            });
        }
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