
var _instance;
let NUMBER_PADDING_LINE = 8;
let NUMBER_DELAY_ANIM_EX = 0.4;
let COLOR_DRAW_LINE = cc.color(255, 255, 255);
var GMMMatrixOnet = cc.Node.extend({
    matrix: null,
    sizeItem: 0,
    isPressed: false,
    currIndexFirst: 0,
    _listener: null,
    nCol: 0,
    nRow: 0,
    nodeDraw: null,
    xStart: 0,
    yStart: 0,
    currEat: 0,
    gamePlay: null,
    iHints: [],
    iCircleOnet: null,
    spHints: [],
    typeChangeMatrix: 0,
    isChanging: false,

    mainSize: null,

    onCompletedCallback: null,
    ctor: function (_gamePlay, size) {
        this._super();
        _instance = this;
        this.mainSize = size;
        this.gamePlay = _gamePlay;
        this.setPosition(cc.p(0, 0));
        this.matrix = new Array();

        if ('touches' in cc.sys.capabilities) {
            cc.log("set touch on Mobile 3333");
            this._listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan: _instance.onTouchesBegan,
            });
            cc.eventManager.addListener(this._listener, this);
        } else {
            cc.log("set Mouse on Desktop");
            this._listener = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                onMouseDown: this.onMouseDown,
            });
            cc.eventManager.addListener(this._listener, this);
        }
    },
    reload: function (obj) {
        this.removeAllChildren();
        this.nodeDraw = new cc.DrawNode();
        this.nodeDraw.setCascadeOpacityEnabled(true);
        this.spHints[0] = new cc.Sprite();
        this.spHints[0].setVisible(false);
        this.spHints[0].runAction(cc.RepeatForever.create(cc.Animate.create(cc.AnimationCache.getInstance().getAnimation(ANIM_HINT))));
        this.spHints[1] = new cc.Sprite();
        this.spHints[1].setVisible(false);
        this.spHints[1].runAction(cc.RepeatForever.create(cc.Animate.create(cc.AnimationCache.getInstance().getAnimation(ANIM_HINT))));
        this.spHints[0].setScale(0.5);
        this.spHints[1].setScale(0.5);

        this.addChild(this.spHints[0], 5);
        this.addChild(this.spHints[1], 5);

        //// add circle when you choose onet item
        this.iCircleOnet = new cc.Sprite();
        this.iCircleOnet.setVisible(false);
        this.iCircleOnet.runAction(cc.RepeatForever.create(cc.Animate.create(cc.AnimationCache.getInstance().getAnimation(ANIM_SHIELD))));
        //// 
        this.addChild(this.iCircleOnet, 50);


        this.addChild(this.nodeDraw, 10);
        this.matrix.splice(0, this.matrix.length);
        
        // size item: 45
        this.sizeItem = obj.size;
        this.nCol = obj.nCol;
        this.nRow = obj.nRow;
        var size = this.mainSize;
        cc.log("MainSize: " + size.width + "|" + size.height);
        this.isChanging = false;
        //this.xStart = this.sizeItem / 2 + this.sizeItem / 2 + 10;
        this.xStart = size.width / 2 - this.sizeItem * this.nCol / 2 + this.sizeItem / 2;
        //this.yStart = size.height - this.sizeItem / 2 - 10;
        this.yStart = size.height / 2 + this.sizeItem * this.nRow / 2 - this.sizeItem / 2;
        var xItem;
        var yItem = this.yStart;
        //cc.log("Col: " + this.nCol + " Row: " + this.nRow);
        this.iHints[0] = -1;
        this.iHints[1] = -1;
        /// get theme
        var theme = this.gamePlay.currLevel % 10;
        this.typeChangeMatrix = this.gamePlay.currLevel % type_change.length;   /// change type matrix
        var index = 0;
        this.currEat = 0;
        this.currIndexFirst = -1;
        // make random
        var maxIds = this.nRow * this.nCol + 1;
        var arrId = [maxIds];
        for (let i = 1 ; i < maxIds; i++) {
            if (arrId[i] == null) {
                arrId[i] = util.getRandomInt(0, MAX_INDEX_ITEM_ONET);
                var nextIndex = i;
                var timCou = 0;
                while (arrId[nextIndex] != null && timCou < maxIds) {
                    nextIndex = util.getRandomInt(i + 1, maxIds - 1);
                    timCou++;
                }
                arrId[nextIndex] = arrId[i];
            }
        }
        cc.log("done");
        for (let i = 0; i < this.nRow; i++) {
            xItem = this.xStart;
            for (var j = 0; j < this.nCol; j++) {
                var item = new GMMItemOnet(theme, arrId[index + 1], xItem, yItem, this.sizeItem);
                item.setName("ITEM" + index);
                this.addChild(item);
                this.matrix.push(arrId[index + 1]);
                xItem += this.sizeItem;
                index++;
            }
            yItem -= this.sizeItem;
        }

        /// check here
        this.resetRandomeOnet();
    },
    changeMatrix: function (i1, j1, i2, j2) {
        switch (this.typeChangeMatrix) {
            case type_change.Normal:
                this.defaultNormal(i1, j1, i2, j2);
                break;
            case type_change.Move_to_Left:
                this.moveLeft(i1, j1, i2, j2);
                break;
            case type_change.Move_to_Right:
                this.moveRight(i1, j1, i2, j2);
                break;
            case type_change.Move_to_Bot:
                this.moveBot(i1, j1, i2, j2);
                break;
            case type_change.Move_to_Top:
                this.moveTop(i1, j1, i2, j2);
                break;
            case type_change.Move_ZIG_ZAG_VER:  // chieu doc
                this.moveZigZagVer(i1, j1, i2, j2);
                break;
            case type_change.Move_ZIG_ZAG_HOL:  // chieu ngang
                this.moveZigZagHol(i1, j1, i2, j2);
                break;
            default:
                this.defaultNormal(i1, j1, i2, j2);
        }
    },
    defaultNormal: function (i1, j1, i2, j2) {
        iA = i1 * this.nCol + j1;
        iB = i2 * this.nCol + j2;
        this.matrix[iA] = -1;
        this.matrix[iB] = -1;
        //cc.log("set -1: " + iA + " | " + iB);
    },
    moveLeft: function (i1, j1, i2, j2) {
        var iA, iB;
        var i = 0;
        var inRow = 0;
        if (i1 == i2) {
            if (j1 < j2) {
                var temp = j1;
                j1 = j2;
                j2 = temp;
            }
            inRow = 1;
        }
        for (i = j1; i < this.nCol - 1; i++) {
            
            iA = i1 * this.nCol + i;
            iB = i1 * this.nCol + i + 1;
            if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                break;
            }
            
            this.matrix[iA] = this.matrix[iB];
            let itemB = this.getChildOnet(iB);
            if (inRow == 0) {
                this.actionMoveTo(itemB, cc.p(this.xStart + i * this.sizeItem, this.yStart - i1 * this.sizeItem));
            }
            itemB.setName("ITEM" + iA);
            //cc.log("Move from " + iB + " to " + iA + " index: " + iA + " = " + this.matrix[iB]);
        }
        iA = i1 * this.nCol + i;
        cc.log("Set col -1: " + iA);
        this.matrix[iA] = -1;
        for (i = j2; i < this.nCol - 1; i++) {
            iA = i2 * this.nCol + i;
            iB = i2 * this.nCol + i + 1;
            if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                break;
            }
            this.matrix[iA] = this.matrix[iB];
            let itemB = this.getChildOnet(iB);
            itemB.stopAllActions();
            this.actionMoveTo(itemB, cc.p(this.xStart + i * this.sizeItem, this.yStart - i2 * this.sizeItem));
            itemB.setName("ITEM" + iA);
            //cc.log("Move from " + iB + " to " + iA + " index: " + iA + " = " + this.matrix[iB]);
        }
        iA = i2 * this.nCol + i;
        //if (inRow)
        //    iA -= 1;
        this.matrix[iA] = -1;
        cc.log("Set col -1: " + iA);
        cc.log("done move Left");
    },
    moveRight: function (i1, j1, i2, j2) {
        var iA, iB;
        var i = 0;
        var inRow = 0;
        if (i1 == i2) {
            if (j1 > j2) {
                var temp = j1;
                j1 = j2;
                j2 = temp;
            }
            inRow = 1;
        }
        for (i = j1; i > 0; i--) {

            iA = i1 * this.nCol + i;
            iB = i1 * this.nCol + i - 1;
            if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                break;
            }

            this.matrix[iA] = this.matrix[iB];
            let itemB = this.getChildOnet(iB);
            if (inRow == 0) {
                this.actionMoveTo(itemB, cc.p(this.xStart + i * this.sizeItem, this.yStart - i1 * this.sizeItem));
            }
            itemB.setName("ITEM" + iA);
            //cc.log("Move from " + iB + " to " + iA + " index: " + iA + " = " + this.matrix[iB]);
        }
        iA = i1 * this.nCol + i;
        cc.log("Set col -1: " + iA);
        this.matrix[iA] = -1;
        for (i = j2; i > 0; i--) {
            iA = i2 * this.nCol + i;
            iB = i2 * this.nCol + i - 1;
            if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                break;
            }
            this.matrix[iA] = this.matrix[iB];
            let itemB = this.getChildOnet(iB);
            itemB.stopAllActions();
            this.actionMoveTo(itemB, cc.p(this.xStart + i * this.sizeItem, this.yStart - i2 * this.sizeItem));
            itemB.setName("ITEM" + iA);
            //cc.log("Move from " + iB + " to " + iA + " index: " + iA + " = " + this.matrix[iB]);
        }
        iA = i2 * this.nCol + i;
        //if (inRow)
        //    iA -= 1;
        this.matrix[iA] = -1;
    },
    moveTop: function (i1, j1, i2, j2) {
        var iA, iB;
        var i = 0;
        var inCol = 0;
        if (j1 == j2) {
            if (i1 < i2) {
                var temp = i1;
                i1 = i2;
                i2 = temp;
            }
            inCol = 1;
        }
        for (i = i1; i < this.nRow - 1; i++) {

            iA = i * this.nCol + j1;
            iB = (i + 1) * this.nCol + j1;
            if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                break;
            }

            this.matrix[iA] = this.matrix[iB];
            let itemB = this.getChildOnet(iB);
            if (inCol == 0) {
                this.actionMoveTo(itemB, cc.p(this.xStart + j1 * this.sizeItem, this.yStart - i * this.sizeItem));
            }
            itemB.setName("ITEM" + iA);
            //cc.log("Move from " + "[" + i + "," + j1 + "]" + " to " + "[" + (i + 1) + "," + j1 + "]" + " index: " + iA + " = " + this.matrix[iB]);
        }
        iA = i * this.nCol + j1;
        cc.log("Set col -1: " + iA);
        this.matrix[iA] = -1;
        for (i = i2; i < this.nRow - 1; i++) {
            iA = i * this.nCol + j2;
            iB = (i + 1) * this.nCol + j2;
            if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                break;
            }
            this.matrix[iA] = this.matrix[iB];
            let itemB = this.getChildOnet(iB);
            itemB.stopAllActions();
            this.actionMoveTo(itemB, cc.p(this.xStart + j2 * this.sizeItem, this.yStart - i * this.sizeItem));
            itemB.setName("ITEM" + iA);
            //cc.log("Move from " + "[" + i + "," + j2 + "]" + " to " + "[" + (i + 1) + "," + j2 + "]" + " index: " + iA + " = " + this.matrix[iB]);
        }
        iA = i * this.nCol + j2;
        //if (inRow)
        //    iA -= 1;
        this.matrix[iA] = -1;
    },
    moveBot: function (i1, j1, i2, j2) {
        var iA, iB;
        var i = 0;
        var inCol = 0;
        if (j1 == j2) {
            if (i1 > i2) {
                var temp = i1;
                i1 = i2;
                i2 = temp;
            }
            inCol = 1;
        }
        for (i = i1; i > 0; i--) {

            iA = i * this.nCol + j1;
            iB = (i - 1) * this.nCol + j1;
            if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                break;
            }

            this.matrix[iA] = this.matrix[iB];
            var itemB = this.getChildOnet(iB);
            if (inCol == 0) {
                this.actionMoveTo(itemB, cc.p(this.xStart + j1 * this.sizeItem, this.yStart - i * this.sizeItem));
            }
            itemB.setName("ITEM" + iA);
            //cc.log("Move from " + "[" + i + "," + j1 + "]" + " to " + "[" + (i - 1) + "," + j1 + "]" + " index: " + iA + " = " + this.matrix[iB]);
        }
        iA = i * this.nCol + j1;
        cc.log("Set col -1: " + iA);
        this.matrix[iA] = -1;
        for (i = i2; i > 0; i--) {
            iA = i * this.nCol + j2;
            iB = (i - 1) * this.nCol + j2;
            if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                break;
            }
            this.matrix[iA] = this.matrix[iB];
            let itemB = this.getChildOnet(iB);
            itemB.stopAllActions();
            this.actionMoveTo(itemB, cc.p(this.xStart + j2 * this.sizeItem, this.yStart - i * this.sizeItem));
            itemB.setName("ITEM" + iA);
            //cc.log("Move from " + "[" + i + "," + j2 + "]" + " to " + "[" + (i - 1) + "," + j2 + "]" + " index: " + iA + " = " + this.matrix[iB]);
        }
        iA = i * this.nCol + j2;
        //if (inRow)
        //    iA -= 1;
        this.matrix[iA] = -1;
    },
    /// theo chieu doc
    moveZigZagVer: function (i1, j1, i2, j2) {
        var iA, iB;
        var i = 0;
        var inRow = 0;
        if (i1 == i2) {
            if (j1 > j2) {
                var temp = j1;
                j1 = j2;
                j2 = temp;
            }
            inRow = 1;
        }
        for (i = j1; i > 0; i--) {  // move to right

            iA = i1 * this.nCol + i;
            iB = i1 * this.nCol + i - 1;
            if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                break;
            }

            this.matrix[iA] = this.matrix[iB];
            var itemB = this.getChildOnet(iB);
            if (inRow == 0) {
                this.actionMoveTo(itemB, cc.p(this.xStart + i * this.sizeItem, this.yStart - i1 * this.sizeItem));
            }
            itemB.setName("ITEM" + iA);
            //cc.log("Move from " + iB + " to " + iA + " index: " + iA + " = " + this.matrix[iB]);
        }
        iA = i1 * this.nCol + i;
        cc.log("Set col -1: " + iA);
        this.matrix[iA] = -1;
        if (inRow) {
            for (i = j2; i > 0; i--) {  // move to left
                iA = i2 * this.nCol + i;
                iB = i2 * this.nCol + i - 1;
                if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                    break;
                }
                this.matrix[iA] = this.matrix[iB];
                let itemB = this.getChildOnet(iB);
                itemB.stopAllActions();
                this.actionMoveTo(itemB, cc.p(this.xStart + i * this.sizeItem, this.yStart - i2 * this.sizeItem));
                itemB.setName("ITEM" + iA);
                //cc.log("Move from " + iB + " to " + iA + " index: " + iA + " = " + this.matrix[iB]);
            }
        } else {
            for (i = j2; i < this.nCol - 1; i++) {  // move to left
                iA = i2 * this.nCol + i;
                iB = i2 * this.nCol + i + 1;
                if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                    break;
                }
                this.matrix[iA] = this.matrix[iB];
                let itemB = this.getChildOnet(iB);
                itemB.stopAllActions();
                this.actionMoveTo(itemB, cc.p(this.xStart + i * this.sizeItem, this.yStart - i2 * this.sizeItem));
                itemB.setName("ITEM" + iA);
                //cc.log("Move from " + iB + " to " + iA + " index: " + iA + " = " + this.matrix[iB]);
            }
        }
        iA = i2 * this.nCol + i;
        //if (inRow)
        //    iA -= 1;
        this.matrix[iA] = -1;
    },
    /// theo chieu ngang
    moveZigZagHol: function (i1, j1, i2, j2) {
        var iA, iB;
        var i = 0;
        var inCol = 0;
        if (j1 == j2) {
            if (i1 < i2) {
                var temp = i1;
                i1 = i2;
                i2 = temp;
            }
            inCol = 1;
        }
        for (i = i1; i < this.nRow - 1; i++) {

            iA = i * this.nCol + j1;
            iB = (i + 1) * this.nCol + j1;
            if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                break;
            }

            this.matrix[iA] = this.matrix[iB];
            let itemB = this.getChildOnet(iB);
            if (inCol == 0) {
                this.actionMoveTo(itemB, cc.p(this.xStart + j1 * this.sizeItem, this.yStart - i * this.sizeItem));
            }
            itemB.setName("ITEM" + iA);
            //cc.log("Move from " + "[" + i + "," + j1 + "]" + " to " + "[" + (i + 1) + "," + j1 + "]" + " index: " + iA + " = " + this.matrix[iB]);
        }
        iA = i * this.nCol + j1;
        cc.log("Set col -1: " + iA);
        this.matrix[iA] = -1;
        if (inCol) {
            for (i = i2; i < this.nRow - 1; i++) {
                iA = i * this.nCol + j2;
                iB = (i + 1) * this.nCol + j2;
                if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                    break;
                }
                this.matrix[iA] = this.matrix[iB];
                let itemB = this.getChildOnet(iB);
                itemB.stopAllActions();
                this.actionMoveTo(itemB, cc.p(this.xStart + j2 * this.sizeItem, this.yStart - i * this.sizeItem));
                itemB.setName("ITEM" + iA);
                cc.log("Move from " + "[" + i + "," + j2 + "]" + " to " + "[" + (i + 1) + "," + j2 + "]" + " index: " + iA + " = " + this.matrix[iB]);
            }
        } else {
            for (i = i2; i > 0; i--) {
                iA = i * this.nCol + j2;
                iB = (i - 1) * this.nCol + j2;
                if (this.matrix[iB] == -1 || this.matrix[iA] == -1) {
                    break;
                }
                this.matrix[iA] = this.matrix[iB];
                let itemB = this.getChildOnet(iB);
                itemB.stopAllActions();
                this.actionMoveTo(itemB, cc.p(this.xStart + j2 * this.sizeItem, this.yStart - i * this.sizeItem));
                itemB.setName("ITEM" + iA);
                cc.log("Move from " + "[" + i + "," + j2 + "]" + " to " + "[" + (i - 1) + "," + j2 + "]" + " index: " + iA + " = " + this.matrix[iB]);
            }
        }
        iA = i * this.nCol + j2;
        //if (inRow)
        //    iA -= 1;
        this.matrix[iA] = -1;
    },
    actionMoveTo: function(node, pos) {
        let move = cc.EaseBackOut.create(cc.moveTo(NUMBER_DELAY_ANIM_EX * 2, pos));
        node.runAction(move);
    },
    swapOnet: function (i, j) {

        //cc.log("changeItem 22: " + "[" + (Math.round(i / this.nCol - 0.5)) + "," + (i % this.nCol) + "]" + " with " + "[" + (Math.round(j / this.nCol - 0.5)) + "," + (j % this.nCol) + "]");

        var itemA = this.getChildOnet(i);
        var itemB = this.getChildOnet(j);

        var pos = itemA.getPosition();
        itemA.setPosition(itemB.getPosition());
        itemB.setPosition(pos);

        itemA.setName("ITEM" + j);
        itemB.setName("ITEM" + i);

        var temp = this.matrix[i];
        this.matrix[i] = this.matrix[j];
        this.matrix[j] = temp;

    },
    resetRandomeOnet: function () {
        this.isChanging = true;
        if (this.seachSameOnet()) {
            this.isChanging = false;
            return;
        }
        var arrTemp = [];
        var index = 0;
        for (var i = 0; i < this.matrix.length; i++) {
            if (this.matrix[i] != -1) {
                arrTemp[index] = i;
                index++;
            }
        }
        cc.log("start change, max item: " + arrTemp.length);
        if (arrTemp.length < 2) {
            this.isChanging = false;
            return;
        }
        sound.playRandom();
        while (!this.seachSameOnet()) {
            // random 
            for (var i = 0; i < arrTemp.length; i++) { 
                var temp1 = arrTemp[util.getRandomInt(0, arrTemp.length - 1)];
                var temp2 = arrTemp[util.getRandomInt(0, arrTemp.length - 1)];
                if (temp1 != temp2) {
                    this.swapOnet(temp1, temp2);
                }
            }
        }
        this.isChanging = false;
    },
    getChildOnet: function (id) {
        return this.getChildByName("ITEM" + id);
    },
    onHint: function () {
        if (this.spHints[0].isVisible() == true) {
            return false;
        }
        var numHint = getPrefInteger(PREF_LOG_NUM_HINT);
        if (numHint > 0) {
            this.hintOnet();
            return true;
        } else {
            if (this.gamePlay.totalScore > SCORE_CUT) {
                this.hintOnet();
                this.gamePlay.addScore(-SCORE_CUT);
            } else {
                sound.playHintFailed();
                this.gamePlay.addMessage("Your score has not enough 5000");
            }
            return false;
        }
        return false;
    },
    hintOnet: function() {
        if (this.seachSameOnet()) {

            this.spHints[0].setPosition(this.getChildOnet(this.iHints[0]).getPosition());
            this.spHints[1].setPosition(this.getChildOnet(this.iHints[1]).getPosition());

            this.spHints[0].setVisible(true);
            this.spHints[1].setVisible(true);

            sound.playHintSuccess();
        }
    },
    seachSameOnet: function() {
        for (var i = 0; i < this.matrix.length; i++) {
            var T1 = this.matrix[i];
            if(T1 == -1)
                continue;
            for (var j = 0; j < this.matrix.length; j++) {
                if (T1 == this.matrix[j] && (i != j)) {
                    cc.log("FOR: " + i + " j:" + j);
                    var line_point = new Array();
                    if (this.checkCondition(Math.round(i / this.nCol - 0.5), i % this.nCol, Math.round(j / this.nCol - 0.5), j % this.nCol, line_point)) {
                        if (line_point.length < 5) {
                            this.iHints[0] = i;
                            this.iHints[1] = j;
                            return true;
                        }                           
                    }                       
                }                   
            }
        }
        return false;
    },
    checkCondition: function (i1, j1, i2, j2, line_point) {
        cc.log("Valu: " + i1 + "|" + j1 + " -- " + i2 + "|" + j2);

        var inA = i1 * this.nCol + j1;
        var inB = i2 * this.nCol + j2;

        cc.log("----------checkCondition: " + inA + " | " + inB);
   
        if(this.matrix[inA] != this.matrix[inB])
            return false;

        line_point.splice(0, line_point.length);
        var check = this.checkLine(i1, j1, i2, j2);
        if (check){
            this.addIJToListPoint(i1, j1, line_point);
            this.addIJToListPoint(i2, j2, line_point);
            cc.log("checkLine = true" + "  ||  size points: " + line_point.length);
            return true;
        }
 
        // Check L
        line_point.splice(0, line_point.length);
        if (this.checkL(i1, j1, i2, j2, line_point)) {
            cc.log("checkL = true");
            return true;
        }       
   
        // Check U
        line_point.splice(0, line_point.length);
        if (this.checkU(i1, j1, i2, j2, true, line_point)) {
            cc.log("checkU = true");
            return true;
        }
   
        //// Kiá»ƒm tra theo chá»¯ UL
        line_point.splice(0, line_point.length);
        if (this.checkUL(i1, j1, i2, j2, line_point)) {
            if(line_point.length < 5){
                cc.log("checkUL = true");
                return true;
            }
        }

        //// Kiá»ƒm tra theo chá»¯ Z
        line_point.splice(0, line_point.length);
        if (this.checkZ(i1, j1, i2, j2, line_point)) {
            cc.log("checkz = true");
            return true;
        } else cc.log("checkZ = false");
        return false;
    },
    checkLine: function(i1, j1, i2, j2) {
        if (i1 == i2) {
            var j_start = -1, j_end = -1;
            if (j1 < j2) {
                j_start = j1 + 1;
                j_end = j2;
            }
            if (j1 > j2) {
                j_start = j2 + 1;
                j_end = j1;
            }
            for (var j = j_start; j < j_end; j++) {         
                if (this.matrix[i1 * this.nCol + j] != -1)
                    return false;
            }
            return true;
        } else if (j1 == j2) {
            var i_start = -1, i_end = -1;
            if (i1 < i2) {
                i_start = i1 + 1;
                i_end = i2;
            }
            if (i1 > i2) {
                i_start = i2 + 1;
                i_end = i1;
            }
            for (var i = i_start; i < i_end; i++) {
                if (this.matrix[i * this.nCol + j1] != -1)
                    return false;
            }
            return true;
        }
        return false;
    },
    checkL: function (i1, j1, i2, j2, line_point) {
        var p1 = cc.p(0,0);
        var p2 = cc.p(0,0);
        // 4-----1
        // ---0---
        // 3-----2
   
        // GÃ³c 1
        if (i1 > i2 && j1 < j2) {
            p1.x = i2;
            p1.y = j1;       
            p2.x = i1;
            p2.y = j2;
        }
            // GÃ³c 2
        else if (i1 < i2 && j1 < j2) {
            p1.x = i1;
            p1.y = j2;       
            p2.x = i2;
            p2.y = j1;
        }
            // GÃ³c 3
        else if (i1 < i2 && j1 > j2) {
            p1.x = i2;
            p1.y = j1;       
            p2.x = i1;
            p2.y = j2;
        }
            // GÃ³c 4
        else if (i1 > i2 && j1 > j2) {
            p1.x = i2;
            p1.y = j1;       
            p2.x = i1;
            p2.y = j2;
        }

        var inA = p1.x * this.nCol + p1.y;
        var inB = p2.x * this.nCol + p2.y;

        if(this.matrix[inA] == -1){       
            if (this.checkLine(i1, j1, p1.x, p1.y) && this.checkLine(p1.x, p1.y, i2, j2)) {
                this.addIJToListPoint(i1,j1,line_point);
                this.addIJToListPoint(i2, j2, line_point);
                this.addIJToListPoint(p1.x, p1.y, line_point);
                return true;
            }
        }
        if (this.matrix[inB] == -1) {
            if (this.checkLine(i1, j1, p2.x, p2.y) && this.checkLine(p2.x, p2.y, i2, j2)) {
                this.addIJToListPoint(i1, j1, line_point);
                this.addIJToListPoint(i2, j2, line_point);
                this.addIJToListPoint(p2.x, p2.y, line_point);
                return true;
            }
        }
   
        return false;
    },
    checkU: function (i1, j1, i2, j2, _isCheckU, line_point) {
        if(_isCheckU){
            //Kiá»ƒm tra cÃ¡c trÆ°á»�ng há»£p Ä‘áº·c biáº¿t. CÃ¡c vá»‹ trÃ­ náº±m á»Ÿ biÃªn
            if (i1 == i2 && i1 == 0) {
                this.addIJToListPoint(i1, j1, line_point);
                this.addIJToListPoint(i2, j2, line_point);

                this.addIJToListPoint(i1 - 0.5, j1, line_point);
                this.addIJToListPoint(i2 - 0.5, j2, line_point);
                cc.log("THA1");
                return true;
            }
       
            if (i1 == i2 && i1 == this.nRow - 1) {
                this.addIJToListPoint(i1, j1, line_point);
                this.addIJToListPoint(i2, j2, line_point);

                this.addIJToListPoint(i1 + 0.5, j1, line_point);
                this.addIJToListPoint(i2 + 0.5, j2, line_point);
                cc.log("THA2");
                return true;
            }
       
            if (j1 == j2 && j1 == 0) {
                this.addIJToListPoint(i1, j1, line_point);
                this.addIJToListPoint(i2, j2, line_point);

                this.addIJToListPoint(i1, j1 - 0.5, line_point);
                this.addIJToListPoint(i2, j2 - 0.5, line_point);
                cc.log("THA3");
                return true;
            }
       
            if (j1 == j2 && j1 == this.nCol - 1) {
                this.addIJToListPoint(i1, j1, line_point);
                this.addIJToListPoint(i2, j2, line_point);

                this.addIJToListPoint(i1, j1 + 1, line_point);
                this.addIJToListPoint(i2, j2 + 1, line_point);
                cc.log("THA4");
                return true;
            }       
        } else{
            //Kiá»ƒm tra cÃ¡c trÆ°á»�ng há»£p Ä‘áº·c biáº¿t. CÃ¡c vá»‹ trÃ­ náº±m á»Ÿ biÃªn
            if (i1 == i2 && i1 == 0) {
                this.addIJToListPoint(i1 - 1, j1, line_point);
                this.addIJToListPoint(i2 - 1, j2, line_point);
                cc.log("THB1");
                return true;
            }
       
            if (i1 == i2 && i1 == this.nRow - 1) {
                this.addIJToListPoint(i1 + 1, j1, line_point);
                this.addIJToListPoint(i2 + 1, j2, line_point);
                cc.log("THB2");
                return true;
            }
       
            if (j1 == j2 && j1 == 0) {
                this.addIJToListPoint(i1, j1 - 1, line_point);
                this.addIJToListPoint(i2, j2 - 1, line_point);
                cc.log("THB3");
                return true;
            }
       
            if (j1 == j2 && j1 == this.nCol - 1) {
                this.addIJToListPoint(i1, j1 + 1, line_point);
                this.addIJToListPoint(i2, j2 + 1, line_point);
                cc.log("THB4");
                return true;
            }
        }
        //XÃ©t trÆ°á»�ng há»£p cÃ¹ng hÃ ng
        var inA = i1 * this.nCol + j1;
        var inB = i2 * this.nCol + j2;
        if(i1 == i2){
            cc.log("checkU i1 == i2");
            for(var i = i1 - 1; i > -1; i--){
                if(this.matrix[i * this.nCol + j1] == -1 && this.matrix[i * this.nCol + j2] == -1){
                    if(this.checkLine(i, j1, i, j2) || i == 0){
                        if (_isCheckU) {
                            this.addIJToListPoint(i1, j1, line_point);
                            this.addIJToListPoint(i2, j2, line_point);
                        }
                        if(i == 0)
                            i = i-1;
                        this.addIJToListPoint(i, j1, line_point);
                        this.addIJToListPoint(i, j2, line_point);
                        cc.log("THC1");
                        return true;
                    }
                }
                else break;
            }
            for(var i = i1 + 1; i < this.nRow; i++){
                cc.log("MT.mt[i][j1] = " + this.matrix[i * this.nCol + j1]);
                cc.log("MT.mt[i][j2] = " + this.matrix[i * this.nCol + j2]);
           
                if (this.matrix[i * this.nCol + j1] == -1 && this.matrix[i * this.nCol + j2] == -1) {
                    if(this.checkLine(i, j1, i, j2) || i == this.nRow - 1){
                        //MyLog.LogInfo("checkU B");
                        if(_isCheckU){
                            this.addIJToListPoint(i1, j1, line_point);
                            this.addIJToListPoint(i2, j2, line_point);
                        }
                        if(i == this.nRow - 1)
                            i = i+1;
                        this.addIJToListPoint(i, j1, line_point);
                        this.addIJToListPoint(i, j2, line_point);
                        cc.log("THC2");
                        return true;
                    }
                }
                else break;
            }
        }
            //XÃ©t trÆ°á»�ng há»£p cÃ¹ng cá»™t
        else if(j1 == j2){
            cc.log("checkU j1 == j2");
            for(var j = j1 - 1; j > -1; j--){
                if(this.matrix[i1 * this.nCol + j] == -1 && this.matrix[i2 *  this.nCol + j] == -1){
                    if(this.checkLine(i1, j, i2, j) || j == 0){
                        //MyLog.LogInfo("checkU C");
                        if(_isCheckU){
                            this.addIJToListPoint(i1, j1, line_point);
                            this.addIJToListPoint(i2, j2, line_point);
                        }
                        if(j == 0)
                            j = j-1;
                        this.addIJToListPoint(i1, j, line_point);
                        this.addIJToListPoint(i2, j, line_point);
                        return true;
                    }
                } else break;
            }
            for(var j = j1 + 1; j < this.nCol; j++) {
                if (this.matrix[i1 * this.nCol + j] == -1 && this.matrix[i2 * this.nCol + j] == -1) {
                    if(this.checkLine(i1, j, i2, j) || j == this.nCol - 1){
                        //MyLog.LogInfo("checkU D");
                        if (_isCheckU) {
                            this.addIJToListPoint(i1, j1, line_point);
                            this.addIJToListPoint(i2, j2, line_point);
                        }
                        if(j == this.nCol - 1)
                            j = j+1;
                        this.addIJToListPoint(i1, j, line_point);
                        this.addIJToListPoint(i2, j, line_point);
                        return true;
                    }
                } else break;
            }
        }
        return false;
    },
    checkUL: function (i1, j1, i2, j2, line_point) {
        var p1 = cc.p(0,0);
        var p2 = cc.p(0,0);
        // GÃ³c 1
        if (i1 > i2 && j1 < j2) {
            p1.x = i2;
            p1.y = j1;       
            p2.x = i1;
            p2.y = j2;
        }
            // GÃ³c 2
        else if (i1 < i2 && j1 < j2) {
            p1.x = i1;
            p1.y = j2;       
            p2.x = i2;
            p2.y = j1;
        }
            // GÃ³c 3
        else if (i1 < i2 && j1 > j2) {
            p1.x = i2;
            p1.y = j1;       
            p2.x = i1;
            p2.y = j2;
        }
            // GÃ³c 4
        else if (i1 > i2 && j1 > j2) {
            p1.x = i2;
            p1.y = j1;       
            p2.x = i1;
            p2.y = j2;
        }
   
        //check for p1
        var check = false;
        if (this.matrix[p1.x * this.nCol + p1.y] == -1) {
            line_point.splice(0, line_point.length);
            check = this.checkU(p1.x, p1.y, i2, j2, false, line_point);
            if(check){           
                check = this.checkLine(i1, j1, p1.x, p1.y);
                if(check){       
                    this.addIJToListPoint(i1, j1, line_point);
                    this.addIJToListPoint(i2, j2, line_point);
                    return true;
                }
            }   
            line_point.splice(0, line_point.length);
            check = this.checkU(p1.x, p1.y, i1, j1, false, line_point);
            if(check){
                check = this.checkLine(i2, j2, p1.x, p1.y);
                if(check){
                    this.addIJToListPoint(i1, j1, line_point);
                    this.addIJToListPoint(i2, j2, line_point);
                    return true;
                }
            }
        }
        //Kiá»ƒm tra p2
        if(this.matrix[p2.x * this.nCol + p2.y] == -1){
            line_point.splice(0, line_point.length);
            check = this.checkU(p2.x, p2.y, i2, j2, false, line_point);
            if(check){
                check = this.checkLine(i1, j1, p2.x, p2.y);
                if(check){
                    this.addIJToListPoint(i1, j1, line_point);
                    this.addIJToListPoint(i2, j2, line_point);
                    return true;
                }
            }
            line_point.splice(0, line_point.length);
            check = this.checkU(p2.x, p2.y, i1, j1, false, line_point);
            if(check){
                check = this.checkLine(i2, j2, p2.x, p2.y);
                if(check){
                    this.addIJToListPoint(i1, j1, line_point);
                    this.addIJToListPoint(i2, j2, line_point);
                    return true;
                }
            }
        }
        return false;
    },
    checkZ: function (i1, j1, i2, j2, line_point) {
        this.addIJToListPoint(i1, j1, line_point);
        this.addIJToListPoint(i2, j2, line_point);
        if(i1 < i2){
            //.LogInfo("Z ---- i1 < i2");
            var i = i1 + 1;
            while(i < i2){
                if(this.matrix[i * this.nCol + j1] == -1){
                    if(this.matrix[i * this.nCol + j2] == -1){
                        if(this.checkLine(i, j2, i2, j2) && this.checkLine(i, j2, i, j1)){
                            this.addIJToListPoint(i,j2,line_point);
                            this.addIJToListPoint(i, j1, line_point);
                            return true;
                        }
                    }
                }
                else break;
                i++;
            }
        }
   
        if(i1 > i2){
            var i = i2+1;
            while(i < i1){
                if(this.matrix[i * this.nCol + j2] == -1){
                    if(this.matrix[i * this.nCol + j1] == -1){
                        if(this.checkLine(i, j1, i1, j1) && this.checkLine(i, j2, i, j1)){
                            this.addIJToListPoint(i, j2, line_point);
                            this.addIJToListPoint(i, j1, line_point);
                            return true;
                        }
                    }
                }
                else break;
                i++;
            }
        }
   
        //XÃ©t theo cá»™t
        if(j1 < j2){
            var j = j1 + 1;
            while(j < j2){
                if(this.matrix[i1 * this.nCol + j] == -1){
                    if(this.matrix[i2 * this.nCol + j] == -1){
                        if(this.checkLine(i2, j, i2, j2) && this.checkLine(i1, j, i2, j)){
                            this.addIJToListPoint(i2, j, line_point);
                            this.addIJToListPoint(i1, j, line_point);
                            return true;
                        }
                    }
                }
                else break;
                j++;
            }
        }
        if(j1 > j2){
            var j = j2 + 1;
            while(j < j1){
                if(this.matrix[i2 * this.nCol + j] == -1){
                    if(this.matrix[i1 * this.nCol + j] == -1){
                        if(this.checkLine(i1, j, i1, j1) && this.checkLine(i1, j, i2, j)){
                            this.addIJToListPoint(i2, j, line_point);
                            this.addIJToListPoint(i1, j, line_point);
                            return true;
                        }
                    }
                }
                else break;
                j++;
            }
        }
        return false;
    },
    addIJToListPoint: function (i, j, point_lines) {
        var p = cc.p(i, j);
        for (var i = 0; i < point_lines.length; i++) {
            if (point_lines[i].x == p.x && point_lines[i].y == p.y) {
                return;
            }
        }
        // add p
        point_lines.push(p);
    },
    drawLines: function (x1, y1, x2, y2, line_point) {
        var p1 = this.getChildOnet(x1 * this.nCol + y1).getPosition();
        var p2 = this.getChildOnet(x2 * this.nCol + y2).getPosition();
        cc.log("Draw line: " + line_point.length);
        if (line_point.length == 2) {
            this.nodeDraw.drawSegment(p1, p2, 5, COLOR_DRAW_LINE);
        }
            // Chá»¯ L
        else if (line_point.length == 3) {
            var p_mid = cc.p();
            // TÃ¬m mid
            for (var i = 0; i < line_point.length; i++) {
                p_mid = line_point[i];
                if ((p_mid.x == x1 && p_mid.y == y1) || (p_mid.x == x2 && p_mid.y == y2))
                    continue;
                else
                    break;
            }
            p_mid = cc.p(this.xStart + p_mid.y * this.sizeItem, this.yStart - p_mid.x * this.sizeItem);
            cc.log("p1: " + p1.x + "|" + p1.y);
            cc.log("mid: " + p_mid.x + "|" + p_mid.y);
            cc.log("p2: " + p2.x + "|" + p2.y);
            this.nodeDraw.drawSegment(p1, p_mid, 5, COLOR_DRAW_LINE);
            this.nodeDraw.drawSegment(p_mid, p2, 5, COLOR_DRAW_LINE);
        }
            // Chá»¯ U-Z
        else if (line_point.length == 4) {
            var p_mid1 = null;
            var p_mid2 = null;
            // TÃ¬m mid
            for (var i = 0; i < line_point.length; i++) {
                var p_mid = line_point[i];
                if ((p_mid.x == x1 && p_mid.y == y1) || (p_mid.x == x2 && p_mid.y == y2))
                    continue;
                else{
                    if(p_mid1 == null && (p_mid.x == x1 || p_mid.y == y1))
                        p_mid1 = line_point[i];
                    else p_mid2 = line_point[i];
                }
            }

            cc.log("p1: " + x1 + "|" + y1);
            cc.log("mid1: " + p_mid1.x + "|" + p_mid1.y);
            cc.log("mid2: " + p_mid2.x + "|" + p_mid2.y);
            cc.log("p2: " + x2 + "|" + y2);

            p_mid1 = cc.p(this.xStart + p_mid1.y * this.sizeItem, this.yStart - p_mid1.x * this.sizeItem);
            p_mid2 = cc.p(this.xStart + p_mid2.y * this.sizeItem, this.yStart - p_mid2.x * this.sizeItem);

            let paddingX = 0;
            let paddingY = 0;
            if (p_mid1.x === p_mid2.x && p_mid1.x < this.mainSize.width / 2) {
                paddingX = NUMBER_PADDING_LINE;
                paddingY = 0;
            } else if (p_mid1.x === p_mid2.x && p_mid1.x > this.mainSize.width / 2) {
                paddingX = -NUMBER_PADDING_LINE;
                paddingY = 0;
            } else if (p_mid1.y === p_mid2.y && p_mid1.y < this.mainSize.height / 2) {
                paddingX = 0;
                paddingY = NUMBER_PADDING_LINE / 2;
            } else if (p_mid1.y === p_mid2.y && p_mid1.y > this.mainSize.height / 2) {
                paddingX = 0;
                paddingY = NUMBER_PADDING_LINE;
            }
            p_mid1.x += paddingX;
            p_mid1.y += paddingY;
            p_mid2.x += paddingX;
            p_mid2.y += paddingY;
         
            this.nodeDraw.drawSegment(p1, p_mid1, 5, COLOR_DRAW_LINE);
            this.nodeDraw.drawSegment(p_mid1, p_mid2, 5, COLOR_DRAW_LINE);
            this.nodeDraw.drawSegment(p_mid2, p2, 5, COLOR_DRAW_LINE);
        }
        let call = cc.CallFunc.create(() => {
            if (_instance.spHints[0].isVisible()) {
                _instance.spHints[0].setVisible(false);
                _instance.spHints[1].setVisible(false);
            }

            _instance.currEat += 2;
            _instance.gamePlay.addScore(SCORE_ADD);
            if (_instance.currEat === _instance.matrix.length) {
                cc.log("COMPLETED MISSION");
                if (this.onCompletedCallback) {
                    this.onCompletedCallback();
                }
            }
            _instance.nodeDraw.clear();
        }, this);
        var delayTime = cc.delayTime(NUMBER_DELAY_ANIM_EX / 2);
        this.runAction(cc.sequence(delayTime, call));
    },
    setTouchEnabled: function (value) {
        this._listener.setEnabled(value);
        cc.log("setEnabled GMMMatrixOnet: " + value);
        //if (!value) {
        //    //.removeListener(this._listener);
        //} else {
        //    if ('touches' in cc.sys.capabilities) {
        //        cc.log("set touch on Mobile 3333");
        //        var _listener = cc.EventListener.create({
        //            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        //            onTouchesBegan: _instance.onTouchesBegan,
        //        });
        //        cc.eventManager.addListener(_listener, this);
        //    } else {
        //        this._listener.setEna
        //    }
        //}
    },
    isCollisionRect: function (centerP, touchP, quadSize) {
        if (centerP.x - quadSize > touchP.x || centerP.x + quadSize < touchP.x ||
            centerP.y - quadSize > touchP.y || centerP.y + quadSize < touchP.y) {
            return false;
        }
        //cc.log("starX: " + (centerP.x - quadSize) + " EndX: " + (centerP.x + quadSize));
        //cc.log("startY: " + (centerP.y - quadSize) + " EndY: " + (centerP.y + quadSize));
        //cc.log("touch: " + touchP.x + " || " + touchP.y);
        return true;
    },
    checkChooseItemOnet: function (currPoint) {
        for (var i = 0 ; i < _instance.matrix.length; i++) {
            if (_instance.matrix[i] != -1 && _instance.isCollisionRect(_instance.getChildOnet(i).getPosition(),
                                                                        currPoint, _instance.sizeItem / 2)) {
                cc.log("checkChooseItemOnet Inside");
                if (_instance.currIndexFirst == -1) {
                    sound.playClickItem();
                    _instance.currIndexFirst = i;
                    _instance.addAnimationForOnet(_instance.getChildByName("ITEM" + i));
                    cc.log("checkChooseItemOnet Inside first");
                } else if (_instance.currIndexFirst != i) {    // has first item
                    var itemA = _instance.getChildOnet(_instance.currIndexFirst);
                    var itemB = _instance.getChildOnet(i);
                    /////
                    cc.log("checkChooseItemOnet Index: " + _instance.currIndexFirst + " | " + i);
                    cc.log("checkChooseItemOnet Inside last : " + _instance.matrix[_instance.currIndexFirst] + " | " + _instance.matrix[i]);
                    if (_instance.matrix[_instance.currIndexFirst] == _instance.matrix[i]) {
                        cc.log("checkChooseItemOnet same id");
                        var lines = [];
                        var i1 = Math.round(_instance.currIndexFirst / _instance.nCol - 0.5);
                        var j1 = _instance.currIndexFirst % _instance.nCol;
                        var i2 = Math.round(i / _instance.nCol - 0.5);
                        var j2 = i % _instance.nCol;
                        if (_instance.checkCondition(i1, j1, i2, j2, lines)) {
                            // add ex anim
                            sound.playGood();
                            var ex1 = new cc.Sprite();
                            ex1.setPosition(itemA.getPosition());
                            var call1 = cc.removeSelf();
                            ex1.runAction(cc.Sequence.create(cc.Animate.create(cc.AnimationCache.getInstance().getAnimation(ANIM_EXPLOSION)), call1));
                            ex1.setScale(0.8);
                            var ex2 = new cc.Sprite();
                            ex2.setPosition(itemB.getPosition());
                            var call2 = cc.removeSelf();
                            ex2.runAction(cc.Sequence.create(cc.Animate.create(cc.AnimationCache.getInstance().getAnimation(ANIM_EXPLOSION)), call2));
                            ex2.setScale(0.8);
                            _instance.addChild(ex1, 10);
                            _instance.addChild(ex2, 10);

                            cc.log("checkChooseItemOnet remove item: " + _instance.currIndexFirst + " || " + i);
                            _instance.removeActionOnet();
                            _instance.drawLines(i1, j1, i2, j2, lines);
                            _instance.removeChild(itemA);
                            _instance.removeChild(itemB);
                            _instance.changeMatrix(i1, j1, i2, j2);
                            if (!_instance.isChanging) {
                                _instance.isChanging = true;
                                cc.log("checkChooseItemOnet runAction: CHANGE RANDOM ONET");
                                var call = cc.CallFunc.create(_instance.resetRandomeOnet, _instance);
                                var deplay = cc.DelayTime.create(0.5);
                                this.runAction(cc.Sequence.create(deplay, call));
                            }
                        } else {
                            sound.playBad();
                            _instance.removeActionOnet();//_instance.currIndexFirst);//itemA);
                        }
                    } else {
                        // rollback
                        sound.playBad();
                        _instance.removeActionOnet();//_instance.currIndexFirst);//_instance.getChildByName("ITEM" + _instance.currIndexFirst));
                        cc.log("diff id");
                    }
                    _instance.currIndexFirst = -1;
                } else {
                    // cancel all onet choose
                    sound.playBad();
                    _instance.removeActionOnet();//_instance.currIndexFirst);//_instance.getChildByName("ITEM" + _instance.currIndexFirst));
                    _instance.currIndexFirst = -1;
                }
                break;
            }
        }
    },
    removeActionOnet: function () {
        this.iCircleOnet.setVisible(false);
        cc.log("REMOVE ONET ACTION");
    },
    addAnimationForOnet: function (item) {
        this.iCircleOnet.setScale(item.getScale() * 1.1);
        this.iCircleOnet.setPosition(item.getPosition());
        this.iCircleOnet.setVisible(true);

        cc.log("SET ONET ACTION 22");
    },
    onMouseDown: function (touch, event) {
        cc.log("Click from GMMMatrixOnet");
        var currPoint = touch.getLocation();
        _instance.checkChooseItemOnet(currPoint);
        return true;
    },
    onTouchesBegan: function (touch, event) {
        cc.log("Touch from GMMMatrixOnet");
        var currPoint = touch[0].getLocation();
        _instance.checkChooseItemOnet(currPoint);
        return true;
    },
})