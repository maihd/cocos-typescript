declare namespace cc {
    export module textureCache {
        function addETCImage(fileName: string) : Texture2D;
        function addPVRImage(fileName: string) : Texture2D;
        function addPVRTCImage(fileName: string) : Texture2D;
        function cacheImage(fileName: string, image: Image) : void;
        function description() : string;
        function getKeyByTexture(texture: Texture2D) : string | null;
        function getTextureColors(texture: Texture2D) : Color[];
        function getTextureForKey(key: string) : Texture2D | null;
        function removeAllTextures() : void;
        function removeTexture(texture: Texture2D);
        function removeTextureForKey(key: string);
        function addImageAsync(fileName: string, callback?: (texture?: Texture2D) => void) : void;
    }
}