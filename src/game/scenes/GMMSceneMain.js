var GMMMainSceneLayer = cc.Layer.extend({
    btnPlayNow: null,
    btnRate: null,
    btnRank: null,
    btnAchieve: null,
    btnSound: null,
    btnExit: null,
    btnLogo: null,
    btnHint: null,
    btnFacebook: null,
    btnTwister: null,
    btnRemoveAds: null,
    pnlTitle: null,
    ctor: function () {
        var _this = this;
        cc.log("In Main Scene");
        this._super();
        action_resolver.showBannerAdmob();
        var size = cc.winSize;
        cc.log("Gia tri winSize In MainScene: ", size.width, size.height);
        var scaleRes = GMMGameUtils.getPopupScaleByDeviceResolution();
        cc.log("--------------------- Scale Resolution: " + scaleRes);
        this.initUI();
        cc.eventManager.addCustomListener(portalHelper.EVENT_IAP_BUY_SUCCESS, function (event) {
            var productId = event.getUserData();
            cc.log("HAS BUY SUCCESS ITEM: " + productId);
            setIsStopAds(1);
            _this.btnRemoveAds.setVisible(false);
        });
        return true;
    },
    initUI: function () {
        this.layer = ccs.load(res.PKC_JSON_LayerLobby).node;
        this.addChild(this.layer, 1);
        this.spBackground = this.layer.getChildByName("bg");
        var pnlRight = this.layer.getChildByName("pnlRight");
        var pnlBot = this.layer.getChildByName("pnlBot");
        this.pnlTitle = this.layer.getChildByName("pnlTitle");
        this.btnLogo = this.layer.getChildByName("btnLogo");
        this.btnLogo.setVisible(false);
        this.btnExit = pnlRight.getChildByName("btnExit");
        this.btnSound = pnlRight.getChildByName("btnSound");
        this.btnHint = pnlRight.getChildByName("btnHint");
        this.btnFacebook = pnlRight.getChildByName("btnFacebook");
        this.btnTwister = pnlRight.getChildByName("btnTwister");
        this.btnPlayNow = pnlBot.getChildByName("btnPlay");
        this.btnAchieve = pnlBot.getChildByName("btnAchieve");
        this.btnRank = pnlBot.getChildByName("btnRank");
        this.btnRate = pnlBot.getChildByName("btnRate");
        this.btnRemoveAds = pnlBot.getChildByName("btnRemoveAds");
        this.btnExit.addTouchEventListener(this.onTouchButton, this);
        this.btnSound.addTouchEventListener(this.onTouchButton, this);
        this.btnHint.addTouchEventListener(this.onTouchButton, this);
        this.btnFacebook.addTouchEventListener(this.onTouchButton, this);
        this.btnTwister.addTouchEventListener(this.onTouchButton, this);
        this.btnPlayNow.addTouchEventListener(this.onTouchButton, this);
        this.btnAchieve.addTouchEventListener(this.onTouchButton, this);
        this.btnRank.addTouchEventListener(this.onTouchButton, this);
        this.btnRate.addTouchEventListener(this.onTouchButton, this);
        this.btnRemoveAds.addTouchEventListener(this.onTouchButton, this);
        this.btnLogo.addTouchEventListener(this.onTouchButton, this);
        this.btnFacebook.setVisible(false);
        this.btnTwister.setVisible(false);
        this.btnAchieve.setVisible(false);
        this.btnRank.setVisible(false);
        if (cc.sys.platform == cc.sys.ANDROID) {
            this.btnRate.setVisible(false);
        }
        this.reloadSoundBtn();
        if (getIsStopAds()) {
            this.btnRemoveAds.setVisible(false);
        }
        this.initForResolution();
        this.initAnimLogo();
        this.initAnimTitle();
    },
    initForResolution: function () {
        var size = cc.winSize;
        this.spBackground.setScale(size.width / this.spBackground.getContentSize().width, size.height / this.spBackground.getContentSize().height);
        var pnlRight = this.layer.getChildByName("pnlRight");
        pnlRight.setContentSize(cc.size(200, size.height));
        {
            this.btnExit.setNormalizedPosition(cc.p(0.6, 0.9216));
            this.btnSound.setNormalizedPosition(cc.p(0.6, 0.8056));
            this.btnHint.setNormalizedPosition(cc.p(0.6, 0.6944));
            this.btnFacebook.setNormalizedPosition(cc.p(0.6, 0.4514));
            this.btnTwister.setNormalizedPosition(cc.p(0.6, 0.3056));
        }
        pnlRight.setPosition(cc.p(size.width, 0));
        var posTitle = cc.p(size.width / 2, size.height - 28 - this.pnlTitle.getContentSize().height / 2);
        this.pnlTitle.setPosition(posTitle);
        this.btnLogo.setPosition(cc.p(0, size.height));
    },
    initAnimTitle: function () {
        var _this = this;
        var fadeOut = cc.fadeOut(0.1);
        var fadeIn = cc.fadeIn(0.1);
        {
            var board = this.pnlTitle.getChildByName("board");
            var spInside = board.getChildByName("lightIn");
            var sequen = cc.sequence(fadeIn.clone(), cc.delayTime(0.5), fadeOut.clone(), cc.delayTime(0.5));
            var call = cc.callFunc(function () {
                var fadeOut = cc.fadeOut(0.1);
                var fadeIn = cc.fadeIn(0.1);
                var sequen = cc.sequence(fadeIn, cc.delayTime(0.5), fadeOut, cc.delayTime(0.5));
                var repeat = cc.repeatForever(sequen);
                var board = _this.pnlTitle.getChildByName("board");
                var spOutside = board.getChildByName("lightOut");
                spOutside.runAction(repeat);
            });
            spInside.runAction(cc.repeatForever(sequen));
            this.runAction(cc.sequence(cc.delayTime(0.6), call));
        }
        {
            var spLightLeft_1 = this.btnPlayNow.getChildByName("spLightTop");
            var spLightRight_1 = this.btnPlayNow.getChildByName("spLightBot");
            {
                var move = cc.moveTo(2.0, cc.p(50, spLightRight_1.y));
                var fadeOut_1 = cc.fadeOut(2.0);
                var callReset = cc.callFunc(function () {
                    spLightRight_1.setPositionX(_this.btnPlayNow.getContentSize().width - 50);
                });
                var spawn = cc.spawn(move, fadeOut_1);
                var sequen = cc.sequence(spawn, callReset, cc.delayTime(2.0), cc.fadeIn(0.8));
                var repeat = cc.repeatForever(sequen);
                spLightRight_1.runAction(repeat);
            }
            {
                var move = cc.moveTo(2.0, cc.p(this.btnPlayNow.getContentSize().width - 50, spLightLeft_1.y));
                var fadeOut_2 = cc.fadeOut(2.0);
                var callReset = cc.callFunc(function () {
                    spLightLeft_1.setPositionX(50);
                });
                var spawn = cc.spawn(move, fadeOut_2);
                var sequen = cc.sequence(spawn, callReset, cc.delayTime(2.0), cc.fadeIn(0.8));
                var repeat = cc.repeatForever(sequen);
                spLightLeft_1.runAction(repeat);
            }
        }
    },
    initAnimLogo: function () {
        var nLogo = this.btnLogo.getChildByName("nLogo");
        var logo1 = nLogo.getChildByName("logo1");
        var logo2 = nLogo.getChildByName("logo2");
        var logo3 = nLogo.getChildByName("logo3");
        {
            var call1 = cc.callFunc(function () {
                logo1.runAction(cc.EaseBackOut.create(cc.scaleTo(0.5, 1.0, 1.0)));
            });
            var call2 = cc.callFunc(function () {
                logo2.runAction(cc.EaseBackOut.create(cc.scaleTo(0.5, 1.0, 1.0)));
            });
            var call3 = cc.callFunc(function () {
                logo3.runAction(cc.EaseBackOut.create(cc.scaleTo(0.5, 1.0, 1.0)));
            });
            var call4 = cc.callFunc(function () {
                logo1.runAction(cc.EaseBackIn.create(cc.scaleTo(0.5, 0, 1.0)));
                logo2.runAction(cc.EaseBackIn.create(cc.scaleTo(0.5, 0, 1.0)));
                logo3.runAction(cc.EaseBackIn.create(cc.scaleTo(0.5, 0, 1.0)));
            });
            var delay = cc.delayTime(0.5);
            var sequen = cc.sequence(call1, delay.clone(), call2, delay.clone(), call3, cc.delayTime(5.5), call4, cc.delayTime(1.0));
            nLogo.runAction(cc.repeatForever(sequen));
        }
    },
    onTouchButton: function (pRef, touchType) {
        if (GMMGameUtils.makeEffectButton(pRef, touchType, 1.0, 0.9)) {
            sound.playClick();
            if (pRef === this.btnExit) {
                cc.log("onClicked Exit");
                this.clearCache();
                action_resolver.exitApp();
            }
            else if (pRef === this.btnRate) {
                cc.log("onClicked Rate");
                action_resolver.showRateApp();
            }
            else if (pRef === this.btnSound) {
                setSound(getSound() === true ? 0 : 1);
                this.reloadSoundBtn();
                cc.log("onClicked Sound");
            }
            else if (pRef === this.btnHint) {
                cc.log("onClicked Hint");
                cc.director.runScene(new cc.TransitionFade(0.5, new GMMHintScene()));
            }
            else if (pRef === this.btnFacebook) {
                cc.log("onClicked Exit");
                action_resolver.showFacebook();
            }
            else if (pRef === this.btnTwister) {
                cc.log("onClicked Twister");
                action_resolver.showTwister();
            }
            else if (pRef === this.btnPlayNow) {
                cc.log("onClicked Play");
                action_resolver.hideBannerAdmob();
                cc.director.runScene(new cc.TransitionFade(0.5, new GMMGamePlay()));
            }
            else if (pRef === this.btnAchieve) {
                cc.log("onClicked Achieve");
                action_resolver.showAchievement();
            }
            else if (pRef === this.btnRank) {
                cc.log("onClicked Rank");
                action_resolver.showHighBoard();
            }
            else if (pRef === this.btnRemoveAds) {
                cc.log("onClicked RemoveAds");
                action_resolver.showBuyStopAds();
            }
            else if (pRef === this.btnLogo) {
                cc.log("onClicked Logo");
                action_resolver.showMoreApp();
            }
        }
    },
    reloadSoundBtn: function () {
        if (!getSound()) {
            this.btnSound.loadTextureNormal(res.PKC_IMG_btnSoundOff);
            this.btnSound.loadTexturePressed(res.PKC_IMG_btnSoundOff);
            this.btnSound.loadTextureDisabled(res.PKC_IMG_btnSoundOff);
        }
        else {
            this.btnSound.loadTextureNormal(res.PKC_IMG_btnSoundOn);
            this.btnSound.loadTexturePressed(res.PKC_IMG_btnSoundOn);
            this.btnSound.loadTextureDisabled(res.PKC_IMG_btnSoundOn);
        }
    },
    onClickAndroid: function () {
    },
    onClickIos: function () {
    },
    onExit: function () {
        this._super();
    },
    clearCache: function () {
        cc.log("START CLEAR CACHE");
        cc.spriteFrameCache.removeSpriteFramesFromFile(res.PKC_PLIST_texture);
        var animCache = cc.AnimationCache.getInstance();
        var arrAnimName = [];
        arrAnimName[0] = ANIM_HINT;
        arrAnimName[1] = ANIM_EXPLOSION;
        arrAnimName[2] = ANIM_SHIELD;
        cc.log("CLEAR CACHE; ArrAnimName length: " + arrAnimName.length);
        for (var i = 0; i < arrAnimName.length; i++) {
            var animName = arrAnimName[i];
            var anim = animCache.getAnimation(animName);
            cc.log("clearCacheAnimation; start remove: " + animName);
            if (anim != null) {
                animCache.removeAnimation(animName);
                cc.log("CLEAR CACHE; remove animation item " + animName);
            }
        }
    }
});
var GMMMainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this._touchEnabled = true;
        var layer = new GMMMainSceneLayer();
        this.addChild(layer);
    }
});
