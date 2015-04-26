function Exit(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        this.roomId = vars.roomId;
        
        this.size = 20;
        
        this.hitbox = {
            type: 'exit',
            collidesWith: ['player'],
            width: this.size,
            height: this.size
        };
    };
    
    function setupComponents(){
                       
        var circle = new createjs.Shape();
        circle.graphics.beginFill('#D38')
            .drawCircle(0, 0, this.size);
        circle.alpha = 0.4;
        this.addChild(circle);
    };
};

(function(){
        
    var prototype = createjs.extend(Exit, createjs.Container);
    
    prototype.handleCollision = function(obj){
        
        Game.fadeInRoom(this.roomId);
    };
    
    Exit = createjs.promote(Exit, 'Container');
    Exit.initialized = true;
})();