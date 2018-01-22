var fs = require('fs');
var UglifyJS = require("C:\\Windows\\System32\\node_modules\\uglify-js");
const time = `/*${new Date().toUTCString()}*/\r\n`;

// 批量读取文件，压缩之
function buildOne(fileIn, fileOut) {
    var result = UglifyJS.minify(fileIn);
    fs.writeFileSync(fileOut,time.concat(result.code), 'utf8');
}

var files = [
    "Javascript/Options/AjaxOptions.js",
    "Javascript/Options/AppOptions.js",
    "Javascript/Options/ScanOptions.js",
    "Javascript/Implement/BridgeLogger.js",
    "Javascript/Events/BridgeEvents.js",
    "Javascript/Exceptions/Exceptions.js",
    "Javascript/Events/BridgeEvents.js",
    "Javascript/Enumerable/BridgeEnum.js",
    "Javascript/Interface/IjsBridge.js",
    "Javascript/Implement/ListenerItem.js",
    "Javascript/Abstract/AjsBridge.js",
    "Javascript/Implement/AlipayBridge.js",
    "Javascript/Implement/AndroidBridge.js",
    "Javascript/Implement/H5Bridge.js",
    "Javascript/Implement/IosBridge.js",
    "Javascript/Implement/WechatBridge.js",
    "Javascript/Implement/RelBridge.js",
    "Javascript/Implement/MobileBridge.js",
    "Javascript/Implement/BridgeFactory.js"
];


//合并为一个文件
var all = time;
for (var i = 0, file; file = files[i]; i++) {
    all += fs.readFileSync(file, 'utf8');
}
fs.writeFileSync("containerBridge.js",all, 'utf8');


//合并且压缩
buildOne(
    files,
    "containerBridge.min.js"
);

console.log("Complete");