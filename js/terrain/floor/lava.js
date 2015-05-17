function Lava(vars){
    
    this.FloorObject_constructor(vars);
    
    this.playerDamage = 20;
    
    var red = new createjs.Shape();
    red.graphics.beginFill('red').drawRect(0, 0, vars.width, vars.height);
    this.addChild(red);
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