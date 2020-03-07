TypePopupEffectAction = {
    Pulse: 1,
    Bounce: 2,
    Ease: 3, //same as pulse but horizontal
    Fade: 4,
};

var GMMPopupAbstract = cc.Layer.extend({
    _mainLayer: null,
    _mainPanel: null,
    _hideScale: null,
    _showScale: null,
    _hidePosition: null,
    _showPosition: null,

    _currentAction: null,
    _currentTabKey: 0,
	_isClosed: true,
    spBgFull: null,

    mapTabs: new GMMDictionary(),
    listPopups: null,

    onShowCallback: null,
    onCloseCallback: null,
    onTabSelectedCallback: null,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        return true;
    },
    initWithCSB: function (path) {
        this._mainLayer = ccs._load(path);
        if (this._mainLayer) {
            GMMGameUtils.scalePopupByDeviceResolution(this._mainLayer);
            this._mainLayer.setAnchorPoint(cc.p(0.5, 0.5));
            this._mainLayer.setNormalizedPosition(cc.p(0.5,0.5));
            // this._mainLayer.setPosition(cc.p(this.getContentSize().width * 0.5, this.getContentSize().height * 0.5));
            this.addChild(this._mainLayer, 999);

            this._mainPanel = this._mainLayer.getChildByName("pnlMain");

            var btnClose = this._mainPanel.getChildByName("btnClose");
            if (btnClose) {
                btnClose.addTouchEventListener((pSender, type) => {
                    if (GMMGameUtils.makeEffectButton(pSender, type, 1.0, 0.9)) {
                        this.onButtonCloseClicked();
                    }
                });
            }

            var deviceScaleRate = GMMGameUtils.getPopupScaleByDeviceResolution();
            this._showScale = cc.p(1 * deviceScaleRate, 1 * deviceScaleRate);
            this._hideScale = cc.p(0.5, 0.5);
            this._showPosition = this._mainPanel.getPosition();
            this._hidePosition = cc.p(this._showPosition.x, cc.winSize.height + this._showPosition.y);
            return true;
        }
    },
    show: function (effect) {
        this.showWithEffect(effect);
    },
    close: function (effect) {
        this.closeWithEffect(effect);
    },
    showWithEffect: function (effect) {
        if (!this._currentAction && this._mainPanel) {
            this._lastEffect = effect;

            var animation;
            switch (effect) {
                case TypePopupEffectAction.Pulse:
                    this._mainPanel.setScale(this._hideScale.x, this._hideScale.y);
                    this._mainPanel.setPosition(this._showPosition);
                    let fullScale = this._showScale.x || 1;
                    animation = cc.spawn(cc.fadeIn(0.2),
                        cc.sequence(new cc.EaseSineOut(cc.scaleTo(0.15, fullScale + 0.1)), new cc.EaseSineOut(cc.scaleTo(0.15, fullScale))));
                    // animation = cc.EaseBackOut.create(cc.scaleTo(0.3, this._showScale.x, this._showScale.y));
                    break;
                case TypePopupEffectAction.Ease:
                    this._mainPanel.setScale(this._showScale.x, this._showScale.y);
                    this._mainPanel.setPosition(this._hidePosition);
                    animation = cc.EaseBackOut.create(cc.moveTo(0.45,this._showPosition.x,this._showPosition.y));
                    break;
                case TypePopupEffectAction.Fade:
                    this._mainPanel.setOpacity(0);
                    animation = cc.fadeIn(0.3);
                    break;
                case TypePopupEffectAction.Bounce:
                default:
                    this._mainPanel.setScale(this._showScale.x, this._showScale.y);
                    this._mainPanel.setPosition(this._hidePosition);
                    animation = cc.sequence(
                        cc.EaseInOut.create(cc.moveTo(0.3, this._showPosition.x, this._showPosition.y - 60.0), 2.0),
                        cc.EaseIn.create(cc.moveTo(0.15, this._showPosition.x, this._showPosition.y), 2.0));
                    break;
            }
            this._currentAction = cc.sequence(
                animation,
                cc.callFunc(() => {
                    this._currentAction = null;
                    if (this.onShowCallback !== null) {
                        this.onShowCallback();
                    }
                }));
            this._mainPanel.runAction(this._currentAction);
        }
    },
    closeWithEffect: function (effect) {
        if (!this._currentAction && this._mainPanel) {
            this._lastEffect = effect;

            var animation;
            switch (effect) {
                case TypePopupEffectAction.Pulse:
                    this._mainPanel.setScale(this._showScale.x, this._showScale.y);
                    this._mainPanel.setPosition(this._showPosition);
                    let hideScale = this._hideScale.x || 0.3;
                    animation = cc.spawn(cc.fadeOut(0.3),
                        cc.sequence(new cc.EaseSineOut(cc.scaleTo(0.15, this._mainPanel.getScale() + 0.1)), new cc.EaseSineOut(cc.scaleTo(0.15, hideScale))));
                    // animation = cc.EaseIn.create(cc.scaleTo(0.3, this._hideScale.x, this._hideScale.y), 3.0);
                    break;
                case TypePopupEffectAction.Ease:
                    this._mainPanel.setScale(this._showScale.x, this._showScale.y);
                    this._mainPanel.setPosition(this._showPosition);
                    animation = cc.EaseBackOut.create(cc.moveTo(0.45,this._hidePosition.x,this._hidePosition.y));
                    break;
                case TypePopupEffectAction.Fade:
                    this._mainPanel.setOpacity(255);
                    animation = cc.fadeOut(0.3);
                    break;
                case TypePopupEffectAction.Bounce:
                default:
                    this._mainPanel.setScale(this._showScale.x, this._showScale.y);
                    this._mainPanel.setPosition(this._showPosition);
                    animation = cc.sequence(
                        cc.EaseOut.create(cc.moveTo(0.15, this._hidePosition.x, this._showPosition.y - 60.0), 2.0),
                        cc.EaseIn.create(cc.moveTo(0.3, this._hidePosition.x, this._hidePosition.y), 2.0));
                    break;
            }

            this._currentAction = cc.sequence(
                animation,
                cc.callFunc(() => {
                    this._currentAction = null;
                    if (this.onCloseCallback !== null) {
                        this.onCloseCallback();
                    }
                    this.removeFromParent(true);
                    //GMMPopupAbstract.listPopups.eraseObject(this, true);
                }));
            this._mainPanel.runAction(this._currentAction);
        }
    },
    onButtonCloseClicked: function () {
        //PLAY_SOUND(GAME_SOUND_BUTTON);
        this.closeWithEffect(this._lastEffect);
    },
    // chưa test
    initTabButtons1: function (container, onNodeName = "altextOn", offNodeName = "textOff") {
        if (this._mainPanel && container) {
            for (var i = container.getChildren().length - 1; i >= 0; i--) {
                var curCheckbox = container.getChildren()[i];
                if (!this.curCheckbox) {
                    return false;
                }

                var onNode = curCheckbox.getChildByName(onNodeName);
                if (!onNode) {
                    return false;
                }

                var offNode = curCheckbox.getChildByName(offNodeName);
                if (!offNode) {
                    return false;
                }

                curCheckbox.addEventListener(/*[curCheckbox, onNode, offNode]*/(pSender, type) => {
                    switch (type) {
                        case ccui.CheckBox.EVENT_SELECTED:
                            //PLAY_SOUND(GAME_SOUND_BUTTON);
                            onNode.setVisible(true);
                            offNode.setVisible(false);
                            this._currentTabKey = curCheckbox.getTag();

                            for (var index = container.getChildren().length - 1; index >= 0; index--) {
                                var checkbox = container.getChildren()[index];
                                if (!checkbox || checkbox === curCheckbox) {
                                    continue;
                                }

                                var touch;
                                checkbox.setSelected(true);
                                checkbox.onTouchEnded(touch, null);
                            }
                            if (this.onTabSelectedCallback !== null) {
                                this.onTabSelectedCallback(this._currentTabKey);
                            }
                            break;

                        case ccui.CheckBox.EVENT_UNSELECTED:
                            //PLAY_SOUND(GAME_SOUND_BUTTON);
                            if (this._currentTabKey !== curCheckbox.getTag()) {
                                onNode.setVisible(false);
                                offNode.setVisible(true);
                            } else {
                                curCheckbox.setSelected(true);
                            }
                            break;
                    }
                });

                if (curCheckbox.isSelected()) {
                    this._currentTabKey = curCheckbox.getTag();
                    onNode.setVisible(true);
                    offNode.setVisible(false);
                } else {
                    onNode.setVisible(false);
                    offNode.setVisible(true);
                }
            }
            return true;
        }
        return false;
    },
    // chưa test
    initTabButtons2: function (lstTabs, onNodeName = "altextOn", offNodeName = "textOff") {
        this._currentTabKey = 0;
        var strOn = onNodeName;
        var strOff = offNodeName;
        for (var i = 0; i < lstTabs.length; i++) {
            var curCheckbox = lstTabs[i];
            if (!curCheckbox) {
                return false;
            }

            var onNode = curCheckbox.getChildByName(onNodeName);
            if (!onNode) {
                return false;
            }

            var offNode = curCheckbox.getChildByName(offNodeName);
            if (!offNode) {
                return false;
            }
            this.mapTabs.setValue(curCheckbox.getTag(), curCheckbox);

            curCheckbox.addEventListener(/*[this, strOn, strOff]*/(checkBox, type) => {
                if (checkBox === null) return;
                var _onNode = checkBox.getChildByName(strOn);
                var _offNode = checkBox.getChildByName(strOff);
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED: {
                        //PLAY_SOUND(GAME_SOUND_BUTTON);
                        _onNode.setVisible(true);
                        _offNode.setVisible(false);
                        if (this.mapTabs.getValue(this._currentTabKey) !== null) {
                            this.mapTabs[this._currentTabKey].setSelected(false);
                            {
                                var onNodeOff = this.mapTabs.getValue(this._currentTabKey).getChildByName(strOn);
                                var offNodeOff = this.mapTabs.getValue(this._currentTabKey).getChildByName(strOff);
                                onNodeOff.setVisible(false);
                                offNodeOff.setVisible(true);
                            }
                        }
                        var nKey = checkBox.getTag();
                        this._currentTabKey = nKey;

                        if (this.onTabSelectedCallback !== null) {
                            this.onTabSelectedCallback(this._currentTabKey);
                        }
                        break;
                    }
                    case ccui.CheckBox.EVENT_UNSELECTED: {
                        //PLAY_SOUND(GAME_SOUND_BUTTON);
                        if (this._currentTabKey !== checkBox.getTag()) {
                            _onNode.setVisible(false);
                            _offNode.setVisible(true);
                        } else {
                            checkBox.setSelected(true);
                        }
                        break;
                    }
                }
            });

            if (curCheckbox.isSelected()) {
                var _nKey = curCheckbox.getTag();
                this._currentTabKey = _nKey;
                onNode.setVisible(true);
                offNode.setVisible(false);
            } else {
                onNode.setVisible(false);
                offNode.setVisible(true);
            }
        }
        return true;
    },
    onBackKey: function () {
        this.closeWithEffect();
    },
    getActivePopup: function () {
        if (this.listPopups !== null || this.listPopups.length <= 0) {
            return null;
        }
        return this.listPopups[this.listPopups.length - 1];
    },
    closeAllPopup: function () {
        if (this.listPopups == null) return;
        var k = 0;
        while (!this.listPopups.empty()) {
            if (this.listPopups[0] !== null)
                this.listPopups[0].close();
            k++;
            if (k > 5) {
                return;
            }
        }
    },
    setBackground: function (isTouchClose = true, hasTransparent = false) {
        if (this.getChildByName("bg") === null) {
            var overlay = ccui.Layout.create();
            overlay.setPosition(cc.p(0, 0));
            overlay.setContentSize(cc.winSize);
            overlay.setAnchorPoint(cc.p(0, 0));
            if (!hasTransparent) {
                overlay.setBackGroundColor(cc.color(0, 0, 0));
                overlay.setBackGroundColorOpacity(150);
                overlay.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            }
            overlay.setTouchEnabled(true);
            if (isTouchClose) {
                overlay.addClickEventListener(this.close.bind(this));
            }
            overlay.setName("bg");
            this.addChild(overlay, -1);
        }
    },
    sendUpdateXu: function () {
    },
    effectShow: function (mainNode) {
        this.showWithEffect(TypePopupEffectAction.Pulse);
    },
    removeBgTouch: function () {
        var item = cc.MenuItemSprite.create(cc.LayerColor.create(cc.color(0, 0, 0, 0)), cc.LayerColor.create());

        var _size = cc.winSize;
        _size.width = _size.width * 1.5; //2*AppUtil.widthStandardResource/AppUtil.scaleMax;
        _size.height = _size.height * 1.5; // 2*AppUtil.heightStandardResource/AppUtil.scaleMax;
        item.setContentSize(_size);
        item.setPosition(cc.p(_size.width / 2, _size.height / 2));
        var menu = cc.Menu.create(item, null);
        menu.ignoreAnchorPointForPosition(false);
        menu.setAnchorPoint(cc.p(0.5, 0.5));
        menu.setPosition(cc.p(this.getContentSize().width / 2, this.getContentSize().height / 2));
        menu.setContentSize(_size);
        this.addChild(menu, -1);
    },
    removeTouch: function () {
        var item = cc.MenuItemSprite.create(cc.LayerColor.create(cc.color(0, 0, 0, 200)), cc.LayerColor.create());
        item.setContentSize(this.getContentSize());
        item.setPosition(cc.p(this.getContentSize().width / 2, this.getContentSize().height / 2));
        var menuTouch = cc.Menu.create(item, null);
        menuTouch.ignoreAnchorPointForPosition(false);
        menuTouch.setAnchorPoint(cc.p(0.5, 0.5));
        menuTouch.setPosition(cc.p(this.getContentSize().width / 2, this.getContentSize().height / 2));
        menuTouch.setContentSize(this.getContentSize());
        this.addChild(menuTouch, -1);
    },
    onTouchClose: function (selectedBtn, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                selectedBtn.setColor(cc.color(170, 170, 170));
                break;
            case ccui.Widget.TOUCH_ENDED:
                //PLAY_SOUND(GAME_SOUND_BUTTON);
                selectedBtn.setColor(cc.color(255, 255, 255));
                close();
                break;
            case ccui.Widget.TOUCH_CANCELED:
                selectedBtn.setColor(cc.color(255, 255, 255));
                break;
            default:
                break;
        }
    },
    initWithColor: function (color) {

        var overlay = ccui.Layout.create();
        overlay.setPosition(cc.p(0,0));
        overlay.setContentSize(this.getContentSize());
        overlay.setAnchorPoint(cc.p(0,0));
        overlay.setBackGroundColor(cc.color(color.r, color.g, color.b));
        overlay.setBackGroundColorOpacity(color.a);
        overlay.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        overlay.setTouchEnabled(true);
        overlay.addClickEventListener(this.close);
        overlay.setName("bg");
        this.addChild(overlay, -1);

        //listPopups.pushBack(this);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.ignoreAnchorPointForPosition(false);

        return true;
    }
});