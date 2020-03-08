import { CCS_LAYER_GAME } from "../data/ResFiles";

export default
class GameScene extends cc.Scene
{
    mainLayer : cc.Node;
    
    pnlMain : cc.Node;
    pnlTop : cc.Node;

    txtLevel : ccui.Text;
    txtScore : ccui.Text;

    btnPause : ccui.Button;
    btnHint : ccui.Button;
    btnSound : ccui.Button;
    btnTime : ccui.Button;

    txtNumHint : ccui.Text;
    txtNumTime : ccui.Text;

    healthBar : cc.Sprite;
    spTime : cc.Sprite;
    spCoin : cc.Sprite;
    spBackground : cc.Sprite;

    constructor() {
        super();

        this.initNodes();
    }

    initNodes() {
        this.mainLayer = ccs._load(CCS_LAYER_GAME);
        this.addChild(this.mainLayer);
    }
}