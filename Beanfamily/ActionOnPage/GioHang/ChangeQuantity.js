$(document).ready(function () {

    $('body').on('click', '[id^="tangsoluonggiohang-"]', function () {
        var id = $(this).attr('name');
        var inpSL = Number($('body').find('[id="soluonggiohang-' + id + '"]').val());
        if ($('[id="giasanpham-' + id + '"]').attr('dongia') != "CHONPHANLOAI") {
            var chinhsuagia
        }
        if (inpSL < 100) {
            var soluong = inpSL + 1;
            var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
            if (dongia != "CHONPHANLOAI") {
                var chinhsuagia = Number(Number(dongia) * (inpSL + 1)) + "";
                if (chinhsuagia === "") { return; }

                if (chinhsuagia.indexOf(".") != -1) {

                    var decimal_pos = chinhsuagia.indexOf(".");

                    var left_side = chinhsuagia.substring(0, decimal_pos);
                    var right_side = chinhsuagia.substring(decimal_pos);

                    left_side = left_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    right_side = right_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                    right_side = right_side.substring(0, 2);
                    chinhsuagia = left_side + "." + right_side;

                } else {
                    chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    chinhsuagia = chinhsuagia;
                }
                $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
                $('body').find('[id="soluonggiohang-' + id + '"]').val(inpSL + 1);

                var formData = new FormData();
                formData.append('soluong', soluong);
                formData.append('id', id);

                $.ajax({
                    url: $('body').find('[id="requestPath"]').val() + 'muasam/updatecart',
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false,
                }).done(function (data) {
                    if (data.indexOf("Chi tiết lỗi") != -1) {
                        Swal.fire({
                            title: "Đã có lỗi xảy ra, vui lòng thử lại sau :(",
                            text: data,
                            icon: "error"
                        }).then(() => function () {
                            location.reload();
                        });
                    }
                });
            }
        }
    });
    $('body').on('click', '[id^="giamsoluonggiohang-"]', function () {
        var id = $(this).attr('name');
        var inpSL = Number($('body').find('[id="soluonggiohang-' + id + '"]').val());
        if (inpSL > 1) {
            var soluong = inpSL - 1;
            var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
            if (dongia != "CHONPHANLOAI") {
                var chinhsuagia = Number(Number(dongia) * (inpSL - 1)) + "";
                if (chinhsuagia === "") { return; }

                if (chinhsuagia.indexOf(".") != -1) {

                    var decimal_pos = chinhsuagia.indexOf(".");

                    var left_side = chinhsuagia.substring(0, decimal_pos);
                    var right_side = chinhsuagia.substring(decimal_pos);

                    left_side = left_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    right_side = right_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                    right_side = right_side.substring(0, 2);
                    chinhsuagia = left_side + "." + right_side;

                } else {
                    chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    chinhsuagia = chinhsuagia;
                }
                $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
                $('body').find('[id="soluonggiohang-' + id + '"]').val(inpSL - 1);

                var formData = new FormData();
                formData.append('soluong', soluong);
                formData.append('id', id);

                $.ajax({
                    url: $('body').find('[id="requestPath"]').val() + 'muasam/updatecart',
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false,
                }).done(function (data) {
                    if (data.indexOf("Chi tiết lỗi") != -1) {
                        Swal.fire({
                            title: "Đã có lỗi xảy ra, vui lòng thử lại sau :(",
                            text: data,
                            icon: "error"
                        }).then(() => function () {
                            location.reload();
                        });
                    }
                });
            }
        }
    });
    //$('body').on('input', '[id^="soluonggiohang-"]', function () {
    //    var inpSL = $(this).val();
    //    var id = $(this).attr('name');

    //    if (inpSL.length > 0) {
    //        if (Number(inpSL) < 1 || Number(inpSL) > 100) {
    //            inpSL = Number(1);
    //            $(this).val('1');

    //            var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
    //            if (dongia != "CHONPHANLOAI") {
    //                var chinhsuagia = Number(dongia);
    //                if (chinhsuagia === "") { return; }

    //                chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    //                chinhsuagia = chinhsuagia;

    //                $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
    //                $('body').find('[id="soluonggiohang-' + id + '"]').val(1);

    //                var formData = new FormData();
    //                formData.append('soluong', 1);
    //                formData.append('id', id);

    //                $.ajax({
    //                    url: $('body').find('[id="requestPath"]').val() + 'muasam/updatecart',
    //                    data: formData,
    //                    dataType: 'html',
    //                    type: 'POST',
    //                    processData: false,
    //                    contentType: false,
    //                }).done(function (data) {
    //                    if (data.indexOf("Chi tiết lỗi") != -1) {
    //                        Swal.fire({
    //                            title: "Đã có lỗi xảy ra, vui lòng thử lại sau :(",
    //                            text: data,
    //                            icon: "error"
    //                        }).then(() => function () {
    //                            location.reload();
    //                        });
    //                    }
    //                });
    //            }
    //        }
    //        else {
    //            var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
    //            if (dongia != "CHONPHANLOAI") {
    //                var chinhsuagia = Number(dongia) * Number(inpSL);
    //                if (chinhsuagia === "") { return; }
    //                chinhsuagia = chinhsuagia + "";
    //                chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    //                chinhsuagia = chinhsuagia;

    //                $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
    //                $('body').find('[id="soluonggiohang-' + id + '"]').val(1);

    //                var formData = new FormData();
    //                formData.append('soluong', inpSL);
    //                formData.append('id', id);

    //                $.ajax({
    //                    url: $('body').find('[id="requestPath"]').val() + 'muasam/updatecart',
    //                    data: formData,
    //                    dataType: 'html',
    //                    type: 'POST',
    //                    processData: false,
    //                    contentType: false,
    //                }).done(function (data) {
    //                    if (data.indexOf("Chi tiết lỗi") != -1) {
    //                        Swal.fire({
    //                            title: "Đã có lỗi xảy ra, vui lòng thử lại sau :(",
    //                            text: data,
    //                            icon: "error"
    //                        }).then(() => function () {
    //                            location.reload();
    //                        });
    //                    }
    //                });
    //            }
    //        }
    //    }
    //});
    $('body').on('keydown', '[id^="soluonggiohang-"]', function (e) {
        var id = $(this).attr('name');
        if (e.keyCode == '38') { //up
            var inpSL = Number($('body').find('[id^="soluonggiohang-' + id + '"]').val());
            if (inpSL < 100) {
                var soluong = inpSL - 1;
                var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
                if (dongia != "CHONPHANLOAI") {
                    var chinhsuagia = Number(Number(dongia) * (inpSL + 1)) + "";
                    if (chinhsuagia === "") { return; }

                    if (chinhsuagia.indexOf(".") != -1) {

                        var decimal_pos = chinhsuagia.indexOf(".");

                        var left_side = chinhsuagia.substring(0, decimal_pos);
                        var right_side = chinhsuagia.substring(decimal_pos);

                        left_side = left_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        right_side = right_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                        right_side = right_side.substring(0, 2);
                        chinhsuagia = left_side + "." + right_side;

                    } else {
                        chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        chinhsuagia = chinhsuagia;
                    }
                    $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohang-' + id + '"]').val(inpSL + 1);

                    var formData = new FormData();
                    formData.append('soluong', soluong);
                    formData.append('id', id);

                    $.ajax({
                        url: $('body').find('[id="requestPath"]').val() + 'muasam/updatecart',
                        data: formData,
                        dataType: 'html',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                    }).done(function (data) {
                        if (data.indexOf("Chi tiết lỗi") != -1) {
                            Swal.fire({
                                title: "Đã có lỗi xảy ra, vui lòng thử lại sau :(",
                                text: data,
                                icon: "error"
                            }).then(() => function () {
                                location.reload();
                            });
                        }
                    });
                }
            }
        }
        else if (e.keyCode == '40') { //down
            var inpSL = Number($('body').find('[id^="soluonggiohang-' + id + '"]').val());
            if (inpSL > 1) {
                var soluong = inpSL - 1;
                var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
                if (dongia != "CHONPHANLOAI") {
                    var chinhsuagia = Number(Number(dongia) * (inpSL - 1)) + "";
                    if (chinhsuagia === "") { return; }

                    if (chinhsuagia.indexOf(".") != -1) {

                        var decimal_pos = chinhsuagia.indexOf(".");

                        var left_side = chinhsuagia.substring(0, decimal_pos);
                        var right_side = chinhsuagia.substring(decimal_pos);

                        left_side = left_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        right_side = right_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                        right_side = right_side.substring(0, 2);
                        chinhsuagia = left_side + "." + right_side;

                    } else {
                        chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        chinhsuagia = chinhsuagia;
                    }
                    $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohang-' + id + '"]').val(inpSL - 1);

                    var formData = new FormData();
                    formData.append('soluong', soluong);
                    formData.append('id', id);

                    $.ajax({
                        url: $('body').find('[id="requestPath"]').val() + 'muasam/updatecart',
                        data: formData,
                        dataType: 'html',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                    }).done(function (data) {
                        if (data.indexOf("Chi tiết lỗi") != -1) {
                            Swal.fire({
                                title: "Đã có lỗi xảy ra, vui lòng thử lại sau :(",
                                text: data,
                                icon: "error"
                            }).then(() => function () {
                                location.reload();
                            });
                        }
                    });
                }
            }
        }
        else if (e.keyCode == '13') {
            $('input').blur();
        }
    });

    $('body').on('focusout', '[id^="soluonggiohang-"]', function () {
        var inpSL = $(this).val().trim();
        var id = $(this).attr('name');

        if (inpSL.length < 1) {
            $('body').find('[id="soluonggiohang-' + id + '"]').val('1');

            var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
            if (dongia != "CHONPHANLOAI") {
                var chinhsuagia = dongia + "";
                if (chinhsuagia === "") { return; }

                chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                chinhsuagia = chinhsuagia;
                $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
                $('body').find('[id="soluonggiohang-' + id + '"]').val(1);


                var formData = new FormData();
                formData.append('soluong', 1);
                formData.append('id', id);

                $.ajax({
                    url: $('body').find('[id="requestPath"]').val() + 'muasam/updatecart',
                    data: formData,
                    dataType: 'html',
                    type: 'POST',
                    processData: false,
                    contentType: false,
                }).done(function (data) {
                    if (data.indexOf("Chi tiết lỗi") != -1) {
                        Swal.fire({
                            title: "Đã có lỗi xảy ra, vui lòng thử lại sau :(",
                            text: data,
                            icon: "error"
                        }).then(() => function () {
                            location.reload();
                        });
                    }
                });
            }
        }
        else {
            if (Number(inpSL) < 1) {
                $('body').find('[id="soluonggiohang-' + id + '"]').val('1');

                var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
                if (dongia != "CHONPHANLOAI") {
                    var chinhsuagia = dongia + "";
                    if (chinhsuagia === "") { return; }

                    chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    chinhsuagia = chinhsuagia;
                    $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohang-' + id + '"]').val(1);


                    var formData = new FormData();
                    formData.append('soluong', 1);
                    formData.append('id', id);

                    $.ajax({
                        url: $('body').find('[id="requestPath"]').val() + 'muasam/updatecart',
                        data: formData,
                        dataType: 'html',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                    }).done(function (data) {
                        if (data.indexOf("Chi tiết lỗi") != -1) {
                            Swal.fire({
                                title: "Đã có lỗi xảy ra, vui lòng thử lại sau :(",
                                text: data,
                                icon: "error"
                            }).then(() => function () {
                                location.reload();
                            });
                        }
                    });
                }
            }
            else if (Number(inpSL) > 100) {
                $('body').find('[id="soluonggiohang-' + id + '"]').val('100');

                var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
                if (dongia != "CHONPHANLOAI") {
                    var chinhsuagia = Number(Number(dongia) * 100) + "";
                    if (chinhsuagia === "") { return; }

                    chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    chinhsuagia = chinhsuagia;
                    $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohang-' + id + '"]').val(100);


                    var formData = new FormData();
                    formData.append('soluong', 100);
                    formData.append('id', id);

                    $.ajax({
                        url: $('body').find('[id="requestPath"]').val() + 'muasam/updatecart',
                        data: formData,
                        dataType: 'html',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                    }).done(function (data) {
                        if (data.indexOf("Chi tiết lỗi") != -1) {
                            Swal.fire({
                                title: "Đã có lỗi xảy ra, vui lòng thử lại sau :(",
                                text: data,
                                icon: "error"
                            }).then(() => function () {
                                location.reload();
                            });
                        }
                    });
                }
            }
            else {
                $('body').find('[id="soluonggiohang-' + id + '"]').val(inpSL);

                var dongia = $('body').find('[id="giasanpham-' + id + '"]').attr('dongia');
                if (dongia != "CHONPHANLOAI") {
                    var chinhsuagia = Number(Number(dongia) * Number(inpSL)) + "";
                    if (chinhsuagia === "") { return; }

                    chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    chinhsuagia = chinhsuagia;
                    $('body').find('[id="giasanpham-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohang-' + id + '"]').val(inpSL);


                    var formData = new FormData();
                    formData.append('soluong', inpSL);
                    formData.append('id', id);

                    $.ajax({
                        url: $('body').find('[id="requestPath"]').val() + 'muasam/updatecart',
                        data: formData,
                        dataType: 'html',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                    }).done(function (data) {
                        if (data.indexOf("Chi tiết lỗi") != -1) {
                            Swal.fire({
                                title: "Đã có lỗi xảy ra, vui lòng thử lại sau :(",
                                text: data,
                                icon: "error"
                            }).then(() => function () {
                                location.reload();
                            });
                        }
                    });
                }
            }
        }
    });

});