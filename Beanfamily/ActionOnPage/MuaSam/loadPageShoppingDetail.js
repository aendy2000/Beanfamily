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
        fade: true,
        dots: true,
        appendDots: $('.wrap-slick1-dots'),
        dotsClass: 'slick1-dots',
        infinite: true,
        autoplay: false,
        autoplaySpeed: 6000,
        arrows: false,
        appendArrows: $('.wrap-slick1'),
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

    var slFirst = $('body').find('[id="selectloai"] :selected').attr('tonkhosoluong');
    var giaFirst = $('body').find('[id="selectloai"] :selected').attr('tonkhogia');

    $('body').find('[id="soluong-tonkho"]').text('Kho: ' + slFirst + ' sản phẩm');
    $('body').find('[id="gia-tonkho"]').text(giaFirst + 'đ');

    $('body').on('change', '[id="selectloai"]', function () {
        var sl = $(this).find('option:selected').attr('tonkhosoluong');
        var gia = $(this).find('option:selected').attr('tonkhogia');
        $('body').find('[id="soluong-tonkho"]').text('Kho: ' + sl + ' sản phẩm');
        $('body').find('[id="gia-tonkho"]').text(gia + 'đ');
    });

    $('body').on('click', '[id="button-addon-product"]', function () {
        var inpSL = Number($('body').find('[id="soluong"]').val());
        if (inpSL < 100) {
            $('body').find('[id="soluong"]').val(inpSL + 1);
        }
    });
    $('body').on('click', '[id="button-minus-product"]', function () {
        var inpSL = Number($('body').find('[id="soluong"]').val());
        if (inpSL > 1) {
            $('body').find('[id="soluong"]').val(inpSL - 1);
        }
    });
    $('body').on('input', '[id="soluong"]', function () {
        var sl = $(this).val();
        if (sl.length > 0) {
            if (Number(sl) < 1 || Number(sl) > 100) {
                $(this).val('1');
            }
        }
    });
    $('body').on('keydown', '[id="soluong"]', function (e) {
        if (e.keyCode == '38') { //up
            var inpSL = Number($('body').find('[id="soluong"]').val());
            if (inpSL < 100) {
                $('body').find('[id="soluong"]').val(inpSL + 1);
            }
        }
        else if (e.keyCode == '40') { //down
            var inpSL = Number($('body').find('[id="soluong"]').val());
            if (inpSL > 1) {
                $('body').find('[id="soluong"]').val(inpSL - 1);
            }
        }
    });

    $('body').on('focusout', '[id="soluong"]', function () {
        if ($(this).val().trim().length < 1) {
            $('body').find('[id="soluong"]').val('1');
        }
    });

});