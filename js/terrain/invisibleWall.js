function InvisibleWall(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    
    function setupVars(){
      
        this.x = vars.x + vars.width / 2;
        this.y = vars.y + vars.height / 2;
        
        this.width = vars.width;
        this.height = vars.height;
        this.pushPriority = 9999;
        this.persistence = 'persist';
        
        this.hitbox = {
            type: '???',
            collidesWith: vars.stops,
            width: this.width,
            height: this.height
        };
    };
};

(function(){
        
    var prototype = createjs.extend(InvisibleWall, createjs.Container);
    
    prototype.handleCollision = function(obj){
        
        CollisionManager.push(this, obj);
    };
    
    InvisibleWall = createjs.promote(InvisibleWall, 'Container');
    InvisibleWall.initialized = true;
})();