window.onload = function() {
  // выдернуть список магазинов из выбора
  var getShopsList = function() {
    var shopsList = $.map($('#shops option:selected'), function(option) {
      return option.value;
    });

    return shopsList;
  }

  var generateUUID = function() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // обработка кнопки нажатия
  submit.onclick = function() {
    getShopsList();
    clearControls();
    console.log('submit started');

    if (validateItem() === true) {
      console.log('validate past');

      var barCodesArray = $.map($('.barCodes'), function(code) {
        return code.value;
      });

      var alcoCodesArray = $.map($('.alcoCodes'), function(code) {
        return code.value;
      });

      var item = {
        uuid: generateUUID(),
        code: $("#code").val(),
        barCodes: barCodesArray,
        alcoCodes: alcoCodesArray,
        name: $("#name").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        costPrice: $("#costPrice").val(),
        measureName: $("#measureName").val(),
        tax: $("#name").val(),
        allowToSell: $("#allowToSell").val(),
        description: $("#description").val(),
        articleNumber: $("#articleNumber").val(),
        parentUuid: null,
        group: false,
        type: $("#type").val(),
        alcoholByVolume: $("#alcoholByVolume").val(),
        alcoholProductKindCode: $("#alcoholProductKindCode").val(),
        tareVolume: $("#tareVolume").val(),
        fields: {}
      }

      console.log(JSON.stringify(item));

      var storeUuid = "expampleStore";
      var token = "expampleToken";

      postItem(storeUuid, token, item);
    }

    return false;
  }

  // отключение алкополей
  alcoOff();
}