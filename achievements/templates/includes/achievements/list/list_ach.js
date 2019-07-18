function call(func, args = false) {
  if (args)
    return frappe.call("achievements.www.achievements.index." + func, args);
  else return frappe.call("achievements.www.achievements.index." + func);
}

function makeXLSX(data) {
  var date = new Date();

  var wb = XLSX.utils.book_new();
  wb.Props = {
    Title: "Weekly Report",
    Subject: "Weekly Report",
    Author: "Masdar ERPNext",
    CreatedDate: date.toDateString()
  };

  wb.SheetNames.push("Sheet");
  var ws_data = data; //[["hello", "world"]];
  var ws = XLSX.utils.aoa_to_sheet(ws_data);

  var wscols = [
    { wch: 25 },
    { wch: 25 },
    { wch: 10 },
    { wch: 15 },
    { wch: 85 },
    { wch: 20 },
    { wch: 10 },
    { wch: 40 },
    { wch: 25 }
  ];
  ws["!cols"] = wscols;

  wb.Sheets["Sheet"] = ws;

  var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  /*   var wb = XLSX.utils.table_to_book(document.getElementById("mytable"), {
    sheet: "Sheet JS"
  });
  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "binary"
  }); */

  $("#button-a").click(function() {
    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      "التقرير الاسبوعي لمبادرات المنظومة " + date.toDateString() + ".xlsx"
    );
  });
}

$(() => {
  call("get_achs").then(res => {
    data = res.message;
    console.log(data);
    dataArray = [];
    headerArray = [
      "اسم الانجاز",
      "نوع الإنجاز",
      "تاريخ الإنجاز",
      "الهدف الإستراتيجي المرتبط بالإنجاز",
      "اسم المبادرة",
      "اسم المشروع المرتبط بالإنجاز",
      "طريقة قياس المنجز",
      "الأثر المتوقع من هذا الإنجاز",
      "المستهدفات التي يساهم في تحقيقها هذا الإنجاز"
    ];
    headerArray.reverse();
    dataArray.push(headerArray);

    data.map(doc => {
      delete doc.name;
      doc_array = Object.values(doc);
      doc_array.reverse();
      dataArray.push(doc_array);
    });

    makeXLSX(dataArray);
  });

  $('[data-toggle="tooltip"]').tooltip();
  //$(".page_content").unwrap();

  $("#delete").click(event => {
    $("#delete").blur();
    var docs = [];

    $("input[name=ach_checkbox]:checked").each((i, checkbox) => {
      docs.push($(checkbox).attr("id"));
    });

    if (docs.length < 1) return false;

    let str = docs.length > 1 ? "الإنجازات" : "الإنجاز";
    var del_confirm = confirm("هل انت متأكد من حذف " + str + "؟");
    if (!del_confirm) return false;

    $("#delete").blur();
    $("#delete").attr("disabled", true);

    call("delete_achs", {
      data: docs
    }).then(res => {
      var str_ach = docs.length > 1 ? "الانجازات" : "الانجاز";
      window.FlashMessage.success(
        "تم حذف " + str_ach + " بنجاح، جاري اعادة التوجيه .."
      );

      setTimeout(() => {
        window.location.href = "/achievements";
      }, 2000);
    });
  });
});
