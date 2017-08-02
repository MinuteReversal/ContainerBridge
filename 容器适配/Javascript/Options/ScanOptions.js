/**
 * 扫码设置
 * @property DefaultScanOptions 
 * @type Object
 */
function ScanOptions() {
    /**
     * 扫码类型
     * @attribute scanType
     * @type scanType
     * @default scanType.qrCode
     */
    this.scanType = ScanType.qrCode;

};

/**
 * 
 * @event onComplete
 */
ScanOptions.prototype.onComplete = function (resultStr /*扫描结果*/) {
    console.log(resultStr);
}//扫描回调


