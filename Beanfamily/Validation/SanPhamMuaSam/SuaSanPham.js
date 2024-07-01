$(document).ready(function () {
    $('#suathemloai').on('click', function () {
        var stt = Number($('#suademloai').val());
        var sttTang = Number(stt + 1); //+1
        $('#suademloai').val(sttTang);

        $('#suadanhsachcacloai').append(`
            <div id="suacumloai` + sttTang + `" name="` + sttTang + `" class="col-12">
                <div class="row mb-3">
                    <div class="col-md-12 col-lg-4">
                        <input id="sualoai` + sttTang + `" name="new" type="text" placeholder="Loại (VD: 500ml, 2kg...)" class="form-control">
                        <label style="margin-left: 5px" id="invalid-sualoai` + sttTang + `-feedback" class="text-danger" hidden></label>
                    </div>
                    <div class="col-md-12 col-lg-4">
                        <input id="suagia` + sttTang + `" name="new" type="text" data-type="currency" placeholder="Giá sản phẩm" class="form-control">
                        <label style="margin-left: 5px" id="invalid-suagia` + sttTang + `-feedback" class="text-danger" hidden></label>
                    </div>
                    <div class="col-md-12 col-lg-3">
                        <input id="suasoluong` + sttTang + `" name="new" type="text" data-type="numbers" placeholder="Số lượng tồn kho" class="form-control">
                        <label style="margin-left: 5px" id="invalid-suasoluong` + sttTang + `-feedback" class="text-danger" hidden></label>
                    </div>
                    <div class="col-md-12 col-lg-1">
                        <button data-bs-toggle="tooltip" data-bs-placement="top" title="Xóa" id="suaxoaloai1` + sttTang + `" name="` + sttTang + `" style="width: 100%" class="btn btn-danger"><i class="bi bi-trash me-1"></i></button>
                    </div>
                </div>
            </div>
        `);

        var totalLoai = ($('body').find('[id^="suacumloai"]').length + 1);
        $('#suathemloai').html('<i class="bi bi-plus-circle me-1"> </i> Thêm loại ' + totalLoai);
        $('body').find('[id="sualoai' + sttTang + '"]').focus();
        $('#SuaSanPhamModal').animate({ scrollTop: $('#SuaSanPhamModal .modal-dialog').height() }, 500);

        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })

    });
    $('body').on('click', '[id^="suaxoaloai"]', function () {
        var id = $(this).attr('name');
        if (id !== "1") { //2 bước trở lên
            $('#suacumloai' + id).remove();
            var totalLoai = ($('body').find('[id^="suacumloai"]').length + 1);
            $('#suathemloai').html('<i class="bi bi-plus-circle me-1"> </i> Thêm loại ' + totalLoai);
        }
    });

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
    $('#btnluusuaSanPham').on('click', function () {
        $('#btnluusuaSanPham').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluusuaSanPham').prop('disabled', true);

        var ten = $('#suaten').val().trim();
        var danhmuc = $('#suadanhmuc :selected').val();

        $("#suaten").removeClass('valid-was-validated');
        $("#suadanhmuc").removeClass('valid-was-validated');

        $('#invalid-suaten-feedback').prop('hidden', true);
        $('#invalid-suadanhmuc-feedback').prop('hidden', true);

        var check = true;
        var lstIdLoai = "";
        var lstLoai = "";
        var lstSoLuong = "";
        var lstGia = "";
        $('body').find('[id^="suacumloai"]').each(function () {
            var id = $(this).attr('name');
            $('body').find('[id="sualoai' + id + '"]').removeClass('valid-was-validated');
            $('body').find('[id="suasoluong' + id + '"]').removeClass('valid-was-validated');
            $('body').find('[id="suagia' + id + '"]').removeClass('valid-was-validated');

            $('body').find('[id="invalid-sualoai' + id + '-feedback"]').prop('hidden', true);
            $('body').find('[id="invalid-suasoluong' + id + '-feedback"]').prop('hidden', true);
            $('body').find('[id="invalid-suagia' + id + '-feedback"]').prop('hidden', true);

            lstIdLoai += $('body').find('[id="sualoai' + id + '"]').attr('name') + "#";
            var soluong = $('body').find('[id="suasoluong' + id + '"]').val();
            var gia = $('body').find('[id="suagia' + id + '"]').val();
            var loai = $('body').find('[id="sualoai' + id + '"]').val();

            if (soluong.length < 1) {
                check = false;
                $('body').find('[id="suasoluong' + id + '"]').addClass('valid-was-validated');
                $('body').find('[id="invalid-suasoluong' + id + '-feedback"]').text("Chưa nhập số lượng.").prop('hidden', false);
                $('body').find('[id="suasoluong' + id + '"]').focus();

                $('#btnluusuaSanPham').html('Lưu thông tin');
                $('#btnluusuaSanPham').prop('disabled', false);
            }
            else { lstSoLuong += soluong + "#"; }

            if (gia.length < 1) {
                check = false;
                $('body').find('[id="suagia' + id + '"]').addClass('valid-was-validated');
                $('body').find('[id="invalid-suagia' + id + '-feedback"]').text("Chưa nhập giá tiền.").prop('hidden', false);
                $('body').find('[id="suagia' + id + '"]').focus();

                $('#btnluusuaSanPham').html('Lưu thông tin');
                $('#btnluusuaSanPham').prop('disabled', false);
            }
            else { lstGia += gia + "#"; }

            if (loai.length < 1) {
                check = false;
                $('body').find('[id="sualoai' + id + '"]').addClass('valid-was-validated');
                $('body').find('[id="invalid-sualoai' + id + '-feedback"]').text("Chưa nhập tên loại.").prop('hidden', false);
                $('body').find('[id="sualoai' + id + '"]').focus();

                $('#btnluusuaSanPham').html('Lưu thông tin');
                $('#btnluusuaSanPham').prop('disabled', false);
            }
            else { lstLoai += loai + "#"; }
        });

        if (danhmuc.length < 1) {
            check = false;
            $("#suadanhmuc").addClass('valid-was-validated');
            $('#invalid-suadanhmuc-feedback').text("Vui lòng chọn danh mục sản phẩm.").prop('hidden', false);
            $("#suadanhmuc").focus();

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
            formData.append('id', $("#idSanPham").val());
            var totalFiles = $("#suapro-image")[0].files.length;
            for (var i = 0; i < totalFiles; i++) {
                var file = $("#suapro-image")[0].files[i];
                formData.append('images', file);
            }
            formData.append('video', $("#suapro-video")[0].files[0]);
            formData.append('ten', ten);
            formData.append('danhmuc', danhmuc);
            formData.append('mota', $('#suamota').val().trim());
            formData.append('hienthi', $('#suahienthi').prop('checked'));
            formData.append('lstIdLoai', lstIdLoai.substring(0, lstIdLoai.length - 1));
            formData.append('lstLoai', lstLoai.substring(0, lstLoai.length - 1));
            formData.append('lstSoLuong', lstSoLuong.substring(0, lstSoLuong.length - 1));
            formData.append('lstGia', lstGia.substring(0, lstGia.length - 1));

            var imageCu = "";
            $('[id^="url-suaidHinhAnh-hinhcu-"]').each(function () {
                if ($(this).val().length > 0) imageCu += $(this).val() + "#";
            });

            formData.append('imageCu', imageCu.substring(0, imageCu.length - 1));
            formData.append('videoCu', $('#url-suapro-video').val());

            $.ajax({
                url: $('#requestPath').val() + "admin/sanphammuasam/suasanpham",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    $('#btnluusuaSanPham').html('Lưu thông tin');
                    $('#btnluusuaSanPham').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã cập nhật thông tin sản phẩm.",
                        icon: "success"
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
            });
        }
        else {
            $('#btnluuthemSanPham').html('Lưu thông tin');
            $('#btnluuthemSanPham').prop('disabled', false);
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
