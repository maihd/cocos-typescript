import { playBackground } from "./AudioManager";

type GameState = {
    isPlayingMusic : boolean
}

const state : GameState = {
    isPlayingMusic: false
};

export function isPlayingMusic() : boolean {
    state.isPlayingMusic = cc.sys.localStorage.getItem("") == "1";
    if (state.isPlayingMusic)
    {
        playBackground();
    }
    return state.isPlayingMusic;
}