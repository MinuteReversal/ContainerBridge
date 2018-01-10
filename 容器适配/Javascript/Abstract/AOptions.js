var AOptions = function () {
    this.success = function (res) { };
    this.fail = function (res) { };
    this.complete = function (res) { };
    this.cancel = function (res) { };

    if (typeof arguments[0] === "object") {
        for (var p in arguments[0]) {
            this[p] = arguments[0][p];
        }
    }
};
