"use strict";
var ModuleErrorCode = {};
var ModuleError = (function (Error, Object) {
    function ModuleError(message) {
        Error.call(this);
        this.name = "ModuleError";
        this.message = message;
    }
    ;
    ModuleError.prototype = Object.create(Error.prototype);
    ModuleError.prototype.constructor = ModuleError;
    return ModuleError;
})(Error, Object);
var module = (function (ModuleError, SyntaxError, cc) {
    var LOG_TAG = "[Module]";
    var PATH_REGEXP = /^(\.|\.\.|[a-zA-Z0-9\_\-]+)?(\/(\.|\.\.|[a-zA-Z0-9\_\-\.]+))*$/;
    var moduleStorage = {};
    var rootPath = "";
    var loadingPath = "";
    var loadingDirectory = "";
    function logVerbose() {
        cc.log.apply(undefined, [LOG_TAG].concat(Array.from(arguments)));
    }
    function currentLoadingPath() {
        return loadingPath;
    }
    function currentLoadingDirectory() {
        return loadingDirectory;
    }
    function getAbsolutePath(path) {
        if (!PATH_REGEXP.test(path)) {
            throw new ModuleError("Path is not valid: " + path);
        }
        var result = "";
        var parts = path.split("/");
        for (var i = 0, n = parts.length; i < n; i++) {
            var part = parts[i];
            if (part === ".") {
                continue;
            }
            else if (part === "..") {
                var lastIndex = result.lastIndexOf("/");
                result = result.substring(0, lastIndex);
            }
            else {
                if (result.length > 0) {
                    result += "/" + part;
                }
                else {
                    result = part;
                }
            }
        }
        return result;
    }
    function getDirectoryFromFilePath(path) {
        var directory = path.substring(0, path.lastIndexOf("/"));
        return directory;
    }
    function loadScript(path) {
        var directory = getDirectoryFromFilePath(path);
        loadingPath = path;
        loadingDirectory = directory;
        try {
            require(path);
            cc.sys.cleanScript(path);
        }
        catch (e) {
            var reason = "";
            if (e instanceof SyntaxError) {
                reason = "SyntaxError: " + path + ":" + e.lineNumber + ":" + e.columnNumber + ":" + e.message;
                logVerbose(reason);
            }
            else {
                reason = "Failed to load script: " + path;
                logVerbose(reason, e.message);
            }
            throw new ModuleError(reason);
        }
    }
    function createRequireFunction(basePath, currentFilePath) {
        return function (path) {
            while (path.substring(0, 1) == "/") {
                path = path.substring(1);
            }
            var fullPath = getAbsolutePath(basePath + "/" + path + ".js");
            if (fullPath === currentFilePath) {
                throw new ModuleError("This module is attempting to load itself. Full path: " + currentFilePath);
            }
            var moduleName = fullPath;
            if (!moduleStorage[moduleName]) {
                moduleStorage[moduleName] = {
                    loaded: false
                };
            }
            var moduleSession = moduleStorage[moduleName];
            if (!moduleSession.loaded) {
                moduleSession.loaded = true;
                loadScript(fullPath);
            }
            return moduleSession ? moduleSession.definition : undefined;
        };
    }
    function define(dependencies, definition) {
        if (!Array.isArray(dependencies)) {
            throw new ModuleError("Invalid module dependencies.");
        }
        if (typeof definition === "undefined") {
            throw new ModuleError("Invalid module definition.");
        }
        var path = currentLoadingPath();
        var directory = getDirectoryFromFilePath(path);
        var require = createRequireFunction(directory, path);
        var moduleName = path;
        var moduleSession = moduleStorage[moduleName];
        if (!moduleSession) {
            moduleStorage[moduleName] = moduleSession = {
                loaded: true,
                directory: directory,
                require: require
            };
        }
        if (typeof definition === "function") {
            var modules = dependencies.slice(2).map(function (path) { return require(path); });
            var exports_1 = {};
            var params = [require, exports_1].concat(modules);
            definition.apply(undefined, params);
            moduleSession.definition = exports_1;
        }
        else {
            moduleSession.definition = definition;
        }
        return moduleSession.definition;
    }
    ;
    function main(config, entry) {
        if (typeof config !== "object") {
            throw new ModuleError("Requiring a valid config to start new module session.");
        }
        if (typeof entry !== "function") {
            throw new ModuleError("Entry to new module session is not valid, must be a function.");
        }
        moduleStorage = {};
        rootPath = config.path || rootPath;
        loadingPath = "";
        loadingDirectory = rootPath;
        var require = createRequireFunction(loadingDirectory);
        entry(require);
    }
    return {
        main: main, define: define
    };
})(ModuleError, SyntaxError, cc);
var define = module.define;
