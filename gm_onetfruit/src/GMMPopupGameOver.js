let GMMPopupGameOver = GMMPopupAbstract.extend({
    txtTotalMoney: null,
    btnAgain: null,
    btnMenu: null,
    onMenuCallback: null,
    onAgainCallback: null,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        this.initWithCSB(res.PKC_JSON_PopupGameOver);
        cc.log("GMMPopupGameOver::ctor");
        this.setBackground(false);
        this.initUI();
        return true;
    },
    initUI: function () {
        this.btnAgain = this._mainPanel.getChildByName("btnAgain");
        this.btnMenu = this._mainPanel.getChildByName("btnMenu");
        this.txtTotalMoney = this._mainPanel.getChildByName("pnlMoney").getChildByName("text");

        this.btnAgain.addTouchEventListener(this.onTouchButton, this);
        this.btnMenu.addTouchEventListener(this.onTouchButton, this);
    },
    onTouchButton: function(pRef, touchType) {
        if (GMMGameUtils.makeEffectButton(pRef, touchType, 1.0, 0.9)) {
            sound.playClick();
            this.close();
            this.onCloseCallback = () => {
                if (pRef === this.btnAgain) {
                    if (this.onAgainCallback) {
                        this.onAgainCallback();
                    }
                } else if (pRef === this.btnMenu) {
                    if (this.onMenuCallback) {
                        this.onMenuCallback();
                    }
                }
            }
        }
    },
    show: function (totalMoney) {
        if(!this._isClosed) return;
        this.txtTotalMoney.setString(util.getDollarNumber(totalMoney) + "$");
        var root = cc.director.getRunningScene();
        if(this.getParent() == null){
            root.addChild(this, 1000);
        }
        this.setVisible(true);
        this._super();
    },
    close: function() {
        this.onCloseCallback = function(){
            this._isClosed = true;
            this.setVisible(false);
        };
        this._super();
    }
});

// Singleton
GMMPopupGameOver.instance = null;
GMMPopupGameOver.getInstance = function() {
    if(!GMMPopupGameOver.instance) {
        GMMPopupGameOver.instance = new GMMPopupGameOver();
        GMMPopupGameOver.instance.retain();
    }
    return GMMPopupGameOver.instance;
};