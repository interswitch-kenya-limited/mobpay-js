'use-strict';

exports.postCheckout = function(url, paymentValues) {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = url;
    for (var paymentValue in paymentValues) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = paymentValue;
        console.log(paymentValue, paymentValues[paymentValue]);
        input.value = paymentValues[paymentValue];
        form.appendChild(input);
    }
    form.submit();
}