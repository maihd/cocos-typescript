define(["require", "exports", "../data/ResFiles"], function (require, exports, ResFiles_1) {
    "use strict";
    exports.__esModule = true;
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this.initNodes();
            return _this;
        }
        GameScene.prototype.initNodes = function () {
            this.mainLayer = ccs._load(ResFiles_1.CCS_LAYER_GAME);
            this.addChild(this.mainLayer);
        };
        return GameScene;
    }(cc.Scene));
    exports["default"] = GameScene;
});
