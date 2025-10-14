$(document).ready(function () {
    function formatNumber(n) {
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    $('body').find('.main_menu').find('a').each(function () {
        var tagA = $(this);
        if (tagA.attr('class') == "active") {
            tagA.attr('class', '');
        }
        if (tagA.text().toLowerCase() == "vườn rau") {
            tagA.addClass('active');
        }
    });
    $('body').find('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        fade: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
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