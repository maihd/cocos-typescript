"use strict";
        
cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // Uncomment the following line to set a fixed orientation for your game
    // cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);

    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    requirejs.config({
        //By default load any module IDs from js/lib
        baseUrl: 'src',
    
        //except, if the module ID starts with "app",
        //load it from the js/app directory. paths
        //config is relative to the baseUrl, and
        //never includes a ".js" extension since
        //the paths config could be for a directory.
        paths: {
        }
    });

    requirejs(["cocos-ts", "app"], function (_, app) {
        app.startGame();
    });
};

cc.game.run();