$(document).ready(function () {
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

    $('body').find('[id="checkurlvideo"]').on('change', function () {
        var checks = $(this).prop('checked');

        if (checks == true) {
            $('body').find('[id="hienthi-addurlvideo"]').prop('hidden', true);
            $('body').find('[id="show-video"]').prop('hidden', true);
            $('body').find('[id="hienthi-uploadvideo"]').prop('hidden', false);
        }
        else {
            $('body').find('[id="hienthi-addurlvideo"]').prop('hidden', false);
            if ($('body').find('[id="urlvideo"]').val().trim().length > 0) {
                $('body').find('[id="show-video"]').prop('hidden', false);
            }
            else {
                $('body').find('[id="show-video"]').prop('hidden', true);
            }
            $('body').find('[id="hienthi-uploadvideo"]').prop('hidden', true); 
        }
    });

    $('body').find('[id="urlvideo"]').on('input', function () {
        var result = $(this).val().trim();
        if (result.length > 0) {
            $('body').find('[id="show-video"]').prop('hidden', false);
            result = result.replace('watch?v=', 'embed/');
            var widthVideos = $('body').find('[id="load-video-url"]').width();
            var heiVideo = (widthVideos / 16) * 9 + 2;

            $('body').find('[id="show-video"]').html(`<div class="col-md-12 mb-1"><iframe src="` + result + `?autoplay=1" id="load-video-url" style="border-radius: 10px; border: 1px solid #ddd; padding: 0 !important" class="video-list text-center form-control" controls width="100%" height="` + heiVideo +`" a>`
                + `</iframe></div>`);
        }
        else {
            $('body').find('[id="show-video"]').prop('hidden', true);
            $('body').find('[id="show-video"]').html(`<div class="col-md-12 mb-1"><video id="load-video-url" style="border-radius: 10px; border: 1px solid #ddd; padding: 0 !important" class="video-list text-center form-control" controls width="100%" height="100%" autoplay>`
                + `</video></div>`);
        }
    });

    $('body').on('change', '[id^="hinhbuoc"]', function () { 
        var hinh = this;
        var stt = $(this).attr('name');
        if (hinh.files && hinh.files[0]) {
            var reader = new FileReader();
            reader.onload = function (ex) {
                document.getElementById('hienthihinhbuoc' + stt).style.backgroundImage = "url(" + ex.target.result + ")";
                document.getElementById('hienthihinhbuoc' + stt).style.backgroundSize = "cover";
            }
            reader.readAsDataURL(hinh.files[0]);
        }
        else {
            document.getElementById('hienthihinhbuoc' + stt).style.backgroundImage = "url('/Content/assets/images/uploadImage.png')";
            document.getElementById('hienthihinhbuoc' + stt).style.backgroundSize = "65%";
        }
    });

    $('#thembuoc').on('click', function () {
        var stt = Number($('#dembuoc').val());
        var sttTang = Number(stt + 1); //+1
        $('#dembuoc').val(sttTang);

        $('#danhsachcacbuoc').append(`
                    <div id="cumbuoc` + sttTang + `" name="` + sttTang + `" class="col-sm-12 col-lg-12 mt-3">
                        <div style="width: 100%; height: 50px; background-image: url('/Content/assets/images/arrowDown.png'); background-position: center; background-size: contain; background-repeat: no-repeat; margin-top: -25px; margin-bottom: 15px; "></div>
                        <div class="mb-3 row">
                            <div class="col-md-12 col-lg-4">
                                <div data-bs-toggle="tooltip" data-bs-placement="top" title="Thêm hình ảnh" id="hienthihinhbuoc` + sttTang + `" onclick="$('#hinhbuoc` + sttTang + `').click()" style="height: 190px; border: 1px solid #dee2e6; border-radius: 15px; cursor: pointer; background-image: url('/Content/assets/images/uploadImage.png'); background-position: center; background-size: 65%; background-repeat: no-repeat; "></div>
                                <input type="file" accept="image/*" hidden id="hinhbuoc` + sttTang + `" name="` + sttTang + `" />
                            </div>
                            <div class="col-md-12 col-lg-7">
                                <div class="row">
                                    <div class="col-12 mb-3">
                                        <input id="ten` + sttTang + `" type="text" placeholder="Tên bước" class="form-control">
                                        <label style="margin-left: 5px" id="invalid-ten` + sttTang + `-feedback" class="text-danger" hidden></label>
                                    </div>
                                    <div class="col-12">
                                        <textarea rows="5" id="mota` + sttTang + `" placeholder="Mô tả bước" class="form-control"></textarea>
                                        <label style="margin-left: 5px" id="invalid-mota` + sttTang + `-feedback" class="text-danger" hidden></label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-1">
                                <button data-bs-toggle="tooltip" data-bs-placement="top" title="Xóa bước"  id="xoabuoc` + sttTang + `" name="` + sttTang + `" style="width: 100%; height: 187px" class="btn btn-danger btn-sm">
                                    <i class="bi bi-trash me-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `);

        var totalBuoc = ($('body').find('[id^="cumbuoc"]').length + 1);
        $('#thembuoc').html('<i class="bi bi-plus-circle me-1"> </i> Thêm bước ' + totalBuoc);
        $('body').find('[id="ten' + sttTang + '"]').focus();
        $('#ThemMoiModal').animate({ scrollTop: $('#ThemMoiModal .modal-dialog').height() }, 500);

        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })

    });
    $('body').on('click', '[id^="xoabuoc"]', function () {
        var id = $(this).attr('name');
        if (id !== "1") { //2 bước trở lên
            $('#cumbuoc' + id).remove();
            var totalBuoc = ($('body').find('[id^="cumbuoc"]').length + 1);
            $('#thembuoc').html('<i class="bi bi-plus-circle me-1"> </i> Thêm bước ' + totalBuoc);
        }
    });

    $('#btnluuthemSanPham').on('click', function () {
        $('#btnluuthemSanPham').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluuthemSanPham').prop('disabled', true);

        var tenquytrinh = $('#tenquytrinh').val().trim();
        $("#tenquytrinh").removeClass('valid-was-validated');
        $('#invalid-tenquytrinh-feedback').prop('hidden', true);

        var check = true;
        var lstTen = "";
        var lstMota = "";
        var lstImages = "";
        $('body').find('[id^="cumbuoc"]').each(function () {
            var id = $(this).attr('name');
            lstImages += id + "#";

            $('body').find('[id="ten' + id + '"]').removeClass('valid-was-validated');
            $('body').find('[id="mota' + id + '"]').removeClass('valid-was-validated');
            $('body').find('[id="invalid-ten' + id + '-feedback"]').prop('hidden', true);
            $('body').find('[id="invalid-mota' + id + '-feedback"]').prop('hidden', true);

            var ten = $('body').find('[id="ten' + id + '"]').val();
            var mota = $('body').find('[id="mota' + id + '"]').val();

            if (ten.length < 1) {
                check = false;
                $('body').find('[id="ten' + id + '"]').addClass('valid-was-validated');
                $('body').find('[id="invalid-ten' + id + '-feedback"]').text("Vui lòng nhập tên bước.").prop('hidden', false);
                $('body').find('[id="ten' + id + '"]').focus();

                $('#btnluuthemSanPham').html('Lưu thông tin');
                $('#btnluuthemSanPham').prop('disabled', false);
            }
            else { lstTen += ten + "#"; }

            if (mota.length < 1) {
                check = false;
                $('body').find('[id="mota' + id + '"]').addClass('valid-was-validated');
                $('body').find('[id="invalid-mota' + id + '-feedback"]').text("Vui lòng nhập mô tả bước.").prop('hidden', false);
                $('body').find('[id="mota' + id + '"]').focus();

                $('#btnluuthemSanPham').html('Lưu thông tin');
                $('#btnluuthemSanPham').prop('disabled', false);
            }
            else { lstMota += mota + "#"; }
        });

        if (tenquytrinh.length < 1) {
            check = false;
            $("#tenquytrinh").addClass('valid-was-validated');
            $('#invalid-tenquytrinh-feedback').text("Vui lòng nhập tên quy trình.").prop('hidden', false);
            $("#tenquytrinh").focus();

            $('#btnluuthemSanPham').html('Lưu thông tin');
            $('#btnluuthemSanPham').prop('disabled', false);
        }

        if (check == true) {
            var formData = new FormData();

            var lstCoHinh = "";
            lstImages = lstImages.substring(0, lstImages.length - 1);
            var lstImgSplit = lstImages.split('#');
            for (var i = 0; i < lstImgSplit.length; i++) {
                var id = lstImgSplit[i];
                var img = $('body').find('[id="hinhbuoc' + id + '"]');
                if (img.val().length > 1) {
                    lstCoHinh += "Co#";
                    var file = $('body').find('[id="hinhbuoc' + id + '"]')[0].files[0];
                    formData.append('images', file);
                }
                else {
                    lstCoHinh += "Khong#";
                }
            }

            if ($('#checkurlvideo').prop('checked') == true) {
                formData.append('addurlvideo', false);
                formData.append('urlVideo', '');
                formData.append('video', $("#pro-video")[0].files[0]);
            }
            else {
                formData.append('addurlvideo', true);
                formData.append('urlVideo', $('body').find('[id="urlvideo"]').val());
                formData.append('video', null);
            }

            formData.append('tenquytrinh', tenquytrinh);
            formData.append('hienthi', $('#hienthi').prop('checked'));
            formData.append('lstTenBuoc', lstTen.substring(0, lstTen.length - 1));
            formData.append('lstMotaBuoc', lstMota.substring(0, lstMota.length - 1));
            formData.append('lstCoHinh', lstCoHinh.substring(0, lstCoHinh.length - 1));

            $.ajax({
                url: $('#requestPath').val() + "admin/quytrinhtrongcay/themquytrinh",
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
                        text: "Đã thêm một quy trình mới.",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "DATONTAI") {
                    $("#tenquytrinh").addClass('valid-was-validated');
                    $('#invalid-tenquytrinh-feedback').text('Quy trình "' + tenquytrinh + '" đã tồn tại').prop('hidden', false);
                    $("#tenquytrinh").focus();

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

    });
});