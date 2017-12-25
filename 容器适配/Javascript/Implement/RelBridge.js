/**
 * author : codec007
 * date   : 20170320
 * documents:
 *  https://im.icbc.com.cn/ICBCMPServer/wiki/
 *  http://u.yibalian.cn/Center/JsApiSignature?url=http%3a%2f%2fbaidu.com
 */

/**
 * @class 融e联
 * @extends AjsBridge
 * @constructor 
 */
function RelBridge() {
    AjsBridge.call(this);
    var me = this;
    me.ContainerType = ContainerType.Rel;

    //load relJsApi
    try {
        var script = document.createElement("script");
        script.addEventListener("load", function (e) {
            me.logger.write("script loaded");
            try {
                if (typeof rel === "undefined") me.logger.write("Not find rel Inerface!");
                me._listenrelError();
                me._relReady();
                me._remoteGetConfig();
            }
            catch (e) {
                me.logger.write(e.message);
            }
        });
        document.querySelector("head").appendChild(script);
        script.src = ContainerBridgeConfig.relJsUrl;
    } catch (e) {
        me.logger.write(e.message);
    }
}

//relBridge inherit AjsBridge
RelBridge.prototype = Object.create(AjsBridge.prototype);

/**
 * @method _relReady
 * @private
 * @return {void}
 */
RelBridge.prototype._relReady = function () {
    var me = this;
    rel.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        me.dispatchEvent(BridgeEventType.ready);
    });
};

/**
 * @method _listenrelError
 * @private 
 * @returns {void} 
 */
RelBridge.prototype._listenrelError = function () {
    var me = this;
    me.logger.write("_listenrelError");
    rel.error(function (res) {
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
RelBridge.prototype._remoteGetConfig = function () {
    var me = this;
    me.logger.write("_remoteGetConfig");
    try {
        var url = ContainerBridgeConfig.relSignatureApiUrl + "?url=" + encodeURIComponent(location.href.split("#")[0]);
        me.logger.write(url);
        me.ajax({
            url: url,
            method: "GET",
            onSuccess: function (data) {
                var remouteConfig = data.result;
                var relConfig = {
                    debug: ContainerBridgeConfig.debug ? 1 : 0, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appid: remouteConfig.AppId,                 // 必填，公众号的唯一标识
                    timestamp: remouteConfig.TimeStamp,         // 必填，生成签名的时间戳
                    nonceStr: remouteConfig.Noncestr,           // 必填，生成签名的随机串
                    signature: remouteConfig.Signature          // 必填，签名，见附录1
                };
                me.logger.write(JSON.stringify(data));
                rel.init(relConfig);
            },
            onError: function (xhr) {
                me.logger.write("onError:" + xhr.status  + xhr.responseText);
            }
        });
    } catch (e) {
        me.logger.write(e.message);
    }

};

/**
 * 调用扫描
 * @override
 * @method scan 
 * @param {Object} scanOptions
 * @return {void} 
 * @throws {UnSupportedException}
 */
RelBridge.prototype.scan = function (scanOptions) {
    var me = this;
    var options = me.extend(me.defaultScanOptions, scanOptions);
    //原始微信设置
    var relScanOptions = {
        Needdeal: "0", //0 融e联不处理，1表示处理，默认为0
        success: function (res) {
            options.complete(res.errMsg);//通知订阅用户
        }
    };

    rel.scanQRCode(relScanOptions);
};

/**
 * 分享
 * @override
 * @method share
 * @param {object} shareOptions 
 * @returns {void} 
 */
RelBridge.prototype.share = function (shareOptions) {
    var me = this;
    var options = me.extend(me.defaultScanOptions, shareOptions);
    rel.shareMenuItemsCustom({
        //showMenuList根据自定义分享传递对应的参数,如果不传则不能分享
        showMenuList: shareOptions.showMenuList,
        success: function (res) {
            options.complete(res.retMsg.result);//通知订阅用户
        }
    });
};

/**
 * 支付
 * @override
 * @method pay
 * @param {object} payOptions 
 * @returns {void} 
 */
RelBridge.prototype.pay = function (payOptions) {
    var me = this;
    rel.chooseRELPay({
        appid: "", // 必填，公众号的唯一标识    
        timestamp: "", // 必填，生成支付签名的时间戳     
        orderid: "", //必填，订单id
        totalFee: "", //必填，支付金额(分)
        nonceStr: "", // 必填，生成支付签名的随机串  
        channelAppNo: "", //非必填,渠道应用编号
        remark: "", //必填,备注信息
        signature: "", // 必填，签名,生成签名方法可以参考支付章节-附录2 jsapi支付
        success: function (res) {
            var result = res.errMsg; // 返回支付结果成功为chooseRELPay:ok	
        },
        failed: function (res) {
            me.logger.write(res.errMsg);
        },
        complete: function (res) {
            me.logger.write(res.errMsg);
        },
        cancel: function (res) {
            me.logger.write(res.errMsg);
        }
    });
};