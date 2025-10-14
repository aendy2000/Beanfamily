$(document).ready(function () {
    //Banner trang chủ
    document.getElementById('banner_trangchu').addEventListener('change', suareadImage, false);
    $(".preview-images-zonebanner_trangchu").sortable({
        update: function (event, ui) {
            // Lấy danh sách file gốc từ input
            var originalFiles = Array.from($("#banner_trangchu")[0].files);
            // Tạo đối tượng DataTransfer để xây dựng lại FileList
            var dataTransfer = new DataTransfer();

            // Lặp qua các div preview theo thứ tự mới trên giao diện
            $('.preview-images-zonebanner_trangchu .preview-image').each(function () {
                // Lấy tên file gốc đã lưu
                var filename = $(this).data('filename');
                // Tìm file gốc tương ứng
                var originalFile = originalFiles.find(f => f.name === filename);
                // Nếu tìm thấy, thêm vào danh sách mới theo đúng thứ tự
                if (originalFile) {
                    dataTransfer.items.add(originalFile);
                }
            });

            // Gán FileList mới đã được sắp xếp lại cho input
            $("#banner_trangchu")[0].files = dataTransfer.files;
        }
    }).disableSelection();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-banner_trangchu-"]', function (e) {
        let fileName = $(this).attr('name');

        // Xóa ảnh cũ đã có trên server
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-banner_trangchu-' + filenames + '"]').remove();
            $('[id="url-suaidHinhAnh-hinhcu-banner_trangchu-' + filenames + '"]').val('');
        }
        // Xóa ảnh mới upload
        else {
            var currentFiles = $("#banner_trangchu")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFiles.length; i++) {
                var fileArr = currentFiles[i];
                var fileNameArr = fileArr.name.replace(/\./g, '').replace(/ /g, '');

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            // Cập nhật lại input sau khi xóa
            $("#banner_trangchu")[0].files = fileBuffer.files;
            // Vẽ lại preview với các ảnh còn lại
            suareadImage();
        }
    });
    function suareadImage() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#banner_trangchu')[0].files;
            var output = $(".preview-images-zonebanner_trangchu");
            output.html(""); // Luôn xóa preview cũ trước khi vẽ lại

            if (!files || files.length === 0) return;

            Array.from(files).forEach(function (file) {
                if (!file.type.match('image')) return;

                var picReader = new FileReader();

                picReader.onload = function (event) {
                    var picFile = event.target;

                    // Tạo tên file an toàn để dùng trong ID và name
                    var safeFileName = file.name.replace(/\./g, '').replace(/ /g, '');

                    // Dùng `data-filename` để lưu tên file gốc, giúp việc sắp xếp dễ dàng
                    var html = `
                    <div class="preview-image" data-filename="${file.name}">
                        <div id="suaxoa-hinhanhsp-banner_trangchu-${safeFileName}" class="image-cancel" name="${safeFileName}">
                            <i class="bi bi-x-circle-fill text-dark"></i>
                        </div>
                        <div class="image-zone">
                            <img src="${picFile.result}">
                        </div>
                    </div>`;
                    output.append(html);
                };
                picReader.readAsDataURL(file);
            });

            // Xử lý ảnh cũ (logic của bạn)
            $('[id^="url-suaidHinhAnh-hinhcu-banner_trangchu-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }

    //ảnh Menu trên trang chủ
    document.getElementById('menu_trangchu').addEventListener('change', suareadImageMenu, false);
    $(".preview-images-zonemenu_trangchu").sortable({
        // Sự kiện 'update' sẽ được gọi sau khi người dùng kéo thả và thứ tự đã thay đổi
        update: function (event, ui) {
            // 1. Lấy danh sách file gốc từ input
            var originalFiles = Array.from($("#menu_trangchu")[0].files);

            // 2. Tạo một đối tượng DataTransfer để xây dựng lại FileList
            var dataTransfer = new DataTransfer();

            // 3. Lặp qua các div preview THEO THỨ TỰ MỚI trên giao diện
            $('.preview-images-zonemenu_trangchu .preview-image').each(function () {
                var filename = $(this).data('filename');

                // 4. Tìm file gốc tương ứng trong danh sách ban đầu
                var originalFile = originalFiles.find(f => f.name === filename);

                // 5. Thêm file đã tìm thấy vào DataTransfer theo đúng thứ tự mới
                if (originalFile) {
                    dataTransfer.items.add(originalFile);
                }
            });

            // 6. Gán FileList mới đã được sắp xếp lại cho input
            $("#menu_trangchu")[0].files = dataTransfer.files;
        }
    }).disableSelection();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-menu_trangchu-"]', function (e) {
        // ... code xóa của bạn vẫn giữ nguyên ...
        // Lưu ý: Sau khi xóa, hàm suareadImageMenu() của bạn được gọi lại,
        // nó sẽ tự động vẽ lại các preview đúng cách.
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-menu_trangchu-' + filenames + '"]').remove();
            $('[id="url-suaidHinhAnh-hinhcu-menu_trangchu-' + filenames + '"]').val('');
        } else {
            var currentFiles = $("#menu_trangchu")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFiles.length; i++) {
                var fileArr = currentFiles[i];
                var fileNameArr = fileArr.name.replace(/\./g, '').replace(/ /g, '');

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#menu_trangchu")[0].files = fileBuffer.files;
            suareadImageMenu(); // Vẽ lại preview sau khi xóa
        }
    });
    function suareadImageMenu() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#menu_trangchu')[0].files;
            var output = $(".preview-images-zonemenu_trangchu");
            output.html(""); // Xóa các ảnh preview cũ

            // Chuyển FileList thành Array để dễ xử lý
            var fileArray = Array.from(files);

            fileArray.forEach(function (file) {
                if (!file.type.match('image')) return;

                var picReader = new FileReader();

                picReader.onload = function (event) {
                    var picFile = event.target;

                    // THÊM data-filename để lưu tên file gốc
                    var html = `
                    <div class="preview-image" data-filename="${file.name}">
                        <div class="image-cancel" name="${file.name.replace(/\./g, '').replace(/ /g, '')}">
                            <i class="bi bi-x-circle-fill text-dark"></i>
                        </div>
                        <div class="image-zone">
                            <img src="${picFile.result}">
                        </div>
                    </div>`;

                    output.append(html);
                };

                picReader.readAsDataURL(file);
            });

        } else {
            console.log('Browser not support');
        }
    }

    $('#video_trangchu').on('input', function () {
        let currentValue = $(this).val();

        // Nếu giá trị hiện tại có chứa ký tự '#' (do paste)
        if (currentValue.includes('#')) {
            // Thay thế tất cả các ký tự '#' bằng chuỗi rỗng
            let sanitizedValue = currentValue.replace(/#/g, '');
            $(this).val(sanitizedValue);
        }
    });

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

        for (var i = 0; i < $("#menu_trangchu")[0].files.length; i++) {
            var file = $("#menu_trangchu")[0].files[i];
            formData.append('menu_trangchu', file);
        }
        var menu_trangchuCu = "";
        $('[id^="url-suaidHinhAnh-hinhcu-menu_trangchu-"]').each(function () { if ($(this).val().length > 0) menu_trangchuCu += $(this).val() + "#"; });
        formData.append('menu_trangchuCu', menu_trangchuCu.substring(0, menu_trangchuCu.length - 1));


        var inp_video_trangchu = $('#video_trangchu').val();
        let video_trangchu = inp_video_trangchu
            .split('\n')                  // Tách thành mảng các dòng
            .filter(line => line.trim() !== '') // Lọc bỏ các dòng rỗng
            .join('#'); 

        formData.append('video_trangchu', video_trangchu);

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