
/// <reference path="../../cocos-lib.d.ts" />


declare namespace cc {
    // +--------------------------------------------------------------------------------
    // + File: CCScrollView.js
    // +--------------------------------------------------------------------------------

    /**
     * @ignore
     */
    export const SCROLLVIEW_DIRECTION_NONE : number;
    export const SCROLLVIEW_DIRECTION_HORIZONTAL : number;
    export const SCROLLVIEW_DIRECTION_VERTICAL : number;
    export const SCROLLVIEW_DIRECTION_BOTH : number;
    export const SCROLL_DEACCEL_RATE : number;
    export const SCROLL_DEACCEL_DIST : number;
    export const BOUNCE_DURATION : number;
    export const INSET_RATIO : number;
    export const MOVE_INCH : number;
    export const BOUNCE_BACK_FACTOR : number;

    export function convertDistanceFromPointToInch(pointDis: number) : number;

    export interface ScrollViewDelegate {
        scrollViewDidScroll(view: ScrollView) : void;
        scrollViewDidZoom(view: ScrollView) : void;
    }

    /**
     * ScrollView support for cocos.
     * It provides scroll view functionalities to cocos2d projects natively.
     * @class
     * @extends cc.Layer
     *
     * @property {cc.Point}                 minOffset   - <@readonly> The current container's minimum offset
     * @property {cc.Point}                 maxOffset   - <@readonly> The current container's maximum offset
     * @property {Boolean}                  bounceable  - Indicate whether the scroll view is bounceable
     * @property {cc.Size}                  viewSize    - The size of the scroll view
     * @property {cc.Layer}                 container   - The inside container of the scroll view
     * @property {Number}                   direction   - The direction allowed to scroll: cc.SCROLLVIEW_DIRECTION_BOTH by default, or cc.SCROLLVIEW_DIRECTION_NONE | cc.SCROLLVIEW_DIRECTION_HORIZONTAL | cc.SCROLLVIEW_DIRECTION_VERTICAL
     * @property {cc.ScrollViewDelegate}    delegate    - The inside container of the scroll view
     * @property {Boolean}                  clippingToBounds   - Indicate whether the scroll view clips its children
     */
    export class ScrollView extends Layer {
        minOffset: Point;
        maxOffset: Point;
        bounceable: boolean;
        viewSize: Size;
        container: Node;
        direction: number;
        delegate: ScrollViewDelegate;
        clippingToBounds: boolean;

        /**
         * @contructor
         * @param size
         * @param container
         * @returns {ScrollView}
         */
        constructor(size: Size, container?: Node);

        init() : boolean;

        /**
         * initialized whether success or fail
         * @param {cc.Size} size
         * @param {cc.Node} container
         * @return {Boolean}
         */
        initWithViewSize(size: Size, container?: Node) : boolean;

        /**
         * Sets a new content offset. It ignores max/min offset. It just sets what's given. (just like UIKit's UIScrollView)
         *
         * @param {cc.Point} offset new offset
         * @param {Number} [animated=] If true, the view will scroll to the new offset
         */
        setContentOffset(offset: Point, animated?: number) : void;

        getContentOffset() : Point;

        /**
         * Sets a new content offset. It ignores max/min offset. It just sets what's given. (just like UIKit's UIScrollView) 
         * You can override the animation duration with this method.
         * 
         * @param {cc.Point} offset new offset
         * @param {Number} dt animation duration
         */
        setContentOffsetInDuration(offset: Point, dt: number) : void;

        /**
         * Sets a new scale and does that for a predefined duration.
         *
         * @param {Number} scale a new scale vale
         * @param {Boolean} [animated=null] if YES, scaling is animated
         */
        setZoomScale(scale: number, animated?: boolean) : void;

        getZoomScale() : Point;

        /**
         * Sets a new scale for container in a given duration.
         *
         * @param {Number} s a new scale value
         * @param {Number} dt animation duration
         */
        setZoomScaleInDuration(s: number, dt: number) : void;

        /**
         * Returns the current container's minimum offset. You may want this while you animate scrolling by yourself
         * @return {cc.Point} Returns the current container's minimum offset.
         */
        minContainerOffset() : Point;

        /**
         * Returns the current container's maximum offset. You may want this while you animate scrolling by yourself
         * @return {cc.Point} Returns the current container's maximum offset.
         */
        maxContainerOffset() : Point;

        /**
         * Determines if a given node's bounding box is in visible bounds
         * @param {cc.Node} node
         * @return {Boolean} YES if it is in visible bounds
         */
        isNodeVisible(node: Node) : boolean;

        /**
         * Provided to make scroll view compatible with SWLayer's pause method
         */
        //pause(sender?:Class):void;

        /**
         * Provided to make scroll view compatible with SWLayer's resume method
         */
        //resume(sender?:Class):void;

        isDragging() : boolean;

        isTouchMoved() : boolean;

        isBounceable() : boolean;

        setBounceable(bounceable: boolean) : void;

        /**
         * 
         * size to clip. CCNode boundingBox uses contentSize directly.                   
         * It's semantically different what it actually means to common scroll views.    
         * Hence, this scroll view will use a separate size property.
         * 
         */
        getViewSize() : Size;

        setViewSize(size: Size) : void;

        getContainer() : Node;

        setContainer(container: Node) : void;

        /**
         * direction allowed to scroll. CCScrollViewDirectionBoth by default.
         */
        getDirection() : number;

        setDirection(direction: number) : void;

        getDelegate() : ScrollViewDelegate;

        setDelegate(delegate: ScrollViewDelegate) : void;

        /** override functions */
        // optional
        onTouchBegan(touch: Touch, event: Event) : boolean;

        onTouchMoved(touch: Touch, event: Event) : void;

        onTouchEnded(touch: Touch, event: Event) : void;

        onTouchCancelled(touch: Touch, event: Event) : void;

        updateInset() : void;

        /**
         * Determines whether it clips its children or not.
         */
        isClippingToBounds() : boolean;

        setClippingToBounds(clippingToBounds: Size) : void;

        isTouchEnabled() : boolean;

        setTouchEnabled(enabled: boolean) : void;
    }

    // +--------------------------------------------------------------------------------
    // + File: CCSorting.js
    // +--------------------------------------------------------------------------------
    /**
     * The sortable object interface
     * @class
     * @extends cc.Class
     */
    export class SortableObject {
        setObjectID(objectId: number) : void;
        getObjectID() : number;
    }

    /**
     * The SortedObject class
     * @class
     * @extends cc.SortableObject
     */
    export class SortedObject extends SortableObject {
        constructor();
        getObjectID() : number;
        setObjectID(objectID: number) : void;
    }

    /**
     * Array for object sorting utils
     * @class
     * @extend cc.Class
     */
    export class ArrayForObjectSorting {
        constructor();

        /**
         * Inserts a given object into array.
         *
         * Inserts a given object into array with key and value that are used in
         * sorting. "value" must respond to message, compare:, which returns
         * (NSComparisonResult). If it does not respond to the message, it is appended.
         * If the compare message does not result NSComparisonResult, sorting behavior
         * is not defined. It ignores duplicate entries and inserts next to it.
         *
         * @function
         * @param {Object} addObject    Object to insert
         */
        insertSortedObject(addObject: {}) : void;

        /*!
         * Removes an object in array.
         *
         * Removes an object with given key and value. If no object is found in array
         * with the key and value, no action is taken.
         *
         * @function
         * @param {Object} delObject    Object to remove
         */
        removeSortedObject(delObject: {}) : void;

        /*!
         * Sets a new value of the key for the given object.
         *
         * In case where sorting value must be changed, this message must be sent to
         * keep consistency of being sorted. If it is changed externally, it must be
         * sorted completely again.
         *
         * @function
         * @param {Number} tag          Tag to set
         * @param {Object} setObject    The object which would be set
         */
        setObjectID_ofSortedObject(tag: number, setObject: {}) : void;

        objectWithObjectID(tag: number) : {};

        /*!
         * Returns an object with given key and value.
         *
         * Returns an object with given key and value. If no object is found,
         * it returns nil.
         *
         * @function
         * @param {Number} tag  Tag to locate object
         * @return {Object|null}
         */
        getObjectWithObjectID(tag: number) : {};

        /*!
         * Returns an index of the object with given key and value.
         *
         * Returns the index of an object with given key and value.
         * If no object is found, it returns an index at which the given object value
         * would have been located. If object must be located at the end of array,
         * it returns the length of the array, which is out of bound.
         *
         * @function
         * @param {Number} idxObj   Id to locate object
         * @return {Number} index of an object found
         */
        indexOfSortedObject(idxObj: number) : number;

        //implement array method
        count() : number;

        lastObject() : {};

        objectAtIndex(index: number) : {};

        addObject(addObj: {}) : void;

        removeObjectAtIndex(index: number) : void;

        insertObject(addObj: {}, index: number) : void;
    }

    // +--------------------------------------------------------------------------------
    // + File: CCTableView.js
    // +--------------------------------------------------------------------------------

    /**
     * The constant value of the fill style from top to bottom for cc.TableView
     * @constant
     * @type {number}
     */
    export const TABLEVIEW_FILL_TOPDOWN : number;

    /**
     * The constant value of the fill style from bottom to top for cc.TableView
     * @constant
     * @type {number}
     */
    export const TABLEVIEW_FILL_BOTTOMUP : number;

    /**
     * Abstract class for SWTableView cell node
     * @class
     * @abstract
     * @extends cc.Node
     *
     * @property {Number}   objectId    - The index used internally by SWTableView and its subclasses
     */
    export class TableViewCell extends Node {
        objectId : number;

        /**
         * The index used internally by SWTableView and its subclasses
         */
        getIdx() : number;

        setIdx(index: number) : void;

        /**
         * Cleans up any resources linked to this cell and resets <code>index</code> property.
         */
        reset() : void;

        setObjectID(index: number) : void;

        getObjectID() : number;
    }

    /**
     * Sole purpose of this delegate is to single touch event in this version.
     */
    export interface TableViewDelegate extends ScrollViewDelegate {
        /**
         * Delegate to respond touch event
         *
         * @param {cc.TableView} table table contains the given cell
         * @param {cc.TableViewCell} cell  cell that is touched
         */
        tableCellTouched(table: TableView, cell: TableViewCell) : void;

        /**
         * Delegate to respond a table cell press event.
         *
         * @param {cc.TableView} table table contains the given cell
         * @param {cc.TableViewCell} cell  cell that is pressed
         */
        tableCellHighlight(table: TableView, cell: TableViewCell) : void;

        /**
         * Delegate to respond a table cell release event
         *
         * @param {cc.TableView} table table contains the given cell
         * @param {cc.TableViewCell} cell  cell that is pressed
         */
        tableCellUnhighlight(table: TableView, cell: TableViewCell) : void;

        /**
         * <p>
         * Delegate called when the cell is about to be recycled. Immediately                     <br/>
         * after this call the cell will be removed from the scene graph and                      <br/>
         * recycled.
         * </p>
         * @param table table contains the given cell
         * @param cell  cell that is pressed
         */
        tableCellWillRecycle(table: TableView, cell: TableViewCell) : void;
    }

    /**
     * Data source that governs table backend data.
     */
    export class TableViewDataSource {
        /**
         * cell size for a given index
         * @param {cc.TableView} table table to hold the instances of Class
         * @param {Number} index the index of a cell to get a size
         * @return {cc.Size} size of a cell at given index
         */
        tableCellSizeForIndex(table: TableView, index: number) : Size;

        /**
         * cell height for a given table.
         *
         * @param {cc.TableView} table table to hold the instances of Class
         * @return {cc.Size} cell size
         */
        cellSizeForTable(table: TableView) : Size;

        /**
         * a cell instance at a given index
         * @param {cc.TableView} table table to hold the instances of Class
         * @param index index to search for a cell
         * @return {cc.TableViewCell} cell found at index
         */
        tableCellAtIndex(table: TableView, index: number) : TableViewCell;

        /**
         * Returns number of cells in a given table view.
         * @param {cc.TableView} table table to hold the instances of Class
         * @return {Number} number of cells
         */
        numberOfCellsInTableView(table: TableView) : number;
    }

    /**
     * UITableView counterpart for cocos2d for iphone.
     * this is a very basic, minimal implementation to bring UITableView-like component into cocos2d world.
     *
     * @class
     * @extends cc.ScrollView
     *
     * @property {cc.TableViewDataSource}   dataSource          - The data source of the table view
     * @property {cc.TableViewDelegate}     delegate            - The event delegate of the table view
     * @property {Number}                   verticalFillOrder   - The index to determine how cell is ordered and filled in the view
     *
     */
    export class TableView extends ScrollView {
        dataSource: TableViewDataSource;
        delegate: TableViewDelegate;
        verticalFillOrder: number;

        /**
         * The
         * @param dataSource
         * @param size
         * @param container
         */
        constructor(dataSource: TableViewDataSource, size: Size, container: Node);

        /**
         * data source
         */
        getDataSource() : TableViewDataSource;

        setDataSource(source: TableViewDataSource) : void;

        /**
         * delegate
         */
        getDelegate() : TableViewDelegate;

        setDelegate(delegate: TableViewDelegate) : void;

        /**
         * determines how cell is ordered and filled in the view.
         */
        setVerticalFillOrder(fillOrder: number) : void;

        getVerticalFillOrder() : number;

        //initWithViewSize(size:Size, container:Node):boolean;

        /**
         * Updates the content of the cell at a given index.
         *
         * @param index index to find a cell
         */
        updateCellAtIndex(index: number) : void;

        /**
         * Inserts a new cell at a given index
         *
         * @param index location to insert
         */
        insertCellAtIndex(index: number) : void;

        /**
         * Removes a cell at a given index
         *
         * @param index index to find a cell
         */
        removeCellAtIndex(index: number) : void;

        /**
         * reloads data from data source.  the view will be refreshed.
         */
        reloadData() : void;

        /**
         * Dequeues a free cell if available. nil if not.
         *
         * @return {TableViewCell} free cell
         */
        dequeueCell() : TableViewCell;

        /**
         * Returns an existing cell at a given index. Returns nil if a cell is nonexistent at the moment of query.
         *
         * @param index index
         * @return {cc.TableViewCell} a cell at a given index
         */
        cellAtIndex(index: number) : TableViewCell;

        scrollViewDidScroll(view: Node) : void;

        scrollViewDidZoom(view: Node) : void;

        //onTouchBegan(touch:Touch, event:Event):boolean;
        //
        //onTouchMoved(touch:Touch, event:Event):void;
        //
        //onTouchCancelled(touch:Touch, event:Event):void;
        //
        //onTouchEnded(touch:Touch, event:Event):void;
    }
}
