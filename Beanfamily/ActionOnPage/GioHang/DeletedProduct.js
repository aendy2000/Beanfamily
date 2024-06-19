$(document).ready(function () {

    //Mua sắm
    $('body').on('click', '[id^="xoasanphamgiohangmuasam-"]', function () {
        var id = $(this).attr("name");
        var name = $(this).attr("tensanpham");

        Swal.fire({
            title: 'Xóa bỏ?',
            text: 'Xóa sản phẩm "' + name + '" khỏi giỏ hàng của bạn?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa ngay!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var formData = new FormData();
                formData.append('id', id);
                $.ajax({
                    url: $('body').find('[id="requestPath"]').val() + 'muasam/deletedcart',
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {
                    
                    if (ketqua == "KHONGTONTAI") {
                        Swal.fire({
                            title: "Thông báo",
                            text: "Sản phẩm " + name + " không tồn tại.",
                            icon: "warning"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else if (ketqua.indexOf('Chi tiết lỗi') != -1) {
                        Swal.fire({
                            title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                            text: "Chi tiết lỗi: " + ketqua,
                            icon: "error"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
                        $('body').find('[id="cart-content-load"]').replaceWith(ketqua);

                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            title: 'Sản phẩm "' + name + '" đã được xóa khỏi giỏ hàng.',
                        });
                        UpdateThongTinCart();
                    }
                });
            }
        });

    });

    //Vườn rau
    $('body').on('click', '[id^="xoasanphamgiohangvuonrau-"]', function () {
        var id = $(this).attr("name");
        var name = $(this).attr("tensanpham");

        Swal.fire({
            title: 'Xóa bỏ?',
            text: 'Xóa sản phẩm "' + name + '" khỏi giỏ hàng của bạn?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa ngay!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var formData = new FormData();
                formData.append('id', id);
                $.ajax({
                    url: $('body').find('[id="requestPath"]').val() + 'vuonrau/deletedcart',
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {

                    if (ketqua == "KHONGTONTAI") {
                        Swal.fire({
                            title: "Thông báo",
                            text: "Sản phẩm " + name + " không tồn tại.",
                            icon: "warning"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else if (ketqua.indexOf('Chi tiết lỗi') != -1) {
                        Swal.fire({
                            title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                            text: "Chi tiết lỗi: " + ketqua,
                            icon: "error"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
                        $('body').find('[id="cart-content-load"]').replaceWith(ketqua);

                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            title: 'Sản phẩm "' + name + '" đã được xóa khỏi giỏ hàng.',
                        });
                        UpdateThongTinCart();
                    }
                });
            }
        });

    });

    //Thực đơn hằng ngày
    $('body').on('click', '[id^="xoasanphamgiohangthucdonhangngay-"]', function () {
        var id = $(this).attr("name");
        var name = $(this).attr("tensanpham");

        Swal.fire({
            title: 'Xóa bỏ?',
            text: 'Xóa sản phẩm "' + name + '" khỏi giỏ hàng của bạn?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa ngay!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var formData = new FormData();
                formData.append('id', id);
                $.ajax({
                    url: $('body').find('[id="requestPath"]').val() + 'thucdonhangngay/deletedcart',
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {

                    if (ketqua == "KHONGTONTAI") {
                        Swal.fire({
                            title: "Thông báo",
                            text: "Sản phẩm " + name + " không tồn tại.",
                            icon: "warning"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else if (ketqua.indexOf('Chi tiết lỗi') != -1) {
                        Swal.fire({
                            title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                            text: "Chi tiết lỗi: " + ketqua,
                            icon: "error"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
                        $('body').find('[id="cart-content-load"]').replaceWith(ketqua);

                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            title: 'Sản phẩm "' + name + '" đã được xóa khỏi giỏ hàng.',
                        });

                        UpdateThongTinCart();
                    }
                });
            }
        });

    });

    function UpdateThongTinCart() {
        var tt = $('body').find('[id="content-chitiet-giohang"]');
        if (tt !== null && tt.length > 0) {
            $.ajax({
                url: $('body').find('[id="requestPath"]').val() + 'dathang/UpdateInfoCart',
                dataType: 'html',
                type: 'GET',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                $('body').find('[id="content-chitiet-giohang"]').replaceWith(ketqua);
            });
        }
    }
});