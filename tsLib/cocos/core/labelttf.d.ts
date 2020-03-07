/// <reference path="../cocos-lib.d.ts"/>

declare namespace cc {

// +--------------------------------------------------------------------------------
// + File: cocos2d/core/base-nodes/CCLabelTTF.js
// +--------------------------------------------------------------------------------
    /**
     * <p>cc.LabelTTF is a subclass of cc.TextureNode that knows how to render text labels with system font or a ttf font file<br/>
     * All features from cc.Sprite are valid in cc.LabelTTF<br/>
     * cc.LabelTTF objects are slow for js-binding on mobile devices.<br/>
     * Consider using cc.LabelAtlas or cc.LabelBMFont instead.<br/>
     * You can create a cc.LabelTTF from a font name, alignment, dimension and font size or a cc.FontDefinition object.</p>
     * @class
     * @extends cc.Sprite
     *
     * @param {String} text
     * @param {String|cc.FontDefinition} [fontName="Arial"]
     * @param {Number} [fontSize=16]
     * @param {cc.Size} [dimensions=cc.size(0,0)]
     * @param {Number} [hAlignment=cc.TEXT_ALIGNMENT_LEFT]
     * @param {Number} [vAlignment=cc.VERTICAL_TEXT_ALIGNMENT_TOP]
     * @example
     * var myLabel = new cc.LabelTTF('label text',  'Times New Roman', 32, cc.size(320,32), cc.TEXT_ALIGNMENT_LEFT);
     *
     * var fontDef = new cc.FontDefinition();
     * fontDef.fontName = "Arial";
     * fontDef.fontSize = "32";
     * var myLabel = new cc.LabelTTF('label text',  fontDef);
     *
     * @property {String}       string          - Content string of label
     * @property {Number}       textAlign       - Horizontal Alignment of label: cc.TEXT_ALIGNMENT_LEFT|cc.TEXT_ALIGNMENT_CENTER|cc.TEXT_ALIGNMENT_RIGHT
     * @property {Number}       verticalAlign   - Vertical Alignment of label: cc.VERTICAL_TEXT_ALIGNMENT_TOP|cc.VERTICAL_TEXT_ALIGNMENT_CENTER|cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM
     * @property {Number}       fontSize        - Font size of label
     * @property {String}       fontName        - Font name of label
     * @property {String}       font            - The label font with a style string: e.g. "18px Verdana"
     * @property {Number}       boundingWidth   - Width of the bounding box of label, the real content width is limited by boundingWidth
     * @property {Number}       boundingHeight  - Height of the bounding box of label, the real content height is limited by boundingHeight
     * @property {cc.Color}     fillStyle       - The fill color
     * @property {cc.Color}     strokeStyle     - The stroke color
     * @property {Number}       lineWidth       - The line width for stroke
     * @property {Number}       shadowOffsetX   - The x axis offset of shadow
     * @property {Number}       shadowOffsetY   - The y axis offset of shadow
     * @property {Number}       shadowOpacity   - The opacity of shadow
     * @property {Number}       shadowBlur      - The blur size of shadow
     */
    export class LabelTTF extends Sprite implements Label {
        ///** @expose */
        string : string;
        /** @expose */
        textAlign : number;
        /** @expose */
        verticalAlign : number;
        /** @expose */
        fontSize : number;
        /** @expose */
        fontName : string;
        /** @expose */
        font : string;
        /** @expose */
        boundingSize : number;
        /** @expose */
        boundingWidth : number;
        /** @expose */
        boundingHeight : number;
        /** @expose */
        fillStyle : Color;
        /** @expose */
        strokeStyle : Color;
        /** @expose */
        lineWidth : number;
        /** @expose */
        shadowOffset : number;
        /** @expose */
        shadowOffsetX : number;
        /** @expose */
        shadowOffsetY : number;
        /** @expose */
        shadowOpacity : number;
        /** @expose */
        shadowBlur : number;

        constructor(label: string, fontName: string, fontSize: number, dimensions?: Size, hAlignment?: number, vAlignment?: number);
        //ctor(label?:string, fontName?:string, fontSize?:number, dimensions?:Size, hAlignment?:number, vAlignment?:number):boolean;

        /**
         * Initializes the cc.LabelTTF with a font name, alignment, dimension and font size, do not call it by yourself,
         * you should pass the correct arguments in constructor to initialize the label.
         * @param {String} label string
         * @param {String} fontName
         * @param {Number} fontSize
         * @param {cc.Size} [dimensions=]
         * @param {Number} [hAlignment=]
         * @param {Number} [vAlignment=]
         * @return {Boolean} return false on error
         */
        initWithString(label: string, fontName: string, fontSize: number, dimensions?: Size, hAlignment?: number, vAlignment?: number) : boolean;

        getLineHeight() : number;

        setLineHeight(lineHeight: number) : void;

        /**
         * Returns the text of the label
         * @return {String}
         */
        getString() : string;

        /**
         * Returns Horizontal Alignment of cc.LabelTTF
         * @return {cc.TEXT_ALIGNMENT_LEFT|cc.TEXT_ALIGNMENT_CENTER|cc.TEXT_ALIGNMENT_RIGHT}
         */
        getHorizontalAlignment() : number;

        /**
         * Returns Vertical Alignment of cc.LabelTTF
         * @return {cc.VERTICAL_TEXT_ALIGNMENT_TOP|cc.VERTICAL_TEXT_ALIGNMENT_CENTER|cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM}
         */
        getVerticalAlignment() : number;

        /**
         * Returns the dimensions of cc.LabelTTF, the dimension is the maximum size of the label, set it so that label will automatically change lines when necessary.
         * @see cc.LabelTTF#setDimensions, cc.LabelTTF#boundingWidth and cc.LabelTTF#boundingHeight
         * @return {cc.Size}
         */
        getDimensions() : Size;

        /**
         * Returns font size of cc.LabelTTF
         * @return {Number}
         */
        getFontSize() : number;

        /**
         * Returns font name of cc.LabelTTF
         * @return {String}
         */
        getFontName() : string;

        /**
         * Initializes the CCLabelTTF with a font name, alignment, dimension and font size, do not call it by yourself, you should pass the correct arguments in constructor to initialize the label.
         * @param {String} text
         * @param {cc.FontDefinition} textDefinition
         * @return {Boolean}
         */
        initWithStringAndTextDefinition(text: string, textDefinition: FontDefinition) : boolean;

        /**
         * Sets the text definition used by this label
         * @param {cc.FontDefinition} theDefinition
         */
        setTextDefinition(theDefinition: FontDefinition) : void;

        /**
         * Extract the text definition used by this label
         * @return {cc.FontDefinition}
         */
        getTextDefinition() : FontDefinition;

        /**
         * Enable or disable shadow for the label
         * @param {cc.Color | Number} a Color or The x axis offset of the shadow
         * @param {cc.Size | Number} b Size or The y axis offset of the shadow
         * @param {Number} c The blur size of the shadow or The opacity of the shadow (0 to 1)
         * @param {null | Number} d Null or The blur size of the shadow
         * @example
         *   old:
         *     labelttf.enableShadow(shadowOffsetX, shadowOffsetY, shadowOpacity, shadowBlur);
         *   new:
         *     labelttf.enableShadow(shadowColor, offset, blurRadius);
         */
        enableShadow(a: Color | number, b: Size | number, c: number, d?: number) : void;

        /**
         * Disable shadow rendering
         */
        disableShadow() : void;

        /**
         * Enable label stroke with stroke parameters
         * @param {cc.Color} strokeColor The color of stroke
         * @param {Number} strokeSize The size of stroke
         */
        enableStroke(strokeColor: Color, strokeSize: number) : void;

        /**
         * Disable label stroke
         */
        disableStroke() : void;

        /**
         * Sets the text fill color
         * @function
         * @param {cc.Color} fillColor The fill color of the label
         */
        setFontFillColor(fillColor: Color) : void;

        /**
         * Changes the text content of the label
         * @warning Changing the string is as expensive as creating a new cc.LabelTTF. To obtain better performance use cc.LabelAtlas
         * @param {String} text Text content for the label
         */
        setString(text: string) : void;

        /**
         * Sets Horizontal Alignment of cc.LabelTTF
         * @param {cc.TEXT_ALIGNMENT_LEFT|cc.TEXT_ALIGNMENT_CENTER|cc.TEXT_ALIGNMENT_RIGHT} alignment Horizontal Alignment
         */
        setHorizontalAlignment(alignment: number) : void;

        /**
         * Sets Vertical Alignment of cc.LabelTTF
         * @param {cc.VERTICAL_TEXT_ALIGNMENT_TOP|cc.VERTICAL_TEXT_ALIGNMENT_CENTER|cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM} verticalAlignment
         */
        setVerticalAlignment(verticalAlignment: number) : void;

        /**
         * Set Dimensions of cc.LabelTTF, the dimension is the maximum size of the label, set it so that label will automatically change lines when necessary.
         * @param {cc.Size|Number} dim dimensions or width of dimensions
         * @param {Number} [height] height of dimensions
         */
        setDimensions(dim: Size | number, height?: number) : void;

        /**
         * Sets font size of cc.LabelTTF
         * @param {Number} fontSize
         */
        setFontSize(fontSize: number) : void;

        /**
         * Sets font name of cc.LabelTTF
         * @param {String} fontName
         */
        setFontName(fontName: number) : void;

        setTextureRect(rect: Rect, rotated: boolean, untrimmedSize: Size) : boolean;

        /**
         * set Target to draw on
         * @param {boolean} onCacheMode
         */
        setDrawMode(onCacheMode: boolean) : void;
    }
}