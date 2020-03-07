"use strict";

function __extends(Derive, Base) 
{
    for (let key in Base)
    {
        if (Base.hasOwnProperty(key))
        {
            Derive[key] = Base[key];
        }
    }

    function Prototype()
    {
        this.constructor = Derive;
    }

    Derive.prototype = Base === null ? Object.create(Base) : (Prototype.prototype = Base.prototype, new Prototype());
}

function __values(o) 
{
    let m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);

    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};

(function (global) {
    let classes = [
        "Node",
        "Scene",
        "Layer",
        "LayerColor",
        "LayerGradient",
    ];
    classes.forEach(function (name) {
        let result = extend(cc[name], "cc." + name);
        cc[name] = result;

        if (global)
        {
            global[name] = result;
        }
    });

    if (typeof ccui === "object")
    {
        let uiClasses = [
            "Widget",
        ];
        uiClasses.forEach(function (name) {
            let result = extend(ccui[name], "ccui." + name);
            ccui[name] = result;
            
            if (global)
            {
                global["UI" + name] = result;
            }
        });
    }

    function extend(Base, className)
    {
        cc.log("create class name: " + className);

        let ctor = Base.prototype.ctor;
        let Derive = function () {
            ctor && ctor.apply(this, arguments);
            return this;
        };

        __extends(Derive, Base);
        Object.defineProperty(Derive, "className", { 
            writable: false, 
            value: className
        });

        defineNodeProperties(Derive.prototype, className);

        return Derive;
    }
        
    function defineNodeProperties(target, className)
    {
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
                },
            },
            
            scaleX: {
                get: function () {
                    return this.getScaleX();
                },

                set: function (value) {
                    this.setScaleX(value);
                },
            },
            
            scaleY: {
                get: function () {
                    return this.getScaleY();
                },

                set: function (value) {
                    this.setScaleY(value);
                },
            },

            rotation: {
                get: function () {
                    return this.getRotation();
                },

                set: function (value) {
                    this.setRotation(value);
                }
            },
        });
    }
})(undefined);