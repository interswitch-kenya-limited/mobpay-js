const { guid, b64EncodeUnicode, hexToBase64, Sha1 } = require("./encryption");
const callbackFunction = require("./functions")


exports.sendMMO = function() {
    var httpMethod = "POST";
    var url1 = "http://172.16.112.4:9080/api/v1/merchant/transact/bills";
    var url = "http://172.16.112.4:9080/api/v1/merchant/transact/bills";
    url = url.replace("http://", "https://");
    url = encodeURIComponent(url);
    var timestamp = Date.now() / 1000 | 0;
    var nonce = guid();
    var clientId = "IKIAB8FA9382D1FAC6FCA2F30195029B0A1558A9FECA";
    var authorization = "InterswitchAuth" + " " + b64EncodeUnicode(clientId);
    var clientSecret = "dxdmtf12FhLVIFRz8IzhnuAJzNd6AAFVgx/3LlJHc+4=";
    var signatureCipher = httpMethod + "&" + url + "&" + timestamp + "&" + nonce + "&" + clientId + "&" + clientSecret;
    var ItemJSON;
    //ItemJSON = '[  {    "Id": 1,    "ProductID": "1",    "Quantity": 1,  },  {    "Id": 1,    "ProductID": "2",    "Quantity": 2,  }]';
    var amount = $('.amount').text();
    var orderId = $('.orderId').text();
    var terminalType = $('.terminalType').text();
    //var merchantId = $('.merchantId').text();
    var merchantId = "100";
    var mmoProvider = $('#Combobox1').val();
    var phone = $.trim($('#Editbox6').val());
    var ref = $('.ref').text();
    alert(mmoProvider + "-" + phone);
    ItemJSON = JSON.stringify({
        "country": "KE",
        "currency": "KES",
        "amount": amount,
        "orderId": orderId,
        "phone": phone,
        "transactionRef": orderId,
        "terminalType": terminalType,
        "paymentItem": "MMO",
        "provider": mmoProvider,
        "merchantId": merchantId,
        "callBackUrl": "webpaycallback",
        "isLog": "0",
        "narration": "Payment",
        "fee": "0"
    });
    //URL = "https://testrestapi.com/additems?var=" + urlvariable;  //Your URL
    var redirecturl = '/merchant/payment/page/payment/update';
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
    //alert(xmlhttp.responseText);
    //document.getElementById("div").innerHTML = xmlhttp.statusText + ":" + xmlhttp.status + "<BR><textarea rows='100' cols='100'>" + xmlhttp.responseText + "</textarea>";
    if (xmlhttp.status == "200") {
        alert("Payment Posted Successfully");
        $(location).attr("href", redirecturl + "?paymentRef=" + ref + "&status=00&channel=mmo");
        document.getElementById("div").innerHTML = "Payment Posted Successfully";
        document.getElementById("div1").innerHTML = "";
    }
    else {
        document.getElementById("div").innerHTML = "";
        document.getElementById("div1").innerHTML = "Payment Failed";
        alert("Payment Failed");
        $(location).attr("href", redirecturl + "?paymentRef=" + ref + "&status=01&channel=mmo");
    }
}
