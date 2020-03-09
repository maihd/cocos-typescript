"use strict";

/**
 * ModuleErrorCode
 */
const ModuleErrorCode = {

};

/**
 * ModuleError
 * @param {string} message 
 */
const ModuleError = (function (Error, Object) {  
    function ModuleError(message)
    {
        // Super constructor
        Error.call(this);

        // Fields override
        this.name    = "ModuleError";
        this.message = message;
    };

    ModuleError.prototype = Object.create(Error.prototype);
    ModuleError.prototype.constructor = ModuleError;

    return ModuleError;
})(Error, Object);

/**
 * The module manager
 */
const module = (function (ModuleError, SyntaxError, cc) {
    const LOG_TAG = "[Module]";
    const PATH_REGEXP = /^(\.|\.\.|[a-zA-Z0-9\_\-]+)?(\/(\.|\.\.|[a-zA-Z0-9\_\-\.]+))*$/;

    let moduleStorage = {};

    let rootPath         = "";
    let loadingPath      = "";
    let loadingDirectory = "";

    function logVerbose()
    {
        cc.log.apply(undefined, [ LOG_TAG, ...Array.from(arguments) ]);
    }

    function currentLoadingPath()
    {
        return loadingPath;
    }

    function currentLoadingDirectory()
    {
        return loadingDirectory;
    }

    /**
     * Convert relative path to absolute path
     * @param {string} path relative path
     * @returns {string} absolute path
     */ 
    function getAbsolutePath(path)
    {
        // We should announce the path is invalid to others
        if (!PATH_REGEXP.test(path))
        {
            throw new ModuleError(`Path is not valid: ${path}`);
        }

        let result = "";

        let parts = path.split("/");
        for (let i = 0, n = parts.length; i < n; i++)
        {
            let part = parts[i];

            if (part === ".")
            {
                continue;
            }
            else if (part === "..")
            {
                let lastIndex = result.lastIndexOf("/");
                result = result.substring(0, lastIndex);
            }
            else
            {
                if (result.length > 0)
                {
                    result += "/" + part;
                }
                else
                {
                    result = part;
                }
            }
        }

        return result;
    }

    //
    function getDirectoryFromFilePath(path)
    {
        let directory = path.substring(0, path.lastIndexOf("/"));
        return directory;
    }

    /** 
     * Load script
     * @param {string} path
     */
    function loadScript(path)
    {
        let directory = getDirectoryFromFilePath(path);

        //let oldLoadingPath = loadingPath;
        //let oldLoadingDirectory = loadingDirectory;

        loadingPath = path;
        loadingDirectory = directory;

        try
        {
            require(path);
            cc.sys.cleanScript(path);
        }
        catch (e)
        {
            let reason = "";
            if (e instanceof SyntaxError)
            {
                reason = `SyntaxError: ${path}:${e.lineNumber}:${e.columnNumber}:${e.message}`;
                logVerbose(reason);
            }
            else
            {
                reason = `Failed to load script: ${path}`;
                logVerbose(reason, e.message);
            }

            throw new ModuleError(reason);
        }

        //loadingPath = oldLoadingPath;
        //loadingDirectory = oldLoadingDirectory;
    }

    /** 
     * Create a module dependent require function
     * @param {string} basePath
     * @returns {Function}
     */
    function createRequireFunction(basePath, currentFilePath)
    {
        return function(path) {
            //logVerbose("============================modulejs: basePath: " + basePath + ", path: " + path);

            while (path.substring(0, 1) == "/")
            {
                path = path.substring(1);
            }

            let fullPath = getAbsolutePath(`${basePath}/${path}.js`);
            if (fullPath === currentFilePath)
            {
                throw new ModuleError(`This module is attempting to load itself. Full path: ${currentFilePath}`);
            }

            let moduleName = fullPath;
            if (!moduleStorage[moduleName])
            {
                moduleStorage[moduleName] = {
                    loaded: false,
                };
            }

            let moduleSession = moduleStorage[moduleName];
            if (!moduleSession.loaded)
            {
                moduleSession.loaded = true;

                loadScript(fullPath);
            }
    
            return moduleSession ? moduleSession.definition : undefined;
        };
    }

    /**
     * Define new module
     * @param {number|array|object|function} define Module defenition
     * @return {any} defined module 
     */
    function define(dependencies, definition)
    {
        // Make sure dependencies is valid: must be an array of string
        if (!Array.isArray(dependencies))
        {
            throw new ModuleError("Invalid module dependencies.");
        }

        // Make sure definition is valid: not null nor undefined
        if (typeof definition === "undefined")
        {
            throw new ModuleError("Invalid module definition.");
        }

        // Dependencies of module
        let path        = currentLoadingPath();
        let directory   = getDirectoryFromFilePath(path);
        let require     = createRequireFunction(directory, path);
        
        // Define new module metadata
        let moduleName = path;
        let moduleSession = moduleStorage[moduleName];
        if (!moduleSession)
        {
            moduleStorage[moduleName] = moduleSession = {
                loaded: true,
                directory: directory,
                require: require,
            };
        }

        // Define true module
        if (typeof definition === "function")
        {
            let modules = dependencies.slice(2).map((path) => require(path));
            let exports = {};
            let params = [ require, exports, ...modules ];

            definition.apply(undefined, params);
            moduleSession.definition = exports;
        }
        else
        {
            moduleSession.definition = definition;
        }

        // Done.
        return moduleSession.definition;
    };

    /**
     * Main to the module session
     * @param {object} config
     * @param {function} entry
     * @return {void}
     */
    function main(config, entry)
    {
        if (typeof config !== "object")
        {
            throw new ModuleError("Requiring a valid config to start new module session.");
        }

        if (typeof entry !== "function")
        {
            throw new ModuleError("Entry to new module session is not valid, must be a function.");
        }

        // Clear loaded modules
        moduleStorage       = {}

        // Set new session fields
        rootPath            = config.path || rootPath;
        loadingPath         = "";
        loadingDirectory    = rootPath;

        // Start the entry
        let require = createRequireFunction(loadingDirectory);
        entry(require);
    }

    // Export
    return {
        main: main, define: define
    };
})(ModuleError, SyntaxError, cc);

/**
 * Define new module
 * @param {number|array|object|function} define Module defenition
 * @return {any} defined module 
 */
const define = module.define;