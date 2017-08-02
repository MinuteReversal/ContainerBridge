/**
 * Asynchronous Javascript And XML
 * @class AjaxOptions
 */
function AjaxOptions(url, method, data, onComplete) {
    this.EnumMethodType = {
        "GET": "GET",
        "POST": "POST"
    };
    this.url = "";
    this.method = this.EnumMethodType.GET;
    this.data = null;
    this.cache = true;

    if (url) this.ur = url;
    if (method) this.method = method;
    if (data) this.data = data;
    if (onComplete) this.onComplete = onComplete;
}

AjaxOptions.prototype.onComplete = function (result) { };
AjaxOptions.prototype.onSuccess = function (result) { };
AjaxOptions.prototype.onError = function (result) { };

