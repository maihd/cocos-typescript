/// <reference path="cocos-lib.d.ts" />


/**
 * The namespace for jsb exclusive APIs, all APIs in this namespace should never be used in Web engine.
 * So please check whether the running environment is native or not before any usage.
 * @namespace
 * @name jsb
 * @example
 *
 * if(cc.sys.isNative) {
 *     cc.log(cc.fileUtils.fullPathForFilename("test.js"));
 * }
 */
declare namespace jsb {
    // TODO: This is probably a bad idea to declare these as enums (since they clearly are not TS enums), but let's try it out and at least see if the values resolve properly
    export enum DiffType {
        ADDED,
        DELETED,
        MODIFIED
    }

    export enum DownloadState {
        UNSTARTED,
        DOWNLOADING,
        SUCCESSED
    }

    export enum EventCode {
        ERROR_NO_LOCAL_MANIFEST,
        ERROR_DOWNLOAD_MANIFEST,
        ERROR_PARSE_MANIFEST,
        NEW_VERSION_FOUND,
        ALREADY_UP_TO_DATE,
        UPDATE_PROGRESSION,
        ASSET_UPDATED,
        ERROR_UPDATING,
        UPDATE_FINISHED,
        UPDATE_FAILED,
        ERROR_DECOMPRESS,
    }

    export enum ErrorCode {
        CREATE_FILE,
        NETWORK,
        NO_NEW_VERSION,
        UNCOMPRESS
    }

    export enum State {
        UNCHECKED,
        PREDOWNLOAD_VERSION,
        DOWNLOADING_VERSION,
        VERSION_LOADED,
        PREDOWNLOAD_MANIFEST,
        DOWNLOADING_MANIFEST,
        MANIFEST_LOADED,
        NEED_UPDATE,
        UPDATING,
        UP_TO_DATE,
        FAIL_TO_UPDATE
    }

    /**
     * ATTENTION: USE jsb.fileUtils INSTEAD OF jsb.FileUtils.
     * jsb.fileUtils is the native file utils' singleton object,
     * please refer to Cocos2d-x's API to know how to use it.
     * Only available in JSB
     * @class
     * @name jsb.fileUtils
     * @extend cc.Class
     */
    //jsb.fileUtils = /** @lends jsb.fileUtils# */{
    export const fileUtils : FileUtils;

    export class FileUtils {
        /**
         * @function fullPathForFilename
         * @param {String} filename
         * @return {String}
         */
        fullPathForFilename(filename: string) : string;

        /**
         * @function getStringFromFile
         * @param {String} filename
         * @return {String}
         */
        getStringFromFile(filename: string) : string;

        /**
         * @function removeFile
         * @param {String} filepath
         * @return {boolean}
         */
        removeFile(filepath: string) : boolean;

        /**
         * @function isAbsolutePath
         * @param {String} path
         * @return {boolean}
         */
        isAbsolutePath(path: string) : boolean;

        /**
         * @function renameFile
         * @param {String} path or old full path
         * @param {String} oldname or new full path
         * @param {String} [name] new name
         * @return {boolean}
         */
        renameFile(path: string, oldname: string, name?: string) : boolean;

        /**
         * @function loadFilenameLookupDictionaryFromFile
         * @param {String} filename
         */
        loadFilenameLookupDictionaryFromFile(filename: string) : void;

        /**
         * @function isPopupNotify
         * @return {boolean}
         */
        isPopupNotify() : boolean;

        /**
         * @function getValueVectorFromFile
         * @param {String} arg0
         * @return {Array}
         * TODO: Figure out exactly what data type this is, not quite sure yet and this isn't in the C++ FileUtils API docs...
         */
        getValueVectorFromFile(arg0: string) : any[];

        /**
         * @function getSearchPaths
         * @return {Array}
         */
        getSearchPaths() : string[];

        /**
         * @function writeToFile
         * @param {{}} dict
         * @param {String} fullPath
         * @return {boolean}
         */
        writeToFile(dict: {}, fullPath: string) : boolean;

        /**
         * @function getValueMapFromFile
         * @param {String} filename
         * @return {{}}
         */
        getValueMapFromFile(filename: string) : {};

        /**
         * @function getFileSize
         * @param {String} filepath
         * @return {number}
         */
        getFileSize(filepath: string) : number;

        /**
         * @function removeDirectory
         * @param {String} dirPath
         * @return {boolean}
         */
        removeDirectory(dirPath: string) : boolean;

        /**
         * @function setSearchPaths
         * @param {Array} searchPaths
         */
        setSearchPaths(searchPaths: string[]) : void;

        /**
         * @function writeStringToFile
         * @param {String} dataStr
         * @param {String} fullPath
         * @return {boolean}
         */
        writeStringToFile(dataStr: string, fullPath: string) : boolean;

        /**
         * @function setSearchResolutionsOrder
         * @param {Array} searchResolutionsOrder
         */
        setSearchResolutionsOrder(searchResolutionsOrder: string[]) : void;

        /**
         * @function addSearchResolutionsOrder
         * @param {String} order
         * TODO: This does not match the C++ API, expected an optional bool argument here
         */
        addSearchResolutionsOrder(order: string) : void;

        /**
         * @function addSearchPath
         * @param {String} path
         * TODO: This does not match the C++ API, expected an optional bool argument here
         */
        addSearchPath(path: string) : void;

        /**
         * @function isFileExist
         * @param {String} filename
         * @return {boolean}
         */
        isFileExist(filename: string) : boolean;

        /**
         * @function purgeCachedEntries
         */
        purgeCachedEntries() : void;

        /**
         * @function fullPathFromRelativeFile
         * @param {String} filename
         * @param {String} relativeFile
         * @return {String}
         */
        fullPathFromRelativeFile(filename: string, relativeFile: string) : string;

        /**
         * @function isDirectoryExist
         * @param {String} dirPath
         * @return {boolean}
         */
        isDirectoryExist(dirPath: string) : boolean;

        /**
         * @function getSearchResolutionsOrder
         * @return {Array}
         */
        getSearchResolutionsOrder() : string[];

        /**
         * @function createDirectory
         * @param {String} dirPath
         * @return {boolean}
         */
        createDirectory(dirPath: string) : boolean;

        /**
         * @function createDirectories
         * @param {String} dirPath
         * @return {boolean}
         * TODO: This arguments list doesn't even make sense, I'd expect an array of strings. Look into this later on.
         */
        createDirectories(dirPath: string) : boolean;

        /**
         * @function getWritablePath
         * @return {String}
         */
        getWritablePath() : string;
    }

    /**
     * @class
     */
    //jsb.EventAssetsManager = cc.Class.extend(/** @lends jsb.EventAssetsManager# */{
    export class EventAssetsManager {
        /**
         * @function EventAssetsManager
         * @constructor
         * @param {String} eventName
         * @param {AssetsManager} manager
         * @param {EventCode} code
         * @param {number} [percent]
         * @param {number} [percentByFile]
         * @param {String} [assetId]
         * @param {String} [message]
         * @param {number} [curle_code]
         * @param {number} [curlm_code]
         */
        constructor(
            eventName: string,
            manager: AssetsManager,
            code: EventCode,
            percent?: number,
            percentByFile?: number,
            assetId?: string,
            message?: string,
            curle_code?: number,
            curlm_code?: number);

        /**
         * @function getAssetsManager
         * @return {AssetsManager}
         */
        getAssetsManager() : AssetsManager;

        /**
         * @function getAssetId
         * @return {String}
         */
        getAssetId() : string;

        /**
         * @function getCURLECode
         * @return {int}
         */
        getCURLECode() : number;

        /**
         * @function getMessage
         * @return {String}
         */
        getMessage() : string;

        /**
         * @function getCURLMCode
         * @return {int}
         */
        getCURLMCode() : number;

        /**
         * @function getPercentByFile
         * @return {number}
         */
        getPercentByFile() : number;

        /**
         * @function getEventCode
         * @return {EventCode}
         */
        getEventCode() : EventCode;

        /**
         * @function getPercent
         * @return {number}
         */
        getPercent() : number;

    }

    /**
     * @class
     */
    export class EventListenerAssetsManager {
        /**
         * @function init
         * @param {AssetsManager} assetsmanager
         * @param {function} callback
         * @return {boolean}
         */
        init(assetsmanager: AssetsManager, callback: (mgr: EventAssetsManager) => void) : boolean;

        /**
         * @function create
         * @param {AssetsManager} assetsmanager
         * @param {function} callback
         * @return {EventListenerAssetsManager}
         */
        static create(assetsmanager: AssetsManager, callback: (mgr: EventAssetsManager) => void) : EventListenerAssetsManager;
    }

    /**
     * @class
     * jsb.AssetsManager is the native AssetsManager for your game resources or scripts.
     * please refer to this document to know how to use it: http://www.cocos2d-x.org/docs/manual/framework/html5/v3/assets-manager/en
     * Only available in JSB
     */
    export class AssetsManager {
        /**
         * @function AssetsManager
         * @constructor
         * @param {String} manifestUrl
         * @param {String} storagePath
         */
        constructor(manifestUrl: string, storagePath: string);
        constructor();

        /**
         * @function getState
         * @return {State}
         */
        getState() : State;

        /**
         * @function checkUpdate
         */
        checkUpdate() : void;

        /**
         * @function getStoragePath
         * @return {String}
         */
        getStoragePath() : string;

        /**
         * @function update
         */
        update() : void;

        /**
         * @function getLocalManifest
         * @return {jsb.Manifest}
         */
        getLocalManifest() : Manifest;

        /**
         * @function getRemoteManifest
         * @return {jsb.Manifest}
         */
        getRemoteManifest() : Manifest;

        /**
         * @function downloadFailedAssets
         */
        downloadFailedAssets() : void;
    }

    /**
     * @class
     */
    export class Manifest {
        /**
         * @function getManifestFileUrl
         * @return {String}
         */
        getManifestFileUrl() : string;

        /**
         * @function isVersionLoaded
         * @return {boolean}
         */
        isVersionLoaded() : boolean;

        /**
         * @function isLoaded
         * @return {boolean}
         */
        isLoaded() : boolean;

        /**
         * @function getPackageUrl
         * @return {String}
         */
        getPackageUrl() : string;

        /**
         * @function getVersion
         * @return {String}
         */
        getVersion() : string;

        /**
         * @function getVersionFileUrl
         * @return {String}
         */
        getVersionFileUrl() : string;
    }

    // TODO: I don't know the best way to represent this, because I can't find a reference in the C++ docs. Just do this for now, fix it later on.
    /**
     * jsb.reflection is a bridge to let you invoke Java static functions.
     * please refer to this document to know how to use it: http://www.cocos2d-x.org/docs/manual/framework/html5/v3/reflection/en
     * Only available on iOS/Mac/Android platform
     * @class
     * @name jsb.reflection
     */
    export namespace reflection {
        /**
         * @function
         */
        export function callStaticMethod() : void;
    }
}