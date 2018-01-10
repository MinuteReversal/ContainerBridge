/**
 * author : codec007
 * date   : 20160122
 * documents:
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */

/**
 * @class WechatBridge
 * @extends AjsBridge
 * @constructor 
 */
function WechatBridge() {
    AjsBridge.apply(this, arguments);
    var me = this;
    me.ContainerType = ContainerType.Wechat;
    me.appOptions = new AppOptions(ContainerBridgeConfig.wechatAppID, ContainerBridgeConfig.wechatAppSecret);

    //load WechatJsApi
    try {
        var script = document.createElement("script");
        script.addEventListener("load", function () {
            if (typeof wx === "undefined") me.logger.write("Not find wechat Inerface!");
            me._listenWechatError();
            me._onWechatReady();
            me._remoteGetConfig();
        });
        document.querySelector("head").appendChild(script);
        script.src = ContainerBridgeConfig.wechatJsUrl;
    } catch (e) {
        me.logger.write(e.message);
    }
}

//WechatBridge inherit AjsBridge
WechatBridge.prototype = Object.create(AjsBridge.prototype);

/**
 * @method _wechatReady
 * @private
 * @return {void}
 */
WechatBridge.prototype._onWechatReady = function () {
    var me = this;
    wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        me.dispatchEvent(BridgeEventType.ready);
    });
};

/**
 * @method _listenWechatError
 * @private 
 * @returns {void} 
 */
WechatBridge.prototype._listenWechatError = function () {
    var me = this;
    wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        me.logger.write(JSON.stringify(res));
    });
};

/**
 * 远程获取微信配置
 * @method _remoteGetConfig
 * @private  
 * @return {void} 
 */
WechatBridge.prototype._remoteGetConfig = function () {
    var me = this;
    me.ajax({
        url: ContainerBridgeConfig.wechatSignatureApiUrl + "?appid=" + me.appOptions.appId + "&secret=" + me.appOptions.appSecret + "&url=" + encodeURIComponent(location.href.split("#")[0]),
        method: "GET",
        onSuccess: function (result) {
            var remouteConfig = result;
            var wxConfig = {
                debug: ContainerBridgeConfig.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: remouteConfig.AppId, // 必填，公众号的唯一标识
                timestamp: remouteConfig.TimeStamp, // 必填，生成签名的时间戳
                nonceStr: remouteConfig.Noncestr, // 必填，生成签名的随机串
                signature: remouteConfig.Signature, // 必填，签名，见附录1
                jsApiList: ContainerBridgeConfig.wechatAPIList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            };
            me.logger.write(JSON.stringify(wxConfig));
            wx.config(wxConfig);
        }
    });
};

/**
 * 调用扫描
 * @override
 * @method scan 
 * @param {Object} scanOptions
 * @return {void} 
 * @throws {UnSupportedException}
 */
WechatBridge.prototype.scan = function (scanOptions) {
    var me = this;

    var options = me.extend(me.defaultScanOptions, scanOptions);

    //原始微信设置
    var wechatScanOptions = {
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            options.complete(res.resultStr);//通知用户订阅
        },
        fail: function (res) {

        },
        complete: function (res) {

        },
        cancel: function (res) {

        }

    };

    if (options.scanType === ScanType.cardNumber) throw new UnSupportedException("Wechat UnSupportedException cardNumber");
    wechatScanOptions.scanType = options.scanType;
    wx.scanQRCode(wechatScanOptions);
};

/**
 * 设置appid appsecret
 * @override
 * @param {object} appOptions 
 * @returns {} 
 */
WechatBridge.prototype.setAppOptions = function (appOptions) {
    var me = this;
    AjsBridge.prototype.setAppOptions.call(this, appOptions);
    me._remoteGetConfig();
};