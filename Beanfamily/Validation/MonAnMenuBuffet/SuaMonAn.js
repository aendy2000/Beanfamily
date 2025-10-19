$(document).ready(function () {

    //Add hình ảnh tải lên
    document.getElementById('suapro-image').addEventListener('change', suareadImage, false);

    //Xóa hình ảnh
    $('body').on('click', '[id^="suaxoa-hinhanhsp"]', function (e) {
        $('#suapro-image').val('');
        $('#suapro-image-cu').val('');
        var output = $(".suapreview-images-zone");
        output.html("");
    });

    //Lưu thêm món
    $('#btnluusuaMonAn').on('click', function () {
        $('#btnluusuaMonAn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluusuaMonAn').prop('disabled', true);

        var tenmon = $('#suatenmon').val().trim();
        var danhmuc = $('#suadanhmuc :selected').val();

        $("#suatenmon").removeClass('valid-was-validated');
        $("#suadanhmuc").removeClass('valid-was-validated');


        $('#invalid-suatenmon-feedback').prop('hidden', true);
        $('#invalid-suadanhmuc-feedback').prop('hidden', true);

        var check = true;
        if (danhmuc.length < 1) {
            check = false;
            $("#suadanhmuc").addClass('valid-was-validated');
            $('#invalid-suadanhmuc-feedback').text("Vui lòng chọn danh mục món.").prop('hidden', false);
            $("#suadanhmuc").focus();

            $('#btnluusuaMonAn').html('Lưu thông tin');
            $('#btnluusuaMonAn').prop('disabled', false);
        }

        if (tenmon.length < 1) {
            check = false;
            $("#suatenmon").addClass('valid-was-validated');
            $('#invalid-suatenmon-feedback').text("Vui lòng nhập tên món.").prop('hidden', false);
            $("#suatenmon").focus();

            $('#btnluusuaMonAn').html('Lưu thông tin');
            $('#btnluusuaMonAn').prop('disabled', false);
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('id', $('#idSuaMonAn').val());
            formData.append('hinhanh', $("#suapro-image")[0].files[0]);
            formData.append('tenmon', tenmon);
            formData.append('sothutu', $('#suasothutu').val());
            formData.append('danhmuc', danhmuc);
            formData.append('hienthi', $('#suahienthi').prop('checked'));
            formData.append('hinhcu', $('#suapro-image-cu').val());

            $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                url: $('#requestPath').val() + "admin/monanmenubuffet/suamon",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua.indexOf("Chi tiết lỗi") !== -1) {
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
                    var table = $('#lstMonAnMenuBuffetTable').DataTable();
                    var rowId = '#row-' + $('#idSuaMonAn').val();

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

                    $('#SuaMonAnModal').modal('toggle');

                    $('#btnluusuaMonAn').html('Lưu thông tin');
                    $('#btnluusuaMonAn').prop('disabled', false);

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

function suareadImage() {
    if (window.File && window.FileList && window.FileReader) {
        var files = $('#suapro-image')[0].files; //FileList object
        var output = $(".suapreview-images-zone");
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
                    '<div id="suaxoa-hinhanhsp" class="image-cancel"><i class="bi bi-x-circle-fill text-dark"></i></div>' +
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