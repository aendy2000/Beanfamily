$(document).ready(function () {

    //Add hình ảnh tải lên
    document.getElementById('suapro-image').addEventListener('change', suareadImage, false);
    $(".suapreview-images-zone").sortable();
    //Xóa hình ảnh
    $('body').on('click', '[id^="suaxoa-hinhanhsp-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-' + filenames + '"]').replaceWith('');
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
    $('#btnluusuaSanPham').on('click', function () {
        $('#btnluusuaSanPham').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluusuaSanPham').prop('disabled', true);

        var ten = $('#suaten').val().trim();
        var gia = $('#suagia').val().trim().replace(/,/g, '');
        var donvi = $('#suadonvi').val().trim();
        var giatri = $('#suagiatri').val().trim();
        var danhmuc = $('#suadanhmuc :selected').val();
        var quytrinhtrong = $('#suaquytrinhtrong :selected').val();


        $("#suaten").removeClass('valid-was-validated');
        $("#suagia").removeClass('valid-was-validated');
        $("#suadonvi").removeClass('valid-was-validated');
        $("#suagiatri").removeClass('valid-was-validated');
        $("#suadanhmuc").removeClass('valid-was-validated');


        $('#invalid-suaten-feedback').prop('hidden', true);
        $('#invalid-suagia-feedback').prop('hidden', true);
        $('#invalid-suadonvi-feedback').prop('hidden', true);
        $('#invalid-suagiatri-feedback').prop('hidden', true);
        $('#invalid-suadanhmuc-feedback').prop('hidden', true);

        var check = true;
        if (danhmuc.length < 1) {
            check = false;
            $("#suadanhmuc").addClass('valid-was-validated');
            $('#invalid-suadanhmuc-feedback').text("Vui lòng chọn danh mục sản phẩm.").prop('hidden', false);
            $("#suadanhmuc").focus();

            $('#btnluusuaSanPham').html('Lưu thông tin');
            $('#btnluusuaSanPham').prop('disabled', false);
        }

        if (giatri.length < 1) {
            check = false;
            $("#suagiatri").addClass('valid-was-validated');
            $('#invalid-suagiatri-feedback').text("Vui lòng nhập giá trị trên đơn vị tính.").prop('hidden', false);
            $("#suagiatri").focus();

            $('#btnluusuaSanPham').html('Lưu thông tin');
            $('#btnluusuaSanPham').prop('disabled', false);
        }

        if (donvi.length < 1) {
            check = false;
            $("#suadonvi").addClass('valid-was-validated');
            $('#invalid-suadonvi-feedback').text("Nhập đơn vị tính.").prop('hidden', false);
            $("#suadonvi").focus();

            $('#btnluusuaSanPham').html('Lưu thông tin');
            $('#btnluusuaSanPham').prop('disabled', false);
        }

        if (gia.length < 1) {
            check = false;
            $("#suagia").addClass('valid-was-validated');
            $('#invalid-suagia-feedback').text("Vui lòng nhập giá sản phẩm.").prop('hidden', false);
            $("#suagia").focus();

            $('#btnluusuaSanPham').html('Lưu thông tin');
            $('#btnluusuaSanPham').prop('disabled', false);
        }

        if (ten.length < 1) {
            check = false;
            $("#suaten").addClass('valid-was-validated');
            $('#invalid-suaten-feedback').text("Vui lòng nhập tên sản phẩm.").prop('hidden', false);
            $("#suaten").focus();

            $('#btnluusuaSanPham').html('Lưu thông tin');
            $('#btnluusuaSanPham').prop('disabled', false);
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('id', $("#suaidsanpham").val());
            var totalFiles = $("#suapro-image")[0].files.length;
            for (var i = 0; i < totalFiles; i++) {
                var file = $("#suapro-image")[0].files[i];
                formData.append('images', file);
            }
            formData.append('video', $("#suapro-video")[0].files[0]);
            formData.append('ten', ten);
            formData.append('gia', gia);
            formData.append('donvi', donvi);
            formData.append('giatri', giatri);
            formData.append('danhmuc', danhmuc);
            formData.append('quytrinhtrong', quytrinhtrong);
            formData.append('mota', $('#suamota').val().trim());
            formData.append('hienthi', $('#suahienthi').prop('checked'));
            formData.append('thamkhao', $('#suathamkhao').prop('checked'));

            var imageCu = "";
            $('[id^="url-suaidHinhAnh-hinhcu-"]').each(function () {
                if ($(this).val().length > 0) imageCu += $(this).val() + "#";
            });

            formData.append('imageCu', imageCu.substring(0, imageCu.length - 1));
            formData.append('videoCu', $('#url-suapro-video').val());

            $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                url: $('#requestPath').val() + "admin/sanphamvuonraubean/suasanpham",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua.indexOf("Chi tiết lỗi") !== -1) {
                    $('#btnluusuaSanPham').html('Lưu thông tin');
                    $('#btnluusuaSanPham').prop('disabled', false);

                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                        text: ketqua,
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "DATONTAI") {
                    $("#suaten").addClass('valid-was-validated');
                    $('#invalid-suaten-feedback').text('Sản phẩm ' + ten + ' đã tồn tại.').prop('hidden', false);
                    $("#suaten").focus();

                    $('#btnluusuaSanPham').html('Lưu thông tin');
                    $('#btnluusuaSanPham').prop('disabled', false);
                }
                else if (ketqua == "KHONGTONTAI") {
                    $('#btnluusuaSanPham').html('Lưu thông tin');
                    $('#btnluusuaSanPham').prop('disabled', false);

                    Swal.fire({
                        title: "Thông báo",
                        text: "Sản phẩm này vừa mới được xóa bỏ.",
                        icon: "warning"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else {
                    var table = $('#lstSanPhamRauTable').DataTable();
                    var rowId = '#row-' + $('#suaidsanpham').val();

                    var row = table.row(rowId);
                    if (row.length > 0) {
                        var newRowHtml = $(ketqua);

                        var cellData = [];
                        newRowHtml.find('td').each(function () {
                            cellData.push($(this).html());
                        });

                        row.data(cellData).draw(false);
                        $(rowId).find('[data-bs-toggle="tooltip"]').tooltip();
                    }

                    $('#SuaSanPhamModal').modal('toggle');

                    $('#btnluusuaSanPham').html('Lưu thông tin');
                    $('#btnluusuaSanPham').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã cập nhật thông tin sản phẩm.",
                        icon: "success"
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
