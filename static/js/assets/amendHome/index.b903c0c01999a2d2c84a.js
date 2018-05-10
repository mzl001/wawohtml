webpackJsonp([12],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(1);
var getUrlParams = parseInt(g.getUrlParams("id"));
$("#app").removeClass("none");
var userCode = g.getSession("uCode");
/**
 *用户收货地址列表
 * @param userCode:{String} => 用户信息
 */
function getListUserAddress() {
    var methodName = "/user/listUserAddress";
    var requestParams = '{"userCode":"' + userCode + '", ' + g.tempOpt() + '"}';
    var str = JSON.parse(requestParams);
    g.request({
        "url": methodName,
        "param": str
    }, function (res) {
        if (res.status === 1) {
            var data = res.userAddressList;
            console.log(data);
            $.each(data, function (k, e) {
                if (e.id === getUrlParams) {
                    $("#input-username").val(e.userName);
                    $("#input-phone").val(e.mobilePhone);
                    //$("#input-address").val(e.detailAddress);
                    $("#input-address-street").val(e.detailAddress);
                }
            });
        }
    });
};

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
    var requestParams = '{"id":"' + getUrlParams + '","type":"edit","detailAddress":"' + address + addressStreet + '","mobilePhone":"' + phone + '","userName":"' + username + '","userCode":userCode, ' + g.tempOpt() + '"}';
    g.addOrUpdUserAddress(requestParams);
});

/**
 * 初始化程序
 */
$(function () {
    getListUserAddress();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[12]);