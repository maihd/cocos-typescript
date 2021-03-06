define(["require", "exports", "../data/ResFiles", "../data/LayerOrders", "./MainScene"], function (require, exports, ResFiles_1, LayerOrders_1, MainScene_1) {
    "use strict";
    exports.__esModule = true;
    var SplashScene = (function (_super) {
        __extends(SplashScene, _super);
        function SplashScene() {
            var _this = _super.call(this) || this;
            var size = cc.winSize;
            _this.addChild(new cc.LayerColor(cc.color(255, 255, 255)), LayerOrders_1.LayerOrders.BELOW_ALL);
            var background = new cc.Sprite(ResFiles_1.IMG_BACKGROUND_SPLASH);
            background.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
            background.setScale(size.width / background.width, size.height / background.height);
            _this.addChild(background, LayerOrders_1.LayerOrders.BACKGROUND);
            var logo = new cc.Sprite(ResFiles_1.IMG_LOGO);
            logo.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
            _this.addChild(logo, LayerOrders_1.LayerOrders.MAINGROUND);
            return _this;
        }
        SplashScene.prototype.onEnter = function () {
            _super.prototype.onEnter.call(this);
            this.loadAudioConfig();
            this.loadLevelConfig();
            this.loadAdsConfig();
            this.startLoading();
        };
        SplashScene.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
        };
        SplashScene.prototype.loadAudioConfig = function () {
            cc.audioEngine.setEffectsVolume(1.0);
            cc.audioEngine.setMusicVolume(1.0);
        };
        SplashScene.prototype.loadLevelConfig = function () {
        };
        SplashScene.prototype.loadAdsConfig = function () {
        };
        SplashScene.prototype.startLoading = function () {
            var _this = this;
            cc.textureCache.addImageAsync(ResFiles_1.PNG_TEXTURE, function (texture) {
                cc.spriteFrameCache.addSpriteFrames(ResFiles_1.PLIST_TEXTURE, texture);
                _this.enterMainScene();
            });
        };
        SplashScene.prototype.enterMainScene = function () {
            cc.director.runScene(new cc.TransitionFade(0.5, new MainScene_1["default"]()));
        };
        return SplashScene;
    }(cc.Scene));
    exports["default"] = SplashScene;
});
