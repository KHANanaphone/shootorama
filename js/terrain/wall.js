function Wall(vars){
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        
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
        rect.graphics.beginFill('#666')
            .drawRect(this.width / -2, this.height / -2, this.width, this.height);
        
        this.rect = rect;
        this.addChild(rect);
    };
    
    function setupEvents(){
    
        this.on('tick', this.tick);
    }
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