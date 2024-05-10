$(document).ready(function () {
    //Open sủa sp
    $('body').on('click', '[id^="btnsuasp"]', function (e) {
        var formData = new FormData();
        var id = $(this).attr('name').trim();
        formData.append('id', id);
        $.ajax({
            url: $('#requestPath').val() + "admin/quytrinhtrongcay/opensua",
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false,
            error: function (ex) {
                console.log(ex);
            },
        }).done(function (ketqua) {
            if (ketqua == "KHONGTONTAI") {
                Swal.fire({
                    title: "Thông báo!",
                    text: "Quy trình này vừa mới được xóa bỏ.",
                    icon: "warning"
                }).then(() => {
                    window.location.reload();
                });
            }
            else if (ketqua.indexOf("Chi tiết lỗi:") != -1) {
                Swal.fire({
                    title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                    text: ketqua,
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
                $('#SuaModalPartial').replaceWith(ketqua);
                $('#titleSua').text('Chỉnh sửa quy trình "' + $('#inpMaQuyTrinh' + id).val() + '"');
                $('#SuaModal').modal('toggle');

                var videoOption = $('body').find('[id="optionVideo"]').val();
                setTimeout(function () {
                    if (videoOption == "addurl") {
                        var widthVideos = $('body').find('[id="suashow-video"]').width();
                        var heiVideo = (widthVideos / 16) * 9 + 2;
                        $('body').find('[id="suaload-video-url"]').attr('height', heiVideo);
                    }
                }, 500);
                
            }
        });
    });
});