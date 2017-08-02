/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @class BridgeFactory
 */
function BridgeFactory() { }

/**
 * @function Create
 * @param {String} userAgent 
 * @returns {IjsBridge} 
 */
BridgeFactory.prototype.Create = function (userAgent) {
    var bridge;
    if (/MicroMessenger/ig.test(userAgent)) {
        bridge = new WechatBridge();
    }
    else if (/AlipayClient/ig.test(userAgent)) {
        bridge = new AlipayBridge();
    }
    else if (/AndroidShell/ig.test(userAgent)) {
        bridge = new AndroidBridge();
    }
    else if (/iOSshell/ig.test(userAgent)) {
        bridge = new IosBridge();
    }
    else if (/ICBC/ig.test(userAgent)) {
        bridge = new RelBridge();
    }
    else if (/Android/ig.test(userAgent)) {
        bridge = new MobileBridge();
    }
    else if (/iPhone|iPad|iPod/ig.test(userAgent)) {
        bridge = new MobileBridge();
    }
    else {
        bridge = new H5Bridge();
    }
    return bridge;
};

var ContainerBridge = null;
try {
    ContainerBridge = new BridgeFactory().Create(window.navigator.userAgent);
} catch (e) {
    new BridgeLogger().write(e.message);
}
