GMMDictionary.prototype = Object.create(Object.prototype);
GMMDictionary.prototype.constructor = GMMDictionary;

Object.defineProperties(GMMDictionary.prototype, {
    /**
     * @member {Object}
     * @memberof GMMDictionary#
     */
    map: {
        value: null,
        writable: true
    },
    /**
     * @member {number}
     * @memberof GMMDictionary#
     */
    length: {
        get: function () {
            return this.size();
        }
    }
});

/**
 *
 * @constructor
 */
function GMMDictionary() {
    Object.call(this);
    this.map = {};
    this.init();
}

GMMDictionary.prototype.init = function () {

};

GMMDictionary.prototype.put = function (key, value) {
    cc.log("Key:" + key + "; Value: " + value);
    this.map[key] = value;
    cc.log("Check: [" + key + "] = " + this.getValue(key));
};

GMMDictionary.prototype.get = function (key) {
    this.getValue(key);
};

GMMDictionary.prototype.remove = function (key) {
    this.map[key] = undefined;
    delete this.map[key];
};

GMMDictionary.prototype.containsKey = function (key) {
    return this.map.hasOwnProperty(key);
};

GMMDictionary.prototype.containsValue = function (value) {
    for (var key in this.map) {
        if (this.map[key] === value) {
            return true;
        }
    }
    return false;
};

GMMDictionary.prototype.getKey = function (value) {
    var identifier = undefined;
    for (var key in this.map) {
        if (this.map[key] === value) {
            identifier = key;
            return identifier;
        }
    }
    return identifier;
};

GMMDictionary.prototype.getKeys = function () {
    var keys = [];
    for (var key in this.map) {
        keys.push(key);
    }
    return keys;
};

GMMDictionary.prototype.getValue = function (key) {
    return this.map[key];
};

GMMDictionary.prototype.getValues = function (key) {
    var values = [];
    for (var key in this.map) {
        values.push(this.map[key]);
    }
    return values;
};

GMMDictionary.prototype.size = function () {
    var length = 0;
    for (var key in this.map) {
        length++;
    }
    return length;
};

GMMDictionary.prototype.isEmpty = function () {
    return this.size() <= 0;
};

GMMDictionary.prototype.reset = function () {
    for (var key in this.map) {
        map[key] = undefined;
    }
};

GMMDictionary.prototype.resetAllExcept = function (keyId) {
    for (var key in this.map) {
        if (key !== keyId) {
            this.map[key] = undefined;
        }
    }
};

GMMDictionary.prototype.clear = function () {
    for (var key in this.map) {
        this.remove(key);
    }
};

GMMDictionary.prototype.clearAllExcept = function (keyId) {
    for (var key in this.map) {
        if (key !== keyId) {
            this.remove(key);
        }
    }
};

GMMDictionary.prototype.getMap = function () {
    return this.map;
};