
'use strict';
function callbackFunction(xmlhttp) {
    //alert(xmlhttp.responseXML);
}
exports.callbackFunction = callbackFunction;


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4() + s4() +
        s4() + s4() + s4() + s4();
}
exports.guid = guid;

function timestamp() {
    //return Date.now() / 1000 | 0;
    return Math.floor(Date.now() / 1000);
}
