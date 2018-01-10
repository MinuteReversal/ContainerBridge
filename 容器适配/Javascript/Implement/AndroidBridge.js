/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @class AndroidBridge
 * @extends AjsBridge
 * @constructor
 */
function AndroidBridge() {
    AjsBridge.apply(this, arguments);
    var me = this;
    me.ContainerType = ContainerType.Android;
    me.options = null;
    if (typeof device === "undefined") throw new Error("Not find interface");
    me._andriodReady();
}

/**
 * AndroidBridge inherit AjsBridge
 */
AndroidBridge.prototype = Object.create(AjsBridge.prototype);

/**
 * @method _andriodReady
 * @private 
 * @return {void} 
 */
AndroidBridge.prototype._andriodReady = function () {
    var me = this;
    me.dispatchEvent(BridgeEventType.ready);
};

/**
 * 设备回调
 * @method getQRcodeResult
 * @param {String} result
 * @return {void}
 */
function getQRcodeResult(result) {
    ContainerBridge.options.complete(JSON.parse(result).QRCodeResult);
};

/**
 * @override
 * @method scan
 * @param {Object} scanOptions
 * @return {void}
 * @throws {ArgumentException}
 * @throws {UnSupportedException}
 */
AndroidBridge.prototype.scan = function (scanOptions) {
    if (!scanOptions) throw new ArgumentException("options");

    var me = this;
    var options = me.extend(me.defaultScanOptions, scanOptions);

    if (options.scanType === ScanType.cardNumber) throw new UnSupportedException("cardNumber");

    me.options = options;

    device.scanQRcode();
};