function TransitionTrigger(side, x, y, width, height){
    
    this.Container_constructor();
      
    this.side = side;
    this.x = x;
    this.y = y;
    this.pushPriority = 9999;
        
    this.hitbox = {
        type: 'trigger',
        collidesWith: ['player'],
        width: width,
        height: height
    };
    
    this.targetId = null;
};

(function(){
        
    var prototype = createjs.extend(TransitionTrigger, createjs.Container);
    
    prototype.handleCollision = function(obj){
        
        if(!this.targetId)
            CollisionManager.push(this, obj);
        else
            Game.transitionRoom(this.side);
    };
    
    TransitionTrigger = createjs.promote(TransitionTrigger, 'Container');
    TransitionTrigger.initialized = true;
})();