$(document).ready(function () {
    $('body').find('[id="tienhanhdathangBtn"]').on('click', function () {

    });

    $('body').find('[id="giaotannoi"]').on('change', function () {
        var check = $(this).prop('checked');
        if (check == true) {
            $('body').find('[id="chongiaotannoi"]').prop('hidden', false);
            $('body').find('[id="chontaicuahang"]').prop('hidden', true);
        }
    });
    $('body').find('[id="taicuahang"]').on('change', function () {
        var check = $(this).prop('checked');
        if (check == true) {
            $('body').find('[id="chongiaotannoi"]').prop('hidden', true);
            $('body').find('[id="chontaicuahang"]').prop('hidden', false);
        }
    });
});