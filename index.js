var card = require('./sendCard')
var mobile = require('./sendMMO')
var iframe = require('./iframe')

exports.popUpPaymentiFrame = function () {
        console.log("This is a message from the demo package");
    }
exports.submitCardPayment = function () {
        card.sendCard()
        console.log("submit payment card function")
    }
exports.submitCardTokenPayment = function () {
        console.log("submit token payment")
    }
exports.confirmMobilePayment = function () {
        mobile.sendMMO()
        console.log("confirm Mobile payment")
    }
exports.submitMobilePayment = function () {
    
    }
