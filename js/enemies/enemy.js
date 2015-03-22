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
        
        this.size = vars.size ? vars.size : 10;        
        
        this.hitbox = {
            shape: 'circle',
            radius: this.size
        };
    };
    
    function setupComponents(){
                       
        var hitbox = new createjs.Shape();
        hitbox.graphics.beginStroke("Red").drawCircle(0, 0, this.size);
        
        this.hitbox = hitbox;
        this.addChild(hitbox);
    };
    
    function setupEvents(){
    
        this.on('tick', this.tick);
    }
};

Enemy.init = function(){
        
    var prototype = createjs.extend(Enemy, createjs.Container);
      
    prototype.tick = Enemy.tick; 
    prototype.hitTest = Enemy.hitTest;
    
    Enemy = createjs.promote(Enemy, 'Container');
    Enemy.initialized = true;
}

Enemy.tick = function(){
    
}