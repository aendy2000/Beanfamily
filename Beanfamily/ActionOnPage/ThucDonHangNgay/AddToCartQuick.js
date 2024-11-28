$(document).ready(function () {
    var firstLoad = 0;
    $('body').on('click', '[id^="xemnhanhvathemvaogio-"]', function () {
        var id = $(this).attr('name');

        var formData = new FormData();
        formData.append('id', id);

        $.ajax({
            url: $('body').find('[id="requestPath"]').val() + 'thucdonhangngay/quickproductdetail',
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

                if (firstLoad == 0) {
                    DieuChinhSoLuong();
                    firstLoad++;
                }
            }
        });
    });

    function DieuChinhSoLuong() {
        $('body').on('click', '[id="button-addon-product"]', function () {
            var inpSL = Number($('body').find('[id="soluong"]').val().replace(/,/g, ""));

            if (inpSL <= 0) {
                $('body').find('[id="soluong"]').val("0.1");
            }
            else if (inpSL > 100) {
                $('body').find('[id="soluong"]').val(100);
                var input_val = $('body').find('[id="soluong"]').val();

                if (input_val === "") { return; }
                var original_len = input_val.length;

                var caret_pos = input.prop("selectionStart");

                if (input_val.indexOf(".") >= 0) {

                    var decimal_pos = input_val.indexOf(".");

                    var left_side = input_val.substring(0, decimal_pos);
                    var right_side = input_val.substring(decimal_pos);

                    left_side = formatNumber(left_side);
                    right_side = formatNumber(right_side);

                    right_side = right_side.substring(0, 2);
                    input_val = left_side + "." + right_side;

                } else {
                    input_val = formatNumber(input_val);
                    input_val = input_val;
                }
                input.val(input_val);
            }
            else if (inpSL < 100) {
                $('body').find('[id="soluong"]').val(inpSL + 1);
                var input_val = $('body').find('[id="soluong"]').val();

                if (input_val === "") { return; }
                var original_len = input_val.length;

                var caret_pos = $('body').find('[id="soluong"]').prop("selectionStart");

                if (input_val.indexOf(".") >= 0) {

                    var decimal_pos = input_val.indexOf(".");

                    var left_side = input_val.substring(0, decimal_pos);
                    var right_side = input_val.substring(decimal_pos);

                    left_side = formatNumber(left_side);
                    right_side = formatNumber(right_side);

                    right_side = right_side.substring(0, 2);
                    input_val = left_side + "." + right_side;

                } else {
                    input_val = formatNumber(input_val);
                    input_val = input_val;
                }
                $('body').find('[id="soluong"]').val(input_val);
            }

        });
        $('body').on('click', '[id="button-minus-product"]', function () {
            var inpSL = Number($('body').find('[id="soluong"]').val().replace(/,/g, ""));
            if (inpSL > 1) {
                $('body').find('[id="soluong"]').val(inpSL - 1);
            }
            else if (inpSL < 1) {
                $('body').find('[id="soluong"]').val(1);
            }
            else if (inpSL > 100) {
                $('body').find('[id="soluong"]').val(100);
            }
        });

        $('body').on('input', '[id="soluong"]', function () {
            var inpSL = $(this).val();
            if (inpSL.length > 0) {
                inpSL = inpSL.replace(/,/g, "");
                inpSL = Number(inpSL);
                if (inpSL < 1) {
                    $(this).val('1');
                }
                else if (inpSL > 100) {
                    $('body').find('[id="soluong"]').val(100);
                }
            }
        });
        $('body').on('keydown', '[id="soluong"]', function (e) {
            if (e.keyCode == '38') { //up
                var inpSL = Number($('body').find('[id="soluong"]').val().replace(/,/g, ""));
                if (inpSL <= 0) {
                    $('body').find('[id="soluong"]').val("1");
                }
                else if (inpSL > 100) {
                    $('body').find('[id="soluong"]').val(100);
                }
                else if (inpSL < 100) {
                    $('body').find('[id="soluong"]').val(inpSL + 1);
                }
            }
            else if (e.keyCode == '40') { //down
                var inpSL = Number($('body').find('[id="soluong"]').val().replace(/,/g, ""));
                if (inpSL > 1) {
                    $('body').find('[id="soluong"]').val(inpSL - 1);
                }
                else if (inpSL > 100) {
                    $('body').find('[id="soluong"]').val(100);
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