reason_name = document.getElementById('reason-name');
reason_description = document.getElementById('reason-description');


$("#get_reason_btn").on('click', function () {
    $.ajax({
    url: '/reasons/ajax/get_reason/',
    dataType: 'json',
      success: function (data) {
        if (data.success) {
            reason_name.innerHTML = data.reason_name
            reason_description.innerHTML = data.reason_description
        }else{
            reason_name.innerHTML = "Вот так вот!"
            reason_description.innerHTML = "Я не знаю что еще сказать.."
        }
      }
    });
  });
