webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(1);
var userCode = g.getSession("uCode");
var requestParams = '{"userCode":"' + userCode + '",' + g.tempOpt() + '"}';
var $roomMoney = $("#room-money"),
    $rechargewrapper = $("#recharge-wrapper");
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
            $("#balance").html(res.userInfo.coin);
            $("#userImage").attr("src", res.userInfo.picUrl);
            $("#app").removeClass("none");
            getAdvertList();
        } else {
            tips('接口错误');
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
 *获取首页轮播图
 * @param userCode:{String} => 用户信息
 */
function getAdvertList() {
    var methodName = "/advert/getAdvertList";
    var str = JSON.parse(requestParams);
    $("#swiper-wrapper-ad").html();
    g.request({
        "url": methodName,
        "param": str
    }, function (res) {
        getRollPageByTv();
        if (res.status === 1) {
            var data = res.contentList;
            if (data.length > 0) {
                var html = '';
                $.each(data, function (k, v) {
                    html += '<a href="' + v.urlPath + '" class="swiper-slide flex l-center mt10"><img src="' + v.imgPath + '" alt="" class="swipter"></a>';
                });
                $("#swiper-wrapper-ad").append(html);
                new Swiper(".swiper-container-ad", {
                    centeredSlides: true,
                    slidesPerView: 2,
                    initialSlide: 2,
                    spaceBetween: 15,
                    loop: true,
                    slidesOffsetBefore: -Math.ceil(.146666 * document.documentElement.clientWidth),
                    autoplay: {
                        delay: 5000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true
                    }
                });
            } else {
                tips("数据为空");
            }
        } else {
            tips(msg);
        }
    });
};
/**
 *获取首页广播信息
 * @param userCode:{String} => 用户信息
 */
function getRollPageByTv() {
    var methodName = "/advert/getRollPageByTv";
    var str = JSON.parse(requestParams);
    $("#slider-list").html();
    g.request({
        "url": methodName,
        "param": str
    }, function (res) {
        getRoomList();
        if (res.status === 1) {
            var data = res.rollPageList;
            if (data.length > 0) {
                var html = '';
                $.each(data, function (k, v) {
                    html += '<li class="swiper-slide slider-slide"><div class="TopHitWawa"> 恭喜 <i>' + v.nickName + '</i> 抓到了<i>"' + v.title + '"</i></div></li>';
                });
                $("#slider-list").append(html);
                new Swiper(".swiper-container-carousel", {
                    direction: "vertical",
                    autoplay: {
                        delay: 3000
                    }
                });
            } else {
                tips("数据为空");
            }
        } else {
            tips(msg);
        }
    });
};
/**
 *娃娃机房间列表接口
 * @param userCode:{String} => 用户信息
 */
function getRoomList() {
    var methodName = "/room/roomList";
    var str = JSON.parse(requestParams);
    g.request({
        "url": methodName,
        "param": str
    }, function (res) {
        if (res.status === 1) {
            var data = res.roomList;
            if (data.length > 0) {
                var html = '';
                $.each(data, function (k, v) {
                    html += '<a class="index-item free" href="/wawaji/index.html?rid=' + v.roomId + '&rcode=' + v.roomCode + '&dollType=' + v.dollType + '">';
                    html += '<div class="pr"><img src="' + v.roomPicUrl + '" alt=""></div>';
                    html += '<div class="title flex l-center">';
                    html += '<div class="name f14 flex1 ">' + v.roomTitle + '</div>';
                    html += '<div class="money flex l-center ">';
                    html += '<img src="static/images/ico_gold.png" alt="" class="ml5" style="width:0.26rem">' + v.gameCoin + '</div>';
                    html += '</div></a>';
                });
                $("#room-list").append(html);
            } else {
                tips("数据为空");
            }
        } else {
            tips('接口错误');
        }
    });
};

/**
 * 初始化程序
 */
$(function () {
    getUserInfo();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[17]);