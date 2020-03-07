define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var LayerOrders;
    (function (LayerOrders) {
        LayerOrders[LayerOrders["BELOW_ALL"] = 0] = "BELOW_ALL";
        LayerOrders[LayerOrders["BELOW_BACKGROUND"] = 1] = "BELOW_BACKGROUND";
        LayerOrders[LayerOrders["BACKGROUND"] = 2] = "BACKGROUND";
        LayerOrders[LayerOrders["MAINGROUND"] = 3] = "MAINGROUND";
        LayerOrders[LayerOrders["FOREGROUND"] = 4] = "FOREGROUND";
        LayerOrders[LayerOrders["ABOVE_FOREGROUND"] = 5] = "ABOVE_FOREGROUND";
        LayerOrders[LayerOrders["POPUP"] = 6] = "POPUP";
        LayerOrders[LayerOrders["POPUP_EXTRA"] = 7] = "POPUP_EXTRA";
        LayerOrders[LayerOrders["ABOVE_ALL"] = 8] = "ABOVE_ALL";
    })(LayerOrders = exports.LayerOrders || (exports.LayerOrders = {}));
});
