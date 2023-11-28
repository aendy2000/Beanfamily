$(document).ready(function () {
    //Hien them sua xoa
    $('[id^="checkchucnang"]').on('click', function () {
        var chucnang = $(this);
        var id = chucnang.attr('name');
        if (chucnang.prop('checked')) {
            $('#child-chucnang' + id).prop("hidden", false);
        }
        else {
            $('#child-chucnang' + id).prop("hidden", true);
        }
    });

    //Luu them moi
    $('#btnluuthemrole').on('click', function () {
        var name = $('#name').val().trim();

        $("#name").removeClass('valid-was-validated');

        $('#invalid-name-feedback').prop('hidden', true);
        var lstIdFunction = "";

        var check = true;
        if (name.length < 1) {
            check = false;
            $("#name").addClass('valid-was-validated');
            $('#invalid-name-feedback').text("Vui lòng nhập tên phân quyền.").prop('hidden', false);
            $("#name").focus();
        }
        else {
            $('[id^="checkchucnang"]').each(function () {
                if ($(this).prop('checked') == true) {
                    var id = $(this).attr('name');
                    var them = $('#them-chucnang' + id).prop('checked');
                    var sua = $('#sua-chucnang' + id).prop('checked');
                    var xoa = $('#xoa-chucnang' + id).prop('checked');

                    lstIdFunction += id + "-" + them + "-" + sua + "-" + xoa + '#';
                }
            });

            if (lstIdFunction.length < 1) {
                check = false;
                Swal.fire({
                    title: "Thông báo!",
                    text: "Vui lòng chọn chức năng mà phân quyền được phép truy cập và hành động.",
                    icon: "info"
                });
            }
        }

        if (check == true) {
            lstIdFunction = lstIdFunction.substring(0, lstIdFunction.length - 1);
            var formData = new FormData();
            formData.append('name', name);
            formData.append('lstFunction', lstIdFunction);

            $.ajax({
                url: $('#requestPath').val() + "admin/role/addrole",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã thêm một phân quyền mới.",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "DATONTAI") {
                    $("#name").addClass('valid-was-validated');
                    $('#invalid-name-feedback').text("Quyền này đã tồn tại trên hệ thống.").prop('hidden', false);
                    $("#name").focus();
                }
                else {
                    Swal.fire({
                        title: "Đã xảy ra lỗi, vui lòng thử lại sau ít phút.",
                        text: "Chi tiết lỗi: " + ketqua,
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
            });
        }
    });
});