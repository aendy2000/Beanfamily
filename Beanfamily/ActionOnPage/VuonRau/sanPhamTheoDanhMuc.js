$(document).ready(function () {
    $('body').on('click', '.list-group-item', function () {
        $('body').find('.product_items').each(function () {
            $(this).hide();
        });
        $('body').find('.load_items').prop('hidden', false);

        var id = $(this).attr('name');
        var formData = new FormData();
        formData.append('id', id);
        formData.append('search', $('body').find('[id="data-timkiem"]').val());

        $.ajax({
            url: $('body').find('[id="requestPath"]').val() + "vuonrau/getproductoncategories",
            data: formData,
            type: 'POST',
            dataType: 'html',
            processData: false,
            contentType: false,
        }).done(function (data) {
            if (data == "empty") {
                window.location.reload();
            }
            else {
                $('body').find('[id="product_list"]').replaceWith(data);
            }
        });
    });

    $('body').on('click', '[id="btnTimkiem"]', function () {
        var search = $('body').find('[id="inptimkiem"]').val();
        if (search.trim().length < 1) {
            window.location.reload();
        }
        else {
            $('body').find('[id="data-timkiem"]').val(search.trim());

            $('body').find('.product_items').each(function () {
                $(this).hide();
            });
            $('body').find('.load_items').prop('hidden', false);
            $('html, body').animate({
                scrollTop: $('body').find('.title_product_items').offset().top
            }, 400);

            var formData = new FormData();
            formData.append('search', search.trim());

            $.ajax({
                url: $('body').find('[id="requestPath"]').val() + "vuonrau/searchproduct",
                data: formData,
                type: 'POST',
                dataType: 'html',
                processData: false,
                contentType: false,
            }).done(function (data) {
                $('body').find('.category_block').find('li').each(function () {
                    var li = $(this);
                    if (li.attr('name') == "tatca") {
                        $(this).removeClass('active');
                        $(this).addClass('active');
                    }
                    else {
                        $(this).removeClass('active');
                    }
                });

                $('body').find('[id="title-product-list"]').text('Kết quả tìm kiếm cho: ' + search.trim());
                $('body').find('[id="product_list"]').replaceWith(data);
            });
        }
    });
});