$(document).ready(function () {
    //Banner
    document.getElementById('hinhanh_sukien').addEventListener('change', suareadImagehinhanh_sukien, false);
    $(".preview-images-zonehinhanh_sukien").sortable();
    $('body').on('click', '[id^="suaxoa-hinhanhsp-hinhanh_sukien-"]', function (e) {
        let fileName = $(this).attr('name');
        if (fileName.indexOf("daylahinhcu") != -1) {
            var filenames = fileName.replace('daylahinhcu-', '');
            $('[id="suaidHinhAnh-hinhcu-hinhanh_sukien-' + filenames + '"]').replaceWith('');
            $('[id="url-suaidHinhAnh-hinhcu-hinhanh_sukien-' + filenames + '"]').val('');
        }
        else {
            var currentFile = $("#hinhanh_sukien")[0].files;
            var fileBuffer = new DataTransfer();

            for (let i = 0; i < currentFile.length; i++) {
                var fileNameArr = currentFile[i].name.replace(/\./g, '').replace(/ /g, '');
                var fileArr = currentFile[i];

                if (fileName !== fileNameArr) {
                    fileBuffer.items.add(fileArr);
                }
            }
            $("#hinhanh_sukien")[0].files = fileBuffer.files;
            suareadImagehinhanh_sukien();
        }
    });
    function suareadImagehinhanh_sukien() {
        if (window.File && window.FileList && window.FileReader) {
            var files = $('#hinhanh_sukien')[0].files; //FileList object
            var output = $(".preview-images-zonehinhanh_sukien");
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
                    var html = '<div id="suaidHinhAnh-hinhanh_sukien-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="preview-image preview-show-' + fileName.replace(/\./g, '').replace(/ /g, '') + '">' +
                        '<div id="suaxoa-hinhanhsp-hinhanh_sukien-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" class="image-cancel" name="' + fileName.replace(/\./g, '').replace(/ /g, '') + '"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                        '<div class="image-zone"><img id="suapro-img-hinhanh_sukien-' + fileName.replace(/\./g, '').replace(/ /g, '') + '" src="' + picFile.result + '"></div>' +
                        '</div>';

                    output.append(html);
                });
                picReader.readAsDataURL(file);
            }

            $('[id^="url-suaidHinhAnh-hinhcu-hinhanh_sukien-"]').each(function () {
                $(this).val('');
            });
        } else {
            console.log('Browser not support');
        }
    }


    $('#btnluuthemmoi').on('click', function () {
        $('#btnluuthemmoi').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluuthemmoi').prop('disabled', true);

        var tieude = $('#tieude').val().trim();
        var noidung = $('#noidung').val().trim();
        var linkbai = $('#linkbai').val().trim();

        $("#tieude").removeClass('valid-was-validated');
        $("#noidung").removeClass('valid-was-validated');
        $("#linkbai").removeClass('valid-was-validated');
        $(".preview-images-zonehinhanh_sukien").removeClass('valid-was-validated');

        
        $('#invalid-tieude-feedback').prop('hidden', true);
        $('#invalid-noidung-feedback').prop('hidden', true);
        $('#invalid-linkbai-feedback').prop('hidden', true);
        $('#invalid-hinhanh_sukien-feedback').prop('hidden', true);

        var check = true;

        if (linkbai.length < 1) {
            check = false;
            $("#linkbai").addClass('valid-was-validated');
            $('#invalid-linkbai-feedback').text("Vui lòng nhập link bài viết.").prop('hidden', false);
            $("#linkbai").focus();

            $('#btnluuthemmoi').html('Lưu thông tin');
            $('#btnluuthemmoi').prop('disabled', false);
        }

        if (noidung.length < 1) {
            check = false;
            $("#noidung").addClass('valid-was-validated');
            $('#invalid-noidung-feedback').text("Vui lòng nhập nội dung.").prop('hidden', false);
            $("#noidung").focus();

            $('#btnluuthemmoi').html('Lưu thông tin');
            $('#btnluuthemmoi').prop('disabled', false);
        }

        if (tieude.length < 1) {
            check = false;
            $("#tieude").addClass('valid-was-validated');
            $('#invalid-tieude-feedback').text("Vui lòng nhập tiêu đề.").prop('hidden', false);
            $("#tieude").focus();

            $('#btnluuthemmoi').html('Lưu thông tin');
            $('#btnluuthemmoi').prop('disabled', false);
        }

        if ($("#hinhanh_sukien")[0].files.length < 1) {
            check = false;
            $(".preview-images-zonehinhanh_sukien").addClass('valid-was-validated');
            $('#invalid-hinhanh_sukien-feedback').text("Vui lòng chọn hình ảnh sự kiện.").prop('hidden', false);
            $(".preview-images-zonehinhanh_sukien").focus();

            $('#btnluuthemmoi').html('Lưu thông tin');
            $('#btnluuthemmoi').prop('disabled', false);
        }

        if (check == true) {
            var formData = new FormData();

            var file = $("#hinhanh_sukien")[0].files[0];
            formData.append('hinhanh_sukien', file);

            formData.append('tieude', tieude);
            formData.append('noidung', noidung);
            formData.append('linkbai', linkbai);

            $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                url: $('#requestPath').val() + "admin/sukien/themsukien",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua.indexOf("Chi tiết lỗi") !== -1) {
                    $('#btnluuthemmoi').html('Lưu thông tin');
                    $('#btnluuthemmoi').prop('disabled', false);

                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                        text: ketqua,
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                    
                }
                else {
                    var table = $('#lstDataTable').DataTable();
                    table.row.add($(ketqua)).draw(false);
                    $('#ThemMoiModal').modal('toggle');

                    $('#btnluuthemmoi').html('Lưu thông tin');
                    $('#btnluuthemmoi').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã thêm một sự kiện mới.",
                        icon: "success"
                    });
                }
            });
        }
    });
});