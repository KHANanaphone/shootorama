function Ghost(player){
    
    if(!Ghost.initialized){
        Ghost.init();
        return new Ghost(player);
    }
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();
    
    function setupVars(){

        this.player = player;
        this.x = player.x;
        this.y = player.y;
    };
    
    function setupComponents(){
               
        var hitbox = new createjs.Shape();
        hitbox.graphics.beginStroke("SeaGreen").drawCircle(0, 0, 10);
        
        this.hitbox = hitbox;
        this.addChild(hitbox);
    };
    
    function setupEvents(){
    
        this.on('tick', this.tick);
    }
};

Ghost.init = function(){
    
    var prototype = createjs.extend(Ghost, createjs.Container);
      
    prototype.tick = Ghost.tick; 
    
    Ghost = createjs.promote(Ghost, 'Container');
    Ghost.initialized = true;
};

Ghost.tick = function(){
    
    this.alpha -= 0.04;
    
    if(this.alpha <= 0)
        this.stage.removeChild(this);
}