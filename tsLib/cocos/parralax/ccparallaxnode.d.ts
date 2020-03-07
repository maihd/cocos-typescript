/**
 * Parallax Object. <br />
 * Parallax required attributes are stored.
 * @class
 * @extends cc.Class
 */
declare namespace cc {
    export class PointObject extends Class /** @lends cc.PointObject# */ {
        constructor(ratio: Point, offset: Point);

        /**
         * Gets the ratio.
         * @return  {cc.Point} Not point, this is ratio.
         */
        getRatio() : Point;

        /**
         * Set the ratio.
         * @param  {cc.Point} value
         */
        setRatio(value: Point) : void;

        /**
         * Gets the offset.
         * @return  {cc.Point}
         */
        getOffset() : Point;

        /**
         * Set the offset.
         * @param {cc.Point} value
         */
        setOffset(value: Point) : void;
        /**
         * Gets the child.
         * @return {cc.Node}
         */
        getChild(): Node;

        /**
         * Set the child.
         * @param  {cc.Node} value
         */
        setChild(value: Node) : void;
        /**
         * initializes cc.PointObject
         * @param  {cc.Point} ratio Not point, this is a ratio.
         * @param  {cc.Point} offset
         * @return {Boolean}
         */
        initWithCCPoint(ratio: Point, offset: Point) : boolean;


        static create(ratio: Point, offset: Point) : PointObject;
    }
    /**
     * Create a object to stored parallax data.
     * @param {cc.Point} ratio
     * @param {cc.Point} offset
     * @return {cc.PointObject}
     * @deprecated since v3.0 please use new cc.PointObject() instead.
     */
    //cc.PointObject.create = function (ratio, offset) {
    // return new cc.PointObject(ratio, offset);
    //};

    /**
     * <p>cc.ParallaxNode: A node that simulates a parallax scroller<br />
     * The children will be moved faster / slower than the parent according the the parallax ratio. </p>
     * @class
     * @extends cc.Node
     *
     * @property {Array}    parallaxArray   - Parallax nodes array
     */

    export class ParallaxNode extends Node {
        //cc.ParallaxNode = cc.Node.extend(/** @lends cc.ParallaxNode# */{
        parallaxArray: null;

        /**
         * Gets the parallax array.
         * @return {Array}
         */
        getParallaxArray: any[];

        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         */
        constructor();

        /**
         * Adds a child to the container with a z-order, a parallax ratio and a position offset
         * It returns self, so you can chain several addChilds.
         * @param {cc.Node} child
         * @param {Number} z
         * @param {cc.Point} ratio
         * @param {cc.Point} offset
         * @example
         * //example
         * voidNode.addChild(background, -1, cc.p(0.4, 0.5), cc.p(0,0));
         */
        addChild(child: Node, localzorder?: Number, tag?: string | number) : void;
        addChild(child: Node, z: Number, rati: Point, offset: Point) : void;

        /**
         *  Remove Child
         * @param {cc.Node} child
         * @param {Boolean} cleanup
         * @example
         * //example
         * voidNode.removeChild(background,true);
         */
        removeChild(child: Node, cleanup: boolean) : void;

        /**
         *  Remove all children with cleanup
         * @param {Boolean} [cleanup=true]
         */
        removeAllChildren(cleanup: boolean) : void;

        /**
         * Set parallax array.
         * @param {Array} value
         */
        setParallaxArray(value: any[]) : void;
    }
}
