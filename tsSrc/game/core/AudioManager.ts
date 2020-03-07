export function playBackground() : void {
    cc.audioEngine.playMusic("", true);
}

export function pauseBackground() : void {
    cc.audioEngine.pauseMusic();
}