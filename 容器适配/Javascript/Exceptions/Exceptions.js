/**
 * author : codec007
 * date   : 20160122
 */

/**
 * 未实现
 * @exception NotImplementException
 * @return {void} 
 */
function NotImplementException(message) {
    Error.call(this);
    this.message = "Not Implement!";
    if (message) this.message = message;
}

/**
 * NotImplementException inherit Error
 */
NotImplementException.prototype = Object.create(Error.prototype);


/**
 * 不支持的异常
 * @exception  UnSupportedException 
 * @param {String} message 
 * @return {void}
 */
function UnSupportedException(message) {
    Error.call(this);
    this.message = message;
}

/**
 * UnSupportedException inherit Error
 */
UnSupportedException.prototype = Object.create(Error.prototype);


/**
 * 参数异常
 * @exception  ArgumentException 
 * @param {String} message 
 * @returns {void} 
 */
function ArgumentException(message) {
    Error.call(this);
    this.message = message;
}

/**
 * ArgumentException inherit Error
 */
ArgumentException.prototype = Object.create(Error.prototype);
