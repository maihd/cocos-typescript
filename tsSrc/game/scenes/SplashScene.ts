import { IMG_BACKGROUND_SPLASH, IMG_LOGO, PNG_TEXTURE, PLIST_TEXTURE } from "../data/ResFiles";
import { LayerOrders } from "../data/LayerOrders";
import MainScene from "./MainScene";

export default
class SplashScene extends cc.Scene {
    constructor() {
        super();

        let size = cc.winSize;
        
        // Set background color
        this.addChild(new cc.LayerColor(cc.color(255, 255, 255)), LayerOrders.BELOW_ALL);

        // Add background
        let background = new cc.Sprite(IMG_BACKGROUND_SPLASH);
        background.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
        background.setScale(size.width / background.width, size.height / background.height);
        this.addChild(background, LayerOrders.BACKGROUND);

        // Add logo
        let logo = new cc.Sprite(IMG_LOGO);
        logo.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
        this.addChild(logo, LayerOrders.MAINGROUND);
    }

    onEnter() {
        super.onEnter();

        this.loadAudioConfig();
        this.loadLevelConfig();
        this.loadAdsConfig();

        this.startLoading();
    }

    onExit() {
        super.onExit();
    }

    loadAudioConfig() {
        cc.audioEngine.setEffectsVolume(1.0);
        cc.audioEngine.setMusicVolume(1.0);
    }

    loadLevelConfig() {
        
    }

    loadAdsConfig() {

    }
    
    startLoading() {
        cc.textureCache.addImageAsync(PNG_TEXTURE, (texture) => {
            cc.spriteFrameCache.addSpriteFrames(PLIST_TEXTURE, texture);

            this.enterMainScene();
        });
    }

    enterMainScene() {
        cc.director.runScene(new cc.TransitionFade(0.5, new MainScene()));
    }
}