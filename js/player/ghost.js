function Ghost(player){
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();
    
    function setupVars(){

        this.player = player;
        this.x = player.x;
        this.y = player.y;
        this.rotation = player.rotation;
        this.triggered = false;
        this.startup = 8;
        
        this.hitbox = {
            type: 'ghost',
            collidesWith: ['enemy'],
            width: this.player.size,
            height: this.player.size
        };
    };
    
    function setupComponents(){
               
        var rect = new createjs.Shape();
        rect.graphics.beginStroke("SeaGreen").drawRect(
            player.size / -2, 
            player.size / -2,
            player.size, 
            player.size);

        this.addChild(rect);
    };
    
    function setupEvents(){
    
        var self = this;
        
        this.on('tick', this.tick);
    }
};

(Ghost.init = function(){
    
    var prototype = createjs.extend(Ghost, createjs.Container);
      
    prototype.tick = function(){

        if(this.startup){
            this.startup--;
            return;
        }
        
        this.alpha -= 0.05;

        if(this.alpha <= 0)
            this.player.destroyGhost();
    };
    
    prototype.handleCollision = function(obj){
        
        if(this.triggered)
            return;
        if(!obj.triggersGhost)
            return;        
        if(this.startup)
            return;
        
        this.triggered = true;
        this.player.movementManager.resetDash();
        obj.triggerGhost();
    };
    
    Ghost = createjs.promote(Ghost, 'Container');
    Ghost.initialized = true;
})();