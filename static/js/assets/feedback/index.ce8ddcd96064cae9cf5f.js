webpackJsonp([9],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(1);
$("#app").removeClass("none");
var userCode = g.getSession("uCode");
touchend($("#feedbackBtn"), function (e, _this) {
    e.stopPropagation();
    e.preventDefault();
    var getContent = $("#text").val();
    if (getContent == "") return tips("请填写反馈");
    var methodName = "/user/addFeedback";
    var requestParams = '{"userCode":"' + userCode + '","content":"' + getContent + '",' + g.tempOpt() + '"}';
    var str = JSON.parse(requestParams);
    g.request({
        "url": methodName,
        "param": str
    }, function (res) {
        console.log(res);
        if (res.status === 1) {
            $("#winmask").addClass("is-visible");
        }
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[15]);