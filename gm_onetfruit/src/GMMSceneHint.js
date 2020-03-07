﻿
var GMMHintLayer = cc.Layer.extend({
    btnBack: null,
    btnLogo: null,
    ctor: function () {
        this._super();
        this.initUI();
        return true;
    },
    initUI: function() {
        this.layer = ccs.load(res.PKC_JSON_LayerHint).node;
        this.addChild(this.layer, 1);

		this.spBackground = this.layer.getChildByName("bg");
        this.btnBack = this.layer.getChildByName("btnBack");
        this.btnLogo = this.layer.getChildByName("btnLogo");
        this.btnLogo.setVisible(false);

        this.btnBack.addTouchEventListener(this.onTouchButton, this);
        this.btnLogo.addTouchEventListener(this.onTouchButton, this);

        this.initForResolution();
        this.initAnimLogo();
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
    initForResolution: function() {
        let size = cc.winSize;
		
		this.spBackground.setScale(size.width / this.spBackground.getContentSize().width, size.height / this.spBackground.getContentSize().height);
		
        let pnlMain = this.layer.getChildByName("pnlMain");
        pnlMain.setPosition(cc.p(size.width /2, size.height / 2));
        this.btnLogo.setPosition(cc.p(0, size.height));
        this.btnBack.setPosition(cc.p(size.width - 20 - this.btnBack.getContentSize().width / 2, size.height - 20 - this.btnBack.getContentSize().height / 2));
    },
    onTouchButton: function(pRef, touchType) {
        if (GMMGameUtils.makeEffectButton(pRef, touchType, 1.0, 0.9)) {
            if (pRef === this.btnBack) {
                cc.director.runScene(new cc.TransitionFade(0.5, new GMMMainScene()));
            } else if (pRef === this.btnLogo) {
                action_resolver.showMoreApp();
            }
        }
    },
});

var GMMHintScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GMMHintLayer();
        this.addChild(layer);
    }
});

