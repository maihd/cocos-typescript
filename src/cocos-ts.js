function __extends(Derive, Base) {
    for (var key in Base) {
        if (Base.hasOwnProperty(key)) {
            Derive[key] = Base[key];
        }
    }
    function Prototype() {
        this.constructor = Derive;
    }
    Derive.prototype = Base === null ? Object.create(Base) : (Prototype.prototype = Base.prototype, new Prototype());
}
(function () {
    "use strict";
    var classes = [
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
    if (typeof ccui === 'object') {
        var uiClasses = [
            "Widget"
        ];
        uiClasses.forEach(function (name) {
            ccui[name] = extend(ccui[name]);
        });
    }
    function extend(Base) {
        var ctor = Base.prototype.ctor;
        var Derive = function () {
            ctor && ctor.apply(this, arguments);
            defineProperties(this);
            return this;
        };
        __extends(Derive, Base);
        return Derive;
    }
    function defineProperties(target) {
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
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29jb3MtdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90c1NyYy9jb2Nvcy10cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSTtJQUUzQixLQUFLLElBQUksR0FBRyxJQUFJLElBQUksRUFDcEI7UUFDSSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQzVCO1lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQjtLQUNKO0lBRUQsU0FBUyxTQUFTO1FBRWQsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7SUFDOUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQ3JILENBQUM7QUFFRCxDQUFDO0lBQ0csWUFBWSxDQUFDO0lBRWIsSUFBSSxPQUFPLEdBQUc7UUFDVixNQUFNO1FBQ04sT0FBTztRQUNQLFFBQVE7UUFDUixjQUFjO1FBRWQsVUFBVTtRQUVWLE9BQU87UUFDUCxZQUFZO1FBQ1osZUFBZTtLQUNsQixDQUFDO0lBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUk7UUFDMUIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUM1QjtRQUNJLElBQUksU0FBUyxHQUFHO1lBQ1osUUFBUTtTQUNYLENBQUM7UUFDRixTQUFTLENBQUMsT0FBTyxDQUFDLFVB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