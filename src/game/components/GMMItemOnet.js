var GMMItemOnet = cc.Node.extend({
    id: -1,
    ctor: function (theme, _id, x, y, _size) {
        this._super();
        this.id = _id;
        this.setCascadeOpacityEnabled(true);
        var item = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("theme" + theme + ".png"));
        item.setScale(_size / item.getContentSize().width);
        var sp = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("h" + this.id + ".png"));
        sp.setScale((_size - (_size / item.getContentSize().width)) / sp.getContentSize().width);
        sp.setName("ITEM");
        this.addChild(item);
        this.addChild(sp);
        this.setPosition(x, y);
    },
    changeId: function (_id) {
        this.id = _id;
        var sp = this.getChildByName("ITEM");
        sp.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("h" + this.id + ".png"));
    }
});
