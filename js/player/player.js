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
        this.health = 50;
        this.maxHealth = 50;
        
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
    prototype.takeDamage = Player.takeDamage;
    
    Player = createjs.promote(Player, 'Container');
    Player.initialized = true;
};

Player.SPEED = 3.6;
Player.DASH_COOLDOWN_TICKS = 90;
Player.DASH_THRESHOLD = 170;
Player.DASH_SPEED_MUL = 2.8;
Player.DASH_DURATION_TICKS = 11;
Player.HITBOX_SIZE = 35;

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

Player.takeDamage = function(source){

    this.health -= source.playerDamage;
    
    if(this.health < 0)
        this.health = 0;
    
    this.dispatchEvent('healthChanged');
}

Player.handleCollision = function(obj){
    
    if(obj.playerDamage)
        this.takeDamage(obj);        
    
    //center of this object to the center of the colliding object
    var xDist = obj.x - this.x;
    var yDist = obj.y - this.y;
    
    //how far away the objects have to be in this direction for them to be not touching
    var xBuffer = Math.abs(obj.hitbox.width + this.hitbox.width) / 2;
    var yBuffer = Math.abs(obj.hitbox.height + this.hitbox.height) / 2;    

    //how far this object would have to be moved to fix the collision
    var xPush, yPush;
    
    if(xDist > 0)
        xPush = obj.x - xBuffer - this.x;
    else
        xPush = obj.x + xBuffer - this.x;
    
    if(yDist > 0)
        yPush = obj.y - yBuffer - this.y;
    else
        yPush = obj.y + yBuffer - this.y;
    
    //push the least distance
    if(Math.abs(xPush) < Math.abs(yPush))
        this.x += xPush;
    else
        this.y += yPush;
};