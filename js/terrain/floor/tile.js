function Tile(vars){
    
    this.FloorObject_constructor(vars);
    
    tileSprites.call(this);
    
    function tileSprites(){
        
        var xCount = this.width / 50;
        var yCount = this.height / 50;

        for(var x = 0; x < xCount; x++){
            for(var y = 0; y < yCount; y++){

                var sprite = SpriteManager.makeSprite('tile', true);

                sprite.x = x * 50;
                sprite.y = y * 50;

                this.addChild(sprite);
            }
        }; 
    };       
};

(function(){
        
    var prototype = createjs.extend(Tile, FloorObject);
    Tile = createjs.promote(Tile, 'FloorObject');
    Tile.initialized = true;
})();