$(document).ready(function () {
    $('.img-item-add').on('click', function () {
        $('#ThemHinhAnhModal').modal('toggle');
    });

    //Add hình ảnh tải lên
    document.getElementById('pro-image').addEventListener('change', readImage, false);
    $(".preview-images-zone").sortable();

    //Xóa hình ảnh
    $('body').on('click', '[id^="xoa-hinhanhsp-"]', function (e) {
        let fileName = $(this).attr('name');
        var currentFile = $("#pro-image")[0].files;
        var fileBuffer = new DataTransfer();

        for (let i = 0; i < currentFile.length; i++) {
            var fileNameArr = currentFile[i].name;
            var fileArr = currentFile[i];
            if (fileName !== fileNameArr) {
                fileBuffer.items.add(fileArr);
            }
        }
        $("#pro-image")[0].files = fileBuffer.files;
        readImage();
    });

    $('body').on('click', '[id="btnLuuCapNhat"]', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var totalFiles = $("#pro-image")[0].files.length;

        if (totalFiles < 1) {
            btn.html('Lưu thông tin');
            btn.prop('disabled', false);

            Swal.fire({
                title: "Chưa thêm được!",
                text: "Chưa có hình ảnh nào được tải lên hệ thống, vui lòng kiểm tra và thử lại!",
                icon: "warning"
            });
        }
        else {
            var formData = new FormData();
            for (var i = 0; i < totalFiles; i++) {
                var file = $("#pro-image")[0].files[i];
                formData.append('images', file);
            }

            $.ajax({
                error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
                url: $('#requestPath').val() + "admin/hinhanhbean/themhinhanh",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua.indexOf("Chi tiết lỗi:") != -1) {
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
                        text: "Đã thêm " + totalFiles + " hình ảnh mới!",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
            });
        }
    });

    $('body').on('click', '[id^="hinhanhbean-show-"]', function () {
        var src = $(this).attr('data-src');
        var id = $(this).attr('name');

        $('body').find('[id="show-img-xoa"]').attr('name', id);
        $('body').find('[id="show-img-xoa"]').attr('src', src);

        $('[id="XemHinhAnhModal"]').modal('toggle');
    });
    $('body').on('click', '[id="btnLuuXoa"]', function () {
        Swal.fire({
            title: 'Xóa ảnh?',
            text: 'Bạn có chắc muốn xóa hình ảnh này?',
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa ngay!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                var btn = $(this);
                btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
                btn.prop('disabled', true);

                var id = $('body').find('[id^="show-img-xoa"]').attr('name');
                var src = $('body').find('[id^="show-img-xoa"]').attr('data-src');
                
                var formData = new FormData();
                formData.append('id', id);
                formData.append('src', src);

                $.ajax({
                    error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
                    url: $('#requestPath').val() + "admin/hinhanhbean/xoahinhanh",
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false
                }).done(function (ketqua) {
                    if (ketqua.indexOf("Chi tiết lỗi:") != -1) {
                        btn.html('Xóa ảnh');
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
                        btn.html('Xóa ảnh');
                        btn.prop('disabled', false);

                        Swal.fire({
                            title: "Thành công",
                            text: "Đã xóa bỏ 1 hình ảnh!",
                            icon: "success"
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                });
            }
        });
    });

    function readImage() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#pro-image')[0].files; //FileList object
            var output = $(".preview-images-zone");
            output.html("");

            var arrFilesCount = [];
            for (var i = 0; i < files.length; i++) {
                arrFilesCount.push(i);
                //arrFilesCount.shift();
                var file = files[i];
                if (!file.type.match('image')) continue;

                var picReader = new FileReader();
                picReader.fileNames = file.name;
                picReader.addEventListener('load', function (event) {
                    var picFile = event.target;
                    var fileName = event.target.fileNames;
                    var html = '<div id="idHinhAnh-' + fileName.substring(0, fileName.lastIndexOf(".")) + '" class="preview-image preview-show-' + fileName.substring(0, fileName.lastIndexOf(".")) + '">' +
                        '<div id="xoa-hinhanhsp-' + fileName.substring(0, fileName.lastIndexOf(".")) + '" class="image-cancel" name="' + fileName + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="pro-img-' + fileName + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }
        } else {
            console.log('Browser not support');
        }
    }
});