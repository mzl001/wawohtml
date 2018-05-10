webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(1);
var userCode = g.getSession("uCode");
/**
 * 获取用户可邮寄列表
 * @return string
 */
function getDollByType() {
    var methodName = "/user/getDollByType";
    var requestParams = '{"userCode":"' + userCode + '",' + g.tempOpt() + '"}';
    var str = JSON.parse(requestParams);
    g.request({
        "url": methodName,
        "param": str
    }, function (res) {
        $("#app").removeClass("none");
        if (res.status === 1) {
            $(".isList").removeClass("none");
            var data = res.Data.DollList;
            var getNum = parseInt(res.Data.count);
            $(".getNum em").html(getNum);
            $("#list-body").html("");
            $.each(data, function (k, e) {
                var max_number = e.count;
                var getNums = getNum;
                var str = '<div class="z-item flex l-center bg-white border-2"><div class="z-item-img"><img src="' + e.narrowPicUrl + '" alt=""></div><div class="z-item-main flex flex1 a-between"><div class="flex fd-column"><p class="name f18">' + e.subTitle + '</p><p class="createtime f13">' + e.gameTime + '</p></div><p class="flex l-center setNum"><i class="iconfont icon-jian f20" id="icon-jian' + k + '"></i><i class="iconfont icon-jian f20 disabled hid" id="icon-jian-d' + k + '"></i><span class="exchangeprice f16" id="sku-buynum' + k + '" data-dollType="' + e.dollType + '">' + e.count + '</span><i class="iconfont icon-jia f20" id="icon-jia' + k + '"></i><i class="iconfont icon-jia f20 disabled hid" id="icon-jia-d' + k + '"></i></p></div></div>';
                $("#list-body").append(str);
                $("#icon-jia-d" + k).removeClass("hid");
                $("#icon-jia" + k).hide();
                // 减少商品购买数量按钮点击事件
                touchend($("#icon-jian" + k), function (e, _this) {
                    e.stopPropagation();
                    e.preventDefault();
                    $(".item-xuan").removeClass("selected");
                    $("#icon-jia-d" + k).addClass("hid");
                    $("#icon-jia" + k).show();
                    var buyNumObj = $('#sku-buynum' + k),
                        buynum = parseInt(buyNumObj.text());

                    buyNumObj.html(Math.abs(parseInt(buyNumObj.html())) - 1);
                    if (parseInt(buyNumObj.html()) == 0) {
                        _this.next().removeClass("hid");
                        _this.hide();
                    };
                    var n = 0;
                    $(".exchangeprice").each(function (i, e) {
                        n += parseInt($(e).text());
                    });
                    $(".allNum").html(n);
                });
                // 增加商品购买数量按钮点击事件
                touchend($("#icon-jia" + k), function (e, _this) {
                    e.stopPropagation();
                    e.preventDefault();
                    $("#icon-jian-d" + k).addClass("hid");
                    $("#icon-jian" + k).show();
                    var buyNumObj = $('#sku-buynum' + k),
                        buynum = parseInt(buyNumObj.text());
                    buyNumObj.html(Math.abs(parseInt(buyNumObj.html())) + 1);
                    if (parseInt(buyNumObj.html()) == max_number) {
                        _this.next().removeClass("hid");
                        _this.hide();
                    };
                    var n = 0;
                    $(".exchangeprice").each(function (i, e) {
                        n += parseInt($(e).text());
                    });
                    $(".allNum").html(n);
                });
                $(".allNum").html(getNum);
            });
        } else {
            $(".empty").removeClass("none");
            $(".href").attr("href", "http://" + location.hostname);
        }
    });
}
//全选
touchend($(".item-xuan-btn"), function (e, _this) {
    e.stopPropagation();
    e.preventDefault();
    if (_this.find(".item-xuan").hasClass("selected")) {
        _this.find(".item-xuan").removeClass("selected");
    } else {
        _this.find(".item-xuan").addClass("selected");
        getDollByType();
    }
});
/**
 * 提取按钮处理函数
 * @param e:{Object} => 事件对象
 * @param _this:{Object} => 触发该事件的DOM对象（提取按钮）
 */
function dollHandler(e, _this) {
    e.stopPropagation();
    var dollTypeList = [];
    var dollTypeNumList = [];
    $(".exchangeprice").each(function (i, e) {
        var nn = parseInt($(e).text());
        if (nn > 0) {
            var dollType = $(e).attr("data-dollType");
            dollTypeList.push(dollType);
            dollTypeNumList.push(nn);
        }
    });
    g.setSession('dollTypeList', dollTypeList);
    g.setSession('dollTypeNumList', dollTypeNumList);
    var allNum = parseInt($(".allNum").text());
    if (allNum > 1) {
        location.href = "http://" + location.hostname + "/drawDetails";
    } else {
        tips("提取娃娃须大于1个,请先确定数量!");
    }
}

/**
 * 初始化程序
 */
$(function () {
    getDollByType();
    touchend('#dollBtn', dollHandler, true);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[23]);