/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @class H5Bridge
 * @extends AjsBridge
 * @constructor  
 */
function MobileBridge() {
    AjsBridge.call(this);
    var me = this;
    me.ContainerType = ContainerType.Mobile;
    window.addEventListener("load", function () {
        me._MobileReady();
    });
}

/**
 * H5Bridge inherit AjsBridge
 */
MobileBridge.prototype = Object.create(AjsBridge.prototype);

/**
 * @method _iosReady
 * @private 
 * @return {void} 
 */
MobileBridge.prototype._MobileReady = function () {
    var me = this;
    me.dispatchEvent(BridgeEventType.ready);
};

/**
 * @override
 * @method scan
 * @param {Object} scanOptions
 * @return {void}
 */
MobileBridge.prototype.scan = function(scanOptions) {
    var me = this;
    var options = me.extend(me.defaultScanOptions, scanOptions);
    options.complete("Not Implement!");
};