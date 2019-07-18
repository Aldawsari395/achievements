function call(func, args) {
  return frappe.call("achievements.www.achievements.new.index." + func, args);
}

function save(clicked) {
  let data = $("form").serializeArray();
  let dataObj = {};

  data.map(v => {
    dataObj[v.name] = v.value;
  });
  console.log(dataObj);

  call(clicked.attr("name") + "_ach", {
    data: dataObj
  }).then(
    res => {
      clicked.attr("id") == "save" && clicked.attr("name") == "save"
        ? $("form").trigger("reset")
        : undefined;
      clicked.attr("disabled", false);

      window.FlashMessage.success("تم حفظ الانجاز بنجاح");

      if (clicked.attr("name") == "update") {
        setTimeout(() => {
          window.location.href = window.location.href;
        }, 1000);
      }
    },
    e => {
      window.location.href = window.location.href;
    }
  );
}

frappe.ready(function() {
  // Bootstrap Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // initialize the Selectize control
  $("#project-control").selectize({
    create: true,
    maxItems: 1
  });

  // Find out which button is clicked and mark it.
  $("form button[type=submit]").click(event => {
    console.log(event);
    $("button[type=submit]").removeAttr("clicked");
    $(event.currentTarget).attr("clicked", "true");
  });

  // Handle the submit event and grab the marked button.
  $("form").submit(event => {
    event.preventDefault();
    var clicked = $("button[type=submit][clicked=true]");
    clicked.blur();
    clicked.attr("disabled", true);

    if (clicked.attr("id") == "save") save(clicked);
    else if (clicked.attr("id") == "duplicate") save(clicked);
  });

  /* 	$('form').submit(event => {
		event.preventDefault();
		is_submitted = true;
	});
	
	$('#save').click(event => {
		save(true);
	}); */

  $("#new").click(event => {
    $("form").trigger("reset");
  });

  /* 	$('#duplicate').click(event => {
		save();
		console.log("clicked duplicate");
	}); */

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
