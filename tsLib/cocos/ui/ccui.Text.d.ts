declare namespace ccui {
    type Node = cc.Node;
    type Size = cc.Size;
    type Color = cc.Color;

    class Text extends Widget {
        constructor(content?: string, fontName?: string, fontSize?: number);

        disableEffect() : void;

        enableGlow(glowColor : Color) : void;

        enableOutline(outlineColor : Color, outlineSize : number) : void;

        enableShadow(shadowColor : Color, shadowSize : Size) : void;

        getFontName() : string;
        getFontSize() : number;
        getString() : string;
        getStringLength() : number;

        setFontName(fontName : string) : void;
        setFontSize(fontSize : number) : void;
        setString(value : string) : void;

        getTextAreaSize() : Size;
        setTextAreaSize(areaSize : Size) : void;

        getTextHorizontalAlignment() : number;
        setTextHorizontalAlignment(alignment : number) : void;

        getTextVerticalAlignment() : number;
        setTextVerticalAlignment(alignment : number) : void;

        getVirtualRenderer() : Node;
        getVirtualRendererSize() : Size;
        
        isTouchScaleChangeEnabled() : boolean;
        setTouchScaleChangeEnabled(enable : boolean) : void;
    }
}