
var _instanceGamePlay;

let ZORDER_POPUP = 100;
var GMMGamePlayLayer = cc.Layer.extend({
    currLevel: 0,
    currTime: 0,
    factorTime: 0,
    totalScore: 0,
    maxTime: 0,
    matrixOnet: null,

    pnlMain: null,
    pnlTop: null,

    btnPause: null,
    btnSound: null,
    btnHint: null,
    btnTime: null,

    txtLevel: null,
    txtScore: null,
    txtNumHint: null,
    txtNumTime: null,

    spTime: null,
    spCoin: null,
    spBackground: null,

    heathBar: null,

    ctor: function () {
        
        //////////////////////////////
        // 1. super init first
        this._super();
        _instanceGamePlay = this;

        this.initUI();

        //////////////
        this.matrixOnet = new GMMMatrixOnet(this, this.pnlMain.getContentSize());
        this.matrixOnet.onCompletedCallback = () => {
            this.showPopupComppleted();
        };
        this.pnlMain.addChild(this.matrixOnet, 1);

        this.initData();

        return true;
    },
    initUI: function () {
        this.layer = ccs.load(res.PKC_JSON_LayerGame).node;
        this.addChild(this.layer, 1);

        this.pnlMain = this.layer.getChildByName("pnlMain");
        this.pnlTop = this.layer.getChildByName("pnlTop");

        let pnlMoney = this.pnlTop.getChildByName("pnlMoney");
        let pnlLevel = this.pnlTop.getChildByName("pnlLevel");

        this.txtLevel = pnlLevel.getChildByName("text");
        this.txtScore = pnlMoney.getChildByName("text");

        this.btnPause = this.pnlTop.getChildByName("btnPause");
        this.btnHint = this.pnlTop.getChildByName("btnHint");
        this.btnSound = this.pnlTop.getChildByName("btnSound");
        this.btnTime = this.pnlTop.getChildByName("btnTime");

        this.txtNumHint = this.btnHint.getChildByName("spNumber").getChildByName("text");
        this.txtNumTime = this.btnTime.getChildByName("spNumber").getChildByName("text");

        this.heathBar = this.pnlTop.getChildByName("spLoading").getChildByName("loadingBar");
        this.spTime = this.pnlTop.getChildByName("spLoading").getChildByName("icon");
        this.spCoin = pnlMoney.getChildByName("sp");
        this.spBackground = this.layer.getChildByName("bg");

        this.btnPause.addTouchEventListener(this.onTouchButton, this);
        this.btnTime.addTouchEventListener(this.onTouchButton, this);
        this.btnSound.addTouchEventListener(this.onTouchButton, this);
        this.btnHint.addTouchEventListener(this.onTouchButton, this);

        this.reloadSoundBtn();
        this.initForResolution();
        action_resolver.loadInterAdmob();
    },
    initForResolution: function() {
        let size = cc.winSize;
		
        this.spBackground.setScale(size.width / this.spBackground.getContentSize().width, size.height / this.spBackground.getContentSize().height);
		
        this.pnlTop.setPosition(cc.p(0, size.height));
        let mainSize = cc.size(size.width, size.height - this.pnlTop.getContentSize().height);
        mainSize.width -= 20;
        mainSize.height -= 20;
        this.pnlMain.setContentSize(mainSize);
        this.pnlMain.setPosition(cc.p(size.width / 2, 10));
    },
    reloadSoundBtn: function() {
        let sp = this.btnSound.getChildByName("icon");
        if (!getSound()) {
            sp.initWithFile(res.PKC_IMG_btnSoundOff);
        } else {
            sp.initWithFile(res.PKC_IMG_btnSoundOn);
        }
    },
    onTouchButton: function(pRef, touchType) {
        if (GMMGameUtils.makeEffectButton(pRef, touchType, 1.0, 0.9)) {
            sound.playClick();
            if (pRef === this.btnPause) {
                this.showPopupPause();
            } else if (pRef === this.btnSound) {
                setSound(getSound() === true ? 0 : 1);
                this.reloadSoundBtn();
                cc.log("onClicked Sound");
            } else if (pRef === this.btnTime) {
                var numTime = getPrefInteger(PREF_LOG_NUM_TIME);
                if (numTime > 0) {
                    numTime -= 1;
                    sound.playHintSuccess();
                    this.currTime += 15;
                    this.heathBar.setPercent(this.heathBar.getPercent() + this.factorTime * 15);
                    this.addMessage("added 15 seconds");
                    setPrefInteger(PREF_LOG_NUM_TIME, numTime);
                    this.setNumberOnButton(this.btnTime, numTime);
                } else {
                    if (this.totalScore < 5000) {
                        sound.playHintFailed();
                        this.addMessage("your score has not enough 5000");
                    } else if (this.currTime > this.maxTime - 15) {
                        sound.playHintFailed();
                        this.addMessage("your time has more");
                    } else if (this.totalScore >= 5000) {
                        sound.playHintSuccess();
                        this.currTime += 15;
                        this.heathBar.setPercent(this.heathBar.getPercent() + this.factorTime * 15);
                        this.totalScore -= 5000;
                        this.txtScore.setString(util.getDollarNumber(this.totalScore) + "$");
                        this.addMessage("added 15 seconds");
                    }
                }
            } else if (pRef === this.btnHint) {
                if (this.matrixOnet.onHint() === true) {
                    let numHint = getPrefInteger(PREF_LOG_NUM_HINT) - 1;
                    setPrefInteger(PREF_LOG_NUM_HINT, numHint);
                    this.setNumberOnButton(this.btnHint, numHint);
                }
            }
        }
    },
    drawCircle: function (drawNode, color) {
        drawNode.clear();
        drawNode.drawDot(cc.p(0, 0), 36, cc.color.WHITE);
        drawNode.drawDot(cc.p(0, 0), 30, color);
    },
    initData: function () {
        this.onTouchEnabled(false);
        // check currLevel
        this.currLevel = getCurrLevel();
        this.totalScore = getTotalScore();
        cc.log("Cap do hien tai: " + this.currLevel + "  TotalScore: " + this.totalScore);
        var obj = {size: 0, nCol: 0, nRow: 0};
        this.makeOnetData(obj);
        cc.log("Col: " + obj.nCol + " Row: " + obj.nRow + " sizeItem: " + obj.size);
        if (this.currLevel === 1) {
            this.showPopupPlay();
        } else {
            this.showPopupContinue();
        }
    },
    showPopupPause: function() {
        this.onTouchEnabled(false);
        let popup = new GMMPopupPause();
        popup.onResumeCallback = () => {
            this.onResume();
        };
        popup.onRestartCallback = () => {
            this.onPlay();
        };
        popup.onHomeCallback = () => {
            this.onHome();
        };
        this.addChild(popup, ZORDER_POPUP);
        popup.show();
        //
        action_resolver.showInterAdmob();
    },
    showPopupPlay: function() {
        this.onTouchEnabled(false);
        let popup = new GMMPopupBeginner();
        popup.onPlayCallback = () => {
            this.onPlay();
        };
        this.addChild(popup, ZORDER_POPUP);
        popup.show(this.currLevel, this.maxTime);
    },
    showPopupContinue: function() {
        this.onTouchEnabled(false);
        let popup = new GMMPopupContinue();
        popup.onPlayCallback = () => {
            this.onPlay();
        };
        popup.onResetCallback = () => {
            this.currLevel = 1;
            let obj = { size: 0, nCol: 0, nRow: 0 };
            this.makeOnetData(obj);
            this.onPlay();
        };
        this.addChild(popup, ZORDER_POPUP);
        popup.show(this.currLevel, this.totalScore, this.maxTime);
    },
    showPopupComppleted: function() {
        this.onTouchEnabled(false);
        let popup = new GMMPopupCompleted(this);
        popup.onNextCallback = () => {
            this.onPlay();
        };
        popup.onHomeCallback = () => {
            this.onHome();
        };
        popup.onUpgradeDataCallback = (nAddScore, nAddLevel) => {
            this.currLevel += nAddLevel;
            this.totalScore += nAddScore;
        };
        this.addChild(popup, ZORDER_POPUP);
        // make bonus + star
        let bonus = 32000;
        let nStar = 3;
        if (this.currTime > this.maxTime / 2) {       // 3 stars
            nStar = 3;
        } else if (this.currTime > this.maxTime / 3) {    // 2 stars
            nStar = 2;
            bonus = 18000;
            cc.log("YOU HAVE 2 STARS");
        } else {
            nStar = 1;
            bonus = 10000;
            cc.log("YOU HAVE 1 STARS");
        }
        //
        popup.show(this.currLevel, this.currTime, nStar, bonus);
    },
    showPopupGameOver: function() {
        this.onTouchEnabled(false);
        let popup = new GMMPopupGameOver();
        popup.onAgainCallback = () => {
            this.onPlay();
        };
        popup.onMenuCallback = () => {
            this.onHome();
        };
        this.addChild(popup, ZORDER_POPUP);
        // get and set total score
        let total = getTotalScore();
        if (total > 0) {
            total = Math.round(total * 0.95);
            setTotalScore(total);
            action_resolver.setHighScore(this.currLevel, total);
        }
        //
        popup.show(total);
        //
        action_resolver.showInterAdmob();
    },
    makeOnetData: function (obj) {
        if (this.currLevel === 1) {
            obj.size = 80;
        } else if (this.currLevel < 6) {
            obj.size = 70;
        } else if (this.currLevel < 12) {
            obj.size = 60;
        } else {
            obj.size = 50;
        }
        var size = this.pnlMain.getContentSize();
        let xStart = size.width - 80;
        let yStart = size.height - 80;
        obj.nCol = Math.round((xStart) / obj.size);
        obj.nRow = Math.round((yStart) / obj.size);
        if (obj.nRow % 2 !== 0) {
            if (obj.nCol % 2 !== 0)
                obj.nCol -= 1;
        }
        this.maxTime = (obj.nCol * obj.nRow) * 3;
        this.totalScore = getTotalScore();
        cc.log("max time: " + this.maxTime);
    },
    timerHeath: function(dt) {
        if (this.currTime > 0) {
            this.heathBar.setPercent(this.heathBar.getPercent() - this.factorTime);
        } else {
            // check completed or gameover
            this.showPopupGameOver();
        }
        this.currTime--;
    },
    onTouchEnabled: function (value) {
        this.matrixOnet.setTouchEnabled(value);
        this.pnlTop.setVisible(value);
        if (value) {
            this.schedule(this.timerHeath, 1);
        } else {
            this.unschedule(this.timerHeath);
        }
        cc.log("Touch Enabled: " + value);
    },
    setNumberOnButton: function(nBtn, number) {
        let notify = nBtn.getChildByName("spNumber");
        if (notify) {
            if (number <= 0) {
                notify.setVisible(false);
            } else {
                let text = notify.getChildByName("text");
                if (text) {
                    text.setString(number);
                }
            }
        }
    },
    onHome: function() {
        cc.director.runScene(new cc.TransitionFade(0.5, new GMMMainScene()));
    },
    onPlay: function () {
        cc.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ONPLAY ");
        var size = cc.winSize;
        this.removeChild(this.getChildByName("BG"));
        
        var bg = cc.Sprite.create(BG_ARR_PNG[this.currLevel % 7]);
        bg.setScaleX(scaleX);
        bg.setPosition(size.width / 2, size.height / 2);
        bg.setName("BG");
        this.addChild(bg, -1);
        //
        this.txtLevel.setString(this.currLevel + "");
        this.heathBar.setPercent(100);
        // check number hint and time
        var numHint = getPrefInteger(PREF_LOG_NUM_HINT);
        this.setNumberOnButton(this.btnHint, numHint);
        var numTime = getPrefInteger(PREF_LOG_NUM_TIME);
        this.setNumberOnButton(this.btnHint, numTime);
        // init item onets
        var obj = { size: 0, nCol: 0, nRow: 0 };
        this.makeOnetData(obj);
        cc.log("Col: " + obj.nCol + " Row: " + obj.nRow + " sizeItem: " + obj.size);
        this.matrixOnet.reload(obj);
        this.currTime = this.maxTime;
        this.factorTime = 100 / this.maxTime;

        this.txtScore.setString(util.getDollarNumber(this.totalScore) + "$");
        cc.log("set from OnPlay");
        this.onTouchEnabled(true);
    },
    addScore: function (value) {
        this.totalScore += value;
        this.txtScore.setString(util.getDollarNumber(this.totalScore) + "$");

        var pos = cc.p(util.getRandomInt(10, 76) * 10 , util.getRandomInt(20, 40) * 10);
        // addd animation for score
        var flyScore = new ccui.Text("", "res/Fonts/UTMHelvetIns.ttf", 38);
        var strChar = "+";
        if (value < 0) {
            strChar = "";
            flyScore.setTextColor(cc.color.RED);
        } else {
            flyScore.setTextColor(cc.color.YELLOW);
        }
        flyScore.enableOutline(cc.color.BLACK, 2);
        flyScore.setPosition(pos.x, pos.y);
        flyScore.setString(strChar + util.getDollarNumber(value) + "$");

        var moveTo = cc.moveTo(2.0, cc.p(pos.x, pos.y + 50));
        var fadeOut = cc.fadeOut(2.0);
        var call = cc.removeSelf();

        flyScore.runAction(cc.Sequence.create(cc.Spawn.create(moveTo, fadeOut), call));

        this.addChild(flyScore, 20);
    },
    addMessage: function (str) {
        var size = cc.winSize;
        var flyScore = new ccui.Text("", "res/Fonts/UTMHelvetIns.ttf", 38);
        flyScore.setPosition(size.width / 2, 50);
        flyScore.setString(str);
        flyScore.setTextColor(cc.color.GREEN);
        flyScore.enableOutline(cc.color.BLACK, 2);
        var moveTo = cc.moveTo(2.0, cc.p(size.width / 2, 100));
        var fadeOut = cc.fadeOut(1.0);
        var call = cc.removeSelf();

        flyScore.runAction(cc.Sequence.create(moveTo, fadeOut, call));

        this.addChild(flyScore, 20);
    },
    onResume: function () {
        action_resolver.loadInterAdmob();
        this.onTouchEnabled(true);
    },
});

var GMMGamePlay = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GMMGamePlayLayer();
        this.addChild(layer);
    }
});

