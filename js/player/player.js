function Player(){
    
    if(!Player.initialized){
        Player.init();
        return new Player();
    }
    
    this.Container_constructor();
        
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();
    
    function setupVars(){

        this.x = 100;
        this.y = 100;
        this.size = Player.HITBOX_SIZE;
        
        this.controlsManager = new ControlsManager(this);
        this.movementManager = new MovementManager(this);
        this.weaponManager = new WeaponManager(this);
        
        this.hitbox = {
            type: 'player',
            collidesWith: ['enemy','wall'],
            width: this.size,
            height: this.size
        };
    };
    
    function setupComponents(){
        
        var rect = new createjs.Shape();
        this.rect = rect;
        rect.graphics
            .beginStroke("DeepSkyBlue")
            .drawRect(
            this.size / -2, 
            this.size / -2,
            this.size, 
            this.size);
        
        this.addChild(rect);
        
        var front = new createjs.Shape();
        front.graphics.beginStroke("DeepSkyBlue").moveTo(5,0).lineTo(15, 0);
        this.addChild(front);        
    };
    
    function setupEvents(){
        
        this.on('tick', this.tick);
    }
};

Player.init = function(){

    var prototype = createjs.extend(Player, createjs.Container);
    
    prototype.setControl = Player.setControl;    
    
    prototype.tick = Player.tick; 
    prototype.dash = Player.dash;
    prototype.handleCollision = Player.handleCollision;
    
    Player = createjs.promote(Player, 'Container');
    Player.initialized = true;
};

Player.SPEED = 3.6;
Player.DASH_COOLDOWN_TICKS = 90;
Player.DASH_THRESHOLD = 170;
Player.DASH_SPEED_MUL = 2.8;
Player.DASH_DURATION_TICKS = 11;
Player.HITBOX_SIZE = 20;

Player.setControl = function(type, isDown){
    
    this.controlsManager.setControl(type, isDown);
};

Player.tick = function(){
        
    this.movementManager.tick(this.controlsManager.controlState);
    this.weaponManager.tick(this.controlsManager.controlState);
};

Player.dash = function(){
  
    var ghost = new Ghost(this);
    Game.playingArea.addChild(ghost);
};

Player.handleCollision = function(obj){
    
    var xDist = obj.x - this.x;
    var yDist = obj.y - this.y;
    var xBuffer = Math.abs(obj.hitbox.width + this.hitbox.width) / 2;
    var yBuffer = Math.abs(obj.hitbox.height + this.hitbox.height) / 2;
    
    if(Math.abs(xDist) > Math.abs(yDist)){
        
        //xPush
        if(xDist > 0)
            this.x = obj.x - xBuffer;
        else
            this.x = obj.x + xBuffer;
    }
    else{
        
        //yPush
        if(yDist > 0)
            this.y = obj.y - yBuffer;
        else
            this.y = obj.y + yBuffer;
    }
};