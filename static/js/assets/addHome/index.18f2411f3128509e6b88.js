webpackJsonp([13],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(1);
$("#app").removeClass("none");
var userCode = g.getSession("uCode");
new LArea().init({
    trigger: "#input-address",
    valueTo: "#input-address-num",
    keys: {
        id: "id",
        name: "name"
    },
    type: 1,
    data: LAreaData
});

touchend($("#submit-btn"), function (e, _this) {
    e.stopPropagation();
    e.preventDefault();
    var username = $("#input-username").val(),
        phone = $("#input-phone").val(),
        address = $("#input-address").val(),
        addressNum = $("#input-address-num").val(),
        addressStreet = $("#input-address-street").val();
    if (username == "") return tips("请输入姓名");
    if (0 == /^1[34578]\d{9}$/.test(phone)) return tips("请输入正确的手机号码");
    if (address == "") return tips("请选择地址");
    if (addressStreet == "") return tips("请输入详情地址");
    var requestParams = '{"id":"0","type":"add","detailAddress":"' + address + addressStreet + '","mobilePhone":"' + phone + '","userName":"' + username + '","userCode":"' + userCode + '",' + g.tempOpt() + '"}';
    g.addOrUpdUserAddress(requestParams);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[11]);