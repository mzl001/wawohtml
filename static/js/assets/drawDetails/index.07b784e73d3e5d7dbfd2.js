webpackJsonp([10],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(1);
var userCode = g.getSession("uCode");
/**
 * 用户收货地址列表
 * @return string
 */
function dollPost() {
    var methodName = "/user/listUserAddress";
    var requestParams = '{"userCode":"' + userCode + '", ' + g.tempOpt() + '"}';
    var str = JSON.parse(requestParams);
    g.request({
        "url": methodName,
        "param": str
    }, function (res) {
        $("#app").removeClass("none");
        var data = res.userAddressList;
        if (res.status === 1) {
            $.each(data, function (k, e) {
                if (e.isDefault) {
                    $("#setRess").html(e.detailAddress).addClass("isDefault");
                }
            });
        }
        getDollByType();
    });
}
/**
 * 获取用户可邮寄列表
 * @return string
 */
function getDollByType() {
    var methodName = "/user/getDollByType";
    var requestParams = '{"userCode":"' + userCode + '", ' + g.tempOpt() + '"}';
    var str = JSON.parse(requestParams);
    g.request({
        "url": methodName,
        "param": str
    }, function (res) {
        if (res.status === 1) {
            $(".isList").removeClass("none");
            var data = res.Data.DollList;
            var dollTypeList = g.getSession("dollTypeList").split(",");
            var dollTypeNumList = g.getSession("dollTypeNumList").split(",");
            $("#list-body").html("");
            var dataNew = [];
            $.each(data, function (k, e) {
                $.each(dollTypeList, function (i, v) {
                    if (e.dollType === v) {
                        dataNew.push(e);
                    }
                });
            });
            reBuildData(dataNew, dollTypeNumList);
            var n = 0;
            $.each(dataNew, function (k, e) {
                var str = '<div class="z-item flex l-center bg-white border-2"><div class="z-item-img"><img src="' + e.narrowPicUrl + '" alt=""></div><div class="z-item-main flex flex1 a-between"><div class="flex fd-column"><p class="name f18">' + e.subTitle + '</p><p class="createtime f13">' + e.gameTime + '</p></div><p class="flex l-center setNum f18">x' + e.count + '</p></div></div>';
                $("#list-body").append(str);
                n += parseInt(e.count);
            });
            $(".allNum").html(n);
            //提取按钮处理
            touchend($("#dollBtn"), function (e, _this) {
                e.stopPropagation();
                if (!_this.hasClass("isPost")) {
                    if ($("#setRess").hasClass("isDefault")) {
                        var postCode = $("#setRess").html();
                    } else {
                        tips("请选择收货地址");
                        return false;
                    }
                    var dollList = "";
                    $.each(dollTypeList, function (i, v) {
                        dollList += v + ':' + dollTypeNumList[i] + ';';
                    });
                    var method = "/user/dollPost";
                    var params = '{"dollTypeList":"' + dollList + '","postCode":"' + postCode + '","userCode":"' + userCode + '","postCount":' + n + ',' + g.tempOpt() + '"}';
                    var str = JSON.parse(params);
                    console.log(str);
                    g.request({
                        "url": method,
                        "param": str
                    }, function (res) {
                        if (res.status === 1) {
                            _this.addClass("isPost");
                            tips("提取成功,会尽快邮寄给您");
                            g.removeSession('dollTypeList');
                            g.removeSession('dollTypeNumList');
                            setTimeout(function () {
                                location.href = "http://" + location.hostname + "/userCenter";
                            }, 1000);
                        } else {
                            tips("参数错误");
                        }
                    });
                } else {
                    tips("已经提取");
                }
            });
        }
    });
}
/**
 * 重构getDollByType数据
 * @dataNew : 接口筛选数据（必填）
 * @dollTypeNumList : 选择数量数据（必填）
 * @return : 返回重构后的数据
 */
function reBuildData(data, dolldata) {
    $.each(data, function (i, v) {
        data[i].count = dolldata[i];
    });
    return data;
}

/**
 * 初始化程序
 */
$(function () {
    dollPost();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[14]);