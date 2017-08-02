/**
 * 日志
 * @class BridgeLogger
 * @constructor
 */
function BridgeLogger() { }

/**
 * 写日志
 * @method write
 * @param {String} text 
 * @return {void} 
 */
BridgeLogger.prototype.write = function (text) {
    if (ContainerBridgeConfig.debug) {
        console.log(text);
        alert(text);
    }
};