import { SplashScene } from "./game/SplashScene";

export function startGame() : void {
    cc.log("START GAME ENTRY");

    cc.director.runScene(new SplashScene());
}
