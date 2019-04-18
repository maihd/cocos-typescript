var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
            var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
            helloLabel.setPositionX(size.width / 2);
            helloLabel.setPositionY(size.height / 2 + 200);
            _this.addChild(helloLabel, 5);
            _this.sprite = new cc.Sprite(resource_1.res.HelloWorld_png);
            _this.sprite.x = size.width * 0.5;
            _this.sprite.y = size.height * 0.5;
            _this.addChild(_this.sprite, 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHNTcmMvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQTtRQUF3Qiw2QkFBUTtRQUFoQzs7UUFFQSxDQUFDO1FBQUQsZ0JBQUM7SUFBRCxDQUFDLEFBRkQsQ0FBd0IsRUFBRSxDQUFDLEtBQUssR0FFL0I7SUFFRDtRQUE4QixtQ0FBUztRQUluQztZQUFBLFlBRUksaUJBQU8sU0FhVjtZQVhHLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFFdEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0QsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFN0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2hELEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzs7UUFDbEMsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0FBQyxBQXBCRCxDQUE4QixTQUFTLEdBb0J0QztJQUFBLENBQUM7SUFFRjtRQUFxQyxtQ0FBUTtRQUE3Qzs7UUFTQSxDQUFDO1FBUEcsaUNBQU8sR0FBUDtZQUVJLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1lBRWhCLElBQUksS0FBSyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBVEQsQ0FBcUMsRUFBRSxDQUFDLEtBQUssR0FTNUM7SUFUWSwwQ0FBZSJ9