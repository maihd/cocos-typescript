
var GMMSplashLayer = cc.LayerColor.extend({
    currLoadedFiles: 0,
    MAX_FILES_LOADED: 1,
    currLoadedPercent: 0,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        this.init(cc.color(255, 255, 255));
        var size = cc.winSize;
        let bg = cc.Sprite.create("res/Main/bgSplash.png");
        bg.setPosition(cc.p(size.width / 2, size.height / 2));
        bg.setScale(size.width / bg.getContentSize().width, size.height / bg.getContentSize().height);
        this.addChild(bg, 0);
        // load logo
        var logo = cc.Sprite.create("res/Main/logo.png");
        logo.setPosition(size.width / 2, size.height / 2);
        this.addChild(logo, 1);

        cc.audioEngine.setEffectsVolume(1.0);
        cc.audioEngine.setMusicVolume(1.0);
        cc.log("sound value: " + getSound());
        if (getSound() == null || (getSound() + "") == "NaN") {
            setSound(1);
            cc.log("set sound");
        }
        if (getCurrLevel() == null || (getCurrLevel() + "") == "NaN") {
            setCurrLevel(1);
            cc.log("set Currlevel");
        }
        if (getTotalScore() == null || (getTotalScore() + "") == "NaN") {
            setTotalScore(0);
            cc.log("set total Score");
        }
        if (getIsStopAds() == null || (getIsStopAds() + "") == "NaN") {
            setIsStopAds(0);
            cc.log("set is Stop ads False");
        }
        
        // check new version
        if (getPrefInteger(PREF_LOG_NUM_HINT) + "" == "NaN" || getPrefInteger(PREF_LOG_NUM_TIME) + "" == "NaN") {
            var numLevel = getPrefInteger(PREF_LOG_CURR_LEVEL);
            var number = parseInt(numLevel / 2);
            if (number < 2) {
                number = 2;
            } else if (number > MAX_REWARD) {
                number = MAX_REWARD;
            }
            setPrefInteger(PREF_LOG_NUM_HINT, number);
            setPrefInteger(PREF_LOG_NUM_TIME, number);
        }

        this.startLoading();

        action_resolver.initAdsAdmob();
        
        return true;
    },
    startLoading: function() {
        cc.log("startLoading");
        cc.textureCache.addImageAsync(res.PKC_PNG_texture, this.loadingTextureCallback.bind(this, res.PKC_PLIST_texture));
        this.schedule(this.updateLoading, 0.015);
    },
    loadingTextureCallback: function(plist, textureData) {
        cc.log("PLIST: " + plist);
        cc.spriteFrameCache.addSpriteFrames(plist , textureData);
        this.loadingCallback(0.0);
    },
    loadingCallback: function(dt) {
        this.currLoadedFiles++;
        this.currLoadedPercent = (this.currLoadedFiles / this.MAX_FILES_LOADED) * 100;
    },
    updateLoading: function(dt) {
        if (this.currLoadedPercent >= 100) {
            this.unschedule(this.updateLoading);

            this.initAnim("hint", 1, ANIM_HINT, 0.1);
            this.initAnim("ex", 10, ANIM_EXPLOSION, 0.04);
            this.initAnim("onet", 13, ANIM_SHIELD, 0.08);

            this.scheduleOnce(this.finalHandled, 0.5);
        }
    },
    finalHandled: function() {
        cc.log("SplashScreen done, change to main Screen");
        cc.director.runScene(new cc.TransitionFade(0.5, new GMMMainScene()));
    },
    initAnim: function (keyName, size, name, delay) {
        var animFrames = [];
        for (var i = 0; i <= size; i++) {
            var str = keyName + i + ".png";
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
            var animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(spriteFrame, 1, null);
            animFrames.push(animFrame);
        }
        var animation = cc.Animation.create(animFrames, delay);
        cc.AnimationCache.getInstance().addAnimation(animation, name);
    }
});

var GMMSplashScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GMMSplashLayer();
        
        this.addChild(layer);
    }
});

