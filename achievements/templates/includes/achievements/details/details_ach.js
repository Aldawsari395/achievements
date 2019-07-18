function call(func, args) {
  return frappe.call("achievements.www.achievements.index." + func, args);
}

$(() => {
  // Bootstrap's tooltip init
  $('[data-toggle="tooltip"]').tooltip();

  $("#delete").click(event => {
    $("#delete").attr("disabled", true);
    call("delete_ach", {
      ach_id: $("#ach_id").val()
    }).then(res => {
      window.FlashMessage.success(
        "تم حذف الانجاز بنجاح، جاري اعادة التوجيه .."
      );

      setTimeout(() => {
        window.location.href = "/achievements";
      }, 3000);
    });
  });
});
