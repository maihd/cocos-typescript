declare namespace ccui {
    export class Widget extends cc.Node {
        static readonly TOUCH_BEGAN : number;
        static readonly TOUCH_MOVED : number;
        static readonly TOUCH_ENDED : number;
        static readonly TOUCH_CANCELED : number;

        constructor();

        addTouchEventListener(listener: (sender?: Widget, type?: number) => void);
    }
}