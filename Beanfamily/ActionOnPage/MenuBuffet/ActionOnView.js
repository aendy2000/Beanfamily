$(document).ready(function () {
    $('[id^="monanbuffet-"]').on('change', function () {
        var inp = $(this);
        var id = inp.attr('id');

        var checkAll = id.split('-')[2];
        if (checkAll == "all") {
            if (inp.prop('checked')) {
                var dem = 0;
                var idMenu = id.split('-')[1];
                $('[id^="monanbuffet-' + idMenu + '-"]').each(function () {
                    $(this).prop('checked', true);
                    dem++;
                });
                $('[id^="label-monanbuffet-' + idMenu + '-"]').each(function () {
                    $(this).css('color', '#C49A6C');
                });

                $('#total-' + idMenu).text("Đã chọn: " + (Number(dem) - 1) + " món");
            }
            else {
                var idMenu = id.split('-')[1];
                $('[id^="monanbuffet-' + idMenu + '-"]').each(function () {
                    $(this).prop('checked', false);
                });
                $('[id^="label-monanbuffet-' + idMenu + '-"]').each(function () {
                    $(this).css('color', '#000000');
                });

                $('#total-' + idMenu).text("Đã chọn: 0");
            }
        }
        else {
            var idMenu = id.split('-')[1];
            var dem = 0;
            $('#monanbuffet-' + idMenu + '-all').prop('checked', false);
            $('#label-monanbuffet-' + idMenu + '-all').css('color', '#000000');

            $('[id^="monanbuffet-' + idMenu + '-"]').each(function () {
                if ($(this).prop('checked')) {
                    dem++;
                }
            });
            if (dem > 0) {
                if (inp.prop('checked')) {
                    $('#total-' + idMenu).text("Đã chọn: " + dem + " món");
                    $('#label-' + id).css('color', '#C49A6C');
                }
                else {
                    $('#total-' + idMenu).text("Đã chọn: " + dem + " món");
                    $('#label-' + id).css('color', '#000000');
                }
            }
            else {
                if (inp.prop('checked')) {
                    $('#total-' + idMenu).text("Đã chọn: " + dem + " món");
                    $('#label-' + id).css('color', '#C49A6C');
                }
                else {
                    $('#total-' + idMenu).text("Đã chọn: 0");
                    $('#label-' + id).css('color', '#000000');
                }
            }
        }

        var demSum = 0;
        $('[id^="monanbuffet-"]').each(function () {
            var inpfr = $(this);
            if (inpfr.attr('id').split('-')[2] !== "all" && inpfr.prop('checked')) {
                demSum++;
            }
        });
        if (demSum > 0) {
            $('#tongDaChon').text("Tổng: " + demSum + " món");
        }
        else {
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
});