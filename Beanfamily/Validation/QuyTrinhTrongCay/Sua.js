$(document).ready(function () {
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
        $('#suaload-video').replaceWith('<video id="suaload-video" style="border-radius: 10px; border: 1px solid #ddd" class="video-list text-center form-control"  type="video/mp4" width="100%" height="300px"></video>');
        $('#url-suapro-video').val('');
    });

    $('body').find('[id="suacheckurlvideo"]').on('change', function () {
        var checks = $(this).prop('checked');

        if (checks == true) {
            $('body').find('[id="suahienthi-addurlvideo"]').prop('hidden', true);
            $('body').find('[id="suashow-video"]').prop('hidden', true);
            $('body').find('[id="suahienthi-uploadvideo"]').prop('hidden', false);
        }
        else {
            $('body').find('[id="suahienthi-addurlvideo"]').prop('hidden', false);
            if ($('body').find('[id="suaurlvideo"]').val().trim().length > 0) {
                $('body').find('[id="suashow-video"]').prop('hidden', false);
            }
            else {
                $('body').find('[id="suashow-video"]').prop('hidden', true);
            }
            $('body').find('[id="suahienthi-uploadvideo"]').prop('hidden', true);
        }
    });

    $('body').find('[id="suaurlvideo"]').on('input', function () {
        $('#url-suapro-video').val('');
        var result = $(this).val().trim();
        if (result.length > 0) {
            $('body').find('[id="suashow-video"]').prop('hidden', false);
            result = result.replace('watch?v=', 'embed/');
            var widthVideos = $('body').find('[id="suaload-video-url"]').width();
            var heiVideo = (widthVideos / 16) * 9 + 2;

            $('body').find('[id="suashow-video"]').html(`<div class="col-md-12 mb-1"><iframe src="` + result + `?autoplay=1" id="suaload-video-url" style="border-radius: 10px; border: 1px solid #ddd; padding: 0 !important" class="video-list text-center form-control" controls width="100%" height="` + heiVideo + `">`
                + `</iframe></div>`);
        }
        else {
            $('body').find('[id="suashow-video"]').prop('hidden', true);
            $('body').find('[id="suashow-video"]').html(`<div class="col-md-12 mb-1"><video id="suaload-video-url" style="border-radius: 10px; border: 1px solid #ddd; padding: 0 !important" class="video-list text-center form-control" controls width="100%" height="100%" autoplay>`
                + `</video></div>`);
        }
    });

    $('body').on('change', '[id^="suahinhbuoc"]', function () {
        var hinh = this;
        var stt = $(this).attr('name');
        $('#suahinhcubuoc' + stt).val('');
        if (hinh.files && hinh.files[0]) {
            var reader = new FileReader();
            reader.onload = function (ex) {
                document.getElementById('suahienthihinhbuoc' + stt).style.backgroundImage = "url(" + ex.target.result + ")";
                document.getElementById('suahienthihinhbuoc' + stt).style.backgroundSize = "cover";
            }
            reader.readAsDataURL(hinh.files[0]);
        }
        else {
            document.getElementById('suahienthihinhbuoc' + stt).style.backgroundImage = "url('/Content/assets/images/uploadImage.png')";
            document.getElementById('suahienthihinhbuoc' + stt).style.backgroundSize = "65%";
        }
    });

    $('#suathembuoc').on('click', function () {
        var stt = Number($('#suadembuoc').val());
        var sttTang = Number(stt + 1); //+1
        $('#suadembuoc').val(sttTang);

        $('#suadanhsachcacbuoc').append(`
                    <div id="suacumbuoc` + sttTang + `" name="` + sttTang + `" class="col-sm-12 col-lg-12 mt-3">
                        <div style="width: 100%; height: 50px; background-image: url('/Content/assets/images/arrowDown.png'); background-position: center; background-size: contain; background-repeat: no-repeat; margin-top: -25px; margin-bottom: 15px; "></div>
                        <div class="mb-3 row">
                            <div class="col-md-12 col-lg-4">
                                <div data-bs-toggle="tooltip" data-bs-placement="top" title="Thêm hình ảnh" id="suahienthihinhbuoc` + sttTang + `" onclick="$('#suahinhbuoc` + sttTang + `').click()" style="height: 190px; border: 1px solid #dee2e6; border-radius: 15px; cursor: pointer; background-image: url('/Content/assets/images/uploadImage.png'); background-position: center; background-size: 65%; background-repeat: no-repeat; "></div>
                                <input type="file" accept="image/*" hidden id="suahinhbuoc` + sttTang + `" name="` + sttTang + `" />
                                <input hidden id="suahinhcubuoc` + sttTang + `" value="" />
                            </div>
                            <div class="col-md-12 col-lg-7">
                                <div class="row">
                                    <div class="col-12 mb-3">
                                        <input id="suaten` + sttTang + `" type="text" placeholder="Tên bước" class="form-control">
                                        <label style="margin-left: 5px" id="invalid-suaten` + sttTang + `-feedback" class="text-danger" hidden></label>
                                    </div>
                                    <div class="col-12">
                                        <textarea rows="5" id="suamota` + sttTang + `" placeholder="Mô tả bước" class="form-control"></textarea>
                                        <label style="margin-left: 5px" id="invalid-suamota` + sttTang + `-feedback" class="text-danger" hidden></label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-1">
                                <button data-bs-toggle="tooltip" data-bs-placement="top" title="Xóa bước"  id="suaxoabuoc` + sttTang + `" name="` + sttTang + `" style="width: 100%; height: 187px" class="btn btn-danger btn-sm">
                                    <i class="bi bi-trash me-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `);

        var totalBuoc = ($('body').find('[id^="suacumbuoc"]').length + 1);
        $("#suathembuoc").html('<i class="bi bi-plus-circle me-1"> </i> Thêm bước ' + totalBuoc);
        $('body').find('[id="suaten' + sttTang + '"]').focus();
        $('#SuaModal').animate({ scrollTop: $('#SuaModal .modal-dialog').height() }, 500);

        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })

    });
    $('body').on('click', '[id^="suaxoabuoc"]', function () {
        var id = $(this).attr('name');
        if (id !== "1") { //2 bước trở lên
            $('#suacumbuoc' + id).remove();
            var totalBuoc = ($('body').find('[id^="suacumbuoc"]').length + 1);
            $('#suathembuoc').html('<i class="bi bi-plus-circle me-1"> </i> Thêm bước ' + totalBuoc);
        }
    });

    $('#btnluusuaSanPham').on('click', function () {
        $('#btnluusuaSanPham').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> Vui lòng chờ...');
        $('#btnluusuaSanPham').prop('disabled', true);

        var idQuyTrinh = $('#suaidQuyTrinh').val();
        var tenquytrinh = $('#suatenquytrinh').val().trim();
        $("#suatenquytrinh").removeClass('valid-was-validated');
        $('#invalid-suatenquytrinh-feedback').prop('hidden', true);

        var check = true;
        var lstTen = "";
        var lstMota = "";
        var lstImages = "";
        $('body').find('[id^="suacumbuoc"]').each(function () {
            var id = $(this).attr('name');
            lstImages += id + "#";

            $('body').find('[id="suaten' + id + '"]').removeClass('valid-was-validated');
            $('body').find('[id="suamota' + id + '"]').removeClass('valid-was-validated');
            $('body').find('[id="invalid-suaten' + id + '-feedback"]').prop('hidden', true);
            $('body').find('[id="invalid-suamota' + id + '-feedback"]').prop('hidden', true);

            var ten = $('body').find('[id="suaten' + id + '"]').val();
            var mota = $('body').find('[id="suamota' + id + '"]').val();

            if (ten.length < 1) {
                check = false;
                $('body').find('[id="suaten' + id + '"]').addClass('valid-was-validated');
                $('body').find('[id="invalid-suaten' + id + '-feedback"]').text("Vui lòng nhập tên bước.").prop('hidden', false);
                $('body').find('[id="suaten' + id + '"]').focus();

                $('#btnluusuaSanPham').html('Lưu thông tin');
                $('#btnluusuaSanPham').prop('disabled', false);
            }
            else { lstTen += ten + "#"; }

            if (mota.length < 1) {
                check = false;
                $('body').find('[id="suamota' + id + '"]').addClass('valid-was-validated');
                $('body').find('[id="invalid-suamota' + id + '-feedback"]').text("Vui lòng nhập mô tả bước.").prop('hidden', false);
                $('body').find('[id="suamota' + id + '"]').focus();

                $('#btnluusuaSanPham').html('Lưu thông tin');
                $('#btnluusuaSanPham').prop('disabled', false);
            }
            else { lstMota += mota + "#"; }
        });

        if (tenquytrinh.length < 1) {
            check = false;
            $("#suatenquytrinh").addClass('valid-was-validated');
            $('#invalid-suatenquytrinh-feedback').text("Vui lòng nhập tên quy trình.").prop('hidden', false);
            $("#suatenquytrinh").focus();

            $('#btnluusuaSanPham').html('Lưu thông tin');
            $('#btnluusuaSanPham').prop('disabled', false);
        }

        if (check == true) {
            var formData = new FormData();

            var lstCoHinh = "";
            lstImages = lstImages.substring(0, lstImages.length - 1);
            var lstImgSplit = lstImages.split('#');
            for (var i = 0; i < lstImgSplit.length; i++) {
                var id = lstImgSplit[i];
                var img = $('body').find('[id="suahinhbuoc' + id + '"]');
                if (img.val().length > 1) {
                    lstCoHinh += "Co#";
                    var file = $('body').find('[id="suahinhbuoc' + id + '"]')[0].files[0];
                    formData.append('images', file);
                }
                else {
                    lstCoHinh += $('#suahinhcubuoc' + id).val() + "#";
                }
            }

            if ($('#suacheckurlvideo').prop('checked') == true) {
                formData.append('addurlvideo', false);
                formData.append('urlVideo', '');
                formData.append('video', $("#suapro-video")[0].files[0]);
            }
            else {
                formData.append('addurlvideo', true);
                formData.append('urlVideo', $('body').find('[id="suaurlvideo"]').val());
                formData.append('video', null);
            }

            formData.append('id', idQuyTrinh);
            formData.append('tenquytrinh', tenquytrinh);
            formData.append('hienthi', $('#hienthi').prop('checked'));
            formData.append('lstTenBuoc', lstTen.substring(0, lstTen.length - 1));
            formData.append('lstMotaBuoc', lstMota.substring(0, lstMota.length - 1));
            formData.append('lstCoHinh', lstCoHinh.substring(0, lstCoHinh.length - 1));
            formData.append('videoCu', $('#url-suapro-video').val());

            $.ajax({error: function (a, xhr, c) {if (a.status == 403 && a.responseText.indexOf("SystemLoginAgain") != -1) {window.location.href = $('body').find('[id="requestPath"]').val() + "admin/dangnhap/logout";}},
                url: $('#requestPath').val() + "admin/quytrinhtrongcay/suaquytrinh",
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
                    $('#btnluusuaSanPham').html('Lưu thông tin');
                    $('#btnluusuaSanPham').prop('disabled', false);

                    Swal.fire({
                        title: "Thành công!",
                        text: 'Đã cập nhật quy trình "' + $('#inpMaQuyTrinh' + idQuyTrinh).val() + '".',
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "DATONTAI") {
                    $("#suatenquytrinh").addClass('valid-was-validated');
                    $('#invalid-suatenquytrinh-feedback').text('Quy trình "' + tenquytrinh + '" đã tồn tại').prop('hidden', false);
                    $("#suatenquytrinh").focus();

                    $('#btnluusuaSanPham').html('Lưu thông tin');
                    $('#btnluusuaSanPham').prop('disabled', false);
                }
                else if (ketqua == "KHONGTONTAI") {
                    $('#btnluusuaSanPham').html('Lưu thông tin');
                    $('#btnluusuaSanPham').prop('disabled', false);

                    Swal.fire({
                        title: "Thông báo",
                        text: "Quy trình này vừa mới được xóa bỏ.",
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

    });
});