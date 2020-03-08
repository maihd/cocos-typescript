var GMMGameUtils = GMMGameUtils || {};
GMMGameUtils.makeEffectButton = function (button, type, scNor, scEff) {
    if (scEff === void 0) { scEff = 0.8; }
    if (button === null) {
        return false;
    }
    if (type === ccui.Widget.TOUCH_BEGAN) {
        button.setScale(scNor);
        button.runAction(cc.scaleTo(0.1, scNor * scEff, scNor * scEff));
        return false;
    }
    else if (type === ccui.Widget.TOUCH_MOVED) {
        return false;
    }
    else if (type === ccui.Widget.TOUCH_CANCELED) {
        button.setScale(scNor * scEff);
        button.runAction(cc.EaseBackOut.create(cc.scaleTo(0.3, scNor, scNor)));
        return false;
    }
    cc.log("effect " + scNor + "; Eff: " + scEff);
    button.setScale(scNor * scEff);
    button.runAction(cc.EaseBackOut.create(cc.scaleTo(0.3, scNor, scNor)));
    return true;
};
GMMGameUtils.makeEffectFadeButton = function (button, type, fadeNor, fadeEff) {
    if (fadeNor === void 0) { fadeNor = 255; }
    if (fadeEff === void 0) { fadeEff = 150; }
    if (button === null) {
        return false;
    }
    if (type === ccui.Widget.TOUCH_BEGAN) {
        button.setOpacity(fadeNor);
        button.runAction(cc.fadeTo(0.1, fadeEff));
        return false;
    }
    else if (type === ccui.Widget.TOUCH_MOVED) {
        return false;
    }
    else if (type === ccui.Widget.TOUCH_CANCELED) {
        button.setOpacity(fadeEff);
        button.runAction(cc.fadeTo(0.3, fadeNor));
        return false;
    }
    button.setOpacity(fadeEff);
    button.runAction((cc.fadeTo(0.3, fadeNor)));
    return true;
};
GMMGameUtils.getAnimateFrameSprite = function (_formatName, _animName, _min, _max, _delay, _loop) {
    var aniCache = cc.AnimationCache.getInstance();
    var animation = aniCache.getAnimation(_animName);
    if (!animation) {
        var spCache = cc.spriteFrameCache;
        animation = cc.Animation.create();
        animation.setDelayPerUnit(_delay);
        for (var i = _min; i <= _max; i++) {
            var strFile = StringUtils.formatString(_formatName, i);
            var frame = spCache.getSpriteFrame(strFile);
            if (frame) {
                animation.addSpriteFrame(frame);
            }
            else {
                break;
            }
        }
        aniCache.addAnimation(animation, _animName);
    }
    if (_loop <= 0) {
        var anime = new cc.RepeatForever(new cc.Animate(animation));
        return anime;
    }
    else {
        animation.setLoops(_loop);
        var anime = new cc.Animate(animation);
        return anime;
    }
};
GMMGameUtils.getAnimateByFiles = function (_formatName, _animName, _min, _max, _delay, _loop) {
    var aniCache = cc.AnimationCache.getInstance();
    var animation = aniCache.getAnimation(_animName);
    if (!animation) {
        animation = new cc.Animation();
        animation.setDelayPerUnit(_delay);
        for (var i = _min; i <= _max; i++) {
            var strFile = StringUtils.formatString(_formatName, i);
            animation.addSpriteFrameWithFile(strFile);
        }
        aniCache.addAnimation(animation, _animName);
    }
    if (_loop <= 0) {
        var anime = new cc.RepeatForever(new cc.Animate(animation));
        return anime;
    }
    else {
        animation.setLoops(_loop);
        var anime = new cc.Animate(animation);
        return anime;
    }
};
GMMGameUtils.scalePopupByDeviceResolution = function (node) {
    if (node) {
        node.setScale(GMMGameUtils.getPopupScaleByDeviceResolution());
    }
};
GMMGameUtils.getPopupScaleByDeviceResolution = function () {
    var size = cc.winSize;
    var aspect = size.width / size.height;
    var targetAspect = 1280.0 / 720.0;
    if (aspect >= targetAspect) {
        return targetAspect / aspect;
    }
    else {
        return 1.0;
    }
};
var Toast = (function () {
    'use strict';
    var Container = cc.LayerColor.extend({
        Node: cc.Sprite.extend({
            ctor: function (text, parent, defaults) {
                text = text || '';
                parent = parent || cc.director.getRunningScene();
                defaults = defaults || {};
                defaults.sprite = defaults.sprite || res_common.png_toast;
                defaults.fontName = defaults.fontName || res_common.font_toast.name;
                defaults.fontSize = defaults.fontSize || 38;
                this._super(defaults.sprite);
                parent.addChild(this);
                this.label = new cc.LabelTTF(text, defaults.fontName, defaults.fontSize);
                this.label.x = this.getContentSize().width * 0.5;
                this.label.y = this.getContentSize().height * 0.5;
                this.addChild(this.label);
            }
        }),
        ctor: function (parent) {
            this._super(cc.color(0, 0, 0, 0));
            this.setName('TOAST_CONTAINER');
            parent = parent || cc.director.getRunningScene();
            parent.addChild(this, 999999);
            this.nodes = [];
            this.pushingNodes = [];
            this.disposingNodes = [];
            this.scheduleUpdate();
            this.x = 0;
            this.y = 0;
            this.anchorX = 0;
            this.anchorY = 0;
        },
        showMessage: function (text, options) {
            var node = new this.Node(text, this, options);
            node.visible = false;
            this.pushingNodes.push(node);
        },
        disposeTimer: 0.0,
        update: function (dt) {
            var _this = this;
            for (var i = 0, n = this.pushingNodes.length; i < n; i++) {
                var node = this.pushingNodes[i];
                node.visible = true;
                node.pushing = true;
                node.x = node.targetX = this.getContentSize().width * 0.5;
                if (node.intersect(this.nodes)) {
                    var lastNode = this.nodes[this.nodes.length - 1];
                    node.y = lastNode.y - lastNode.getContentSize().height;
                    node.targetY = lastNode.targetY - lastNode.getContentSize().height;
                }
                else {
                    node.y = 32 + node.getContentSize().height * 0.5;
                    var lastNode = this.nodes[this.nodes.length - 1];
                    if (lastNode) {
                        node.targetY = lastNode.targetY - lastNode.getContentSize().height;
                    }
                    else {
                        node.targetY = 32 + node.getContentSize().height * 4.0;
                    }
                }
                this.nodes.push(node);
            }
            for (var i = 0, n = this.nodes.length; i < n; i++) {
                var node = this.nodes[i];
                if (node.pushing) {
                    node.y += 300 * dt;
                    if (node.y >= node.targetY) {
                        node.y = node.targetY;
                        node.pushing = false;
                    }
                }
            }
            this.pushingNodes = [];
            if (this.nodes.length > 0) {
                this.disposeTimer += dt;
                if (this.disposeTimer >= 1.0) {
                    this.disposeTimer -= 1.0;
                    var node_1 = this.nodes[0];
                    this.nodes.splice(0, 1);
                    var fadeTime = 0.3;
                    node_1.runAction(cc.sequence(cc.fadeOut(fadeTime), cc.callFunc(function () {
                        node_1.removeFromParent();
                        for (var i = 0, n = _this.nodes.length; i < n; i++) {
                            var node_2 = _this.nodes[i];
                            node_2.pushing = true;
                            node_2.targetY += node_2.getContentSize().height;
                        }
                    })));
                    node_1.label.runAction(cc.fadeOut(fadeTime));
                }
            }
            for (var i = this.disposingNodes.length - 1; i > -1; i--) {
                var node = this.disposingNodes[i];
                node.opacity -= 10;
                if (node.opacity <= 0) {
                    node.removeFromParent();
                    this.disposingNodes.splice(i, 1);
                }
            }
        }
    });
    return {
        show: function (text, parent) {
            parent = parent || cc.director.getRunningScene();
            var toastContainer = parent.getChildByName('TOAST_CONTAINER');
            if (!toastContainer) {
                toastContainer = new Container();
            }
            toastContainer.showMessage(text);
        }
    };
})();
var AnimateLabel = AnimateLabel || ccui.Layout.extend({
    ctor: function (node) {
        this._super();
        cc.assert(this != node, "Label must be difference from this");
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.size = node.getContentSize();
        this._label = node;
        if (node.isShadowEnabled()) {
            this._label.enableShadow(node.getShadowColor(), node.getShadowOffset(), node.getShadowBlurRadius());
        }
        this._label.setPosition(0, 0);
        this._label.setAnchorPoint(cc.p(0, 0));
        this.addChild(this._label);
        NodeUtils.fixTextLayout(this._label);
        this._lastStopTime = 0.4;
        this._lastMoveSpeed = 30.0;
        var size = this._label.getContentSize() || cc.size(0, 0);
        this.setContentSize(size);
        return true;
    },
    setContentSize: function (size) {
        this._super(size);
        this.clippingEnabled = true;
        this.clippingType = ccui.Layout.CLIPPING_SCISSOR;
    },
    update: function (dt) {
        if (this._waitingTime >= 0) {
            this._waitingTime -= dt;
        }
        else {
            var pos = this._label.getPosition();
            var size = this._label.getContentSize();
            var region = this.getPosition();
            pos.x += this._moveSpeed * dt;
            if ((this._moveSpeed > 0 && pos.x > 0) ||
                (this._moveSpeed < 0 && pos.x + size.width < this.getContentSize().width)) {
                this._moveSpeed = -this._moveSpeed;
                this._waitingTime = this._stopTime;
            }
            this._label.setPosition(pos);
        }
    },
    setString: function (value) {
        if (this._label && this._label.setString) {
            this._label.setString(value);
            this.turnOnTextAnimate(this._lastMoveSpeed, this._lastStopTime);
        }
    },
    getString: function () {
        if (this._label && this._label.getString) {
            return this._label.getString();
        }
        else {
            return "";
        }
    },
    turnOffTextAnimate: function () {
        this.unscheduleUpdate();
        this._moveSpeed = 0.0;
        this._textAnimating = false;
        this._stopTime = 0.0;
        this._waitingTime = 0.0;
    },
    align: function (alignment) {
        switch (alignment) {
            case cc.TEXT_ALIGNMENT_LEFT: {
                this._label.setPositionX(0);
                break;
            }
            case cc.TEXT_ALIGNMENT_RIGHT: {
                this._label.setPositionX(this.size.width - this._label.getContentSize().width);
                break;
            }
            default: {
                this._label.setPositionX((this.size.width - this._label.getContentSize().width) / 2);
            }
        }
    },
    turnOnTextAnimate: function (size, moveSpeed, stopTime) {
        if (typeof size === 'number') {
            moveSpeed = size;
        }
        else {
            this.setContentSize(size);
        }
        moveSpeed = moveSpeed || 30.0;
        stopTime = stopTime || 0.3;
        var region = this.getContentSize();
        if (region.width - this._label.getContentSize().width >= 0) {
            this.turnOffTextAnimate();
            this._label.setPositionX((region.width - this._label.getContentSize().width) / 2);
        }
        else {
            this.scheduleUpdate();
            this._textAnimating = true;
            this._moveSpeed = moveSpeed;
            this._stopTime = stopTime;
            this._lastMoveSpeed = moveSpeed;
            this._lastStopTime = stopTime;
            this._waitingTime = 0.0;
        }
        return this._textAnimating;
    }
});
GMMGameUtils.setTextForNode = function (node, value) {
    if (node && node.setString) {
        node.setString(value);
    }
};
GMMGameUtils.setTextAnimateOff = function (node) {
    if (node) {
        var animateLabel = node;
        if (!(animateLabel instanceof AnimateLabel)) {
            animateLabel = node.getParent();
        }
        if (animateLabel instanceof AnimateLabel) {
            animateLabel.turnOffTextAnimate();
        }
    }
};
GMMGameUtils.setTextAnimateOn = function (node, size, moveSpeed, stopTime) {
    if (node) {
        var animateLabel = node;
        if (!(animateLabel instanceof AnimateLabel)) {
            animateLabel = node.getParent();
        }
        if (!(animateLabel instanceof AnimateLabel)) {
            var nodeParent = node.getParent();
            node.retain();
            node.removeFromParent(false);
            node.setParent(null);
            var nodePos = node.getPosition();
            var nodeAnc = node.getAnchorPoint();
            var nodeZOrder = node.getLocalZOrder();
            animateLabel = new AnimateLabel(node);
            animateLabel.setPosition(nodePos);
            animateLabel.setAnchorPoint(nodeAnc);
            animateLabel.setName(node.getName());
            nodeParent.addChild(animateLabel, nodeZOrder);
            node.release();
        }
        animateLabel.turnOnTextAnimate(size, moveSpeed, stopTime);
    }
};
GMMGameUtils.setRichTextInside = function (node, strXML) {
    var richText = node.getChildByName("rich_content");
    if (!richText) {
        richText = new ccui.RichText();
        richText.setName("rich_content");
        node.addChild(richText);
    }
    richText.initWithXML(strXML, {});
    richText.formatText();
    richText.setAnchorPoint(cc.p(0.0, 0.5));
    richText.setNormalizedPosition(cc.p(0.015, 0.5));
};
