define(["require", "exports", "./AudioManager"], function (require, exports, AudioManager_1) {
    "use strict";
    exports.__esModule = true;
    var state = {
        isPlayingMusic: false
    };
    function isPlayingMusic() {
        state.isPlayingMusic = cc.sys.localStorage.getItem("") == "1";
        if (state.isPlayingMusic) {
            AudioManager_1.playBackground();
        }
        return state.isPlayingMusic;
    }
    exports.isPlayingMusic = isPlayingMusic;
});
