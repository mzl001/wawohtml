webpackJsonp([11],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(1);
$("#app").removeClass("none");
var userCode = g.getSession("uCode");
/**
 *已领取娃娃列表
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
        var methodName = "/user/userCatchDollRecord";
        var requestParams = '{"userCode":"' + userCode + '","pageNum":"' + gPage + '","pageRows":"' + gPageSize + '", ' + g.tempOpt() + '"}';
        var str = JSON.parse(requestParams);
        g.request({
            "url": methodName,
            "param": str
        }, function (res) {
            isDown = true;
            console.log(res);
            //$mainDiv.unbind('scroll');
            //$(".loadfooter").hide();
            if (res.status === 1) {
                $("#app").removeClass("none");
                var data = res.catchDollList;
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
            var statusStr = parseInt(v.result) ? '<p class="mg green f13">抓取成功</p>' : '<p class="mg red f13">抓取失败</p>';
            html += '<div class="z-item flex l-center bg-white border-2">';
            html += '<div class="z-item-img">';
            html += '<img src="' + v.narrowPicUrl + '" alt="">';
            html += '</div>';
            html += '<div class="z-item-main flex flex1 a-between">';
            html += '<div class="flex fd-column">';
            html += '<p class="name f18">' + v.roomName + '</p>';
            html += '<p class="createtime f13">' + v.gameEndTime + '</p>';
            html += '</div>';
            html += statusStr;
            html += '</div>';
            html += '</div>';
        });
        $bodyHeight.append(html);
    }
    //==============核心代码=============
    $mainDiv.height($(window).height() - $("header").height());
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

},[13]);