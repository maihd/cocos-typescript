import SplashScene from "./game/scenes/SplashScene";

export function startGame() : void {
    cc.log("START GAME ENTRY");

    cc.director.runScene(new SplashScene());
}
