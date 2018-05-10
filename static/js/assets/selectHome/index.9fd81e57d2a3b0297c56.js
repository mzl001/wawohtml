webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(1);
var userCode = g.getSession("uCode");
/**
 *用户收货地址列表
 * @param userCode:{String} => 用户信息
 */
function getListUserAddress() {
    var methodName = "/user/listUserAddress";
    var requestParams = '{"userCode":"' + userCode + '",' + g.tempOpt() + '"}';
    var str = JSON.parse(requestParams);
    $(".addressList").html();
    g.request({
        "url": methodName,
        "param": str
    }, function (res) {
        $("#app").removeClass("none");
        if (res.status === 1) {
            var data = res.userAddressList;
            if (data.length > 0) {
                $(".addressList").removeClass("none");
                var html = '';
                $.each(data, function (k, e) {
                    html += '<div class="flex fd-column bg-white mb10 addressBar">';
                    html += '<a class="address no-bg flex l-center border-1 plr15" href="/amendHome/?id=' + e.id + '" style="height:1.5rem">';
                    html += '<div class="address-message flex1">';
                    html += '<div class="address-top flex l-center">';
                    html += '<div class="address-name f14">' + e.userName + '</div>';
                    html += '<div class="address-tel f13">' + e.mobilePhone + '</div>';
                    html += '</div>';
                    html += '<div class="address-bottom f14">' + e.detailAddress + '</div>';
                    html += '</div>';
                    html += '<div class="icon-arrow iconfont icon-xiayibu"></div>';
                    html += '</a>';
                    html += '<div class="address-operate flex l-center border-1 plr15">';
                    html += '<div class="f14 flex1 flex l-center mr15 item-xuan-btn" data-id="' + e.id + '">';
                    html += '<div class="item-xuan" data-isDefault="' + e.isDefault + '" style="margin-right:.1rem"></div>';
                    html += '<p class="f13">设置默认地址</p>';
                    html += '</div>';
                    html += '<div class="address-btn edit f14 flex l-center a-center" data-id="' + e.id + '" data-isDefault="' + e.isDefault + '">删除</div>';
                    html += '</div>';
                    html += '</div>';
                });
                $(".addressList").append(html);
                $.each($(".item-xuan"), function (k, _this) {
                    if (parseInt($(_this).attr("data-isDefault"))) {
                        $(_this).addClass("selected");
                    }
                });
                touchend($(".item-xuan-btn"), function (e, _this) {
                    e.stopPropagation();
                    e.preventDefault();
                    if (!_this.find(".item-xuan").hasClass("selected")) {
                        $(".item-xuan").removeClass("selected");

                        updateDefault(parseInt($(_this).attr("data-id")), _this);
                    }
                });
                touchend($(".address-btn"), function (e, _this) {
                    e.stopPropagation();
                    e.preventDefault();
                    var isSelected = _this.siblings(".item-xuan-btn").find(".item-xuan").hasClass("selected");
                    if (isSelected) {
                        tips("不能删除默认地址");
                    } else {
                        delUserAddress(parseInt($(_this).attr("data-id")), _this);
                    }
                });
            } else {
                $(".empty").removeClass("none");
            }
        }
    });
};
/**
 *更新默认地址
 * @param id:{number} => 地址id
 * @param userCode:{String} => 用户信息
 */
function updateDefault(id, _this) {
    var methodName = "/user/updateDefault";
    var requestParams = '{"id":"' + id + '","userCode":"' + userCode + '", ' + g.tempOpt() + '"}';
    var str = JSON.parse(requestParams);
    g.request({
        "url": methodName,
        "param": str
    }, function (res) {
        if (res.status === 1) {
            _this.find(".item-xuan").addClass("selected");
            tips('设置默认地址成功');
        } else {
            tips(msg);
        }
    });
}
/**
 *删除收货地址
 * @param id:{number} => 地址id
 * @param userCode:{String} => 用户信息
 */
function delUserAddress(id, _this) {
    var methodName = "/user/delUserAddress";
    var requestParams = '{"id":"' + id + '","userCode":"' + userCode + '",' + g.tempOpt() + '"}';
    var str = JSON.parse(requestParams);
    g.request({
        "url": methodName,
        "param": str
    }, function (res) {
        _this.parents(".addressBar").remove();
        tips('删除地址成功');
    });
}
/**
 * 初始化程序
 */
$(function () {
    getListUserAddress();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[20]);