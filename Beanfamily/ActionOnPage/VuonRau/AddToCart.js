$(document).ready(function () {
    $('body').on('click', '[id="addToCart"]', function () {
        var sanpham = $('body').find('[id="idPro"]').val();
        var loai = $('body').find('[id="selectloai"]').find('option:selected').val();
        var soluong = $('body').find('[id="soluong"]').val();

        var formData = new FormData();
        formData.append('idsp', sanpham);
        formData.append('idloaitonkho', loai);
        formData.append('soluong', soluong);

        $.ajax({
            url: $('body').find('[id="requestPath"]').val() + 'muasam/addtocart',
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false,
        }).done(function (data) {
            if (data.indexOf("Chi tiết lỗi") != -1) {
                Swal.fire({
                    title: "Đã có lỗi xảy ra, vui lòng thử lại sau :(",
                    text: data,
                    icon: "error"
                }).then(() => function () {
                    location.reload();
                });
            }
            else if (data == "HETHANG") {
                Swal.fire({
                    title: "Sản phẩm hết",
                    text: "Sản phẩm hiện đã bán hết?",
                    icon: "warning"
                }).then(() => function () {
                    location.reload();
                });
            }
            else if (data == "KHONGTONTAI") {
                Swal.fire({
                    title: "Sản phẩm hết",
                    text: "Sản phẩm hiện đã bán hết?",
                    icon: "warning"
                }).then(() => function () {
                    location.reload();
                });
            }
            else {
                $('body').find('[id="cart-content-load"]').replaceWith(data);

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Đã thêm sản phẩm vào giỏ hàng!"
                });

                $('body').find('[id="soluong"]').val(1);
                $('body').find('[id="gioHangModal"]').modal('toggle');
            }
        });
    });
});