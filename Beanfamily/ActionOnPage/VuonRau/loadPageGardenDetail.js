$(document).ready(function () {
    function formatNumber(n) {
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    $('body').find('.main_menu').find('a').each(function () {
        var tagA = $(this);
        if (tagA.attr('class') == "active") {
            tagA.attr('class', '');
        }
        if (tagA.text() == "Vườn rau") {
            tagA.addClass('active');
        }
    });
    $('body').find('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        fade: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 300,
        arrows: true,
        asNavFor: '.slider-nav',
    });

    var soLuongHienThi = Number($('body').find('[id="totalImagePro"]').val());
    if (soLuongHienThi <= 2) {
        soLuongHienThi = 1;
    }
    else if (soLuongHienThi > 2) {
        soLuongHienThi = (soLuongHienThi - 1);
    }

    $('body').find('.slider-nav').slick({
        slidesToShow: soLuongHienThi,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slider-for',
        focusOnSelect: true,
    });

    var slFirst = Number($('body').find('[id="tonkhothucte"]').attr('tonkhosoluong').replace(/,/g, '.'));

    $('body').on('click', '[id="button-addon-product"]', function () {
        var inpSL = Number($('body').find('[id="soluong"]').val().replace(/,/g, ""));

        if (inpSL <= 0) {
            $('body').find('[id="soluong"]').val("0.1");
        }
        else if (inpSL > slFirst) {
            $('body').find('[id="soluong"]').val(slFirst);
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
        else if (inpSL < slFirst) {
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
            inpSL = inpSL.replace(/,/g, "");
            inpSL = Number(inpSL);
            if (inpSL <= 0) {
                $(this).val('0.1');
            }
            else if (inpSL > slFirst) {
                $('body').find('[id="soluong"]').val(slFirst);
            }
        }
    });
    $('body').on('keydown', '[id="soluong"]', function (e) {
        if (e.keyCode == '38') { //up
            var inpSL = Number($('body').find('[id="soluong"]').val().replace(/,/g, ""));
            if (inpSL <= 0) {
                $('body').find('[id="soluong"]').val("0.1");
            }
            else if (inpSL < slFirst) {
                $('body').find('[id="soluong"]').val(inpSL + 1);
            }
            else if (inpSL >= slFirst) {
                $('body').find('[id="soluong"]').val(slFirst);
            }
        }
        else if (e.keyCode == '40') { //down
            var inpSL = Number($('body').find('[id="soluong"]').val().replace(/,/g, ""));
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
            $('body').find('[id="soluong"]').val('0.1');
        }
    });

});