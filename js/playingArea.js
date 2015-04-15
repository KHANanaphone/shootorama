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
    
        var leftWall = new Wall({x: 5, y: 300, width: 10, height: 600}); 
        var rightWall = new Wall({x: 995, y: 300, width: 10, height: 600});
        var topWall = new Wall({x: 500, y: 5, width: 1000, height: 10}); 
        var botWall = new Wall({x: 500, y: 595, width: 1000, height: 10});
        this.addChild(leftWall);
        this.addChild(rightWall);
        this.addChild(topWall);
        this.addChild(botWall);
    };
    
    function setupEvents(){
        
        this.on('tick', this.tick);
    };
}

PlayingArea.init = function(){
    
var prototype = createjs.extend(PlayingArea, createjs.Container);

    prototype.tick = function(){
        
        this.collisionManager.detectCollisions();
    }
    
    PlayingArea = createjs.promote(PlayingArea, 'Container');
    PlayingArea.initialized = true;
}

