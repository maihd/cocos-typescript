import { res } from './resource';

class BaseLayer extends cc.Layer
{
}

class HelloWorldLayer extends BaseLayer
{
    sprite : cc.Sprite;

    constructor() 
    {
        super();

        var size = cc.winSize;

        var helloLabel = new ccui.Text("Hello World", "Arial", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        this.addChild(helloLabel, 5);

        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.x = size.width * 0.5;
        this.sprite.y = size.height * 0.5;
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.moveBy(1.0, 100, 0),   
                    cc.moveBy(1.0, -100, 0)
                )
            )
        );
    }
};

export class HelloWorldScene extends cc.Scene
{
    onEnter() 
    {
        super.onEnter();

        let layer = new HelloWorldLayer();
        this.addChild(layer);
    }
}
