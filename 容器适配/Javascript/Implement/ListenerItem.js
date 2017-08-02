/**
 * @class ListnerItem
 * @param {BridgeEventType} type 
 * @param {Function} listener
 * @extends IjsBridge
 */
function ListenerItem(type, listener) {
    this.type = "";
    this.listener = function (event) { console.log(event); };

    if (type) this.type = type;
    if (listener) this.listener = listener;
}