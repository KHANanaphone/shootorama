function TransitionTrigger(side, x, y, width, height){
    
    this.Container_constructor();
      
    this.side = side;
    this.x = x;
    this.y = y;
    this.persistence = 'persist';
    this.pushPriority = 9999;
    this.ignoreTiles = true;
        
    this.hitbox = {
        type: 'transitionTrigger',
        collidesWith: ['player', 'enemy'],
        width: width,
        height: height
    };
};

(function(){
        
    var prototype = createjs.extend(TransitionTrigger, createjs.Container);
    
    prototype.handleCollision = function(obj){
        
        if(!Game.playingArea.ready)
            return;
        
        if(obj.hitbox.type == 'enemy' || !Game.tryTransitionRoom(this.side))
            CollisionManager.push(this, obj);  
    };
    
    TransitionTrigger = createjs.promote(TransitionTrigger, 'Container');
    TransitionTrigger.initialized = true;
})();