$(document).ready(function () {
    //Hien them sua xoa
    $('[id^="editcheckchucnang"]').on('click', function () {
        var chucnang = $(this);
        var id = chucnang.attr('name');
        if (chucnang.prop('checked')) {
            $('#editchild-chucnang' + id).prop("hidden", false);
        }
        else {
            $('#editchild-chucnang' + id).prop("hidden", true);
        }
    });

    //Luu them moi
    $('#btnluuchinhsuarole').on('click', function () {
        var name = $('#editname').val().trim();

        $("#editname").removeClass('valid-was-validated');

        $('#invalid-editname-feedback').prop('hidden', true);
        var lstIdFunction = "";

        var check = true;
        if (name.length < 1) {
            check = false;
            $("#editname").addClass('valid-was-validated');
            $('#invalid-editname-feedback').text("Vui lòng nhập tên phân quyền.").prop('hidden', false);
            $("#editname").focus();
        }
        else {
            $('[id^="editcheckchucnang"]').each(function () {
                if ($(this).prop('checked') == true) {
                    var id = $(this).attr('name');
                    var them = $('#editthem-chucnang' + id).prop('checked');
                    var sua = $('#editsua-chucnang' + id).prop('checked');
                    var xoa = $('#editxoa-chucnang' + id).prop('checked');

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
            formData.append('id', $('#editid').val());
            formData.append('name', name);
            formData.append('lstFunction', lstIdFunction);

            $.ajax({
                url: $('#requestPath').val() + "admin/role/editrole",
                data: formData,
                dataType: 'html',
                type: 'POST',
                processData: false,
                contentType: false
            }).done(function (ketqua) {
                if (ketqua == "SUCCESS") {
                    Swal.fire({
                        title: "Thành công!",
                        text: "Đã lưu thông tin cập nhật quyền.",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                else if (ketqua == "DATONTAI") {
                    $("#editname").addClass('valid-was-validated');
                    $('#invalid-editname-feedback').text("Quyền này đã tồn tại trên hệ thống.").prop('hidden', false);
                    $("#editname").focus();
                }
                else if (ketqua == "KHONGTONTAI") {
                    Swal.fire({
                        title: "Thông báo!",
                        text: "Phân quyền này vừa mới được xóa bỏ.",
                        icon: "warning"
                    }).then(() => {
                        window.location.reload();
                    });
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