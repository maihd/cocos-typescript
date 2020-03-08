export function makeEffectButton(button: cc.Node, type: number, normalScale: number = 1.0, effectedScale: number = 0.8) {
    switch (type)
    {
        case ccui.Widget.TOUCH_BEGAN:
            button.setScale(normalScale);
            button.runAction(cc.scaleTo(0.1, normalScale * effectedScale, normalScale * effectedScale));
            return false;

        case ccui.Widget.TOUCH_CANCELED:
            button.setScale(normalScale * effectedScale);
            button.runAction(cc.scaleTo(0.3, normalScale).easing(cc.easeBackOut()));
            return false;

        case ccui.Widget.TOUCH_ENDED:
            button.setScale(normalScale * effectedScale);
            button.runAction(cc.scaleTo(0.3, normalScale).easing(cc.easeBackOut()));
            return true;

        default:
            return false;
    }
};