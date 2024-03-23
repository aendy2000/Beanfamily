$(document).ready(function () {
    //Giỏ hàng mua sắm
    $('body').on('click', '[id^="tangsoluonggiohangmuasam-"]', function () {
        var id = $(this).attr('name');
        if ($('[id="giasanphammuasam-' + id + '"]').attr('dongia') != "CHONPHANLOAI") {
            var inpSL = Number($('body').find('[id="soluonggiohangmuasam-' + id + '"]').val());
            var tonKhoConLai = Number($('body').find('[id="soluonggiohangmuasam-' + id + '"]').attr('tonkho'));
            $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('');

            if (tonKhoConLai >= (inpSL + 1) && inpSL < 100) {

                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);

                var soluong = inpSL + 1;
                var dongia = $('body').find('[id="giasanphammuasam-' + id + '"]').attr('dongia');
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

                    $('body').find('[id="giasanphammuasam-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(inpSL + 1);

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
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (data.indexOf('SUCCESS') != -1) {
                            var tonkhohientai = Number(data.split('-')[1]);
                            if (soluong > tonkhohientai) {
                                var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                if (rechinhsuagia === "") { return; }

                                if (rechinhsuagia.indexOf(".") != -1) {

                                    var redecimal_pos = rechinhsuagia.indexOf(".");

                                    var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                    var reright_side = rechinhsuagia.substring(redecimal_pos);

                                    releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                    reright_side = reright_side.substring(0, 2);
                                    rechinhsuagia = releft_side + "." + right_side;

                                } else {
                                    rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    rechinhsuagia = rechinhsuagia;
                                }

                                $('body').find('[id="giasanphammuasam-' + id + '"]').text(rechinhsuagia + "đ");
                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(tonkhohientai);
                                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn ' + tonkhohientai + ' sản phẩm!');
                            }

                            $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                            $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                            $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                        }
                        else if (data == "HETHANG") {
                            $('body').find('[id="giasanphammuasam-' + id + '"]').text("0đ");
                            $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(0);
                            $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn 0 sản phẩm!');
                        }
                    });
                }
            }
            else if (inpSL >= 100) {
                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Mua tối đa\n100 sản phẩm!');
            }
            else {
                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn ' + tonKhoConLai + ' sản phẩm!');
            }
        }
    });
    $('body').on('click', '[id^="giamsoluonggiohangmuasam-"]', function () {
        var id = $(this).attr('name');
        if ($('[id="giasanphammuasam-' + id + '"]').attr('dongia') != "CHONPHANLOAI") {

            var inpSL = Number($('body').find('[id="soluonggiohangmuasam-' + id + '"]').val());
            var tonKhoConLai = Number($('body').find('[id="soluonggiohangmuasam-' + id + '"]').attr('tonkho'));
            $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('');

            if (inpSL > 1 && inpSL <= tonKhoConLai) {

                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);

                var soluong = inpSL - 1;
                var dongia = $('body').find('[id="giasanphammuasam-' + id + '"]').attr('dongia');
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
                    $('body').find('[id="giasanphammuasam-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(inpSL - 1);

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
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (data.indexOf('SUCCESS') != -1) {
                            var tonkhohientai = Number(data.split('-')[1]);
                            if (soluong > tonkhohientai) {
                                var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                if (rechinhsuagia === "") { return; }

                                if (rechinhsuagia.indexOf(".") != -1) {

                                    var redecimal_pos = rechinhsuagia.indexOf(".");

                                    var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                    var reright_side = rechinhsuagia.substring(redecimal_pos);

                                    releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                    reright_side = reright_side.substring(0, 2);
                                    rechinhsuagia = releft_side + "." + right_side;

                                } else {
                                    rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    rechinhsuagia = rechinhsuagia;
                                }

                                $('body').find('[id="giasanphammuasam-' + id + '"]').text(rechinhsuagia + "đ");
                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(tonkhohientai);
                                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn ' + tonkhohientai + ' sản phẩm!');
                            }

                            $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                            $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                            $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                        }
                        else if (data == "HETHANG") {
                            $('body').find('[id="giasanphammuasam-' + id + '"]').text("0đ");
                            $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(0);
                            $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn 0 sản phẩm!');
                        }
                    });
                }
            }
            else if (inpSL <= 1) {
                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Mua tối thiểu\n1 sản phẩm!');
            }
            else {
                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn ' + tonKhoConLai + ' sản phẩm!');
            }
        }
    });
    $('body').on('keydown', '[id^="soluonggiohangmuasam-"]', function (e) {
        var id = $(this).attr('name');
        if (e.keyCode == '38') { //up
            if ($('[id="giasanphammuasam-' + id + '"]').attr('dongia') != "CHONPHANLOAI") {

                var inpSL = Number($('body').find('[id^="soluonggiohangmuasam-' + id + '"]').val());
                var tonKhoConLai = Number($('body').find('[id="soluonggiohangmuasam-' + id + '"]').attr('tonkho'));
                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('');

                if (tonKhoConLai >= (inpSL + 1) && inpSL < 100) {

                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);

                    var soluong = inpSL - 1;
                    var dongia = $('body').find('[id="giasanphammuasam-' + id + '"]').attr('dongia');
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
                        $('body').find('[id="giasanphammuasam-' + id + '"]').text(chinhsuagia + "đ");
                        $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(inpSL + 1);

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
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (data.indexOf('SUCCESS') != -1) {
                                var tonkhohientai = Number(data.split('-')[1]);
                                if (soluong > tonkhohientai) {
                                    var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                    if (rechinhsuagia === "") { return; }

                                    if (rechinhsuagia.indexOf(".") != -1) {

                                        var redecimal_pos = rechinhsuagia.indexOf(".");

                                        var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                        var reright_side = rechinhsuagia.substring(redecimal_pos);

                                        releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                        reright_side = reright_side.substring(0, 2);
                                        rechinhsuagia = releft_side + "." + right_side;

                                    } else {
                                        rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        rechinhsuagia = rechinhsuagia;
                                    }

                                    $('body').find('[id="giasanphammuasam-' + id + '"]').text(rechinhsuagia + "đ");
                                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(tonkhohientai);
                                    $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn ' + tonkhohientai + ' sản phẩm!');
                                }

                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                                $('body').find('[id^="soluonggiohangmuasam-' + id + '"]').focus();

                            }
                            else if (data == "HETHANG") {
                                $('body').find('[id="giasanphammuasam-' + id + '"]').text("0đ");
                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(0);
                                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn 0 sản phẩm!');
                            }
                        });
                    }
                }
                else if (inpSL >= 100) {
                    $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Mua tối đa\n100 sản phẩm!');
                }
                else {
                    $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn ' + tonKhoConLai + ' sản phẩm!');
                }
            }
        }
        else if (e.keyCode == '40') { //down
            if ($('[id="giasanphamvuonrau-' + id + '"]').attr('dongia') != "CHONPHANLOAI") {
                var inpSL = Number($('body').find('[id^="soluonggiohangvuonrau-' + id + '"]').val());
                var tonKhoConLai = Number($('body').find('[id="soluonggiohangvuonrau-' + id + '"]').attr('tonkho'));
                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('');

                if (inpSL > 1 && inpSL <= tonKhoConLai) {

                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);

                    var soluong = inpSL - 1;
                    var dongia = $('body').find('[id="giasanphamvuonrau-' + id + '"]').attr('dongia');
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
                        $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(chinhsuagia + "đ");
                        $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(inpSL - 1);

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
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (data.indexOf('SUCCESS') != -1) {
                                var tonkhohientai = Number(data.split('-')[1]);
                                if (soluong > tonkhohientai) {
                                    var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                    if (rechinhsuagia === "") { return; }

                                    if (rechinhsuagia.indexOf(".") != -1) {

                                        var redecimal_pos = rechinhsuagia.indexOf(".");

                                        var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                        var reright_side = rechinhsuagia.substring(redecimal_pos);

                                        releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                        reright_side = reright_side.substring(0, 2);
                                        rechinhsuagia = releft_side + "." + right_side;

                                    } else {
                                        rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        rechinhsuagia = rechinhsuagia;
                                    }

                                    $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(rechinhsuagia + "đ");
                                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(tonkhohientai);
                                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonkhohientai + ' sản phẩm!');
                                }

                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id^="soluonggiohangvuonrau-' + id + '"]').focus();

                            }
                            else if (data == "HETHANG") {
                                $('body').find('[id="giasanphamvuonrau-' + id + '"]').text("0đ");
                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(0);
                                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn 0 sản phẩm!');
                            }
                        });
                    }
                }
                else if (inpSL <= 1) {
                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Mua tối thiểu\n1 sản phẩm!');
                }
                else {
                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonKhoConLai + ' sản phẩm!');
                }
            }
        }
        else if (e.keyCode == '13') {
            $('input').blur();
        }
    });
    $('body').on('focusout', '[id^="soluonggiohangmuasam-"]', function () {
        var id = $(this).attr('name');
        if ($('[id="giasanphammuasam-' + id + '"]').attr('dongia') != "CHONPHANLOAI") {
            var inpSL = $(this).val().trim();
            var tonKhoConLai = Number($('body').find('[id="soluonggiohangmuasam-' + id + '"]').attr('tonkho'));
            $('body').find('[id="thongbaosoluongmuasammuasam-' + id + '"]').text('');

            if (inpSL.length < 1) {
                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);

                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val('1');
                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Mua tối thiểu\n1 sản phẩm!');

                var dongia = $('body').find('[id="giasanphammuasam-' + id + '"]').attr('dongia');
                if (dongia != "CHONPHANLOAI") {
                    var chinhsuagia = dongia + "";
                    if (chinhsuagia === "") { return; }

                    chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    chinhsuagia = chinhsuagia;
                    $('body').find('[id="giasanphammuasam-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(1);


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
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (data.indexOf('SUCCESS') != -1) {
                            var tonkhohientai = Number(data.split('-')[1]);
                            if (1 > tonkhohientai) {
                                var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                if (rechinhsuagia === "") { return; }

                                if (rechinhsuagia.indexOf(".") != -1) {

                                    var redecimal_pos = rechinhsuagia.indexOf(".");

                                    var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                    var reright_side = rechinhsuagia.substring(redecimal_pos);

                                    releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                    reright_side = reright_side.substring(0, 2);
                                    rechinhsuagia = releft_side + "." + right_side;

                                } else {
                                    rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    rechinhsuagia = rechinhsuagia;
                                }

                                $('body').find('[id="giasanphammuasam-' + id + '"]').text(rechinhsuagia + "đ");
                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(tonkhohientai);
                                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn ' + tonkhohientai + ' sản phẩm!');
                            }

                            $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                            $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                            $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);

                        }
                        else if (data == "HETHANG") {
                            $('body').find('[id="giasanphammuasam-' + id + '"]').text("0đ");
                            $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(0);
                            $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn 0 sản phẩm!');
                        }
                    });
                }
            }
            else {
                if (Number(inpSL) < 1) {
                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);

                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val('1');
                    $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Mua tối thiểu\n1 sản phẩm!');

                    var dongia = $('body').find('[id="giasanphammuasam-' + id + '"]').attr('dongia');
                    if (dongia != "CHONPHANLOAI") {
                        var chinhsuagia = dongia + "";
                        if (chinhsuagia === "") { return; }

                        chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        chinhsuagia = chinhsuagia;
                        $('body').find('[id="giasanphammuasam-' + id + '"]').text(chinhsuagia + "đ");
                        $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(1);


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
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (data.indexOf('SUCCESS') != -1) {
                                var tonkhohientai = Number(data.split('-')[1]);
                                if (1 > tonkhohientai) {
                                    var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                    if (rechinhsuagia === "") { return; }

                                    if (rechinhsuagia.indexOf(".") != -1) {

                                        var redecimal_pos = rechinhsuagia.indexOf(".");

                                        var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                        var reright_side = rechinhsuagia.substring(redecimal_pos);

                                        releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                        reright_side = reright_side.substring(0, 2);
                                        rechinhsuagia = releft_side + "." + right_side;

                                    } else {
                                        rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        rechinhsuagia = rechinhsuagia;
                                    }

                                    $('body').find('[id="giasanphammuasam-' + id + '"]').text(rechinhsuagia + "đ");
                                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(tonkhohientai);
                                    $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn ' + tonkhohientai + ' sản phẩm!');
                                }

                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);

                            }
                            else if (data == "HETHANG") {
                                $('body').find('[id="giasanphammuasam-' + id + '"]').text("0đ");
                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(0);
                                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn 0 sản phẩm!');
                            }
                        });
                    }
                }
                else if (tonKhoConLai < 100 && Number(inpSL) > tonKhoConLai) {
                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);

                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(tonKhoConLai);
                    $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn ' + tonKhoConLai + ' sản phẩm!');

                    var dongia = $('body').find('[id="giasanphammuasam-' + id + '"]').attr('dongia');
                    if (dongia != "CHONPHANLOAI") {
                        var chinhsuagia = Number(Number(dongia) * Number(tonKhoConLai)) + "";
                        if (chinhsuagia === "") { return; }

                        chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        chinhsuagia = chinhsuagia;
                        $('body').find('[id="giasanphammuasam-' + id + '"]').text(chinhsuagia + "đ");
                        $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(tonKhoConLai);


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
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (data.indexOf('SUCCESS') != -1) {
                                var tonkhohientai = Number(data.split('-')[1]);
                                if (tonKhoConLai > tonkhohientai) {
                                    var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                    if (rechinhsuagia === "") { return; }

                                    if (rechinhsuagia.indexOf(".") != -1) {

                                        var redecimal_pos = rechinhsuagia.indexOf(".");

                                        var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                        var reright_side = rechinhsuagia.substring(redecimal_pos);

                                        releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                        reright_side = reright_side.substring(0, 2);
                                        rechinhsuagia = releft_side + "." + right_side;

                                    } else {
                                        rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        rechinhsuagia = rechinhsuagia;
                                    }

                                    $('body').find('[id="giasanphammuasam-' + id + '"]').text(rechinhsuagia + "đ");
                                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(tonkhohientai);
                                    $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn ' + tonkhohientai + ' sản phẩm!');
                                }

                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);

                            }
                            else if (data == "HETHANG") {
                                $('body').find('[id="giasanphammuasam-' + id + '"]').text("0đ");
                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(0);
                                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn 0 sản phẩm!');
                            }
                        });
                    }
                }
                else if (Number(inpSL) > 100 && tonKhoConLai >= 100) {
                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);

                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val('100');
                    $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Mua tối đa\n100 sản phẩm!');

                    var dongia = $('body').find('[id="giasanphammuasam-' + id + '"]').attr('dongia');
                    if (dongia != "CHONPHANLOAI") {
                        var chinhsuagia = Number(Number(dongia) * 100) + "";
                        if (chinhsuagia === "") { return; }

                        chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        chinhsuagia = chinhsuagia;
                        $('body').find('[id="giasanphammuasam-' + id + '"]').text(chinhsuagia + "đ");
                        $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(100);


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
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (data.indexOf('SUCCESS') != -1) {
                                var tonkhohientai = Number(data.split('-')[1]);
                                if (100 > tonkhohientai) {
                                    var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                    if (rechinhsuagia === "") { return; }

                                    if (rechinhsuagia.indexOf(".") != -1) {

                                        var redecimal_pos = rechinhsuagia.indexOf(".");

                                        var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                        var reright_side = rechinhsuagia.substring(redecimal_pos);

                                        releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                        reright_side = reright_side.substring(0, 2);
                                        rechinhsuagia = releft_side + "." + right_side;

                                    } else {
                                        rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        rechinhsuagia = rechinhsuagia;
                                    }

                                    $('body').find('[id="giasanphammuasam-' + id + '"]').text(rechinhsuagia + "đ");
                                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(tonkhohientai);
                                    $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn ' + tonkhohientai + ' sản phẩm!');
                                }

                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);

                            }
                            else if (data == "HETHANG") {
                                $('body').find('[id="giasanphammuasam-' + id + '"]').text("0đ");
                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(0);
                                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn 0 sản phẩm!');
                            }
                        });
                    }
                }
                else {
                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', true);

                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(inpSL);

                    var dongia = $('body').find('[id="giasanphammuasam-' + id + '"]').attr('dongia');
                    if (dongia != "CHONPHANLOAI") {
                        var chinhsuagia = Number(Number(dongia) * Number(inpSL)) + "";
                        if (chinhsuagia === "") { return; }

                        chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        chinhsuagia = chinhsuagia;
                        $('body').find('[id="giasanphammuasam-' + id + '"]').text(chinhsuagia + "đ");
                        $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(inpSL);


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
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (data.indexOf('SUCCESS') != -1) {
                                var tonkhohientai = Number(data.split('-')[1]);
                                if (inpSL > tonkhohientai) {
                                    var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                    if (rechinhsuagia === "") { return; }

                                    if (rechinhsuagia.indexOf(".") != -1) {

                                        var redecimal_pos = rechinhsuagia.indexOf(".");

                                        var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                        var reright_side = rechinhsuagia.substring(redecimal_pos);

                                        releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                        reright_side = reright_side.substring(0, 2);
                                        rechinhsuagia = releft_side + "." + right_side;

                                    } else {
                                        rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        rechinhsuagia = rechinhsuagia;
                                    }

                                    $('body').find('[id="giasanphammuasam-' + id + '"]').text(rechinhsuagia + "đ");
                                    $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(tonkhohientai);
                                    $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn ' + tonkhohientai + ' sản phẩm!');
                                }

                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="tangsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="giamsoluonggiohangmuasam-' + id + '"]').prop('disabled', false);

                            }
                            else if (data == "HETHANG") {
                                $('body').find('[id="giasanphammuasam-' + id + '"]').text("0đ");
                                $('body').find('[id="soluonggiohangmuasam-' + id + '"]').val(0);
                                $('body').find('[id="thongbaosoluongmuasam-' + id + '"]').text('Kho còn 0 sản phẩm!');
                            }
                        });
                    }
                }
            }
        }
    });

    //Giỏ hàng vườn rau
    $('body').on('click', '[id^="tangsoluonggiohangvuonrau-"]', function () {
        var id = $(this).attr('name');
        var donvi = $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').attr('donvi');

        if ($('[id="giasanphamvuonrau-' + id + '"]').attr('dongia') != "CHONPHANLOAI") {
            var inpSL = Number($('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val().replace(/,/g, ""));
            var tonKhoConLai = Number($('body').find('[id="soluonggiohangvuonrau-' + id + '"]').attr('tonkho'));
            $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('');

            if (tonKhoConLai >= (inpSL + 1) && inpSL < 100) {

                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);

                var soluong = inpSL + 1;
                var dongia = $('body').find('[id="giasanphamvuonrau-' + id + '"]').attr('dongia');
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

                    $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(inpSL + 1);

                    var formData = new FormData();
                    formData.append('soluong', soluong);
                    formData.append('id', id);

                    $.ajax({
                        url: $('body').find('[id="requestPath"]').val() + 'vuonrau/updatecart',
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
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (data.indexOf('SUCCESS') != -1) {
                            var tonkhohientai = Number(data.split('-')[1]);
                            if (soluong > tonkhohientai) {
                                var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                if (rechinhsuagia === "") { return; }

                                if (rechinhsuagia.indexOf(".") != -1) {

                                    var redecimal_pos = rechinhsuagia.indexOf(".");

                                    var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                    var reright_side = rechinhsuagia.substring(redecimal_pos);

                                    releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                    reright_side = reright_side.substring(0, 2);
                                    rechinhsuagia = releft_side + "." + right_side;

                                } else {
                                    rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    rechinhsuagia = rechinhsuagia;
                                }

                                $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(rechinhsuagia + "đ");
                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(tonkhohientai);
                                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonkhohientai + " " + donvi + '!');
                            }

                            $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                            $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                            $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                        }
                        else if (data == "HETHANG") {
                            $('body').find('[id="giasanphamvuonrau-' + id + '"]').text("0đ");
                            $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(0);
                            $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn 0 ' + donvi + '!');
                        }
                    });
                }
            }
            else if (inpSL >= 100) {
                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Mua tối đa\n100 ' + donvi + '!');
            }
            else {
                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonKhoConLai + " " + donvi + '!');
            }
        }
    });
    $('body').on('click', '[id^="giamsoluonggiohangvuonrau-"]', function () {
        var id = $(this).attr('name');
        var donvi = $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').attr('donvi');
        if ($('[id="giasanphamvuonrau-' + id + '"]').attr('dongia') != "CHONPHANLOAI") {

            var inpSL = Number($('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val().replace(/,/g, ""));
            var tonKhoConLai = Number($('body').find('[id="soluonggiohangvuonrau-' + id + '"]').attr('tonkho'));
            $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('');

            if (inpSL > 1 && inpSL <= tonKhoConLai) {

                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);

                var soluong = inpSL - 1;
                var dongia = $('body').find('[id="giasanphamvuonrau-' + id + '"]').attr('dongia');
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
                    $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(inpSL - 1);

                    var formData = new FormData();
                    formData.append('soluong', soluong);
                    formData.append('id', id);

                    $.ajax({
                        url: $('body').find('[id="requestPath"]').val() + 'vuonrau/updatecart',
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
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (data.indexOf('SUCCESS') != -1) {
                            var tonkhohientai = Number(data.split('-')[1]);
                            if (soluong > tonkhohientai) {
                                var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                if (rechinhsuagia === "") { return; }

                                if (rechinhsuagia.indexOf(".") != -1) {

                                    var redecimal_pos = rechinhsuagia.indexOf(".");

                                    var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                    var reright_side = rechinhsuagia.substring(redecimal_pos);

                                    releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                    reright_side = reright_side.substring(0, 2);
                                    rechinhsuagia = releft_side + "." + right_side;

                                } else {
                                    rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    rechinhsuagia = rechinhsuagia;
                                }

                                $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(rechinhsuagia + "đ");
                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(tonkhohientai);
                                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonkhohientai + " " + donvi + '!');
                            }

                            $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                            $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                            $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                        }
                        else if (data == "HETHANG") {
                            $('body').find('[id="giasanphamvuonrau-' + id + '"]').text("0đ");
                            $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(0);
                            $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn 0 ' + donvi + '!');
                        }
                    });
                }
            }
            else if (inpSL <= 0.1) {
                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Mua tối thiểu\n0.1 ' + donvi + '!');
            }
            else {
                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonKhoConLai + " " + donvi + '!');
            }
        }
    });
    $('body').on('keydown', '[id^="soluonggiohangvuonrau-"]', function (e) {
        var id = $(this).attr('name');
        var donvi = $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').attr('donvi');

        if (e.keyCode == '38') { //up
            if ($('[id="giasanphamvuonrau-' + id + '"]').attr('dongia') != "CHONPHANLOAI") {

                var inpSL = Number($('body').find('[id^="soluonggiohangvuonrau-' + id + '"]').val().replace(/,/g, ""));
                var tonKhoConLai = Number($('body').find('[id="soluonggiohangvuonrau-' + id + '"]').attr('tonkho'));
                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('');

                if (tonKhoConLai >= (inpSL + 1) && inpSL < 100) {

                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);

                    var soluong = inpSL - 1;
                    var dongia = $('body').find('[id="giasanphamvuonrau-' + id + '"]').attr('dongia');
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
                        $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(chinhsuagia + "đ");
                        $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(inpSL + 1);

                        var formData = new FormData();
                        formData.append('soluong', soluong);
                        formData.append('id', id);

                        $.ajax({
                            url: $('body').find('[id="requestPath"]').val() + 'vuonrau/updatecart',
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
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (data.indexOf('SUCCESS') != -1) {
                                var tonkhohientai = Number(data.split('-')[1]);
                                if (soluong > tonkhohientai) {
                                    var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                    if (rechinhsuagia === "") { return; }

                                    if (rechinhsuagia.indexOf(".") != -1) {

                                        var redecimal_pos = rechinhsuagia.indexOf(".");

                                        var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                        var reright_side = rechinhsuagia.substring(redecimal_pos);

                                        releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                        reright_side = reright_side.substring(0, 2);
                                        rechinhsuagia = releft_side + "." + right_side;

                                    } else {
                                        rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        rechinhsuagia = rechinhsuagia;
                                    }

                                    $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(rechinhsuagia + "đ");
                                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(tonkhohientai);
                                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonkhohientai + " " + donvi + '!');
                                }

                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id^="soluonggiohangvuonrau-' + id + '"]').focus();

                            }
                            else if (data == "HETHANG") {
                                $('body').find('[id="giasanphamvuonrau-' + id + '"]').text("0đ");
                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(0);
                                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn 0 ' + donvi + '!');
                            }
                        });
                    }
                }
                else if (inpSL >= 100) {
                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Mua tối đa\n100 ' + donvi + '!');
                }
                else {
                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonKhoConLai + " " + donvi + '!');
                }
            }
        }
        else if (e.keyCode == '40') { //down
            if ($('[id="giasanphamvuonrau-' + id + '"]').attr('dongia') != "CHONPHANLOAI") {
                var inpSL = Number($('body').find('[id^="soluonggiohangvuonrau-' + id + '"]').val().replace(/,/g, ""));
                var tonKhoConLai = Number($('body').find('[id="soluonggiohangvuonrau-' + id + '"]').attr('tonkho'));
                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('');

                if (inpSL > 1 && inpSL <= tonKhoConLai) {

                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);

                    var soluong = inpSL - 1;
                    var dongia = $('body').find('[id="giasanphamvuonrau-' + id + '"]').attr('dongia');
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
                        $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(chinhsuagia + "đ");
                        $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(inpSL - 1);

                        var formData = new FormData();
                        formData.append('soluong', soluong);
                        formData.append('id', id);

                        $.ajax({
                            url: $('body').find('[id="requestPath"]').val() + 'vuonrau/updatecart',
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
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (data.indexOf('SUCCESS') != -1) {
                                var tonkhohientai = Number(data.split('-')[1]);
                                if (soluong > tonkhohientai) {
                                    var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                    if (rechinhsuagia === "") { return; }

                                    if (rechinhsuagia.indexOf(".") != -1) {

                                        var redecimal_pos = rechinhsuagia.indexOf(".");

                                        var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                        var reright_side = rechinhsuagia.substring(redecimal_pos);

                                        releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                        reright_side = reright_side.substring(0, 2);
                                        rechinhsuagia = releft_side + "." + right_side;

                                    } else {
                                        rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        rechinhsuagia = rechinhsuagia;
                                    }

                                    $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(rechinhsuagia + "đ");
                                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(tonkhohientai);
                                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonkhohientai + " " + donvi + '!');
                                }

                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id^="soluonggiohangvuonrau-' + id + '"]').focus();

                            }
                            else if (data == "HETHANG") {
                                $('body').find('[id="giasanphamvuonrau-' + id + '"]').text("0đ");
                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(0);
                                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn 0 ' + donvi + '!');
                            }
                        });
                    }
                }
                else if (inpSL <= 1) {
                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Mua tối thiểu\n1 ' + donvi + '!');
                }
                else {
                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonkhohientai + " " + donvi + '!');
                }
            }
        }
        else if (e.keyCode == '13') {
            $('input').blur();
        }
    });
    $('body').on('focusout', '[id^="soluonggiohangvuonrau-"]', function () {
        var id = $(this).attr('name');
        var donvi = $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').attr('donvi');

        if ($('[id="giasanphamvuonrau-' + id + '"]').attr('dongia') != "CHONPHANLOAI") {
            var inpSL = $(this).val().trim().replace(/,/g, "");
            var tonKhoConLai = Number($('body').find('[id="soluonggiohangvuonrau-' + id + '"]').attr('tonkho'));
            $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('');

            if (inpSL.length < 1) {
                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);

                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val('1');
                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Mua tối thiểu\n1 ' + donvi + '!');

                var dongia = $('body').find('[id="giasanphamvuonrau-' + id + '"]').attr('dongia');
                if (dongia != "CHONPHANLOAI") {
                    var chinhsuagia = dongia + "";
                    if (chinhsuagia === "") { return; }

                    chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    chinhsuagia = chinhsuagia;
                    $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(chinhsuagia + "đ");
                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(1);


                    var formData = new FormData();
                    formData.append('soluong', 1);
                    formData.append('id', id);

                    $.ajax({
                        url: $('body').find('[id="requestPath"]').val() + 'vuonrau/updatecart',
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
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (data.indexOf('SUCCESS') != -1) {
                            var tonkhohientai = Number(data.split('-')[1]);
                            if (1 > tonkhohientai) {
                                var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                if (rechinhsuagia === "") { return; }

                                if (rechinhsuagia.indexOf(".") != -1) {

                                    var redecimal_pos = rechinhsuagia.indexOf(".");

                                    var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                    var reright_side = rechinhsuagia.substring(redecimal_pos);

                                    releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                    reright_side = reright_side.substring(0, 2);
                                    rechinhsuagia = releft_side + "." + right_side;

                                } else {
                                    rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    rechinhsuagia = rechinhsuagia;
                                }

                                $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(rechinhsuagia + "đ");
                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(tonkhohientai);
                                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonkhohientai + " " + donvi + '!');
                            }

                            $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                            $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                            $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);

                        }
                        else if (data == "HETHANG") {
                            $('body').find('[id="giasanphamvuonrau-' + id + '"]').text("0đ");
                            $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(0);
                            $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn 0 ' + donvi + '!');
                        }
                    });
                }
            }
            else {
                if (Number(inpSL) < 1) {
                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);

                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val('1');
                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Mua tối thiểu\n1 ' + donvi + '!');

                    var dongia = $('body').find('[id="giasanphamvuonrau-' + id + '"]').attr('dongia');
                    if (dongia != "CHONPHANLOAI") {
                        var chinhsuagia = dongia + "";
                        if (chinhsuagia === "") { return; }

                        chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        chinhsuagia = chinhsuagia;
                        $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(chinhsuagia + "đ");
                        $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(1);


                        var formData = new FormData();
                        formData.append('soluong', 1);
                        formData.append('id', id);

                        $.ajax({
                            url: $('body').find('[id="requestPath"]').val() + 'vuonrau/updatecart',
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
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (data.indexOf('SUCCESS') != -1) {
                                var tonkhohientai = Number(data.split('-')[1]);
                                if (1 > tonkhohientai) {
                                    var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                    if (rechinhsuagia === "") { return; }

                                    if (rechinhsuagia.indexOf(".") != -1) {

                                        var redecimal_pos = rechinhsuagia.indexOf(".");

                                        var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                        var reright_side = rechinhsuagia.substring(redecimal_pos);

                                        releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                        reright_side = reright_side.substring(0, 2);
                                        rechinhsuagia = releft_side + "." + right_side;

                                    } else {
                                        rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        rechinhsuagia = rechinhsuagia;
                                    }

                                    $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(rechinhsuagia + "đ");
                                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(tonkhohientai);
                                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonkhohientai + " " + donvi + '!');
                                }

                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);

                            }
                            else if (data == "HETHANG") {
                                $('body').find('[id="giasanphamvuonrau-' + id + '"]').text("0đ");
                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(0);
                                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn 0 ' + donvi + '!');
                            }
                        });
                    }
                }
                else if (tonKhoConLai < 100 && Number(inpSL) > tonKhoConLai) {
                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);

                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(tonKhoConLai);
                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonkhohientai + " " + donvi + '!');

                    var dongia = $('body').find('[id="giasanphamvuonrau-' + id + '"]').attr('dongia');
                    if (dongia != "CHONPHANLOAI") {
                        var chinhsuagia = Number(Number(dongia) * Number(tonKhoConLai)) + "";
                        if (chinhsuagia === "") { return; }

                        chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        chinhsuagia = chinhsuagia;
                        $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(chinhsuagia + "đ");
                        $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(tonKhoConLai);


                        var formData = new FormData();
                        formData.append('soluong', 100);
                        formData.append('id', id);

                        $.ajax({
                            url: $('body').find('[id="requestPath"]').val() + 'vuonrau/updatecart',
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
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (data.indexOf('SUCCESS') != -1) {
                                var tonkhohientai = Number(data.split('-')[1]);
                                if (tonKhoConLai > tonkhohientai) {
                                    var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                    if (rechinhsuagia === "") { return; }

                                    if (rechinhsuagia.indexOf(".") != -1) {

                                        var redecimal_pos = rechinhsuagia.indexOf(".");

                                        var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                        var reright_side = rechinhsuagia.substring(redecimal_pos);

                                        releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                        reright_side = reright_side.substring(0, 2);
                                        rechinhsuagia = releft_side + "." + right_side;

                                    } else {
                                        rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        rechinhsuagia = rechinhsuagia;
                                    }

                                    $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(rechinhsuagia + "đ");
                                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(tonkhohientai);
                                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonkhohientai + " " + donvi + '!');
                                }

                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);

                            }
                            else if (data == "HETHANG") {
                                $('body').find('[id="giasanphamvuonrau-' + id + '"]').text("0đ");
                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(0);
                                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn 0 ' + donvi + '!');
                            }
                        });
                    }
                }
                else if (Number(inpSL) > 100 && tonKhoConLai >= 100) {
                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);

                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val('100');
                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Mua tối đa\n100 ' + donvi + '!');

                    var dongia = $('body').find('[id="giasanphamvuonrau-' + id + '"]').attr('dongia');
                    if (dongia != "CHONPHANLOAI") {
                        var chinhsuagia = Number(Number(dongia) * 100) + "";
                        if (chinhsuagia === "") { return; }

                        chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        chinhsuagia = chinhsuagia;
                        $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(chinhsuagia + "đ");
                        $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(100);


                        var formData = new FormData();
                        formData.append('soluong', 100);
                        formData.append('id', id);

                        $.ajax({
                            url: $('body').find('[id="requestPath"]').val() + 'vuonrau/updatecart',
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
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (data.indexOf('SUCCESS') != -1) {
                                var tonkhohientai = Number(data.split('-')[1]);
                                if (100 > tonkhohientai) {
                                    var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                    if (rechinhsuagia === "") { return; }

                                    if (rechinhsuagia.indexOf(".") != -1) {

                                        var redecimal_pos = rechinhsuagia.indexOf(".");

                                        var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                        var reright_side = rechinhsuagia.substring(redecimal_pos);

                                        releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                        reright_side = reright_side.substring(0, 2);
                                        rechinhsuagia = releft_side + "." + right_side;

                                    } else {
                                        rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        rechinhsuagia = rechinhsuagia;
                                    }

                                    $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(rechinhsuagia + "đ");
                                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(tonkhohientai);
                                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonkhohientai + " " + donvi + '!');
                                }

                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);

                            }
                            else if (data == "HETHANG") {
                                $('body').find('[id="giasanphamvuonrau-' + id + '"]').text("0đ");
                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(0);
                                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn 0 ' + donvi + '!');
                            }
                        });
                    }
                }
                else {
                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);
                    $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', true);

                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(inpSL);

                    var dongia = $('body').find('[id="giasanphamvuonrau-' + id + '"]').attr('dongia');
                    if (dongia != "CHONPHANLOAI") {
                        var chinhsuagia = Number(Number(dongia) * Number(inpSL)) + "";
                        if (chinhsuagia === "") { return; }

                        chinhsuagia = chinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        chinhsuagia = chinhsuagia;
                        $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(chinhsuagia + "đ");
                        $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(inpSL);


                        var formData = new FormData();
                        formData.append('soluong', inpSL);
                        formData.append('id', id);

                        $.ajax({
                            url: $('body').find('[id="requestPath"]').val() + 'vuonrau/updatecart',
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
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else if (data.indexOf('SUCCESS') != -1) {
                                var tonkhohientai = Number(data.split('-')[1]);
                                if (inpSL > tonkhohientai) {
                                    var rechinhsuagia = Number(Number(dongia) * Number(tonkhohientai)) + "";
                                    if (rechinhsuagia === "") { return; }

                                    if (rechinhsuagia.indexOf(".") != -1) {

                                        var redecimal_pos = rechinhsuagia.indexOf(".");

                                        var releft_side = rechinhsuagia.substring(0, redecimal_pos);
                                        var reright_side = rechinhsuagia.substring(redecimal_pos);

                                        releft_side = releft_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        reright_side = reright_side.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                        reright_side = reright_side.substring(0, 2);
                                        rechinhsuagia = releft_side + "." + right_side;

                                    } else {
                                        rechinhsuagia = rechinhsuagia.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                        rechinhsuagia = rechinhsuagia;
                                    }

                                    $('body').find('[id="giasanphamvuonrau-' + id + '"]').text(rechinhsuagia + "đ");
                                    $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(tonkhohientai);
                                    $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn ' + tonkhohientai + " " + donvi + '!');
                                }

                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="tangsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);
                                $('body').find('[id="giamsoluonggiohangvuonrau-' + id + '"]').prop('disabled', false);

                            }
                            else if (data == "HETHANG") {
                                $('body').find('[id="giasanphamvuonrau-' + id + '"]').text("0đ");
                                $('body').find('[id="soluonggiohangvuonrau-' + id + '"]').val(0);
                                $('body').find('[id="thongbaosoluongvuonrau-' + id + '"]').text('Kho còn 0 ' + donvi + '!');
                            }
                        });
                    }
                }
            }
        }
    });
});