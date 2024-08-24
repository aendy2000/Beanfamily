$(document).ready(function () {
    //Banner
    document.getElementById('banner_gioithieu').addEventListener('change', suareadImagebanner_gioithieu, false);
    $(".preview-images-zonebanner_gioithieu").sortable();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-banner_gioithieu-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-banner_gioithieu-' + filenames + '"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-banner_gioithieu-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#banner_gioithieu")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#banner_gioithieu")[0].files = fileBuffer.files;
            suareadImagebanner_gioithieu();
        }
    });
    function suareadImagebanner_gioithieu() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#banner_gioithieu')[0].files; //FileList object
            var output = $(".preview-images-zonebanner_gioithieu");
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
                    var html = '<div id="suaidHinhAnh-banner_gioithieu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                        '<div id="suaxoa-hinhanhsp-banner_gioithieu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="suapro-img-banner_gioithieu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }

            $('[id^="url-suaidHinhAnh-hinhcu-banner_gioithieu-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }


    //Ảnh 1 tiêu đề 1
    document.getElementById('hinhanh1_gioithieu').addEventListener('change', suareadImagehinhanh1_gioithieu, false);
    $(".preview-images-zonehinhanh1_gioithieu").sortable();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-hinhanh1_gioithieu-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-hinhanh1_gioithieu-' + filenames + '"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-hinhanh1_gioithieu-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#hinhanh1_gioithieu")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#hinhanh1_gioithieu")[0].files = fileBuffer.files;
            suareadImagehinhanh1_gioithieu();
        }
    });
    function suareadImagehinhanh1_gioithieu() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#hinhanh1_gioithieu')[0].files; //FileList object
            var output = $(".preview-images-zonehinhanh1_gioithieu");
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
                    var html = '<div id="suaidHinhAnh-hinhanh1_gioithieu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                        '<div id="suaxoa-hinhanhsp-hinhanh1_gioithieu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="suapro-img-hinhanh1_gioithieu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }

            $('[id^="url-suaidHinhAnh-hinhcu-hinhanh1_gioithieu-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }


    //Ảnh 2 tiêu đề 1
    document.getElementById('hinhanh2_gioithieu').addEventListener('change', suareadImagehinhanh2_gioithieu, false);
    $(".preview-images-zonehinhanh2_gioithieu").sortable();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-hinhanh2_gioithieu-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-hinhanh2_gioithieu-' + filenames + '"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-hinhanh2_gioithieu-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#hinhanh2_gioithieu")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#hinhanh2_gioithieu")[0].files = fileBuffer.files;
            suareadImagehinhanh2_gioithieu();
        }
    });
    function suareadImagehinhanh2_gioithieu() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#hinhanh2_gioithieu')[0].files; //FileList object
            var output = $(".preview-images-zonehinhanh2_gioithieu");
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
                    var html = '<div id="suaidHinhAnh-hinhanh2_gioithieu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                        '<div id="suaxoa-hinhanhsp-hinhanh2_gioithieu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="suapro-img-hinhanh2_gioithieu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }

            $('[id^="url-suaidHinhAnh-hinhcu-hinhanh2_gioithieu-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }


    //Ảnh mô tả
    document.getElementById('hinhanh_mota_gioithieu').addEventListener('change', suareadImagehinhanh_mota_gioithieu, false);
    $(".preview-images-zonehinhanh_mota_gioithieu").sortable();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-hinhanh_mota_gioithieu-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-hinhanh_mota_gioithieu-' + filenames + '"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-hinhanh_mota_gioithieu-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#hinhanh_mota_gioithieu")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#hinhanh_mota_gioithieu")[0].files = fileBuffer.files;
            suareadImagehinhanh_mota_gioithieu();
        }
    });
    function suareadImagehinhanh_mota_gioithieu() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#hinhanh_mota_gioithieu')[0].files; //FileList object
            var output = $(".preview-images-zonehinhanh_mota_gioithieu");
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
                    var html = '<div id="suaidHinhAnh-hinhanh_mota_gioithieu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                        '<div id="suaxoa-hinhanhsp-hinhanh_mota_gioithieu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="suapro-img-hinhanh_mota_gioithieu-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }

            $('[id^="url-suaidHinhAnh-hinhcu-hinhanh_mota_gioithieu-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }


    $('body').on('click', '[id="btnLuuThongTinTrangGioiThieu"]', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var formData = new FormData();

        for (var i = 0; i < $("#banner_gioithieu")[0].files.length; i++) {
            var file = $("#banner_gioithieu")[0].files[i];
            formData.append('banner_gioithieu', file);
        }
        var banner_gioithieuCu = "";
        $('[id^="url-suaidHinhAnh-hinhcu-banner_gioithieu-"]').each(function () { if ($(this).val().length > 0) banner_gioithieuCu += $(this).val() + "#"; });
        formData.append('banner_gioithieuCu', banner_gioithieuCu.substring(0, banner_gioithieuCu.length - 1));

        var hinhanh1_gioithieuCu = "";
        $('[id^="url-suaidHinhAnh-hinhcu-hinhanh1_gioithieu-"]').each(function () { if ($(this).val().length > 0) hinhanh1_gioithieuCu += $(this).val() + "#"; });
        formData.append('hinhanh1_gioithieuCu', hinhanh1_gioithieuCu.substring(0, hinhanh1_gioithieuCu.length - 1));
        formData.append('hinhanh1_gioithieu', $("#hinhanh1_gioithieu")[0].files[0]);

        var hinhanh2_gioithieuCu = "";
        $('[id^="url-suaidHinhAnh-hinhcu-hinhanh2_gioithieu-"]').each(function () { if ($(this).val().length > 0) hinhanh2_gioithieuCu += $(this).val() + "#"; });
        formData.append('hinhanh2_gioithieuCu', hinhanh2_gioithieuCu.substring(0, hinhanh2_gioithieuCu.length - 1));
        formData.append('hinhanh2_gioithieu', $("#hinhanh2_gioithieu")[0].files[0]);

        var hinhanh_mota_gioithieuCu = "";
        $('[id^="url-suaidHinhAnh-hinhcu-hinhanh_mota_gioithieu-"]').each(function () { if ($(this).val().length > 0) hinhanh_mota_gioithieuCu += $(this).val() + "#"; });
        formData.append('hinhanh_mota_gioithieuCu', hinhanh_mota_gioithieuCu.substring(0, hinhanh_mota_gioithieuCu.length - 1));
        formData.append('hinhanh_mota_gioithieu', $("#hinhanh_mota_gioithieu")[0].files[0]);

        formData.append('tieude_gioithieu', $('#tieude_gioithieu').val().trim());
        formData.append('tieude2_gioithieu', $('#tieude2_gioithieu').val().trim());
        formData.append('mota_gioithieu', $('#mota_gioithieu').val().trim());
        formData.append('mota1_gioithieu', $('#mota1_gioithieu').val().trim());

        $.ajax({
            error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
            url: $('#requestPath').val() + "admin/noidungtinh/savegioithieu",
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
                    text: "Đã cập nhật nội dung Giới Thiệu",
                    icon: "success"
                }).then(() => {
                    window.location.reload();
                });
            }
        });

    });


});