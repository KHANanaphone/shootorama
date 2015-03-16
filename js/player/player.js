function Player(){
    
    if(!Player.initialized){
        Player.init();
        return new Player();
    }
    
    this.Container_constructor();
        
    setupComponents.bind(this)();
    makeHitbox.bind(this)();
    
    this.on('tick', this.tick);
    
    function setupComponents(){
        
        this.controls = new Controls(this);
        this.movement = new Movement(this);
    };
    
    function makeHitbox(){
        
        var circle = new createjs.Shape();
        circle.graphics.beginStroke("DeepSkyBlue").drawCircle(0, 0, 10);
        circle.x = 100;
        circle.y = 100;
        
        this.hitbox = circle;
        this.addChild(circle);
    };
};

Player.init = function(){

    var prototype = createjs.extend(Player, createjs.Container);
    
    prototype.setControl = Player.setControl;    
    prototype.tick = Player.tick; 
    
    Player = createjs.promote(Player, 'Container');
    Player.initialized = true;
};

Player.SPEED = 4;
Player.DASH_COOLDOWN_TICKS = 90;
Player.DASH_THRESHOLD = 170;
Player.DASH_SPEED_MUL = 3;
Player.DASH_DURATION_TICKS = 10;

Player.setControl = function(type, isDown){
    
    this.controls.setControl(type, isDown);
};

Player.tick = function(){
        
    this.movement.tick(this.controls.controlState);
}