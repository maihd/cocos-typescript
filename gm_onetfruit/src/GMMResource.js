/// <reference path="util.js"/>
FACTOR_RADIUS = 57.29564
MAX_INDEX_ITEM_ONET = 29
MAX_REWARD  = 12

PREF_LOG_SOUND          = "gmm_pkc_isSound_OF"
PREF_LOG_TOTAL_SCORE    = "gmm_pkc_total_score_OF"
PREF_LOG_CURR_LEVEL = "gmm_pkc_curr_level_OF"
PREF_LOG_NUM_HINT = "gmm_pkc_num_hint"
PREF_LOG_NUM_TIME = "gmm_pkc_num_time"
PREF_LOG_ADS     = "gmm_pkc_stop_ads"

ANIM_HINT       = "gmm_pkc_anim_hint_OF"
ANIM_EXPLOSION  = "gmm_pkc_anim_ex_OF"
ANIM_SHIELD = "gmm_pkc_anim_shield"

SCORE_ADD = 200
SCORE_CUT = 5000

var frameColor = {
    GREEN: cc.color(135, 211, 124, 255),
    RED: cc.color(192, 57, 43, 255)
};

var type_dialog = {
    PAUSE: 0,
    CONTINUE: 1,
    PLAY: 2,
    GAMEOVER: 3,
    COMPLETED: 4
};

var type_change = {
    Normal: 1,
    Move_to_Left: 2,
    Move_to_Right: 3,
    Move_to_Top: 4,
    Move_to_Bot: 5,
    Move_ZIG_ZAG_VER: 6,
    Move_ZIG_ZAG_HOL: 0,
    length: 7
};

var BG_ARR_PNG = [  "res/bg/bg0.jpg", "res/bg/bg1.jpg",
                    "res/bg/bg2.jpg", "res/bg/bg3.jpg",
                    "res/bg/bg4.jpg", "res/bg/bg5.jpg", "res/bg/bg6.jpg" ];

var res = {

    font_title_Fnt: "res/font/fontTitle.fnt",
    font_title_Png: "res/font/fontTitle.png",
    font_Number_Fnt: "res/font/fontNumber.fnt",
    font_Number_Png: "res/font/fontNumber.png",

    isSound: false,

    music_Background: "res/sound/bg.mp3",
    sound_bad: "res/sound/bad.wav",
    sound_click: "res/sound/click.wav",
    sound_clickItem: "res/sound/clickitem.wav",
    sound_dialog_close: "res/sound/closedialog.mp3",
    sound_dialog_open: "res/sound/opendialog.mp3",
    sound_completed: "res/sound/completed.wav",
    sound_gameover: "res/sound/gameover.mp3",
    sound_good: "res/sound/good.wav",
    sound_random: "res/sound/random.wav",
    sound_hint_ok: "res/sound/upon.mp3",
    sound_hint_fail: "res/sound/upoff.wav",

    PKC_PLIST_texture : "res/texture/texture.plist",
    PKC_PNG_texture: "res/texture/texture.png",

    PKC_JSON_ItemLogo: "res/GMMItemLogo.json",
    PKC_JSON_LayerGame: "res/GMMLayerGame.json",
    PKC_JSON_LayerLobby: "res/GMMLayerLobby.json",
    PKC_JSON_LayerHint: "res/GMMLayerHint.json",
    PKC_JSON_PopupBeginner: "res/GMMPopupBeginner.json",
    PKC_JSON_PopupCompleted: "res/GMMPopupCompleted.json",
    PKC_JSON_PopupContinue: "res/GMMPopupContinue.json",
    PKC_JSON_PopupPause: "res/GMMPopupPause.json",
    PKC_JSON_PopupGameOver: "res/GMMPopupGameOver.json",

    PKC_IMG_btnAchieve: "res/Buttons/btnAchieve.png",
    PKC_IMG_btnClose: "res/Buttons/btnClose.png",
    PKC_IMG_btnFacebook: "res/Buttons/btnFacebook.png",
    PKC_IMG_btnHint: "res/Buttons/btnHint.png",
    PKC_IMG_btnPlay: "res/Buttons/btnPlay.png",
    PKC_IMG_btnRank: "res/Buttons/btnRank.png",
    PKC_IMG_btnRating: "res/Buttons/btnRating.png",
    PKC_IMG_btnRemoveAds: "res/Buttons/btnRemoveAds.png",
    PKC_IMG_btnSoundOff: "res/Buttons/btnSoundOff.png",
    PKC_IMG_btnSoundOn: "res/Buttons/btnSoundOn.png",
    PKC_IMG_btnTwister: "res/Buttons/btnTwister.png",
    PKC_IMG_elec1: "res/Electric/elec1.png",
    PKC_IMG_elec2: "res/Electric/elec2.png",
    PKC_IMG_elec3: "res/Electric/elec3.png",
    PKC_IMG_elec4: "res/Electric/elec4.png",
    PKC_IMG_elec5: "res/Electric/elec5.png",
    PKC_IMG_elec6: "res/Electric/elec6.png",
    PKC_IMG_elec7: "res/Electric/elec7.png",
    PKC_IMG_elec8: "res/Electric/elec8.png",

    PKC_FONT_OpenSansBold: {type:"font", name:"OpenSansBold", srcs:["res/Fonts/OpenSans-Bold.ttf"]},
    PKC_FONT_UTMHelvetIns: {type:"font", name:"UTMHelvetIns", srcs:["res/Fonts/UTMHelvetIns.ttf"]},

    PKC_IMG_bgMain: "res/Main/bgMain.png",
    PKC_IMG_bgSplash: "res/Main/bgSplash.png",
    PKC_IMG_coverBtnPlay: "res/Main/coverBtnPlay.png",
    PKC_IMG_icLogo1: "res/Main/icLogo1.png",
    PKC_IMG_icLogo2: "res/Main/icLogo2.png",
    PKC_IMG_icLogo3: "res/Main/icLogo3.png",
    PKC_IMG_spBoard: "res/Main/spBoard.png",
    PKC_IMG_spEarBunny: "res/Main/spEarBunny.png",
    PKC_IMG_spLightIn: "res/Main/spLightIn.png",
    PKC_IMG_spLighting: "res/Main/spLighting.png",
    PKC_IMG_spLightOut: "res/Main/spLightOut.png",
    PKC_IMG_spTitle: "res/Main/spTitle.png",
};

var sound = {
    playBackground: function () {
        cc.audioEngine.playMusic(res.music_Background, true);
    },
    pauseBackgound: function() {
        cc.audioEngine.stopMusic();
    },
    playDialogOpen: function () {
        cc.audioEngine.playEffect(res.sound_dialog_open);
    },
    playDialogClose: function () {
        cc.audioEngine.playEffect(res.sound_dialog_close);
    },
    playClick: function () {
        cc.audioEngine.playEffect(res.sound_click);
    },
    playBad: function () {
        cc.audioEngine.playEffect(res.sound_bad);
    },
    playGood: function () {
        cc.audioEngine.playEffect(res.sound_good);
    },
    playClickItem: function () {
        cc.audioEngine.playEffect(res.sound_clickItem);
    },
    playCompleted: function () {
        cc.audioEngine.playEffect(res.sound_completed);
    },
    playGameOver: function () {
        cc.audioEngine.playEffect(res.sound_gameover);
    },
    playHintSuccess: function () {
        cc.audioEngine.playEffect(res.sound_hint_ok);
    },
    playHintFailed: function () {
        cc.audioEngine.playEffect(res.sound_hint_fail);
    },
    playRandom: function () {
        cc.audioEngine.playEffect(res.sound_random);
    },
};

action_resolver = {
    showBuyStopAds: function () {
		if (cc.sys.platform == cc.sys.ANDROID) {	// no handle at android os
			return;
		}
        if (portalHelper) {
			if (portalHelper.gmmShowBuyStopAds)
				portalHelper.gmmShowBuyStopAds();
        } else
            cc.log("Cannot found portalHelper.showGMMBuyStopAds();");
    },
    hideBannerAdmob: function () {
    },
    showBannerAdmob: function () {
    },
    initAdsAdmob: function() {
		if (cc.sys.platform == cc.sys.ANDROID) {	// no handle at android os
			return;
		}
        if (getIsStopAds()) {
            cc.log("initAdsAdmob: YOU HAVE STOP ADS. ADS NOT AVAILABLE");
            return;
        }
        if (portalHelper) {
            if (portalHelper.gmmInitAds) {
                cc.log("initAdsAdmob: portalHelper.gmmInitAds start");
                portalHelper.gmmInitAds();
            }
        } else
            cc.log("Cannot found portalHelper.gmmInitAds();");
    },
    showInterAdmob: function () {
		if (cc.sys.platform == cc.sys.ANDROID) {	// no handle at android os
			return;
		}
        if (getIsStopAds()) {
            cc.log("loadInterAdmob: YOU HAVE STOP ADS. ADS NOT AVAILABLE");
            return;
        }
        if (portalHelper) {
			if (portalHelper.gmmShowInterAds) {
                cc.log("loadInterAdmob: portalHelper.showGMMInterAds start");
                portalHelper.gmmShowInterAds();
            }
        } else
            cc.log("Cannot found portalHelper.showGMMInterAds();");
    },
    loadInterAdmob: function () {
		if (cc.sys.platform == cc.sys.ANDROID) {	// no handle at android os
			return;
		}
        if (getIsStopAds()) {
            cc.log("loadInterAdmob: YOU HAVE STOP ADS. ADS NOT AVAILABLE");
            return;
        }
        if (portalHelper) {
			if (portalHelper.gmmLoadInterAds) {
			    cc.log("loadInterAdmob: portalHelper.loadGMMInterAds start");
                portalHelper.gmmLoadInterAds();
            }
		} else
            cc.log("Cannot found portalHelper.loadGMMInterAds();");
    },
    setHighScore: function (currLevel, score) {
        if (portalHelper) {
			if (portalHelper.gmmSetHighScore)
                portalHelper.gmmSetHighScore(currLevel, score);
        } else
            cc.log("Cannot found portalHelper.setGMMHighScore(currLevel, score);");
    },
    showHighBoard: function () {
        if (portalHelper) {
			if (portalHelper.gmmShowHighBoard)
				portalHelper.gmmShowHighBoard();
        } else
            cc.log("Cannot found portalHelper.showGMMHighBoard();");
    },
    showAchievement: function () {
        if (portalHelper) {
			if (portalHelper.gmmShowAchievement)
				portalHelper.gmmShowAchievement();
        } else
            cc.log("Cannot found portalHelper.showGMMAchievement();");
    },
    showFacebook: function () {

    },
    showTwister: function () {

    },
    showMoreApp: function () {

    },
    showRateApp: function () {
        if (portalHelper) {
            if (portalHelper.showRate)
                portalHelper.showRate();
        } else
            cc.log("Cannot found portalHelper.showRateApp();");
    },
    exitApp: function() {
		portalHelper.returnLobbyScene(portalHelper.GAME_LOBBY_LOCATION.LIST_PORTAL);
    }
};

function getSound() {
    res.isSound = cc.sys.localStorage.getItem(PREF_LOG_SOUND) == 1;
    if (res.isSound) {
        sound.playBackground();
    }
    return res.isSound;
};

function setSound(val) {
    res.isSound = val;
    if (val) {
        sound.playBackground();
    } else {
        sound.pauseBackgound();
    }
    cc.log("setSound: " + val);
    cc.sys.localStorage.setItem(PREF_LOG_SOUND, val);
};

function getIsStopAds() {
	if (cc.sys.platform == cc.sys.ANDROID) {	// no handle at android os
		return true;
	}
    return cc.sys.localStorage.getItem(PREF_LOG_ADS) == 1;
};

function setIsStopAds(val) {
    cc.sys.localStorage.setItem(PREF_LOG_ADS, val);
};

function getPrefInteger(prefName) {
    return parseInt(cc.sys.localStorage.getItem(prefName), 0);
};

function setPrefInteger(prefName, val) {
	cc.log("STORE: setPrefInteger: Name: " + prefName + "; Value: " + val);
    cc.sys.localStorage.setItem(prefName, val + "");
};

function getCurrLevel() {
    return parseInt(cc.sys.localStorage.getItem(PREF_LOG_CURR_LEVEL), 0);
};

function setCurrLevel(val) {
	cc.log("STORE: setCurrLevel: " + val);
    cc.sys.localStorage.setItem(PREF_LOG_CURR_LEVEL, val + "");
};

function getTotalScore() {
    return parseInt(cc.sys.localStorage.getItem(PREF_LOG_TOTAL_SCORE), 0);
};

function setTotalScore(val) {
	cc.log("STORE: setTotalScore: " + val);
    cc.sys.localStorage.setItem(PREF_LOG_TOTAL_SCORE, val + "");
};

function pointIntersectCircle(p, center, radius) {
    var distanceX = center.x - p1.x;
    var distanceY = center.y - p1.y;

    var magnitude = distanceX * distanceX + distanceY * distanceY;
    return magnitude < radius * radius;
}

function circlesIntersect(p1, radius1, p2, radius2) {
    var distanceX = p2.x - p1.x;
    var distanceY = p2.y - p1.y;
    
    var magnitude = distanceX * distanceX + distanceY * distanceY;
    return magnitude < (radius1 + radius2) * (radius1 + radius2);
    // Note, sqrt is a slow operation, square both sides for better performance
    // var magnitudeSquared = distanceX * distanceX + distanceY * distanceY;
    // return magnitudeSquared < (c1Radius + c2Radius) * (c1Radius + c2Radius);
}

function newMyButton(x, y, strFile, strName, func, inst) {
    var sp1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(strFile + "Nor.png"));
    var t1 = new cc.LabelBMFont();
    t1.setFntFile(res.font_Number_Fnt);
    t1.setScale(0.7);
    t1.setString(strName);
    t1.setPosition(sp1.getContentSize().width / 2, sp1.getContentSize().height / 2 + 20);
    sp1.addChild(t1);
    var sp2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(strFile + "Sec.png"));
    var t2 = new cc.LabelBMFont();
    t2.setFntFile(res.font_Number_Fnt);
    t2.setScale(0.7);
    t2.setString(strName);
    t2.setPosition(sp1.getContentSize().width / 2, sp2.getContentSize().height / 2 + 20);
    sp2.addChild(t2);
    var btn = cc.MenuItemSprite.create(sp1, sp2);
    btn.setCallback(func, inst);
    btn.setPosition(x, y);
    btn.setScale(0.7);
    return btn;
}

function newButtonNoText2(x, y, strFileNor, strFileSec, strName, func, inst) {
    var btn = cc.MenuItemSprite.create(
        new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(strFileNor)),
        new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(strFileSec)));
    btn.setCallback(func, inst);
    btn.setName(strName);
    btn.setPosition(x, y);
    return btn;
}

function newButtonNoText(x, y, strFile, strName, func, inst) {
    var sp = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(strFile));
    sp.setOpacity(100);
    var btn = cc.MenuItemSprite.create(new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(strFile)), sp);
    btn.setCallback(func, inst);
    btn.setName(strName);
    btn.setPosition(x, y);
    return btn;
}

var scaleX = 1;

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}