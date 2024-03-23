$(document).ready(function () {
    $('body').find('.main_menu').find('a').each(function () {
        var tagA = $(this);
        if (tagA.attr('class') == "active") {
            tagA.attr('class', '');
        }
        if (tagA.text() == "Mua sắm") {
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

    var slFirst = $('body').find('[id="selectloai"] :selected').attr('tonkhosoluong');
    var giaFirst = $('body').find('[id="selectloai"] :selected').attr('tonkhogia');

    $('body').find('[id="soluong-tonkho"]').text('Kho: ' + slFirst + ' sản phẩm');
    $('body').find('[id="gia-tonkho"]').text(giaFirst + 'đ');

    $('body').on('change', '[id="selectloai"]', function () {
        var sl = $(this).find('option:selected').attr('tonkhosoluong');
        var gia = $(this).find('option:selected').attr('tonkhogia');

        slFirst = Number(sl);
        giaFirst = Number(gia);

        $('body').find('[id="soluong-tonkho"]').text('Kho: ' + sl + ' sản phẩm');
        $('body').find('[id="gia-tonkho"]').text(gia + 'đ');

        if (sl < 1) {
            $('body').find('[id="soluong"]').val(0).prop('disabled', true);
            $('body').find('[id="button-addon-product"]').prop('disabled', true);
            $('body').find('[id="button-minus-product"]').prop('disabled', true);
            
            $('body').find('[id="trangthaihang"]').attr('class', 'text-danger').text('Hết hàng');
            $('body').find('[id="addToCart"]').prop('disabled', true);

        }
        else {
            $('body').find('[id="soluong"]').val(1).prop('disabled', false);
            $('body').find('[id="button-addon-product"]').prop('disabled', false);
            $('body').find('[id="button-minus-product"]').prop('disabled', false);

            $('body').find('[id="trangthaihang"]').attr('class', 'text-success').text('Còn hàng');
            $('body').find('[id="addToCart"]').prop('disabled', false);
        }
    });

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

});