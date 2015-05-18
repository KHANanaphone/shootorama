function Lava(vars){
    
    this.FloorObject_constructor(vars);
    
    this.playerDamage = 20;
    
    tileSprites.call(this);
    
    function tileSprites(){
        
        var xCount = this.width / 50;
        var yCount = this.height / 50;

        for(var x = 0; x < xCount; x++){
            for(var y = 0; y < yCount; y++){

                var sprite = SpriteManager.makeSprite('lava', true);

                sprite.x = x * 50;
                sprite.y = y * 50;

                this.addChild(sprite);
            }
        }; 
    };       
};

(function(){
        
    var prototype = createjs.extend(Lava, FloorObject);
    
    prototype.step = function(player){
        
        if(!player.isDashing())
            player.hit(this);
    };
    
    Lava = createjs.promote(Lava, 'FloorObject');
    Lava.initialized = true;
})();