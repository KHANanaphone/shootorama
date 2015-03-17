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
        this.controls = new Controls(this);
        this.movement = new Movement(this);
    };
    
    function setupComponents(){
        
        var hitbox = new createjs.Shape();
        hitbox.graphics.beginStroke("DeepSkyBlue").drawCircle(0, 0, 10);
        this.hitbox = hitbox;
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
    
    Player = createjs.promote(Player, 'Container');
    Player.initialized = true;
};

Player.SPEED = 3.6;
Player.DASH_COOLDOWN_TICKS = 90;
Player.DASH_THRESHOLD = 170;
Player.DASH_SPEED_MUL = 2.8;
Player.DASH_DURATION_TICKS = 11;

Player.setControl = function(type, isDown){
    
    this.controls.setControl(type, isDown);
};

Player.tick = function(){
        
    this.movement.tick(this.controls.controlState);
};

Player.dash = function(){
  
    var ghost = new Ghost(this);
    this.stage.addChild(ghost);
};