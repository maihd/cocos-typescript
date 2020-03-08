import { CCS_LAYER_LOBBY } from "../data/ResFiles";
import { makeEffectButton } from "../utils/GameUtils";
import GameScene from "./GameScene";

export default 
class MainScene extends cc.Scene {
    mainLayer : cc.Node;

    spBackground : cc.Sprite;
    pnlTitle : ccui.Text;

    btnExit : ccui.Button;
    btnSound : ccui.Button;
    btnHint : ccui.Button;
    btnFacebook : ccui.Button;
    btnTwister : ccui.Button;

    btnPlayNow : ccui.Button;
    btnAchieve : ccui.Button;
    btnRank : ccui.Button;
    btnRate : ccui.Button;
    btnRemoveAds : ccui.Button;

    constructor() {
        super();

        this.initNodes();
    }

    initNodes() {
        cc.log("INIT MAIN SCENE START.");

        this.mainLayer = ccs._load(CCS_LAYER_LOBBY);
        this.addChild(this.mainLayer);

        this.spBackground = this.mainLayer.getChildByName("bg") as cc.Sprite;
        
        let pnlRight = this.mainLayer.getChildByName("pnlRight");
        let pnlBot = this.mainLayer.getChildByName("pnlBot");

        this.pnlTitle = this.mainLayer.getChildByName("pnlTitle") as ccui.Text;

        this.btnExit = pnlRight.getChildByName("btnExit") as ccui.Button;
        this.btnSound = pnlRight.getChildByName("btnSound") as ccui.Button;
        this.btnHint = pnlRight.getChildByName("btnHint") as ccui.Button;
        this.btnFacebook = pnlRight.getChildByName("btnFacebook") as ccui.Button;
        this.btnTwister = pnlRight.getChildByName("btnTwister") as ccui.Button;
        
        this.btnPlayNow = pnlBot.getChildByName("btnPlay") as ccui.Button;
        this.btnAchieve = pnlBot.getChildByName("btnAchieve") as ccui.Button;
        this.btnRank = pnlBot.getChildByName("btnRank") as ccui.Button;
        this.btnRate = pnlBot.getChildByName("btnRate") as ccui.Button;
        this.btnRemoveAds = pnlBot.getChildByName("btnRemoveAds") as ccui.Button;
    
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
        
        if (cc.sys.platform === cc.sys.ANDROID)
        {
            this.btnRate.setVisible(false);
        }

        cc.log("INIT MAIN SCENE DONE.");
    }

    onTouchButton(button: ccui.Button, type: number) {
        if (makeEffectButton(button, type))
        {
            switch (button)
            {
                case this.btnPlayNow:
                    cc.director.runScene(new cc.TransitionFade(0.5, new GameScene()));
                    break;
            }
        }
    }
}