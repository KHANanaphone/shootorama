function PlayingArea(){
    
    if(!PlayingArea.initialized){
        PlayingArea.init();
        return new PlayingArea();
    }
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();    
    
    function setupVars(){
        
        this.collisionManager = new CollisionManager(this);
    };
    
    function setupComponents(){
        
        var boundary = new createjs.Shape();
        boundary.graphics.beginStroke('Black').drawRect(0, 0, 1000, 600); 
        this.addChild(boundary);
        this.boundary = boundary;
    };
    
    function setupEvents(){
        
        this.on('tick', this.tick);
    };
}

PlayingArea.init = function(){
    
    var prototype = createjs.extend(PlayingArea, createjs.Container);
    
    prototype.tick = PlayingArea.tick;
    
    PlayingArea = createjs.promote(PlayingArea, 'Container');
    PlayingArea.initialized = true;
}

PlayingArea.tick = function(){
    
    this.collisionManager.detectCollisions();
}