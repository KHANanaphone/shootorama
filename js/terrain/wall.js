function Wall(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
      
        this.x = vars.x + vars.width / 2;
        this.y = vars.y + vars.height / 2;
        
        this.width = vars.width;
        this.height = vars.height;
        this.pushPriority = 9999;
        
        this.hitbox = {
            type: 'wall',
            collidesWith: ['enemy', 'player'],
            width: this.width,
            height: this.height
        };
    };
    
    function setupComponents(){
                       
        var rect = new createjs.Shape();
        rect.graphics.beginFill(vars.color ? vars.color : '#666')
            .drawRect(this.width / -2, this.height / -2, this.width, this.height);
        
        this.rect = rect;
        this.addChild(rect);
    };
};

(function(){
        
    var prototype = createjs.extend(Wall, createjs.Container);
      
    prototype.tick= function(){
    
    };
    
    prototype.handleCollision = function(obj){
        
    };
    
    Wall = createjs.promote(Wall, 'Container');
    Wall.initialized = true;
})();