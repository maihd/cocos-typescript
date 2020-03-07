define(["require", "exports", "./game/scenes/SplashScene"], function (require, exports, SplashScene_1) {
    "use strict";
    exports.__esModule = true;
    function startGame() {
        cc.log("START GAME ENTRY");
        cc.director.runScene(new SplashScene_1.SplashScene());
    }
    exports.startGame = startGame;
});
