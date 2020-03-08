define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function makeEffectButton(button, type, normalScale, effectedScale) {
        if (normalScale === void 0) { normalScale = 1.0; }
        if (effectedScale === void 0) { effectedScale = 0.8; }
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                button.setScale(normalScale);
                button.runAction(cc.scaleTo(0.1, normalScale * effectedScale, normalScale * effectedScale));
                return false;
            case ccui.Widget.TOUCH_CANCELED:
                button.setScale(normalScale * effectedScale);
                button.runAction(cc.scaleTo(0.3, normalScale).easing(cc.easeBackOut()));
                return false;
            case ccui.Widget.TOUCH_ENDED:
                button.setScale(normalScale * effectedScale);
                button.runAction(cc.scaleTo(0.3, normalScale).easing(cc.easeBackOut()));
                return true;
            default:
                return false;
        }
    }
    exports.makeEffectButton = makeEffectButton;
    ;
});
