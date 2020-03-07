var GMMPopupCompleted = GMMPopupAbstract.extend({
    lstStar: [],
    txtMoney: null,
    txtTime: null,
    btnNext: null,
    btnMenu: null,
    onNextCallback: null,
    onHomeCallback: null,
    onUpgradeDataCallback: null,
    ctor: function (gamePlay) {
        this._super();
        this.initWithCSB(res.PKC_JSON_PopupCompleted);
        cc.log("GMMPopupCompleted::ctor");
        this.setBackground(false);
        this.initUI();
        this.gamePlay = gamePlay;
        return true;
    },
    initUI: function () {
        var pnlStar = this._mainPanel.getChildByName("pnlStar");
        for (var i = 1; i <= 3; i++) {
            var star = pnlStar.getChildByName("star" + i);
            this.lstStar[i - 1] = star;
        }
        this.txtMoney = this._mainPanel.getChildByName("pnlMoney").getChildByName("text");
        this.txtTime = this._mainPanel.getChildByName("pnlTime").getChildByName("text");
        this.btnMenu = this._mainPanel.getChildByName("btnHome");
        this.btnNext = this._mainPanel.getChildByName("btnNext");
        this.btnMenu.addTouchEventListener(this.onTouchButton, this);
        this.btnNext.addTouchEventListener(this.onTouchButton, this);
    },
    onTouchButton: function (pRef, touchType) {
        var _this = this;
        if (GMMGameUtils.makeEffectButton(pRef, touchType, 1.0, 0.9)) {
            sound.playClick();
            this.close();
            this.onCloseCallback = function () {
                if (pRef === _this.btnMenu) {
                    if (_this.onHomeCallback) {
                        _this.onHomeCallback();
                    }
                }
                else if (pRef === _this.btnNext) {
                    if (_this.onNextCallback) {
                        _this.onNextCallback();
                    }
                }
            };
        }
    },
    reloadUI: function (nLevel, nTime, nStar, nBonus) {
        this.txtTime.setString(util.getTimeFormat(nTime));
        this.txtMoney.setString(nBonus + "");
        for (var i = 0; i < this.lstStar.length; i++) {
            var star = this.lstStar[i];
            star.setScale(0);
        }
        var scaleIn = cc.EaseBackOut.create(cc.scaleTo(0.7, 1.0));
        switch (nStar) {
            case 1: {
                this.lstStar[0].setPositionNormalized(cc.p(0.5, 0.5));
                this.lstStar[0].runAction(scaleIn);
                break;
            }
            case 2: {
                this.lstStar[0].setPositionNormalized(cc.p(0.35, 0.5));
                this.lstStar[1].setPositionNormalized(cc.p(0.65, 0.5));
                this.lstStar[0].runAction(scaleIn.clone());
                this.lstStar[1].runAction(cc.sequence(cc.delayTime(0.5), scaleIn.clone()));
                break;
            }
            case 3: {
                this.lstStar[0].setPositionNormalized(cc.p(0.25, 0.5));
                this.lstStar[1].setPositionNormalized(cc.p(0.5, 0.5));
                this.lstStar[2].setPositionNormalized(cc.p(0.75, 0.5));
                this.lstStar[0].runAction(scaleIn.clone());
                this.lstStar[1].runAction(cc.sequence(cc.delayTime(0.5), scaleIn.clone()));
                this.lstStar[2].runAction(cc.sequence(cc.delayTime(1.2), scaleIn.clone()));
                break;
            }
        }
        var numHint = getPrefInteger(PREF_LOG_NUM_HINT);
        var numTime = getPrefInteger(PREF_LOG_NUM_TIME);
        if (util.getRandomInt(0, 1) === 0) {
            numHint++;
            if (numHint > MAX_REWARD) {
                numHint = MAX_REWARD;
            }
            cc.log("OK, HAS ADD HINT: " + numHint);
            setPrefInteger(PREF_LOG_NUM_HINT, numHint);
        }
        else {
            numTime++;
            if (numTime > MAX_REWARD) {
                numTime = MAX_REWARD;
            }
            cc.log("OK, HAS ADD TIME: " + numTime);
            setPrefInteger(PREF_LOG_NUM_TIME, numTime);
        }
        if (this.onUpgradeDataCallback) {
            this.onUpgradeDataCallback(nBonus, 1);
        }
        cc.log("COMPLETED: totalScore: " + this.gamePlay.totalScore);
        cc.log("COMPLETED: currLevel: " + this.gamePlay.currLevel);
        setTotalScore(this.gamePlay.totalScore);
        setCurrLevel(this.gamePlay.currLevel);
        action_resolver.setHighScore(this.gamePlay.currLevel, this.gamePlay.totalScore);
        cc.log("COMPLETED: DONE");
    },
    show: function (nLevel, nTime, nStar, nBonus) {
        if (!this._isClosed)
            return;
        this.reloadUI(nLevel, nTime, nStar, nBonus);
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
GMMPopupCompleted.instance = null;
GMMPopupCompleted.getInstance = function () {
    if (!GMMPopupCompleted.instance) {
        GMMPopupCompleted.instance = new GMMPopupCompleted();
        GMMPopupCompleted.instance.retain();
    }
    return GMMPopupCompleted.instance;
};
