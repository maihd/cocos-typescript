"use strict";
function __extends(Derive, Base) {
    for (var key in Base) {
        if (Base.hasOwnProperty(key)) {
            Derive[key] = Base[key];
        }
    }
    Derive.prototype = Object.create(Base.prototype);
}
function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m)
        return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length)
                o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}
;
(function (global) {
    var classes = [
        "Node",
        "Scene",
        "Layer",
        "LayerColor",
        "LayerGradient",
    ];
    classes.forEach(function (name) {
        var result = extend(cc[name], "cc." + name);
        cc[name] = result;
        if (global) {
            global[name] = result;
        }
    });
    if (typeof ccui === "object") {
        var uiClasses = [
            "Widget",
        ];
        uiClasses.forEach(function (name) {
            var result = extend(ccui[name], "ccui." + name);
            ccui[name] = result;
            if (global) {
                global["UI" + name] = result;
            }
        });
    }
    function extend(Base, className) {
        cc.log("create class name: " + className);
        var ctor = Base.prototype.ctor;
        var Derive = function () {
            ctor && ctor.apply(this, arguments);
            return this;
        };
        __extends(Derive, Base);
        defineNodeProperties(Derive.prototype, className);
        return Derive;
    }
    function defineNodeProperties(target, className) {
        Object.defineProperties(target, {
            className: {
                writable: false,
                value: className
            },
            width: {
                get: function () {
                    return this.getContentSize().width;
                }
            },
            height: {
                get: function () {
                    return this.getContentSize().height;
                }
            },
            x: {
                get: function () {
                    return this.getPositionX();
                },
                set: function (value) {
                    this.setPositionX(value);
                }
            },
            y: {
                get: function () {
                    return this.getPositionY();
                },
                set: function (value) {
                    this.setPositionY(value);
                }
            },
            position: {
                get: function () {
                    return this.getPosition();
                },
                set: function (value) {
                    this.setPosition(value);
                }
            },
            normalizedPosition: {
                get: function () {
                    return this.getNormalizedPosition();
                },
                set: function (value) {
                    this.setNormalizedPosition(value);
                }
            },
            scale: {
                get: function () {
                    return this.getScale();
                },
                set: function (value) {
                    this.setScale(value);
                }
            },
            scaleX: {
                get: function () {
                    return this.getScaleX();
                },
                set: function (value) {
                    this.setScaleX(value);
                }
            },
            scaleY: {
                get: function () {
                    return this.getScaleY();
                },
                set: function (value) {
                    this.setScaleY(value);
                }
            },
            rotation: {
                get: function () {
                    return this.getRotation();
                },
                set: function (value) {
                    this.setRotation(value);
                }
            }
        });
    }
})(undefined);
