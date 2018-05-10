webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(1);
var userCode = g.getSession("uCode");
var requestParams = '{"userCode":"' + userCode + '",' + g.tempOpt() + '"}';
var $roomMoney = $(".recharge-open"),
    $rechargewrapper = $("#recharge-wrapper");
$("#app").removeClass("none");
/**
 *获取用户信息
 * @param userCode:{String} => 用户信息
 */
function getUserInfo() {
    var methodName = "/user/getUserInfo";
    var str = JSON.parse(requestParams);
    g.request({
        "url": methodName,
        "param": str
    }, function (res) {
        if (res.status === 1) {
            var d = res.userInfo;
            $(".usermoney").html(d.coin);
            $(".user-img img").attr("src", d.picUrl);
            $(".hitwawacount").html(d.dollCount);
            $(".userName").html(d.nickName);
        }
    });
};
//充值框
touchend($roomMoney, function (e, _this) {
    e.stopPropagation();
    e.preventDefault();
    if (!$rechargewrapper.hasClass("is-load")) {
        g.listRechargeMealType(requestParams, $rechargewrapper);
    }
    $rechargewrapper.addClass("is-visible");
});
//充值框关闭
touchend($("#close-recharge"), function (e, _this) {
    e.stopPropagation();
    e.preventDefault();
    $rechargewrapper.removeClass("is-visible");
});

/**
 * 初始化程序
 */
$(function () {
    getUserInfo();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[22]);