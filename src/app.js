define(["require", "exports", "./resource"], function (require, exports, resource_1) {
    "use strict";
    exports.__esModule = true;
    var BaseLayer = (function (_super) {
        __extends(BaseLayer, _super);
        function BaseLayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BaseLayer;
    }(cc.Layer));
    var HelloWorldLayer = (function (_super) {
        __extends(HelloWorldLayer, _super);
        function HelloWorldLayer() {
            var _this = _super.call(this) || this;
            var size = cc.winSize;
            var helloLabel = new ccui.Text("Hello World", "Arial", 38);
            helloLabel.x = size.width / 2;
            helloLabel.y = size.height / 2 + 200;
            _this.addChild(helloLabel, 5);
            _this.sprite = new cc.Sprite(resource_1.res.HelloWorld_png);
            _this.sprite.x = size.width * 0.5;
            _this.sprite.y = size.height * 0.5;
            _this.addChild(_this.sprite, 0);
            _this.sprite.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1.0, 100, 0), cc.moveBy(1.0, -100, 0))));
            return _this;
        }
        return HelloWorldLayer;
    }(BaseLayer));
    ;
    var HelloWorldScene = (function (_super) {
        __extends(HelloWorldScene, _super);
        function HelloWorldScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HelloWorldScene.prototype.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var layer = new HelloWorldLayer();
            this.addChild(layer);
        };
        return HelloWorldScene;
    }(cc.Scene));
    exports.HelloWorldScene = HelloWorldScene;
});
