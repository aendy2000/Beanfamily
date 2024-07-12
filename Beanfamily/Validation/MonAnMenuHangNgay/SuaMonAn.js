$(document).ready(function () {

    //Add hình ảnh tải lên
    document.getElementById('suapro-image').addEventListener('change', suareadImage, false);
    $(".suapreview-images-zone").sortable();
    //Xóa hình ảnh
    $('body').on('click', '[id^="suaxoa-hinhanhsp-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-' + filenames +'"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#suapro-image")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#suapro-image")[0].files = fileBuffer.files;
            suareadImage();
        }
    });

    //Add video tải lên
    $('#suapro-video').on('input', function (e) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);

        const li = `<video id="suaload-video" autoplay="autoplay" style="border-radius: 10px" controls="text-center video-list form-control controls" src=" ${url} " type="video/mp4" width="100%" height="300px"></video>`;
        $('#suaload-video').replaceWith(li);
        $('#url-suapro-video').val('');
    });


    //Xóa video tải lên
    $('#suabtn-xoa-video').on('click', function () {
        $('#suapro-video').val("");
        $('#suaload-video').replaceWith(' <video id="suaload-video" style="border-radius: 10px; border: 1px solid #ddd" class="video-list text-center form-control"  type="video/mp4" width="100%" height="300px"></video>');
        $('#url-suapro-video').val('');
    });

    //Lưu thêm món
    $('#btnluusuaMonAn').on('click', function () {
        $('#btnluusuaMonAn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluusuaMonAn').prop('disabled', true);

        var tenmon = $('#suatenmon').val().trim();
        var gia = $('#suagia').val().trim().replace(/,/g, '');
        var danhmuc = $('#suadanhmuc :selected').val();

        $("#suatenmon").removeClass('valid-was-validated');
        $("#suagia").removeClass('valid-was-validated');
        $("#suadanhmuc").removeClass('valid-was-validated');

        $('#invalid-suatenmon-feedback').prop('hidden', true);
        $('#invalid-suagia-feedback').prop('hidden', true);
        $('#invalid-danhmuc-feedback').prop('hidden', true);

        var check = true;
        if (danhmuc.length < 1) {
            check = false;
            $("#dsuaanhmuc").addClass('valid-was-validated');
            $('#invalid-suadanhmuc-feedback').text("Vui lòng chọn danh mục món.").prop('hidden', false);
            $("#suadanhmuc").focus();

            $('#btnluusuaMonAn').html('Lưu thông tin');
            $('#btnluusuaMonAn').prop('disabled', false);
        }

        if (gia.length < 1) {
            check = false;
            $("#suagia").addClass('valid-was-validated');
            $('#invalid-suagia-feedback').text("Vui lòng nhập giá món.").prop('hidden', false);
            $("#suagia").focus();

            $('#btnluusuaMonAn').html('Lưu thông tin');
            $('#btnluusuaMonAn').prop('disabled', false);
        }

        if (tenmon.length < 1) {
            check = false;
            $("#suatenmon").addClass('valid-was-validated');
            $('#invalid-suaenmon-feedback').text("Vui lòng nhập tên món.").prop('hidden', false);
            $("#suatenmon").focus();

            $('#btnluusuaMonAn').html('Lưu thông tin');
            $('#btnluusuaMonAn').prop('disabled', false);
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('id', $("#idmonsua").val());
            var totalFiles = $("#suapro-image")[0].files.length;
            for (var i = 0; i < totalFiles; i++) {
                var file = $("#suapro-image")[0].files[i];
                formData.append('images', file);
            }
            formData.append('video', $("#suapro-video")[0].files[0]);
            formData.append('tenmon', tenmon);
            formData.append('gia', gia);
            formData.append('danhmuc', danhmuc);
            formData.append('mota', $('#suamota').val().trim());
            formData.append('trangthai', $('#suatrangthai').prop('checked'));
            formData.append('hienthi', $('#suahienthi').prop('checked'));

            var imageCu = "";
            $('[id^="url-suaidHinhAnh-hinhcu-"]').each(function () {
                if ($(this).val().length > 0) imageCu += $(this).val() + "#";
            });

            formData.append('imageCu', imageCu.substring(0, imageCu.length - 1));
            formData.append('videoCu', $('#url-suapro-video').val());

            $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                url: $('#requestPath').val() + "admin/monanmenuhangngay/suamon",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    $('#btnluusuaMonAn').html('Lưu thông tin');
                    $('#btnluusuaMonAn').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã cập nhật thông tin món.",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "DATONTAI") {
                    $("#suatenmon").addClass('valid-was-validated');
                    $('#invalid-suatenmon-feedback').text(tenmon + ' đã tồn tại trong menu này').prop('hidden', false);
                    $("#suatenmon").focus();

                    $('#btnluusuaMonAn').html('Lưu thông tin');
                    $('#btnluusuaMonAn').prop('disabled', false);
                }
                else if (ketqua == "KHONGTONTAI") {
                    $('#btnluusuaMonAn').html('Lưu thông tin');
                    $('#btnluusuaMonAn').prop('disabled', false);

                    Swal.fire({
                        title: "Thông báo",
                        text: "Món này vừa mới được xóa bỏ.",
                        icon: "warning"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else {
                    $('#btnluusuaMonAn').html('Lưu thông tin');
                    $('#btnluusuaMonAn').prop('disabled', false);

                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                        text: ketqua,
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
            });
        }
    });
});

function suareadImage() {
    if (window.File && window.FileList && window.FileReader) {
        var files = $('#suapro-image')[0].files; //FileList object
        var output = $(".suapreview-images-zone");
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
                var html = '<div id="suaidHinhAnh-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                    '<div id="suaxoa-hinhanhsp-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                    '<div class="image-zone"><img id="suapro-img-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                    '</div>';

                output.append(html);
            });
            picReader.readAsDataURL(file);
        }

        $('[id^="url-suaidHinhAnh-hinhcu-"]').each(function () {
            $(this).val('');
        });
    } else {
        console.log('Browser not support');
    }
}
