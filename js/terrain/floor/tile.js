function Tile(vars){
    
    this.FloorObject_constructor(vars);

    if(!this.spriteName)
        this.spriteName = vars.spriteName ? vars.spriteName : 'tile'
        
    tileSprites.call(this);
    
    if(vars.step)
        this.step = vars.step;
    
    function tileSprites(){
        
        var xCount = this.width / 50;
        var yCount = this.height / 50;

        for(var x = 0; x < xCount; x++){
            for(var y = 0; y < yCount; y++){

                var sprite = SpriteManager.makeSprite(this.spriteName, true);

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