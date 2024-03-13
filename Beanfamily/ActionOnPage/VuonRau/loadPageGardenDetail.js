$(document).ready(function () {
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
        fade: true,
        dots: true,
        appendDots: $('body').find('.wrap-slick1-dots'),
        dotsClass: 'slick1-dots',
        infinite: true,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false,
        appendArrows: $('body').find('.wrap-slick1'),
        prevArrow: '<button class="wrap-slick1 arrow-slick1 prev-slick1"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button class="wrap-slick1 arrow-slick1 next-slick1"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        asNavFor: '.slider-nav'
    });
    $('body').find('.slider-nav').slick({
        slidesToShow: $('body').find('[id="totalImagePro"]').val(),
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        focusOnSelect: true,
        arrows: false,
        prevArrow: '<button class="arrow-slick1 prev-slick1"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button class="arrow-slick1 next-slick1"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
    });

    var slFirst = Number($('body').find('[id="selectloai"] :selected').attr('tonkhosoluong'));
    var giaFirst = Number($('body').find('[id="selectloai"] :selected').attr('tonkhogia'));
    var donvi = $('body').find('[id="selectloai"] :selected').attr('donvi');

    $('body').find('[id="soluong-tonkho"]').text('Kho: ' + slFirst + ' ' + donvi);
    $('body').find('[id="gia-tonkho"]').text(giaFirst + 'đ');

    $('body').on('change', '[id="selectloai"]', function () {
        var sl = $(this).find('option:selected').attr('tonkhosoluong');
        var gia = $(this).find('option:selected').attr('tonkhogia');

        slFirst = Number(sl);
        giaFirst = Number(gia);

        $('body').find('[id="soluong-tonkho"]').text('Kho: ' + sl + ' ' + donvi);
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