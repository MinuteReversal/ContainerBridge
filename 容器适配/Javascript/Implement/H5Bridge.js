/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @class H5Bridge
 * @extends AjsBridge
 * @constructor  
 */
function H5Bridge() {
    AjsBridge.call(this);
    var me = this;
    me.ContainerType = ContainerType.PC;
    window.addEventListener("load", function () {
        me._h5Ready();
    });
}

/**
 * H5Bridge inherit AjsBridge
 */
H5Bridge.prototype = Object.create(AjsBridge.prototype);

/**
 * @method _iosReady
 * @private 
 * @return {void} 
 */
H5Bridge.prototype._h5Ready = function () {
    var me = this;
    me.dispatchEvent(BridgeEventType.ready);
};

/**
 * @override
 * @method scan
 * @param {Object} scanOptions
 * @return {void}
 */
H5Bridge.prototype.scan = function(scanOptions) {
    var me = this;
    var options = me.extend(me.defaultScanOptions, scanOptions);
    options.complete("Not Implement!");
};