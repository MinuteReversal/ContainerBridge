/**
 * author : codec007
 * date   : 20160122
 * document:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model#Property_inheritance_revisited
 */


/**
 * @class AjsBridge
 * @abstract 
 * @constructor
 */
function AjsBridge() {
    IjsBridge.call(this);
    this.appOptions = null;
    this.version = "1.1";
    this.logger = new BridgeLogger();
    this.Listeners = [];//订阅列表
}

/**
 * AlipayBridge Implement IjsBridge
 */
AjsBridge.prototype = Object.create(IjsBridge.prototype);

/**
 * @override
 * @method extend
 * @param {Object} object1,{Object} object2,...
 * @returns {Object} 
 */
AjsBridge.prototype.extend = function () {
    var o = {};
    for (var i = 0, argument; argument = arguments[i]; i++) {
        if (argument && typeof argument === "object") {
            for (var property in argument) {
                if (argument.hasOwnProperty(property)) {
                    o[property] = argument[property];
                }
            }
        }
    }
    return o;
};

/**
 * @override
 * @method addEventListener
 * @param {BridgeEventType} type 
 * @param {Function} listener 
 * @returns {void} 
 */
AjsBridge.prototype.addEventListener = function (type, listener) {
    var me = this;
    me.Listeners.push(new ListenerItem(type, listener));
};

/**
 * @override
 * @method dispatchEvent
 * @param {BridgeEventType} type 
 * @returns {void} 
 */
AjsBridge.prototype.dispatchEvent = function (type) {
    var me = this;
    me.Listeners.forEach(function (item, index, array) {
        if (item.type === type) {
            item.listener(type);
        }
    });
};

/**
 * @override
 * @method removeEventListener
 * @param {BridgeEventType} type 
 * @param {Function} listener 
 * @returns {void} 
 */
AjsBridge.prototype.removeEventListener = function (type, listener) {
    var me = this;
    me.Listeners.forEach(function (item, index, array) {
        if (item.type === type && item.listener === listener) {
            array.splice(index, 1);
        }
    });
};

/**
 * @method Ajax
 * @param {object} ajaxOptions 
 * @returns {void} 
 */
AjsBridge.prototype.ajax = function (ajaxOptions) {
    var me = this;
    var settings = me.extend(ajaxOptions, new AjaxOptions());
    try {
        var xhr = new XMLHttpRequest();
        var url = ajaxOptions.url + (settings.cache ? "" : ("&_timestamp=" + Date.now()));
        me.logger.write("ajaxUrl:" + url);
        xhr.open(settings.method, url);
        xhr.setRequestHeader("Accept", "application/json");

        //onSuccess
        xhr.addEventListener("load", function (e) {
            var text = xhr.responseText;
            if (text.indexOf("<") === 0) {
                console.log(text);
                return;
            }
            var result = JSON.parse(text);
            ajaxOptions.onSuccess(result);
        });

        //onError
        xhr.addEventListener("error", function (e) {
            console.log(e.message);
            if (ajaxOptions.onError) ajaxOptions.onError(this);
        });

        //onComplete
        xhr.addEventListener("loadend", function (e) {
            if (ajaxOptions.onComplete) ajaxOptions.onComplete(this);
        });
        xhr.send(ajaxOptions.data);
    } catch (e) {
        me.logger.write("xhr Error:" + e.message);
    }
};

/**
 * 设置app
 * @override
 * @method setAppOptions
 * @param {AppOptions}
 * @returns {void} 
 */
AjsBridge.prototype.setAppOptions = function (appOptions) {
    this.appOptions = this.extend(new AppOptions(), appOptions);
};

/**
 * 扫码设置
 * @property DefaultScanOptions 
 * @type Object
 */
AjsBridge.prototype.defaultScanOptions = {
    /**
     * 扫码类型
     * @attribute scanType
     * @type scanType
     * @default scanType.qrCode
     */
    scanType: ScanType.qrCode,
    /**
     * 
     * @attribute complete
     * @type Function
     */
    complete: function (resultStr/*扫描结果*/) { console.log(resultStr); }//扫描回调
};

/**
 * 支付设置
 * @instance
 */
AjsBridge.prototype.defaultPayOptions = {
    complete: function (result) { }
};

/**
 * 分享设置
 * @instance
 */
AjsBridge.prototype.defaultShareOptions = {
    complete: function (result) { }
};