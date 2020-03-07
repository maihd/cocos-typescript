
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
        cc.log("In Main Scene");
        //////////////////////////////
        // 1. super init first
        
        this._super();

        action_resolver.showBannerAdmob();
        var size = cc.winSize;
        cc.log("Gia tri winSize In MainScene: ", size.width, size.height);
        var scaleRes= GMMGameUtils.getPopupScaleByDeviceResolution();
        cc.log("--------------------- Scale Resolution: " + scaleRes);

        this.initUI();

        cc.eventManager.addCustomListener(portalHelper.EVENT_IAP_BUY_SUCCESS, (event) => {
            let productId = event.getUserData();
            cc.log("HAS BUY SUCCESS ITEM: " + productId);
            setIsStopAds(1);
            this.btnRemoveAds.setVisible(false);
        });

        return true;
    },
    initUI: function () {
        this.layer = ccs.load(res.PKC_JSON_LayerLobby).node;
        this.addChild(this.layer, 1);
		
		this.spBackground = this.layer.getChildByName("bg");
        let pnlRight = this.layer.getChildByName("pnlRight");
        let pnlBot = this.layer.getChildByName("pnlBot");
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
		
		if (cc.sys.platform == cc.sys.ANDROID) {	// no handle at android os
			this.btnRate.setVisible(false);
		}

        this.reloadSoundBtn();
        // set for remove ads
        if (getIsStopAds()) {
            this.btnRemoveAds.setVisible(false);
        }

        this.initForResolution();
        // anim
        this.initAnimLogo();
        this.initAnimTitle();
    },
    initForResolution: function() {
        let size = cc.winSize;
		
		this.spBackground.setScale(size.width / this.spBackground.getContentSize().width, size.height / this.spBackground.getContentSize().height);
		
        let pnlRight = this.layer.getChildByName("pnlRight");
        pnlRight.setContentSize(cc.size(200, size.height));
        {
            this.btnExit.setNormalizedPosition(cc.p(0.6, 0.9216));
            this.btnSound.setNormalizedPosition(cc.p(0.6, 0.8056));
            this.btnHint.setNormalizedPosition(cc.p(0.6, 0.6944));
            this.btnFacebook.setNormalizedPosition(cc.p(0.6, 0.4514));
            this.btnTwister.setNormalizedPosition(cc.p(0.6, 0.3056));
        }
        pnlRight.setPosition(cc.p(size.width, 0));
        let posTitle = cc.p(size.width / 2, size.height - 28 - this.pnlTitle.getContentSize().height / 2);
        this.pnlTitle.setPosition(posTitle);
        this.btnLogo.setPosition(cc.p(0, size.height));
    },
    initAnimTitle: function() {
        // make anim at ear bunny
        let fadeOut = cc.fadeOut(0.1);
        let fadeIn = cc.fadeIn(0.1);
        // make anim leon board
        {
            let board = this.pnlTitle.getChildByName("board");
            let spInside = board.getChildByName("lightIn");
            let sequen = cc.sequence(fadeIn.clone(), cc.delayTime(0.5), fadeOut.clone(), cc.delayTime(0.5));

            let call = cc.callFunc(() => {
                let fadeOut = cc.fadeOut(0.1);
                let fadeIn = cc.fadeIn(0.1);
                let sequen = cc.sequence(fadeIn, cc.delayTime(0.5), fadeOut, cc.delayTime(0.5));
                let repeat = cc.repeatForever(sequen);
                let board = this.pnlTitle.getChildByName("board");
                let spOutside = board.getChildByName("lightOut");
                spOutside.runAction(repeat);
            });

            spInside.runAction(cc.repeatForever(sequen));
            this.runAction(cc.sequence(cc.delayTime(0.6), call));
        }
        // make anim for button play
        {
            let spLightLeft = this.btnPlayNow.getChildByName("spLightTop");
            let spLightRight = this.btnPlayNow.getChildByName("spLightBot");
            {
                let move = cc.moveTo(2.0, cc.p(50, spLightRight.y));
                let fadeOut = cc.fadeOut(2.0);
                let callReset = cc.callFunc(() => {
                    spLightRight.setPositionX(this.btnPlayNow.getContentSize().width - 50);
                });
                let spawn = cc.spawn(move, fadeOut);
                let sequen = cc.sequence(spawn, callReset, cc.delayTime(2.0), cc.fadeIn(0.8));
                let repeat = cc.repeatForever(sequen);
                spLightRight.runAction(repeat);
            }
            {
                let move = cc.moveTo(2.0, cc.p(this.btnPlayNow.getContentSize().width - 50, spLightLeft.y));
                let fadeOut = cc.fadeOut(2.0);
                let callReset = cc.callFunc(() => {
                    spLightLeft.setPositionX(50);
                });
                let spawn = cc.spawn(move, fadeOut);
                let sequen = cc.sequence(spawn, callReset, cc.delayTime(2.0), cc.fadeIn(0.8));
                let repeat = cc.repeatForever(sequen);
                spLightLeft.runAction(repeat);
            }
        }
    },
    initAnimLogo: function() {
        let nLogo = this.btnLogo.getChildByName("nLogo");
        let logo1 = nLogo.getChildByName("logo1");
        let logo2 = nLogo.getChildByName("logo2");
        let logo3 = nLogo.getChildByName("logo3");
        {
            let call1 = cc.callFunc(() => {
                logo1.runAction(cc.EaseBackOut.create(cc.scaleTo(0.5, 1.0, 1.0)));
            });
            let call2 = cc.callFunc(() => {
                logo2.runAction(cc.EaseBackOut.create(cc.scaleTo(0.5, 1.0, 1.0)));
            });
            let call3 = cc.callFunc(() => {
                logo3.runAction(cc.EaseBackOut.create(cc.scaleTo(0.5, 1.0, 1.0)));
            });
            let call4 = cc.callFunc(() => {
                logo1.runAction(cc.EaseBackIn.create(cc.scaleTo(0.5, 0, 1.0)));
                logo2.runAction(cc.EaseBackIn.create(cc.scaleTo(0.5, 0, 1.0)));
                logo3.runAction(cc.EaseBackIn.create(cc.scaleTo(0.5, 0, 1.0)));
            });
            let delay = cc.delayTime(0.5);
            let sequen = cc.sequence(call1, delay.clone(), call2, delay.clone(), call3, cc.delayTime(5.5), call4, cc.delayTime(1.0));
            nLogo.runAction(cc.repeatForever(sequen));
        }
    },
    onTouchButton: function(pRef, touchType) {
        if (GMMGameUtils.makeEffectButton(pRef, touchType, 1.0, 0.9)) {
            sound.playClick();
            if (pRef === this.btnExit) {
                cc.log("onClicked Exit");
				this.clearCache();
                action_resolver.exitApp();
            } else if (pRef === this.btnRate) {
                cc.log("onClicked Rate");
                action_resolver.showRateApp();
            } else if (pRef === this.btnSound) {
                setSound(getSound() === true ? 0 : 1);
                this.reloadSoundBtn();
                cc.log("onClicked Sound");
            } else if (pRef === this.btnHint) {
                cc.log("onClicked Hint");
                cc.director.runScene(new cc.TransitionFade(0.5, new GMMHintScene()));
            } else if (pRef === this.btnFacebook) {
                cc.log("onClicked Exit");
                action_resolver.showFacebook();
            } else if (pRef === this.btnTwister) {
                cc.log("onClicked Twister");
                action_resolver.showTwister();
            } else if (pRef === this.btnPlayNow) {
                cc.log("onClicked Play");
                action_resolver.hideBannerAdmob();
                cc.director.runScene(new cc.TransitionFade(0.5, new GMMGamePlay()));
            } else if (pRef === this.btnAchieve) {
                cc.log("onClicked Achieve");
                action_resolver.showAchievement();
            } else if (pRef === this.btnRank) {
                cc.log("onClicked Rank");
                action_resolver.showHighBoard();
            } else if (pRef === this.btnRemoveAds) {
                cc.log("onClicked RemoveAds");
                action_resolver.showBuyStopAds();
            } else if (pRef === this.btnLogo) {
                cc.log("onClicked Logo");
                action_resolver.showMoreApp();
            }
        }
    },
    reloadSoundBtn: function() {
        if (!getSound()) {
            this.btnSound.loadTextureNormal(res.PKC_IMG_btnSoundOff);
            this.btnSound.loadTexturePressed(res.PKC_IMG_btnSoundOff);
            this.btnSound.loadTextureDisabled(res.PKC_IMG_btnSoundOff);
        } else {
            this.btnSound.loadTextureNormal(res.PKC_IMG_btnSoundOn);
            this.btnSound.loadTexturePressed(res.PKC_IMG_btnSoundOn);
            this.btnSound.loadTextureDisabled(res.PKC_IMG_btnSoundOn);
        }
    },
    onClickAndroid: function () {
        //window.open("");
    },
    onClickIos: function () {

    },
	onExit: function () {
		this._super();
	},
	clearCache: function () {
		cc.log("START CLEAR CACHE");
		cc.spriteFrameCache.removeSpriteFramesFromFile(res.PKC_PLIST_texture);
		// clear cache anime, animation
		let animCache = cc.AnimationCache.getInstance();
		let arrAnimName = [];
		arrAnimName[0] = ANIM_HINT;
		arrAnimName[1] = ANIM_EXPLOSION;
		arrAnimName[2] = ANIM_SHIELD;
		cc.log("CLEAR CACHE; ArrAnimName length: " + arrAnimName.length);
		for (let i = 0; i < arrAnimName.length; i++) {
			let animName = arrAnimName[i];
			let anim = animCache.getAnimation(animName);
			cc.log("clearCacheAnimation; start remove: " + animName);
			if (anim != null) {
				animCache.removeAnimation(animName);
				cc.log("CLEAR CACHE; remove animation item " + animName);
			}
		}
	}
});

var GMMMainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this._touchEnabled = true;
        var layer = new GMMMainSceneLayer();
        this.addChild(layer);
    }
});

