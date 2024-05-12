$(document).ready(function () {
    $('[id^="monantiecban-"]').on('change', function () {
        var inp = $(this);
        var id = inp.attr('id');
        var price = inp.attr('price');

        var checkAll = id.split('-')[2];
        if (checkAll == "all") {
            if (inp.prop('checked')) {
                var dem = 0;
                var idMenu = id.split('-')[1];
                $('[id^="monantiecban-' + idMenu + '-"]').each(function () {
                    $(this).prop('checked', true);
                    dem++;
                });
                $('[id^="label-monantiecban-' + idMenu + '-"]').each(function () {
                    $(this).css('color', '#C49A6C');
                });

                var converts = formatCurrencys(price);
                $('#total-' + idMenu).attr('price', price);
                $('#total-' + idMenu).text("đã chọn: " + (Number(dem) - 1) + " món - " + converts + " đ");
            }
            else {
                var idMenu = id.split('-')[1];
                $('[id^="monantiecban-' + idMenu + '-"]').each(function () {
                    $(this).prop('checked', false);
                });
                $('[id^="label-monantiecban-' + idMenu + '-"]').each(function () {
                    $(this).css('color', '#000000');
                });

                $('#total-' + idMenu).attr('price', '0');
                $('#total-' + idMenu).text("Đã chọn: 0");
            }
        }
        else {
            var idMenu = id.split('-')[1];
            var totals = $('#total-' + idMenu).attr('price');
            var dem = 0;
            $('#monantiecban-' + idMenu + '-all').prop('checked', false);
            $('#label-monantiecban-' + idMenu + '-all').css('color', '#000000');

            $('[id^="monantiecban-' + idMenu + '-"]').each(function () {
                if ($(this).prop('checked')) {
                    dem++;
                }
            });
            if (dem > 0) {
                if (inp.prop('checked')) {
                    var sum = Number(totals) + Number(price);
                    var converts = formatCurrencys(sum);
                    $('#total-' + idMenu).attr('price', sum);
                    $('#total-' + idMenu).text("Đã chọn: " + dem + " món - " + converts + " đ");
                    $('#label-' + id).css('color', '#C49A6C');
                }
                else {
                    var sum = Number(totals) - Number(price);
                    var converts = formatCurrencys(sum);
                    $('#total-' + idMenu).attr('price', sum);
                    $('#total-' + idMenu).text("Đã chọn: " + dem + " món - " + converts + " đ");
                    $('#label-' + id).css('color', '#000000');
                }
            }
            else {
                if (inp.prop('checked')) {
                    var sum = Number(totals) + Number(price);
                    var converts = formatCurrencys(sum);
                    $('#total-' + idMenu).attr('price', sum);
                    $('#total-' + idMenu).text("Đã chọn: " + dem + " món - " + converts + " đ");
                    $('#label-' + id).css('color', '#C49A6C');
                }
                else {
                    var sum = Number(totals) - Number(price);
                    var converts = formatCurrencys(sum);
                    $('#total-' + idMenu).attr('price', sum);
                    $('#total-' + idMenu).text("Đã chọn: 0");
                    $('#label-' + id).css('color', '#000000');
                }
            }
        }

        var sum = 0;
        var demSum = 0;
        $('[id^="monantiecban-"]').each(function () {
            var inpfr = $(this);
            if (inpfr.attr('id').split('-')[2] !== "all" && inpfr.prop('checked')) {
                sum += Number(inpfr.attr('price'));
                demSum++;
            }
        });
        if (demSum > 0) {
            var convertSum = formatCurrencys(sum);
            $('#tongDaChon').attr('price', sum);
            $('#tongDaChon').text("Tổng: " + demSum + " món - " + convertSum + " đ");
        }
        else {
            $('#tongDaChon').attr('price', 0);
            $('#tongDaChon').text("Tổng: 0");
        }
    });

    //$('[id^="danhmucphucvu-"]').on('change', function () {
    //    var inp = $(this);
    //    var id = inp.attr('id');
    //    var price = inp.attr('price');

    //    var idMenu = id.split('-')[1];
    //    var totals = $('#total-' + idMenu).attr('price');

    //    if (inp.prop('checked')) {
    //        var sum = Number(totals) + Number(price);
    //        var converts = formatCurrencys(sum);
    //        $('#total-' + idMenu).attr('price', sum);
    //        $('#total-' + idMenu).text("Tổng: " + converts + " đ");
    //        $('#label-' + id).css('color', '#C49A6C');
    //    }
    //    else {
    //        var sum = Number(totals) - Number(price);
    //        var converts = formatCurrencys(sum);
    //        $('#total-' + idMenu).attr('price', sum);
    //        $('#total-' + idMenu).text("Tổng: " + converts + " đ");
    //        $('#label-' + id).css('color', '#000000');
    //    }
    //});

    function formatCurrencys(input) {
        var input_val = input + "";

        if (input_val === "") { return; }

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
        return input_val;
    }
    function formatNumber(n) {
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
});