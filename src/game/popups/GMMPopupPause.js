var GMMPopupPause = GMMPopupAbstract.extend({
    onResumeCallback: null,
    onRestartCallback: null,
    onHomeCallback: null,
    btnResume: null,
    btnRestart: null,
    btnHome: null,
    ctor: function () {
        this._super();
        this.initWithCSB(res.PKC_JSON_PopupPause);
        cc.log("GMMPopupPause::ctor");
        this.setBackground(false);
        this.initUI();
        return true;
    },
    initUI: function () {
        this.btnResume = this._mainPanel.getChildByName("btnResume");
        this.btnRestart = this._mainPanel.getChildByName("btnRestart");
        this.btnHome = this._mainPanel.getChildByName("btnHome");
        this.btnRestart.addTouchEventListener(this.onTouchButton, this);
        this.btnResume.addTouchEventListener(this.onTouchButton, this);
        this.btnHome.addTouchEventListener(this.onTouchButton, this);
    },
    onTouchButton: function (pRef, touchType) {
        var _this = this;
        if (GMMGameUtils.makeEffectButton(pRef, touchType, 1.0, 0.9)) {
            sound.playClick();
            this.close();
            this.onCloseCallback = function () {
                if (pRef === _this.btnResume) {
                    if (_this.onResumeCallback) {
                        _this.onResumeCallback();
                    }
                }
                else if (pRef === _this.btnRestart) {
                    if (_this.onRestartCallback) {
                        _this.onRestartCallback();
                    }
                }
                else if (pRef === _this.btnHome) {
                    if (_this.onHomeCallback) {
                        _this.onHomeCallback();
                    }
                }
            };
        }
    },
    show: function () {
        if (!this._isClosed)
            return;
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
GMMPopupPause.instance = null;
GMMPopupPause.getInstance = function () {
    if (!GMMPopupPause.instance) {
        GMMPopupPause.instance = new GMMPopupPause();
        GMMPopupPause.instance.retain();
    }
    return GMMPopupPause.instance;
};
