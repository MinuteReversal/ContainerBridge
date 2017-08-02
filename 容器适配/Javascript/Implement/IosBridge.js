/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @class IosBridge
 * @extends AlipayBridge
 * @constructor
 */
function IosBridge() {
    AjsBridge.call(this);
    var me = this;
    me.options = null;
    this.ContainerType = ContainerType.iOS;
    window.addEventListener("load", function () {
        if (typeof JSModel === "undefined") throw new Error("Not find interface");
        me._iosReady();
    });
}

/**
 * IosBridge inherit AjsBridge
 */
IosBridge.prototype = Object.create(AjsBridge.prototype);

/**
 * @method _iosReady
 * @private 
 * @return {void} 
 */
IosBridge.prototype._iosReady = function () {
    var me = this;
    me.dispatchEvent(BridgeEventType.ready);
};

/**
 * @method onScanComplete
 * @returns {void} 
 */
function onScanComplete(result) {
    ContainerBridge.options.complete(result.qrValue);
};

/**
 * @override
 * @method scan
 * @param {Object} scanOptions
 * @return {void}
 * @throws {ArgumentException}
 * @throws {UnSupportedException}
 */
IosBridge.prototype.scan = function(scanOptions) {
    if (!scanOptions) throw new ArgumentException("options");

    var me = this;
    var options = me.extend(me.defaultScanOptions, scanOptions);

    if (options.scanType === ScanType.cardNumber) throw new UnSupportedException("cardNumber");

    me.options = options;

    JSModel.callQrReaderView();
};