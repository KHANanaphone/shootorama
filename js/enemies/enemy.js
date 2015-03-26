function Enemy(vars){
    
    if(!Enemy.initialized){
        Enemy.init();
        return new Enemy(vars);
    }
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        
        this.size = vars.size ? vars.size : 20;        
        
        this.hitbox = {
            type: 'enemy',
            collidesWith: ['player','enemy','wall'],
            width: this.size,
            height: this.size
        };
    };
    
    function setupComponents(){
                       
        var circle = new createjs.Shape();
        circle.graphics.beginStroke("Red")
            .drawRect(this.size / -2, this.size / -2, this.size, this.size);
        
        this.circle = circle;
        this.addChild(circle);
    };
    
    function setupEvents(){
    
        this.on('tick', this.tick);
    }
};

Enemy.init = function(){
        
    var prototype = createjs.extend(Enemy, createjs.Container);
      
    prototype.tick = Enemy.tick; 
    prototype.hitTest = Enemy.hitTest;
    prototype.handleCollision = Enemy.handleCollision;
    
    Enemy = createjs.promote(Enemy, 'Container');
    Enemy.initialized = true;
}

Enemy.handleCollision = function(obj){
    
}

Enemy.tick = function(){
    
}