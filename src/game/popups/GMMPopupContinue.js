var GMMPopupContinue = GMMPopupAbstract.extend({
    txtLevel: null,
    txtTime: null,
    txtMoney: null,
    btnReset: null,
    btnPlay: null,
    onResetCallback: null,
    onPlayCallback: null,
    ctor: function () {
        this._super();
        this.initWithCSB(res.PKC_JSON_PopupContinue);
        cc.log("GMMPopupContinue::ctor");
        this.setBackground(false);
        this.initUI();
        return true;
    },
    initUI: function () {
        this.txtTime = this._mainPanel.getChildByName("pnlTime").getChildByName("text");
        this.txtLevel = this._mainPanel.getChildByName("pnlLevel").getChildByName("text");
        this.txtMoney = this._mainPanel.getChildByName("pnlMoney").getChildByName("text");
        this.btnReset = this._mainPanel.getChildByName("btnReset");
        this.btnPlay = this._mainPanel.getChildByName("btnPlay");
        this.btnReset.addTouchEventListener(this.onTouchButton, this);
        this.btnPlay.addTouchEventListener(this.onTouchButton, this);
    },
    reloadData: function (nLevel, nMoney, nTime) {
        this.txtLevel.setString(util.getDollarNumber(nLevel));
        this.txtMoney.setString(util.getDollarNumber(nMoney));
        this.txtTime.setString(util.getTimeFormat(nTime));
    },
    onTouchButton: function (pRef, touchType) {
        var _this = this;
        if (GMMGameUtils.makeEffectButton(pRef, touchType, 1.0, 0.9)) {
            sound.playClick();
            this.close();
            this.onCloseCallback = function () {
                if (pRef === _this.btnReset) {
                    if (_this.onResetCallback) {
                        _this.onResetCallback();
                    }
                }
                else if (pRef === _this.btnPlay) {
                    if (_this.onPlayCallback) {
                        _this.onPlayCallback();
                    }
                }
            };
        }
    },
    show: function (nLevel, nMoney, nTime) {
        if (!this._isClosed)
            return;
        var root = cc.director.getRunningScene();
        if (this.getParent() == null) {
            root.addChild(this, 1000);
        }
        this.reloadData(nLevel, nMoney, nTime);
        this.setVisible(true);
        this._super();
    },
    close: function () {
        this.onCloseCallback = function () {
            this._isClosed = true;
            this.setVisible(false);
        };
        this._super();
    }
});
GMMPopupContinue.instance = null;
GMMPopupContinue.getInstance = function () {
    if (!GMMPopupContinue.instance) {
        GMMPopupContinue.instance = new GMMPopupContinue();
        GMMPopupContinue.instance.retain();
    }
    return GMMPopupContinue.instance;
};
