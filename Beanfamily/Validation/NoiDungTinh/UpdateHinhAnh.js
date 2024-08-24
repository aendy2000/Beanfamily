$(document).ready(function () {
    //Banner
    document.getElementById('banner_hinhanh').addEventListener('change', suareadImagebanner_hinhanh, false);
    $(".preview-images-zonebanner_hinhanh").sortable();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-banner_hinhanh-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-banner_hinhanh-' + filenames + '"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-banner_hinhanh-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#banner_hinhanh")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#banner_hinhanh")[0].files = fileBuffer.files;
            suareadImagebanner_hinhanh();
        }
    });
    function suareadImagebanner_hinhanh() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#banner_hinhanh')[0].files; //FileList object
            var output = $(".preview-images-zonebanner_hinhanh");
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
                    var html = '<div id="suaidHinhAnh-banner_hinhanh-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                        '<div id="suaxoa-hinhanhsp-banner_hinhanh-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="suapro-img-banner_hinhanh-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }

            $('[id^="url-suaidHinhAnh-hinhcu-banner_hinhanh-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }


    $('body').on('click', '[id="btnLuuThongTinTrangHinhAnh"]', function () {
        var btn = $(this);
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        btn.prop('disabled', true);

        var formData = new FormData();

        for (var i = 0; i < $("#banner_hinhanh")[0].files.length; i++) {
            var file = $("#banner_hinhanh")[0].files[i];
            formData.append('banner_hinhanh', file);
        }
        var banner_hinhanhCu = "";
        $('[id^="url-suaidHinhAnh-hinhcu-banner_hinhanh-"]').each(function () { if ($(this).val().length > 0) banner_hinhanhCu += $(this).val() + "#"; });
        formData.append('banner_hinhanhCu', banner_hinhanhCu.substring(0, banner_hinhanhCu.length - 1));

        $.ajax({
            error: function (a, xhr, c) { if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) { window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout"; } },
            url: $('#requestPath').val() + "admin/noidungtinh/savehinhanh",
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
                    text: "Đã cập nhật nội dung Hình Ảnh",
                    icon: "success"
                }).then(() => {
                    window.location.reload();
                });
            }
        });
    });
});