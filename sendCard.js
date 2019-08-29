const { guid, b64EncodeUnicode, hexToBase64, Sha1 } = require("./encryption");
const callbackFunction = require("./functions")

exports.sendCard = function() {
    var httpMethod = "POST";
    var url1 = "http://172.16.112.4:9080/api/v1/merchant/transact/cards";
    var url = "http://172.16.112.4:9080/api/v1/merchant/transact/cards";
    url = url.replace("http://", "https://");
    url = encodeURIComponent(url);
    var timestamp = Date.now() / 1000 | 0;
    var nonce = guid();
    var clientId = "IKIAB8FA9382D1FAC6FCA2F30195029B0A1558A9FECA";
    var authorization = "InterswitchAuth" + " " + b64EncodeUnicode(clientId);
    var clientSecret = "dxdmtf12FhLVIFRz8IzhnuAJzNd6AAFVgx/3LlJHc+4=";
    var signatureCipher = httpMethod + "&" + url + "&" + timestamp + "&" + nonce + "&" + clientId + "&" + clientSecret;
    var ItemJSON;
    var amount = $('.amount').text();
    var orderId = $('.orderId').text();
    var terminalType = $('.terminalType').text();
    var merchantId = $('.merchantId').text();
    var cardNumber = $.trim($('#Editbox1').val());
    var expiry = $.trim($('#Editbox2').val());
    var cvv = $.trim($('#Editbox3').val());
    alert(cardNumber + "-" + expiry + "-" + cvv);
    ItemJSON = JSON.stringify({
        "country": "KE",
        "currency": "KES",
        "amount": amount,
        "orderId": orderId,
        "phone": "254713167623",
        "transactionRef": orderId,
        "terminalType": terminalType,
        "paymentItem": "MMO",
        "provider": "703",
        "merchantId": merchantId,
        "callBackUrl": "webpaycallback",
        "isLog": "0",
        "narration": "Payment",
        "fee": "25"
    });
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
    xmlhttp.open("POST", url1, false);
    xmlhttp.setRequestHeader("Authorization", authorization);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Signature", hexToBase64(Sha1.hash(signatureCipher)));
    xmlhttp.setRequestHeader("SignatureMethod", "SHA1");
    xmlhttp.setRequestHeader("Timestamp", timestamp);
    xmlhttp.setRequestHeader("Nonce", nonce);
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
    xmlhttp.send(ItemJSON);
    alert(xmlhttp.responseText);
    if (xmlhttp.status == "200") {
        alert("Payment Posted Successfully");
        document.getElementById("div").innerHTML = "Payment Posted Successfully";
        document.getElementById("div1").innerHTML = "";
    }
    else {
        alert("Payment Failed");
        document.getElementById("div").innerHTML = "";
        document.getElementById("div1").innerHTML = "Payment Failed";
    }
}