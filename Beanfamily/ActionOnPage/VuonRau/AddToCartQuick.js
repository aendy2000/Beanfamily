$(document).ready(function () {
    var firstLoad = 0;
    var slFirst = 0;

    $('body').on('click', '[id^="xemnhanhvathemvaogio-"]', function () {
        var id = $(this).attr('name');

        var formData = new FormData();
        formData.append('id', id);

        $.ajax({
            url: $('body').find('[id="requestPath"]').val() + 'vuonrau/quickproductdetail',
            data: formData,
            dataType: 'html',
            type: 'POST',
            processData: false,
            contentType: false,
        }).done(function (data) {
            if (data.indexOf("Chi tiết lỗi") != -1) {
                Swal.fire({
                    title: "Đã có lỗi xảy ra, vui lòng thử lại sau :(",
                    text: data,
                    icon: "error"
                }).then(() => {
                    window.location.reload();
                });
            }
            else {
                $('body').find('[id="partial-content-quick-detail"]').replaceWith(data);
                $('body').find('[id="quickDetailProduct"]').modal('toggle');

                slFirst = Number($('body').find('[id="tonkhothucte"]').attr('tonkhosoluong').replace(/,/g, '.'));

                if (firstLoad == 0) {
                    DieuChinhSoLuong();
                    firstLoad++;
                }
            }
        });
    });

    function DieuChinhSoLuong() {
        $('body').on('click', '[id="button-addon-product"]', function () {
            var inpSL = Number($('body').find('[id="soluong"]').val());
            if (inpSL < 1) {
                $('body').find('[id="soluong"]').val(1);
            }
            else if (slFirst >= 100 && inpSL > 100) {
                $('body').find('[id="soluong"]').val(100);
            }
            else if (slFirst < 100 && inpSL > slFirst) {
                $('body').find('[id="soluong"]').val(slFirst);
            }
            else if (inpSL < 100 && inpSL < slFirst) {
                $('body').find('[id="soluong"]').val(inpSL + 1);
            }
        });
        $('body').on('click', '[id="button-minus-product"]', function () {
            var inpSL = Number($('body').find('[id="soluong"]').val());
            if (inpSL > 1 && inpSL <= slFirst) {
                $('body').find('[id="soluong"]').val(inpSL - 1);
            }
            else if (inpSL > slFirst) {
                $('body').find('[id="soluong"]').val(slFirst);
            }
        });

        $('body').on('input', '[id="soluong"]', function () {
            var inpSL = $(this).val();
            if (inpSL.length > 0) {
                inpSL = Number(inpSL);
                if (inpSL < 1) {
                    $(this).val('1');
                }
                else if (slFirst >= 100 && inpSL > 100) {
                    $('body').find('[id="soluong"]').val(100);
                }
                else if (slFirst < 100 && inpSL > slFirst) {
                    $('body').find('[id="soluong"]').val(slFirst);
                }
            }
        });
        $('body').on('keydown', '[id="soluong"]', function (e) {
            if (e.keyCode == '38') { //up
                var inpSL = Number($('body').find('[id="soluong"]').val());
                if (inpSL < 1) {
                    $('body').find('[id="soluong"]').val(1);
                }
                else if (slFirst >= 100 && inpSL > 100) {
                    $('body').find('[id="soluong"]').val(100);
                }
                else if (slFirst < 100 && inpSL > slFirst) {
                    $('body').find('[id="soluong"]').val(slFirst);
                }
                else if (inpSL < 100 && inpSL < slFirst) {
                    $('body').find('[id="soluong"]').val(inpSL + 1);
                }
            }
            else if (e.keyCode == '40') { //down
                var inpSL = Number($('body').find('[id="soluong"]').val());
                if (inpSL > 1 && inpSL <= slFirst) {
                    $('body').find('[id="soluong"]').val(inpSL - 1);
                }
                else if (inpSL > slFirst) {
                    $('body').find('[id="soluong"]').val(slFirst);
                }
            }
        });

        $('body').on('focusout', '[id="soluong"]', function () {
            if ($(this).val().trim().length < 1) {
                $('body').find('[id="soluong"]').val('1');
            }
        });
    }
});