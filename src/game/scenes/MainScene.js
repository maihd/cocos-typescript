define(["require", "exports", "../data/ResFiles", "../utils/GameUtils", "./GameScene"], function (require, exports, ResFiles_1, GameUtils_1, GameScene_1) {
    "use strict";
    exports.__esModule = true;
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
            var _this = _super.call(this) || this;
            _this.initNodes();
            return _this;
        }
        MainScene.prototype.initNodes = function () {
            cc.log("INIT MAIN SCENE START.");
            this.mainLayer = ccs._load(ResFiles_1.CCS_LAYER_LOBBY);
            this.addChild(this.mainLayer);
            this.spBackground = this.mainLayer.getChildByName("bg");
            var pnlRight = this.mainLayer.getChildByName("pnlRight");
            var pnlBot = this.mainLayer.getChildByName("pnlBot");
            this.pnlTitle = this.mainLayer.getChildByName("pnlTitle");
            this.btnExit = pnlRight.getChildByName("btnExit");
            this.btnSound = pnlRight.getChildByName("btnSound");
            this.btnHint = pnlRight.getChildByName("btnHint");
            this.btnFacebook = pnlRight.getChildByName("btnFacebook");
            this.btnTwister = pnlRight.getChildByName("btnTwister");
            this.btnPlayNow = pnlBot.getChildByName("btnPlay");
            this.btnAchieve = pnlBot.getChildByName("btnAchieve");
            this.btnRank = pnlBot.getChildByName("btnRank");
            this.btnRate = pnlBot.getChildByName("btnRate");
            this.btnRemoveAds = pnlBot.getChildByName("btnRemoveAds");
            this.btnExit.addTouchEventListener(this.onTouchButton.bind(this));
            this.btnSound.addTouchEventListener(this.onTouchButton.bind(this));
            this.btnHint.addTouchEventListener(this.onTouchButton.bind(this));
            this.btnFacebook.addTouchEventListener(this.onTouchButton.bind(this));
            this.btnTwister.addTouchEventListener(this.onTouchButton.bind(this));
            this.btnPlayNow.addTouchEventListener(this.onTouchButton.bind(this));
            this.btnAchieve.addTouchEventListener(this.onTouchButton.bind(this));
            this.btnRank.addTouchEventListener(this.onTouchButton.bind(this));
            this.btnRate.addTouchEventListener(this.onTouchButton.bind(this));
            this.btnRemoveAds.addTouchEventListener(this.onTouchButton.bind(this));
            this.btnFacebook.setVisible(false);
            this.btnTwister.setVisible(false);
            this.btnAchieve.setVisible(false);
            this.btnRank.setVisible(false);
            if (cc.sys.platform === cc.sys.ANDROID) {
                this.btnRate.setVisible(false);
            }
            cc.log("INIT MAIN SCENE DONE.");
        };
        MainScene.prototype.onTouchButton = function (button, type) {
            if (GameUtils_1.makeEffectButton(button, type)) {
                switch (button) {
                    case this.btnPlayNow:
                        cc.director.runScene(new cc.TransitionFade(0.5, new GameScene_1["default"]()));
                        break;
                }
            }
        };
        return MainScene;
    }(cc.Scene));
    exports["default"] = MainScene;
});
