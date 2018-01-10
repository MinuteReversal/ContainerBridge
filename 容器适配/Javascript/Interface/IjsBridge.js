/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @interface IjsBridge
 */
function IjsBridge() { }

/**
 * 复制属性
 * @method extend 
 * @abstract 
 * @param {Object} object,object,object...
 * @return {void} 
 */
IjsBridge.prototype.extend = function ( /*...*/) { throw new NotImplementException(); };

/**
 * 监听事件
 * @method addEventListener
 * @abstract 
 * @param {BridgeEventType} type 
 * @param {Function} listener 
 * @return {void} 
 */
IjsBridge.prototype.addEventListener = function (type, listener) { throw new NotImplementException(); };

/**
 * 派发事件
 * @method dispatchEvent
 * @abstract 
 * @param {BridgeEventType} type 
 * @returns {void} 
 */
IjsBridge.prototype.dispatchEvent = function (type) { throw new NotImplementException(); };

/**
 * 删除监听
 * @method removeEventListener
 * @abstract 
 * @param {BridgeEventType} type 
 * @param {Function} listener 
 * @return {void} 
 */
IjsBridge.prototype.removeEventListener = function (type, listener) { throw new NotImplementException(); };

/**
 * 
 * @param {} ajaxOptions 
 * @returns {} 
 */
IjsBridge.prototype.ajax = function (ajaxOptions) { throw new NotImplementException(); };


/**
*拍照或从手机相册中选图接口
*/
IjsBridge.prototype.chooseImage = function () { throw new NotImplementException(); };



/**
 * 扫描二维码
 * @method scan
 * @virtual
 * @param {Object} scanOptions
 * @return {void} 
 */
IjsBridge.prototype.scan = function (scanOptions) { throw new NotImplementException(); };

/**
 * 支付
 * @returns {void} 
 */
IjsBridge.prototype.pay = function (payOptions) { throw new NotImplementException(); };

/**
 * 分享
 * @param {} shareOptions 
 * @returns {void} 
 */
IjsBridge.prototype.share = function (shareOptions) { throw new NotImplementException(); };

/**
 * 设置appId appSecret
 * @method setAppOptions
 * @param {AppOptions} appOptions
 * @returns {} 
 */
IjsBridge.prototype.setAppOptions = function (appOptions) { throw new NotImplementException(); };