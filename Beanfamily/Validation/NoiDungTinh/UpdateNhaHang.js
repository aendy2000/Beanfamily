$(document).ready(function () {
    //Banner
    document.getElementById('banner_nhahang').addEventListener('change', suareadImagebanner_nhahang, false);
    $(".preview-images-zonebanner_nhahang").sortable();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-banner_nhahang-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-banner_nhahang-' + filenames + '"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-banner_nhahang-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#banner_nhahang")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#banner_nhahang")[0].files = fileBuffer.files;
            suareadImagebanner_nhahang();
        }
    });
    function suareadImagebanner_nhahang() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#banner_nhahang')[0].files; //FileList object
            var output = $(".preview-images-zonebanner_nhahang");
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
                    var html = '<div id="suaidHinhAnh-banner_nhahang-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                        '<div id="suaxoa-hinhanhsp-banner_nhahang-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="suapro-img-banner_nhahang-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }

            $('[id^="url-suaidHinhAnh-hinhcu-banner_nhahang-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }


    //ảnh thực đơn hằng ngày
    document.getElementById('hinhanh_menuhangngay').addEventListener('change', suareadImagehinhanh_menuhangngay, false);
    $(".preview-images-zonehinhanh_menuhangngay").sortable();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-hinhanh_menuhangngay-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-hinhanh_menuhangngay-' + filenames + '"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-hinhanh_menuhangngay-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#hinhanh_menuhangngay")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#hinhanh_menuhangngay")[0].files = fileBuffer.files;
            suareadImagehinhanh_menuhangngay();
        }
    });
    function suareadImagehinhanh_menuhangngay() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#hinhanh_menuhangngay')[0].files; //FileList object
            var output = $(".preview-images-zonehinhanh_menuhangngay");
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
                    var html = '<div id="suaidHinhAnh-hinhanh_menuhangngay-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                        '<div id="suaxoa-hinhanhsp-hinhanh_menuhangngay-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="suapro-img-hinhanh_menuhangngay-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }

            $('[id^="url-suaidHinhAnh-hinhcu-hinhanh_menuhangngay-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }


    //ảnh menu tiệc bàn
    document.getElementById('hinhanh_menutiecban').addEventListener('change', suareadImagehinhanh_menutiecban, false);
    $(".preview-images-zonehinhanh_menutiecban").sortable();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-hinhanh_menutiecban-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-hinhanh_menutiecban-' + filenames + '"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-hinhanh_menutiecban-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#hinhanh_menutiecban")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#hinhanh_menutiecban")[0].files = fileBuffer.files;
            suareadImagehinhanh_menutiecban();
        }
    });
    function suareadImagehinhanh_menutiecban() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#hinhanh_menutiecban')[0].files; //FileList object
            var output = $(".preview-images-zonehinhanh_menutiecban");
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
                    var html = '<div id="suaidHinhAnh-hinhanh_menutiecban-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                        '<div id="suaxoa-hinhanhsp-hinhanh_menutiecban-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="suapro-img-hinhanh_menutiecban-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }

            $('[id^="url-suaidHinhAnh-hinhcu-hinhanh_menutiecban-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }


    //ảnh menu buffet
    document.getElementById('hinhanh_menutiecbuffet').addEventListener('change', suareadImagehinhanh_menutiecbuffet, false);
    $(".preview-images-zonehinhanh_menutiecbuffet").sortable();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-hinhanh_menutiecbuffet-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-hinhanh_menutiecbuffet-' + filenames + '"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-hinhanh_menutiecbuffet-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#hinhanh_menutiecbuffet")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#hinhanh_menutiecbuffet")[0].files = fileBuffer.files;
            suareadImagehinhanh_menutiecbuffet();
        }
    });
    function suareadImagehinhanh_menutiecbuffet() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#hinhanh_menutiecbuffet')[0].files; //FileList object
            var output = $(".preview-images-zonehinhanh_menutiecbuffet");
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
                    var html = '<div id="suaidHinhAnh-hinhanh_menutiecbuffet-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                        '<div id="suaxoa-hinhanhsp-hinhanh_menutiecbuffet-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="suapro-img-hinhanh_menutiecbuffet-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }

            $('[id^="url-suaidHinhAnh-hinhcu-hinhanh_menutiecbuffet-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }


    $('body').on('click', '[id="btnLuuThongTinTrangNhaHang"]', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var formData = new FormData();

        for (var i = 0; i < $("#banner_nhahang")[0].files.length; i++) {
            var file = $("#banner_nhahang")[0].files[i];
            formData.append('banner_nhahang', file);
        }
        var banner_nhahangCu = "";
        $('[id^="url-suaidHinhAnh-hinhcu-banner_nhahang-"]').each(function () { if ($(this).val().length > 0) banner_nhahangCu += $(this).val() + "#"; });
        formData.append('banner_nhahangCu', banner_nhahangCu.substring(0, banner_nhahangCu.length - 1));

        var hinhanh_menuhangngayCu = "";
        $('[id^="url-suaidHinhAnh-hinhcu-hinhanh_menuhangngay-"]').each(function () { if ($(this).val().length > 0) hinhanh_menuhangngayCu += $(this).val() + "#"; });
        formData.append('hinhanh_menuhangngayCu', hinhanh_menuhangngayCu.substring(0, hinhanh_menuhangngayCu.length - 1));
        formData.append('hinhanh_menuhangngay', $("#hinhanh_menuhangngay")[0].files[0]);

        var hinhanh_menutiecbanCu = "";
        $('[id^="url-suaidHinhAnh-hinhcu-hinhanh_menutiecban-"]').each(function () { if ($(this).val().length > 0) hinhanh_menutiecbanCu += $(this).val() + "#"; });
        formData.append('hinhanh_menutiecbanCu', hinhanh_menutiecbanCu.substring(0, hinhanh_menutiecbanCu.length - 1));
        formData.append('hinhanh_menutiecban', $("#hinhanh_menutiecban")[0].files[0]);

        var hinhanh_menutiecbuffetCu = "";
        $('[id^="url-suaidHinhAnh-hinhcu-hinhanh_menutiecbuffet-"]').each(function () { if ($(this).val().length > 0) hinhanh_menutiecbuffetCu += $(this).val() + "#"; });
        formData.append('hinhanh_menutiecbuffetCu', hinhanh_menutiecbuffetCu.substring(0, hinhanh_menutiecbuffetCu.length - 1));
        formData.append('hinhanh_menutiecbuffet', $("#hinhanh_menutiecbuffet")[0].files[0]);

        formData.append('mota_menuhangngay', $('#mota_menuhangngay').val().trim());
        formData.append('mota_menutiecban', $('#mota_menutiecban').val().trim());
        formData.append('mota_menutiecbuffet', $('#mota_menutiecbuffet').val().trim());

        $.ajax({
            error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
            url: $('#requestPath').val() + "admin/noidungtinh/savenhahang",
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
                    text: "Đã cập nhật nội dung Nhà Hàng",
                    icon: "success"
                }).then(() => {
                    window.location.reload();
                });
            }
        });
    });


});