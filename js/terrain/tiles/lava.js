function Lava(vars){
    
    this.spriteName = 'lava';    
    this.Tile_constructor(vars);
    this.playerDamage = 20;  
    this.caresAbout = {player : true};
};

(function(){
        
    var prototype = createjs.extend(Lava, Tile);
    
    prototype.handleStep = function(player){
        
        if(!player.isDashing())
            player.hit(this);
    };
    
    Lava = createjs.promote(Lava, 'Tile');
    Lava.initialized = true;
    
})();