define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function playBackground() {
        cc.audioEngine.playMusic("", true);
    }
    exports.playBackground = playBackground;
    function pauseBackground() {
        cc.audioEngine.pauseMusic();
    }
    exports.pauseBackground = pauseBackground;
});
