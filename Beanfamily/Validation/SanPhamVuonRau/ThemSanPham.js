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
    $('#btnluuthemSanPham').on('click', function () {
        $('#btnluuthemSanPham').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluuthemSanPham').prop('disabled', true);

        var ten = $('#ten').val().trim();
        var gia = $('#gia').val().trim().replace(/,/g, '');
        var donvi = $('#donvi').val().trim();
        var giatri = $('#giatri').val().trim();
        var danhmuc = $('#danhmuc :selected').val();
        var quytrinhtrong = $('#quytrinhtrong :selected').val();

        $("#ten").removeClass('valid-was-validated');
        $("#gia").removeClass('valid-was-validated');
        $("#donvi").removeClass('valid-was-validated');
        $("#giatri").removeClass('valid-was-validated');
        $("#danhmuc").removeClass('valid-was-validated');

        $('#invalid-ten-feedback').prop('hidden', true);
        $('#invalid-gia-feedback').prop('hidden', true);
        $('#invalid-donvi-feedback').prop('hidden', true);
        $('#invalid-giatri-feedback').prop('hidden', true);
        $('#invalid-danhmuc-feedback').prop('hidden', true);

        var check = true;
        if (danhmuc.length < 1) {
            check = false;
            $("#danhmuc").addClass('valid-was-validated');
            $('#invalid-danhmuc-feedback').text("Vui lòng chọn danh mục sản phẩm.").prop('hidden', false);
            $("#danhmuc").focus();

            $('#btnluuthemSanPham').html('Lưu thông tin');
            $('#btnluuthemSanPham').prop('disabled', false);
        }

        if (giatri.length < 1) {
            check = false;
            $("#giatri").addClass('valid-was-validated');
            $('#invalid-giatri-feedback').text("Vui lòng nhập giá trị trên đơn vị tính.").prop('hidden', false);
            $("#giatri").focus();

            $('#btnluuthemSanPham').html('Lưu thông tin');
            $('#btnluuthemSanPham').prop('disabled', false);
        }

        if (donvi.length < 1) {
            check = false;
            $("#donvi").addClass('valid-was-validated');
            $('#invalid-donvi-feedback').text("Nhập đơn vị tính.").prop('hidden', false);
            $("#donvi").focus();

            $('#btnluuthemSanPham').html('Lưu thông tin');
            $('#btnluuthemSanPham').prop('disabled', false);
        }

        if (gia.length < 1) {
            check = false;
            $("#gia").addClass('valid-was-validated');
            $('#invalid-gia-feedback').text("Vui lòng nhập giá sản phẩm.").prop('hidden', false);
            $("#gia").focus();

            $('#btnluuthemSanPham').html('Lưu thông tin');
            $('#btnluuthemSanPham').prop('disabled', false);
        }

        if (ten.length < 1) {
            check = false;
            $("#ten").addClass('valid-was-validated');
            $('#invalid-ten-feedback').text("Vui lòng nhập tên sản phẩm.").prop('hidden', false);
            $("#ten").focus();

            $('#btnluuthemSanPham').html('Lưu thông tin');
            $('#btnluuthemSanPham').prop('disabled', false);
        }

        if (check == true) {
            var formData = new FormData();
            var totalFiles = $("#pro-image")[0].files.length;
            for (var i = 0; i < totalFiles; i++) {
                var file = $("#pro-image")[0].files[i];
                formData.append('images', file);
            }
            formData.append('video', $("#pro-video")[0].files[0]);
            formData.append('ten', ten);
            formData.append('gia', gia);
            formData.append('donvi', donvi);
            formData.append('giatri', giatri);
            formData.append('danhmuc', danhmuc);
            formData.append('quytrinhtrong', quytrinhtrong);
            formData.append('mota', $('#mota').val().trim());
            formData.append('hienthi', $('#hienthi').prop('checked'));
            formData.append('thamkhao', $('#thamkhao').prop('checked'));

            $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                url: $('#requestPath').val() + "admin/sanphamvuonraubean/themsanpham",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false,
                error: function (ex) {
                    console.log(ex);
                },
            }).done(function (ketqua) {
                if (ketqua.indexOf("Chi tiết lỗi") !== -1) {
                    $('#btnluuthemSanPham').html('Lưu thông tin');
                    $('#btnluuthemSanPham').prop('disabled', false);

                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                        text: ketqua,
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                   
                }
                else if (ketqua == "DATONTAI") {
                    $("#ten").addClass('valid-was-validated');
                    $('#invalid-ten-feedback').text('Sản phẩm ' + ten + ' đã tồn tại.').prop('hidden', false);
                    $("#ten").focus();

                    $('#btnluuthemSanPham').html('Lưu thông tin');
                    $('#btnluuthemSanPham').prop('disabled', false);
                }
                else {
                    var table = $('#lstSanPhamRauTable').DataTable();
                    table.row.add($(ketqua)).draw(false);
                    $('#ThemMoiModal').modal('toggle');

                    $('#btnluuthemSanPham').html('Lưu thông tin');
                    $('#btnluuthemSanPham').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã thêm một sản phẩm mới.",
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
