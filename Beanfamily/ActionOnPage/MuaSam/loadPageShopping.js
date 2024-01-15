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

    $('body').find('.category_block').find('li').click(function () {
        var liClick = $(this);
        $('body').find('.category_block').find('li').each(function () {
            $(this).removeClass('active');
        });
        liClick.addClass('active');
    });

    $('body').find('[id="categoried_card"]').find('ul li:last-child').css('border-bottom-right-radius', '16px');
    $('body').find('[id="categoried_card"]').find('ul li:last-child').css('border-bottom-left-radius', '16px');
});