/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @class AlipayBridge
 * @extends AjsBridge
 * @constructor 
 */
function AlipayBridge() {
    AjsBridge.call(this);
    var me = this;
    me.ContainerType = ContainerType.Alipay;
    me._listenAlipayReady();

    //load AlipayJsApi
    var script = document.createElement("script");
    script.addEventListener("load", function (e) {
        if (typeof AlipayJSBridge === "undefined") me.logger.write("not find AlipayJSBridge object!");
    });
    document.querySelector("head").insertBefore(script,null);
    script.src = ContainerBridgeConfig.alipayJsUrl;
}

/**
 * AlipayBridge inherit AjsBridge
 */
AlipayBridge.prototype = Object.create(AjsBridge.prototype);

/**
 * 监测支付宝准备完成
 * @method _listenAlipayReady
 * @private 
 * @return {void} 
 */
AlipayBridge.prototype._listenAlipayReady = function () {
    var me = this;
    document.addEventListener('AlipayJSBridgeReady', function () {
        me.dispatchEvent(BridgeEventType.ready);
    }, false);
};

/**
 * @override
 * @method scan
 * @param {Object} scanOptions 
 * @return {void} 
 * @throws {ArgumentException}
 */
AlipayBridge.prototype.scan = function(scanOptions) {
    if (!scanOptions) throw new ArgumentException("scanOptions");

    var me = this;
    var options = me.extend(me.defaultScanOptions, scanOptions);

    var alipayScanOptions = { type: 'qr' };

    switch (options.scanType) {
    case ScanType.barCode:
        alipayScanOptions.type = "bar";
        break;
    case ScanType.qrCode:
        alipayScanOptions.type = "qr";
        break;
    case ScanType.cardNumber:
        alipayScanOptions.type = "card";
        break;
    }

    AlipayJSBridge.call('scan', alipayScanOptions, function(result) {
        options.complete(result[options.scanType]); //通知用户的订阅
    });
};
