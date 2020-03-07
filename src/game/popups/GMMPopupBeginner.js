var GMMPopupBeginner = GMMPopupAbstract.extend({
    txtLevel: null,
    txtTime: null,
    onPlayCallback: null,
    ctor: function () {
        this._super();
        this.initWithCSB(res.PKC_JSON_PopupBeginner);
        cc.log("GMMPopupBeginner::ctor");
        this.setBackground(false);
        this.initUI();
        return true;
    },
    initUI: function () {
        var btnPlay = this._mainPanel.getChildByName("btnPlay");
        this.txtLevel = this._mainPanel.getChildByName("pnlLevel").getChildByName("text");
        this.txtTime = this._mainPanel.getChildByName("pnlTime").getChildByName("text");
        btnPlay.addTouchEventListener(this.onTouchPlay, this);
    },
    onTouchPlay: function (pRef, touchType) {
        var _this = this;
        if (GMMGameUtils.makeEffectButton(pRef, touchType, 1.0, 0.9)) {
            sound.playClick();
            this.close();
            this.onCloseCallback = function () {
                if (_this.onPlayCallback) {
                    _this.onPlayCallback();
                }
            };
        }
    },
    reloadUI: function (nLevel, nTime) {
        this.txtTime.setString(util.getTimeFormat(nTime));
        this.txtLevel.setString(nLevel + "");
    },
    show: function (nLevel, nTime) {
        if (!this._isClosed)
            return;
        this.reloadUI(nLevel, nTime);
        var root = cc.director.getRunningScene();
        if (this.getParent() == null) {
            root.addChild(this, 1000);
        }
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
GMMPopupBeginner.instance = null;
GMMPopupBeginner.getInstance = function () {
    if (!GMMPopupBeginner.instance) {
        GMMPopupBeginner.instance = new GMMPopupBeginner();
        GMMPopupBeginner.instance.retain();
    }
    return GMMPopupBeginner.instance;
};
