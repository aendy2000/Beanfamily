$(document).ready(function () {

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

    //Add video tải lên
    $('#pro-video').on('input', function (e) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);

        const li = `<video id="load-video" autoplay="autoplay" style="border-radius: 10px" controls="text-center video-list form-control controls" src=" ${url} " type="video/mp4" width="100%" height="300px"></video>`;
        $('#load-video').replaceWith(li);
    });


    //Xóa video tải lên
    $('#btn-xoa-video').on('click', function () {
        $('#pro-video').val("");
        $('#load-video').replaceWith('<video id="load-video" style="border-radius: 10px; border: 1px solid #ddd" class="video-list text-center form-control"  type="video/mp4" width="100%" height="300px"></video>');
    });

    //Lưu thêm món
    $('#btnluuthemMonAn').on('click', function () {
        $('#btnluuthemMonAn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluuthemMonAn').prop('disabled', true);

        var tenmon = $('#tenmon').val().trim();
        var gia = $('#gia').val().trim().replace(/,/g, '');
        var danhmuc = $('#danhmuc :selected').val();

        $("#tenmon").removeClass('valid-was-validated');
        $("#gia").removeClass('valid-was-validated');
        $("#danhmuc").removeClass('valid-was-validated');


        $('#invalid-tenmon-feedback').prop('hidden', true);
        $('#invalid-gia-feedback').prop('hidden', true);
        $('#invalid-danhmuc-feedback').prop('hidden', true);

        var check = true;
        if (danhmuc.length < 1) {
            check = false;
            $("#danhmuc").addClass('valid-was-validated');
            $('#invalid-danhmuc-feedback').text("Vui lòng chọn danh mục món.").prop('hidden', false);
            $("#danhmuc").focus();

            $('#btnluuthemMonAn').html('Lưu thông tin');
            $('#btnluuthemMonAn').prop('disabled', false);
        }

        if (gia.length < 1) {
            check = false;
            $("#gia").addClass('valid-was-validated');
            $('#invalid-gia-feedback').text("Vui lòng nhập giá món.").prop('hidden', false);
            $("#gia").focus();

            $('#btnluuthemMonAn').html('Lưu thông tin');
            $('#btnluuthemMonAn').prop('disabled', false);
        }

        if (tenmon.length < 1) {
            check = false;
            $("#tenmon").addClass('valid-was-validated');
            $('#invalid-tenmon-feedback').text("Vui lòng nhập tên món.").prop('hidden', false);
            $("#tenmon").focus();
            $('#')
            $('#btnluuthemMonAn').html('Lưu thông tin');
            $('#btnluuthemMonAn').prop('disabled', false);
        }

        if (check == true) {
            var formData = new FormData();
            var totalFiles = $("#pro-image")[0].files.length;
            for (var i = 0; i < totalFiles; i++) {
                var file = $("#pro-image")[0].files[i];
                formData.append('images', file);
            }
            formData.append('video', $("#pro-video")[0].files[0]);
            formData.append('tenmon', tenmon);
            formData.append('gia', gia);
            formData.append('danhmuc', danhmuc);
            formData.append('mota', $('#mota').val().trim());
            formData.append('trangthai', $('#trangthai').prop('checked'));
            formData.append('hienthi', $('#hienthi').prop('checked'));

            $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                url: $('#requestPath').val() + "admin/monanmenuhangngay/themmon",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false,
                
            }).done(function (ketqua) {
                if (ketqua.indexOf("Chi tiết lỗi") !== -1) {
                    $('#btnluuthemMonAn').html('Lưu thông tin');
                    $('#btnluuthemMonAn').prop('disabled', false);

                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                        text: ketqua,
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                    
                }
                else if (ketqua == "DATONTAI") {
                    $("#tenmon").addClass('valid-was-validated');
                    $('#invalid-tenmon-feedback').text(tenmon + ' đã tồn tại trong menu này').prop('hidden', false);
                    $("#tenmon").focus();

                    $('#btnluuthemMonAn').html('Lưu thông tin');
                    $('#btnluuthemMonAn').prop('disabled', false);
                }
                else {
                    var table = $('#lstMonAnMenuHangNgayTable').DataTable();
                    table.row.add($(ketqua)).draw(false);
                    $('#ThemMonAnModal').modal('toggle');

                    $('#btnluuthemMonAn').html('Lưu thông tin');
                    $('#btnluuthemMonAn').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã thêm một món mới.",
                        icon: "success"
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
