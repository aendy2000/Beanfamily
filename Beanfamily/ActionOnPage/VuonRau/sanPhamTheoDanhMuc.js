$(document).ready(function () {
    $('body').on('click', '.list-group-item', function () {
        $('body').find('.product_items').each(function () {
            $(this).hide();
        });
        $('body').find('.load_items').prop('hidden', false);

        var id = $(this).attr('name');
        var formData = new FormData();
        formData.append('id', id);

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
});