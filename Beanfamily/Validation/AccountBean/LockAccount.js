$(document).ready(function () {

    //Mở khóa
    $('body').on('click', '[id^="btnmokhoataikhoan"]', function () {
        var id = $(this).attr('name').split('#')[0];
        var idaccount = $(this).attr('name').split('#')[1];
        
        Swal.fire({
            title: 'Mở khóa tài khoản?',
            text: 'Bạn có chắc muốn mở khóa tài khoản "' + idaccount + '" không?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Mở khóa ngay!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var formData = new FormData();
                formData.append('id', id);
                formData.append('lockAcc', false);
                $.ajax({
                    url: $('#requestPath').val() + "admin/accountbean/lockaccount",
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {
                    if (ketqua == "SUCCESS") {
                       
                        Swal.fire({
                            title: "Thành công!",
                            text: 'Tài khoản "' + idaccount + '" đã được mở khóa.',
                            icon: "success"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else if (ketqua == "KHONGTONTAI") {
                        Swal.fire({
                            title: "Thông báo",
                            text: "Tài khoản này vừa mới được xóa bỏ.",
                            icon: "warning"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
                        Swal.fire({
                            title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                            text: "Chi tiết lỗi: " + ketqua,
                            icon: "error"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                });
            }
        });
    });

    //Khóa tài khoản
    $('body').on('click', '[id^="btnkhoataikhoan"]', function () {
        var id = $(this).attr('name').split('#')[0];
        var idaccount = $(this).attr('name').split('#')[1];
        Swal.fire({
            title: 'Khóa tài khoản?',
            text: 'Bạn có chắc muốn khóa tài khoản "' + idaccount + '" không?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Khóa ngay!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var formData = new FormData();
                formData.append('id', id);
                formData.append('lockAcc', true);
                $.ajax({
                    url: $('#requestPath').val() + "admin/accountbean/lockaccount",
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {
                    if (ketqua == "SUCCESS") {

                        Swal.fire({
                            title: "Thành công!",
                            text: 'Tài khoản "' + idaccount + '" đã được khóa lại.',
                            icon: "success"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else if (ketqua == "KHONGTONTAI") {
                        Swal.fire({
                            title: "Thông báo",
                            text: "Tài khoản này vừa mới được xóa bỏ.",
                            icon: "warning"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
                        Swal.fire({
                            title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                            text: "Chi tiết lỗi: " + ketqua,
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