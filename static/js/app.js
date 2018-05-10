// 公用配置项
var config =
{
    // 接口请求配置
    //apihost : 'http://119.23.32.87/api',
    apihost : 'http://wx.91wawo.com/apiwawo',
    // 本机
    //apihost : 'http://192.168.41.79:8080/api',
};
// 公用属性 & 方法
var g =
{
    isAndroid : (function(){ return /(Android)/i.test(navigator.userAgent); })(),
    isIOS : (function(){ return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent); })(),
    isWeiXin : (function() { var ua = window.navigator.userAgent.toLowerCase(); var result = ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false; return result })(),
    isWeibo : (function () { return /(weibo)/i.test(navigator.userAgent.toLowerCase()) })(),
    isQQ : (function () { return /(qq)/i.test(navigator.userAgent.toLowerCase()) })(),
    verifyPhone : function(phone) { return !!phone.match(/^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/); },
    IsPC : (function() {
        var userAgentInfo = navigator.userAgent,
            Agents = ["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],
            flag = true;
        for ( var v = 0; v < Agents.length; v++ ) { if( userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } }
        return flag;
    })(),
    device : (function(){
        var device = "pc";
        if( this.isAndroid ) device = "android";
        if( this.isIOS ) device = "iphone";
        return device;
    })(),
    xssScript : function (s){ 
        var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")        //格式 RegExp("[在中间定义特殊过滤字符]")
        var rs = ""; 
        for (var i = 0; i < s.length; i++) { 
         rs = rs+s.substr(i, 1).replace(pattern, ''); 
        }
        return rs;
    },
    // 获取地址栏参数
    getUrlParams : function(name)
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return this.xssScript(unescape(r[2])); return null;
    },
    getNum : function(){
        return new Date().getTime() + Math.floor(Math.random() * 100000);
    },
    // 截取字数
    cutstr : function (str,len)
    {
        var str_length = 0;
        var str_len = 0;
        var str_cut = '';
        str_len = str.length;
        for(var i = 0;i<str_len;i++)
        {
            var a = str.charAt(i);
            str_length++;
            if(escape(a).length > 4) str_length++;
            str_cut = str_cut.concat(a);
            if( str_length >= len ) { str_cut = str_cut.concat("..."); return str_cut; }
        }
        if(str_length < len) return str;
    },
    //时间戳返回具体时间
    formatDate : function (timestamp) {
        var thisTime = new Date(timestamp);
        var year = thisTime.getFullYear();
        var month = thisTime.getMonth() + 1;
        var date = thisTime.getDate();
        var hour = thisTime.getHours();
        var minute = thisTime.getMinutes();
        var second = thisTime.getSeconds();
        function got(obj){ return (obj>9) ? obj : '0' + obj; }
        return year + "-" + got(month) + "-" + got(date) + " " + got(hour) + ":" + got(minute) + ":" + got(second);
    },
    // 邮箱验证
    checkMail : function (mail){
        var filter = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (filter.test(mail)){ return true; }else{return false;}
    },
    // 设置本地存储数据
    setLocal : function (key, value) {
    localStorage.setItem(key, value);
    },
    // 获取本地存储数据
    getLocal : function (key) {
        return localStorage.getItem(key);
    },
    // 设置临时本地存储数据
    setSession : function (key, value) {
    sessionStorage.setItem(key, value);
    },
    // 获取临时本地存储数据
    getSession : function (key) {
        return sessionStorage.getItem(key);
    },
    // 删除临时本地存储数据
    removeSession : function (key) {
        return sessionStorage.removeItem(key);
    },
    //回退一步
    goBack : function(el){
        window.history.back(-1);
        // window.location=document.referrer;
    },
    tempOpt : function(){
        return '"sourceType":"ios","platformType":"ios","key" : "k'+this.getNum()+'", "timestamp": "t'+this.getNum()+'", "token":"m'+this.getNum();
    },
    /**
     * 请求接口
     * @method: 接口名称（方法）
     * @data: 传递的参数
     * @callback: 回调函数
     * @param: 配置参数
     * @param.showloading : 默认为true
     */
    isSendEnd : true,
    request : function(opt, callback)
    {
        var _this = this,
            params = {
                showLoading : true,
                parallel : false
            };
        if( !_this.isSendEnd && !params.parallel ) return;
        _this.isSendEnd = false;
        if( params.showLoading ) _this.loading.show();
        $.ajax({
            url: config.apihost + opt.url,//数据的接口的路径
            type: opt.type||"post",//请求的方式  默认是post
            data: opt.param||"",//请求的参数  默认是空
            async: opt.async||true,//是否是异步，默认是异步
            success : function(data) {
                _this.isSendEnd = true;
                if( params.showLoading ) _this.loading.remove();
                callback(data);
            },
            error : function(err) { tips(err); _this.isSendEnd = true; }
        })
    },
    /**
     *添加用户收货地址
     * @param userCode:{String} => 用户信息
     */
    addOrUpdUserAddress : function (requestParams){
        var methodName = "/user/addOrUpdUserAddress";
        var str = JSON.parse(requestParams);
        g.request({
            "url":methodName,
            "param":str,
        }, function(res){
            if(res.status===1){
                location.href="http://"+location.hostname+"/selectHome";
            }else{
               tips(res.msg); 
            }           
        });
    },
    /**
     * 获取充值类型列表
     * @param userCode:{String} => 用户信息
     */
    listRechargeMealType : function (requestParams,$rechargewrapper){
        var methodName = "/recharge/listRechargeMealType";
        var str = JSON.parse(requestParams);
        g.request({
            "url":methodName,
            "param":str,
        }, function(res){
            if(res.status===1){
                $rechargewrapper.addClass("is-load");
                var data = res.mealTypeList;
                if (data.length > 0) {
                    var html = '';
                    $.each(data,function(k,v){
                        html += '<div class="addMoney-item flex l-center">';
                        html += '<div class="addMoney-title flex l-center">';
                        html += '<div></div>';
                        html += '<span class="addMoney-arrivecount">'+v.normalCoin+'</span>'; 
                        html += '</div>';
                        html += '<div class="addMoney-label ml15 f12" data-giveCion="'+v.giveCoin+'" data-hot="'+v.isHot+'">送'+v.giveCoin+'币</div>';
                        html += '<div class="addMoney-text flex1 flex a-right red">';
                        html += '<div class="inner-text">￥'+v.price+'</div>';
                        html += '</div>';
                        html += '</div>';
                    })
                    $("#addmoney-wrapper").append(html);
                    $.each($(".addMoney-label"),function(k,v){
                        if(parseInt($(v).attr("data-giveCion"))===0){
                            v.remove();
                        }
                        if(parseInt($(v).attr("data-hot"))){
                            $(v).addClass("hot");
                        }
                    })
                }else{
                    tips("无列表");
                }
            }else{
               tips(res.msg); 
            }           
        });
    },
    // 设置来源值(From device)
    setSource : (function(){
        var source = 'h5';
        if( this.isWeiXin ) source = 'weixin';
        return source;
    })(),

    // 跳转登录页面 
    // url @ 登录成功指定要跳转的页面
    login : function( url )
    {
        if( this.getItem('_uk') == undefined ) {
            g.setItem('_url',window.location,'7','/','.hitao.com');   //设置cookie  用于登录返回
            if ( this.isWeiXin ) {
                url ? this.wxUrl('/login.html?gourl=' + url) : this.wxUrl('login.html');
            } else {
                window.location.href = '/login.html';
            }
        }
    },

    // 退出登录
    logout : function(){
        if( g.getItem('_uk') ) {
            g.request('logoff',{ukey:g.getItem('_uk')},function(result){
                result.code === 1 ? window.location.href = '/logout.html' : tips(result.message, function(){ window.location.reload() });
            });
        }
    },
    loading :
    {
        show : function()
        {
            if( $('#loading').length <= 0 ) { $("body").append('<span id="loading"><img src="../static/images/timg.gif" /></span>'); }
        },
        remove : function() { $('#loading').fadeOut(200,function(){ $(this).remove(); }) }
    }  
};
/**
 * @Desc:获取时间戳
 */
function getTimestamp()
{
    var thisTime = new Date(),
        thisYear = thisTime.getFullYear(),
        thisMoth = thisTime.getMonth() + 1,
        thisDate = thisTime.getDate(),
        thisHours = thisTime.getHours(),
        thisMin = thisTime.getMinutes(),
        thiSec = thisTime.getSeconds();
    return thisYear + "-" + thisMoth + "-" + thisDate + " " + thisHours + ":" + thisMin + ":" + thiSec;
}


/**
 * 重置touchend事件
 * @obj : 触发touchend事件DOM对象
 * @func : 触发事件处理函数
 * @live : 默认false，设置该参数为true，则使用Jquery的delegate方法处理事件;PS:只应用delegate的回调函数，不支持传递额外数据
 */
function touchend(obj, func, live)
{
    var isMove = false;
    if( live === undefined )
    {
        obj.on('touchmove touchend',function(e){
            var _this = $(this);
            if(e.type == 'touchmove') isMove = true;
            if(e.type == "touchend") {
                if( isMove ) { isMove = false; return false; }
                func(e,_this);
            }
        });
    }
    else
    {
        var selector = live === true ? $('body') : live.selector;
        selector.delegate(obj, 'touchmove touchend',function(e){
            var _this = $(this);
            if(e.type == 'touchmove') isMove = true;
            if(e.type == "touchend") {
                if( isMove ) { isMove = false; return false; }
                func(e,_this);
            }
        });
    }
}


/**
 * @Desc:信息提示弹层
 * @text:提示信息文字
 * @time:展示时间
 * @callback:回调函数
 */
function tips(text,time,callback)
{
    if( text.trim() === '' && $('#tips').is(':visible') ) return;
    var html = '<section id="tips" class="fix-full"><div class="box">'+ text +'</div></section>',
        t = typeof time == 'number' ? time : 3000,
        cb = typeof time == "function" ? time : callback;
    $('#tips').length <= 0 ? $(document.body).append(html) : $('#tips').find('.box').html(text);
    $('#tips').fadeIn(300);
    setTimeout(function(){
        $('#tips').fadeOut(200);
        if( typeof cb == "function" ) cb();
    },t);
}



/**
 * 将JSON数据转换成JSON字符串格式或地址栏参数
 * @param json:需要转换的JSON对象
 * @param type: json | params
 * @return string
 */
function toJSONString(json,type)
{
    var data = json,
        _type = type == undefined ? 'json' : type,
        result = '';

    if( _type == 'params' )
    {
        console.log(json);
        $.each(data,function(key,value){ result += key + '=' + value + '&' });
        result = result.substring(0,result.length - 1);
    }
    else
    {
        result = '{';
        $.each(data,function(key,value){ result += '"'+ key +'":"' + value +'",'; });
        result = result.substring(0,result.length - 1);
        result += '}';
    }
    return result;
}

// var userCode="99fc47bce204e8a246ce3cf05293a20d76232e2a";
// g.setSession("uCode",userCode);
/**
 * 初始化程序
 */
$(function(){
    var methodName = "/wx/oauth";
    g.request({
        "url":methodName,
        "type":'get',
    }, function(res){
        if(res.status===1){
            g.setSession("uCode",res.userInfo.userCode);
        }
    });
});


