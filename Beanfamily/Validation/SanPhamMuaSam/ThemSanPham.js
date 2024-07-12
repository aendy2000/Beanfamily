$(document).ready(function () {
    $('#themloai').on('click', function () {
        var stt = Number($('#demloai').val());
        var sttTang = Number(stt + 1); //+1
        $('#demloai').val(sttTang);

        $('#danhsachcacloai').append(`
            <div id="cumloai` + sttTang + `" name="` + sttTang + `" class="col-12">
                <div class="row mb-3">
                    <div class="col-md-12 col-lg-4">
                        <input id="loai` + sttTang + `" type="text" placeholder="Loại (VD: 500ml, 2kg...)" class="form-control">
                        <label style="margin-left: 5px" id="invalid-loai` + sttTang + `-feedback" class="text-danger" hidden></label>
                    </div>
                    <div class="col-md-12 col-lg-4">
                        <input id="gia` + sttTang + `" type="text" data-type="currency" placeholder="Giá sản phẩm" class="form-control">
                        <label style="margin-left: 5px" id="invalid-gia` + sttTang + `-feedback" class="text-danger" hidden></label>
                    </div>
                    <div class="col-md-12 col-lg-3">
                        <input id="soluong` + sttTang + `" type="text" data-type="numbers" placeholder="Số lượng tồn kho" class="form-control">
                        <label style="margin-left: 5px" id="invalid-soluong` + sttTang + `-feedback" class="text-danger" hidden></label>
                    </div>
                    <div class="col-md-12 col-lg-1">
                        <button data-bs-toggle="tooltip" data-bs-placement="top" title="Xóa" id="xoaloai1` + sttTang + `" name="` + sttTang + `" style="width: 100%" class="btn btn-danger"><i class="bi bi-trash me-1"></i></button>
                    </div>
                </div>
            </div>
        `);

        var totalLoai = ($('body').find('[id^="cumloai"]').length + 1);
        $('#themloai').html('<i class="bi bi-plus-circle me-1"> </i> Thêm loại ' + totalLoai);
        $('body').find('[id="loai' + sttTang + '"]').focus();
        $('#ThemMoiModal').animate({ scrollTop: $('#ThemMoiModal .modal-dialog').height() }, 500);

        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })

    });
    $('body').on('click', '[id^="xoaloai"]', function () {
        var id = $(this).attr('name');
        if (id !== "1") { //2 bước trở lên
            $('#cumloai' + id).remove();
            var totalLoai = ($('body').find('[id^="cumloai"]').length + 1);
            $('#themloai').html('<i class="bi bi-plus-circle me-1"> </i> Thêm loại ' + totalLoai);
        }
    });

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
        var danhmuc = $('#danhmuc :selected').val();

        $("#ten").removeClass('valid-was-validated');
        $("#danhmuc").removeClass('valid-was-validated');

        $('#invalid-ten-feedback').prop('hidden', true);
        $('#invalid-danhmuc-feedback').prop('hidden', true);

        var check = true;
        var lstLoai = "";
        var lstSoLuong = "";
        var lstGia = "";
        $('body').find('[id^="cumloai"]').each(function () {
            var id = $(this).attr('name');
            $('body').find('[id="loai' + id + '"]').removeClass('valid-was-validated');
            $('body').find('[id="soluong' + id + '"]').removeClass('valid-was-validated');
            $('body').find('[id="gia' + id + '"]').removeClass('valid-was-validated');

            $('body').find('[id="invalid-loai' + id + '-feedback"]').prop('hidden', true);
            $('body').find('[id="invalid-soluong' + id + '-feedback"]').prop('hidden', true);
            $('body').find('[id="invalid-gia' + id + '-feedback"]').prop('hidden', true);

            var loai = $('body').find('[id="loai' + id + '"]').val();
            var soluong = $('body').find('[id="soluong' + id + '"]').val();
            var gia = $('body').find('[id="gia' + id + '"]').val();

            if (gia.length < 1) {
                check = false;
                $('body').find('[id="gia' + id + '"]').addClass('valid-was-validated');
                $('body').find('[id="invalid-gia' + id + '-feedback"]').text("Chưa nhập giá tiền.").prop('hidden', false);
                $('body').find('[id="gia' + id + '"]').focus();

                $('#btnluuthemSanPham').html('Lưu thông tin');
                $('#btnluuthemSanPham').prop('disabled', false);
            }
            else { lstGia += gia + "#"; }

            if (soluong.length < 1) {
                check = false;
                $('body').find('[id="soluong' + id + '"]').addClass('valid-was-validated');
                $('body').find('[id="invalid-soluong' + id + '-feedback"]').text("Chưa nhập số lượng.").prop('hidden', false);
                $('body').find('[id="soluong' + id + '"]').focus();

                $('#btnluuthemSanPham').html('Lưu thông tin');
                $('#btnluuthemSanPham').prop('disabled', false);
            }
            else { lstSoLuong += soluong + "#"; }

            if (loai.length < 1) {
                check = false;
                $('body').find('[id="loai' + id + '"]').addClass('valid-was-validated');
                $('body').find('[id="invalid-loai' + id + '-feedback"]').text("Chưa nhập tên loại.").prop('hidden', false);
                $('body').find('[id="loai' + id + '"]').focus();

                $('#btnluuthemSanPham').html('Lưu thông tin');
                $('#btnluuthemSanPham').prop('disabled', false);
            }
            else { lstLoai += loai + "#"; }
        });

        if (danhmuc.length < 1) {
            check = false;
            $("#danhmuc").addClass('valid-was-validated');
            $('#invalid-danhmuc-feedback').text("Vui lòng chọn danh mục sản phẩm.").prop('hidden', false);
            $("#danhmuc").focus();

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
            formData.append('danhmuc', danhmuc);
            formData.append('mota', $('#mota').val().trim());
            formData.append('hienthi', $('#hienthi').prop('checked'));
            formData.append('lstLoai', lstLoai.substring(0, lstLoai.length - 1));
            formData.append('lstSoLuong', lstSoLuong.substring(0, lstSoLuong.length - 1));
            formData.append('lstGia', lstGia.substring(0, lstGia.length - 1));

            $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                url: $('#requestPath').val() + "admin/sanphammuasam/themsanpham",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false,
                error: function (ex) {
                    console.log(ex);
                },
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    $('#btnluuthemSanPham').html('Lưu thông tin');
                    $('#btnluuthemSanPham').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã thêm một sản phẩm mới.",
                        icon: "success"
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
            });
        }
        else {
            $('#btnluuthemSanPham').html('Lưu thông tin');
            $('#btnluuthemSanPham').prop('disabled', false);
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
