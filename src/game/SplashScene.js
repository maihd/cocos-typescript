define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var SplashScene = (function (_super) {
        __extends(SplashScene, _super);
        function SplashScene() {
            var _this = _super.call(this) || this;
            var size = cc.winSize;
            _this.addChild(new cc.LayerColor(cc.color(255, 255, 255)), -1);
            var background = new cc.Sprite("res/Main/bgSplash.png");
            background.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
            background.setScale(size.width / background.width, size.height / background.height);
            _this.addChild(background);
            return _this;
        }
        return SplashScene;
    }(cc.Scene));
    exports.SplashScene = SplashScene;
});
