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

(function () {
    "use strict";

    let classes = [
        "Node",
        "Scene",
        "Sprite",
        "ClippingNode",

        "LabelTTF",

        "Layer",
        "LayerColor",
        "LayerGradient",
    ];
    classes.forEach(function (name) {
        cc[name] = extend(cc[name]);
    });

    if (typeof ccui === 'object')
    {
        let uiClasses = [
            "Widget"
        ];
        uiClasses.forEach(function (name) {
            ccui[name] = extend(ccui[name]);
        });
    }

    function extend(Base)
    {
        let ctor = Base.prototype.ctor;
        let Derive = function () {
            ctor && ctor.apply(this, arguments);
            defineProperties(this);
            
            return this;
        };
        __extends(Derive, Base);
        return Derive;
    }
        
    function defineProperties(target)
    {
        Object.defineProperties(target, {
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
            }
        });
    }
})();