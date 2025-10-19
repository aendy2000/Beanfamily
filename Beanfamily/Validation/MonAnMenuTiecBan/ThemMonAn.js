$(document).ready(function () {

    //Add hình ảnh tải lên
    document.getElementById('pro-image').addEventListener('change', readImage, false);

    //Xóa hình ảnh
    $('body').on('click', '[id^="xoa-hinhanhsp"]', function (e) {
        $('#pro-image').val('');
        var output = $(".preview-images-zone");
        output.html("");
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

            $('#btnluuthemMonAn').html('Lưu thông tin');
            $('#btnluuthemMonAn').prop('disabled', false);
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('hinhanh', $("#pro-image")[0].files[0]);
            formData.append('tenmon', tenmon);
            formData.append('gia', gia);
            formData.append('sothutu', $('#sothutu').val());
            formData.append('danhmuc', danhmuc);
            formData.append('hienthi', $('#hienthi').prop('checked'));

            $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                url: $('#requestPath').val() + "admin/monanmenutiecban/themmon",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
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
                    var table = $('#lstMonAnMenuTiecBanTable').DataTable();
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
                var html = '<div class="preview-image preview-show">' +
                    '<div id="xoa-hinhanhsp" class="image-cancel"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
                    '<div class="image-zone"><img src="' + picFile.result + '"></div>' +
                    '</div>';

                output.append(html);
            });
            picReader.readAsDataURL(file);
        }
    } else {
        console.log('Browser not support');
    }
}