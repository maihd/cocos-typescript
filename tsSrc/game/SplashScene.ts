enum InternalLayerOrders {
    BELOW_BACKGROUND,

    BACKGROUND,
    MAINGROUND,
    FOREGROUND,

    ABOVE_FOREGROUND,
}

export class SplashScene extends cc.Scene {
    constructor() {
        super();

        let size = cc.winSize;
        
        // Set background color
        this.addChild(new cc.LayerColor(cc.color(255, 255, 255)), InternalLayerOrders.BELOW_BACKGROUND);

        // Add background
        let background = new cc.Sprite("res/Main/bgSplash.png");
        background.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
        background.setScale(size.width / background.width, size.height / background.height);
        this.addChild(background, InternalLayerOrders.BACKGROUND);

        // Add logo
        let logo = new cc.Sprite("res/Main/logo.png");
        
    }
}