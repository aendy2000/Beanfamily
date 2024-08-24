$(document).ready(function () {
    //Banner trang chủ
    document.getElementById('banner_trangchu').addEventListener('change', suareadImage, false);
    $(".preview-images-zonebanner_trangchu").sortable();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-banner_trangchu-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-banner_trangchu-' + filenames + '"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-banner_trangchu-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#banner_trangchu")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#banner_trangchu")[0].files = fileBuffer.files;
            suareadImage();
        }
    });
    function suareadImage() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#banner_trangchu')[0].files; //FileList object
            var output = $(".preview-images-zonebanner_trangchu");
            output.html("");

            var arrFilesCount = [];
            for (var i = 0; i < files.length; i++) {
                arrFilesCount.push(i);
                var file = files[i];
                if (!file.type.match('image')) continue;

                var picReader = new FileReader();
                picReader.fileNames = file.name;
                picReader.addEventListener('load', function (event) {
                    var picFile = event.target;
                    var fileName = event.target.fileNames;
                    var html = '<div id="suaidHinhAnh-banner_trangchu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                        '<div id="suaxoa-hinhanhsp-banner_trangchu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="suapro-img-banner_trangchu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }

            $('[id^="url-suaidHinhAnh-hinhcu-banner_trangchu-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }


    //Hình ảnh giới thiệu trang chủ
    document.getElementById('hinhanh_mota_trangchu').addEventListener('change', suareadImagehinhanh_mota_trangchu, false);
    $(".preview-images-zonehinhanh_mota_trangchu").sortable();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-hinhanh_mota_trangchu-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-hinhanh_mota_trangchu-' + filenames + '"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-hinhanh_mota_trangchu-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#banner_trangchu")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#hinhanh_mota_trangchu")[0].files = fileBuffer.files;
            suareadImagehinhanh_mota_trangchu();
        }
    });
    function suareadImagehinhanh_mota_trangchu() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#hinhanh_mota_trangchu')[0].files; //FileList object
            var output = $(".preview-images-zonehinhanh_mota_trangchu");
            output.html("");

            var arrFilesCount = [];
            for (var i = 0; i < files.length; i++) {
                arrFilesCount.push(i);
                var file = files[i];
                if (!file.type.match('image')) continue;

                var picReader = new FileReader();
                picReader.fileNames = file.name;
                picReader.addEventListener('load', function (event) {
                    var picFile = event.target;
                    var fileName = event.target.fileNames;
                    var html = '<div id="suaidHinhAnh-hinhanh_mota_trangchu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                        '<div id="suaxoa-hinhanhsp-hinhanh_mota_trangchu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="suapro-img-hinhanh_mota_trangchu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }

            $('[id^="url-suaidHinhAnh-hinhcu-hinhanh_mota_trangchu-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }


    $('body').on('click', '[id="btnLuuThongTinTrangChu"]', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var formData = new FormData();

        for (var i = 0; i < $("#banner_trangchu")[0].files.length; i++) {
            var file = $("#banner_trangchu")[0].files[i];
            formData.append('banner_trangchu', file);
        }

        var banner_trangchuCu = "";
        $('[id^="url-suaidHinhAnh-hinhcu-banner_trangchu-"]').each(function () { if ($(this).val().length > 0) banner_trangchuCu += $(this).val() + "#"; });
        formData.append('banner_trangchuCu', banner_trangchuCu.substring(0, banner_trangchuCu.length - 1));

        formData.append('mota_trangchu', $('#mota_trangchu').val().trim());
        formData.append('hinhanh_mota_trangchu', $("#hinhanh_mota_trangchu")[0].files[0]);

        var hinhanh_mota_trangchuCu = "";
        $('[id^="url-suaidHinhAnh-hinhcu-hinhanh_mota_trangchu-"]').each(function () { if ($(this).val().length > 0) hinhanh_mota_trangchuCu += $(this).val() + "#"; });
        formData.append('hinhanh_mota_trangchuCu', hinhanh_mota_trangchuCu.substring(0, hinhanh_mota_trangchuCu.length - 1));

        formData.append('mota_thanhphanchinh_nhahang', $('#mota_thanhphanchinh_nhahang').val().trim());
        formData.append('mota_thanhphanchinh_vuonrau', $('#mota_thanhphanchinh_vuonrau').val().trim());
        formData.append('mota_thanhphanchinh_muasam', $('#mota_thanhphanchinh_muasam').val().trim());

        formData.append('mota_sanphammoi_nhahang', $('#mota_sanphammoi_nhahang').val().trim());
        formData.append('mota_sanphammoi_vuonrau', $('#mota_sanphammoi_vuonrau').val().trim());
        formData.append('mota_sanphammoi_muasam', $('#mota_sanphammoi_muasam').val().trim());

        formData.append('mota_sanphamnoibat_nhahang', $('#mota_sanphamnoibat_nhahang').val().trim());
        formData.append('mota_sanphamnoibat_vuonrau', $('#mota_sanphamnoibat_vuonrau').val().trim());
        formData.append('mota_sanphamnoibat_muasam', $('#mota_sanphamnoibat_muasam').val().trim());

        $.ajax({
            error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
            url: $('#requestPath').val() + "admin/noidungtinh/savetrangchu",
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
                    text: "Đã cập nhật nội dung Trang Chủ",
                    icon: "success"
                }).then(() => {
                    window.location.reload();
                });
            }
        });
    });


});