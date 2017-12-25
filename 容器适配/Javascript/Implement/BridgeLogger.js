/**
 * 日志
 * @class BridgeLogger
 * @constructor
 */
function BridgeLogger() {
    var me = this;
}

/**
 * 写日志
 * @method write
 * @param {String} text 
 * @return {void} 
 */
BridgeLogger.prototype.write = function (text) {
    var me = this;
    if (ContainerBridgeConfig.debug) {
        prompt("日志信息", text);
    }
};