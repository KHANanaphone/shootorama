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
        this.size = Player.HITBOX_RADIUS;
        
        this.controlsManager = new ControlsManager(this);
        this.movementManager = new MovementManager(this);
        this.weaponManager = new WeaponManager(this);
    };
    
    function setupComponents(){
        
        var hitbox = new createjs.Shape();
        hitbox.graphics.beginStroke("DeepSkyBlue").drawCircle(0, 0, Player.HITBOX_RADIUS);
        this.addChild(hitbox);
        
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
    prototype.hitTest = Player.hitTest;
    
    Player = createjs.promote(Player, 'Container');
    Player.initialized = true;
};

Player.SPEED = 3.6;
Player.DASH_COOLDOWN_TICKS = 90;
Player.DASH_THRESHOLD = 170;
Player.DASH_SPEED_MUL = 2.8;
Player.DASH_DURATION_TICKS = 11;
Player.HITBOX_RADIUS = 10;

Player.setControl = function(type, isDown){
    
    this.controlsManager.setControl(type, isDown);
};

Player.tick = function(){
        
    this.movementManager.tick(this.controlsManager.controlState);
    this.weaponManager.tick(this.controlsManager.controlState);
};

Player.dash = function(){
  
    var ghost = new Ghost(this);
    this.stage.addChild(ghost);
};

Player.hitTest = function(x, y){

    var xDiff = this.x - x;
    var yDiff = this.y - y;
    
    if(Math.sqrt(xDiff * xDiff + yDiff * yDiff) < this.hitboxRadius)
        return true;
    
    return false;
};