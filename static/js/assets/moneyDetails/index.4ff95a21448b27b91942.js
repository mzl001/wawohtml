webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(1);
var userCode = g.getSession("uCode");
/**
 *充值明细记录
 * @param userCode:{String} => 用户信息
 * @param pageNum:{Number} => 页数
 * @param pageRows:{Number} => 行数
 */
function getWawaList() {
    var gPageSize = 10;
    var gPage = 0; //设置当前页数，全局变量
    var isDown = true;
    var $mainDiv = $(".list-body-box");
    var $bodyHeight = $("#list-body");
    //根据页数读取数据
    function getData(pagenumber) {
        if (!isDown) {
            return;
        }
        isDown = false;
        gPage++; //页码自动增加，保证下次调用时为新的一页。
        var methodName = "/recharge/getlistRechargeDetail";
        var requestParams = '{"userCode":"' + userCode + '","pageNum":"' + gPage + '","pageSize":"' + gPageSize + '", ' + g.tempOpt() + '"}';
        var str = JSON.parse(requestParams);
        g.request({
            "url": methodName,
            "param": str
        }, function (res) {
            isDown = true;
            //$mainDiv.unbind('scroll');
            //$(".loadfooter").hide();
            if (res.status === 1) {
                $("#app").removeClass("none");
                $(".moneycount").html(res.userGameCoin);
                var data = res.rechargeDetailList;
                //console.log(gPage);
                if (data.length > 0) {
                    insertDiv(data);
                } else if (data.length < gPageSize) {
                    isDown = false;
                    $(".loadfooter").html("已经到底了");
                }
            }
        });
    }
    //初始化加载第一页数据
    getData(1);
    //生成数据html,append到div中
    function insertDiv(json) {
        //console.log(json);
        var html = '';
        $.each(json, function (k, v) {
            var statusStr;
            if (v.type == "game") {
                statusStr = '<div class="flex l-center f18 red">' + v.coin + '</div>';
            } else {
                statusStr = '<div class="flex l-center f18">+' + v.coin + '</div>';
            }
            var remarks = g.cutstr(v.remarks, 32);
            html += '<div class="z-item flex l-center bg-white border-1 swiper-slide-next" style="height: 1.28rem;">';
            html += '<div class="z-item-main flex flex1 a-between l-center">';
            html += '<div class="flex1 flex fd-column">';
            html += '<p class="name f16">' + remarks + '</p>';
            html += '<p class="createtime f13">' + v.createTime + '</p>';
            html += '</div>';
            html += statusStr;
            html += '</div>';
            html += '</div>';
        });
        $bodyHeight.append(html);
    }
    //==============核心代码=============
    $mainDiv.height($(window).height() - $("header").height() - $("header").height() - $(".placeholder").height());
    var winH = $mainDiv.height(); //页面可视区域高度
    var scrollHandler = function () {
        var pageH = $bodyHeight.height();
        var scrollT = $mainDiv.scrollTop(); //滚动条top
        var aa = (pageH - winH - scrollT) / winH;
        if (aa < 0.02) {
            //0.02是个参数
            //console.log("加载");
            //console.log(gPage);
            getData(gPage);
        }
    };
    //定义鼠标滚动事件
    $mainDiv.scroll(scrollHandler);
    //==============核心代码=============
};

/**
 * 初始化程序
 */
$(function () {
    getWawaList();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[19]);