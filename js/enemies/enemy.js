function Enemy(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    setupEvents.call(this);
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        this.maxHealth = this.health;
        
        if(!this.scale)
            this.scale = 1;
        
        this.size = 40 * this.scale;
           
        this.knockback = {            
            ticks: 9,
            velocity: 2
        };
        
        this.hitbox = {
            type: 'enemy',
            collidesWith: ['player','enemy','wall'],
            width: this.size * 0.85,
            height: this.size * 0.85
        };
        
        this.comboManager = new ComboManager(this, vars.combo);        
        this.statedef = new Statedef();
    };
    
    function setupComponents(){
                  
        this.sprite = 
            SpriteManager.makeSprite(this.spriteName).set({
            regX: this.size / 2 / this.scale,
            regY: this.size / 2 / this.scale,
            scaleX: this.scale,
            scaleY: this.scale
        });                
        this.addChild(this.sprite);
        
//        this.rect = new createjs.Shape();
//        this.rect.graphics.beginStroke("Red")
//            .drawRect(this.hitbox.width / -2, 
//                      this.hitbox.height / -2, 
//                      this.hitbox.width, 
//                      this.hitbox.height); 
//        this.addChild(this.rect);
        
        this.healthMeter = new EnemyHealthMeter(this);
        this.addChild(this.healthMeter);
        
        this.comboRingInner = new createjs.Shape();
        this.addChild(this.comboRingInner);
        
        this.comboRingOuter = new createjs.Shape();
        this.addChild(this.comboRingOuter);
    };
    
    function setupEvents(){
    
        this.on('tick', this.tick);
    }
};

(function(){
        
    var prototype = createjs.extend(Enemy, createjs.Container);
      
    prototype.refreshCache = function(){
    
        this.sprite.cache(0, 0, this.size, this.size);        
    };
    
    prototype.tick = function(){    
        
        this.comboManager.tick(this.comboRingInner, this.comboRingOuter);
        this.healthMeter.tick();
        
        if(this['state_' + this.statedef.id])
            this['state_' + this.statedef.id]();
        else{
            console.error('State not found: ' + this.statedef.id);
            this.statedef.changeState('initial');
        }            
 
        this.statedef.time++;
    };
    
    prototype.handleCollision = function(obj){
    
        if (obj.hitbox.type == 'enemy' || obj.hitbox.type == 'wall')
            CollisionManager.push(this, obj);
    };
    
    prototype.takeDamage = function(source){
    
        if (this.dead)
            return;

        var damage = source.damage;
        damage *= this.comboManager.hit();

        var event = new createjs.Event('healthChanged');
        event.oldHealth = this.health;
        
        this.health -= damage;
        event.newHealth = this.health;
        
        this.dispatchEvent(event);

        if (this.health <= 0 ) {

            this.health = 0;
            this.die();
        }        
    };
    
    prototype.die = function(){
    
        this.dead = true;
        this.parent.removeChild(this);        
    };
    
    prototype.move = function(vector, angle){
        
        this.x += vector.x * 0.75;
        this.y += vector.y * 0.75;
        this.sprite.rotation = angle;
    };
    
    //distance from player in ticks
    prototype.playerDistance = function(){  
        
        var vector = this.playerVector();
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    };
    
    //Distance from player in a vector. If a 'length' is specified, the
    //vector will be of that length instead.
    prototype.playerVector = function(length){
        
        var vector = {x: Game.player.x - this.x, y: Game.player.y - this.y};
        
        if(!length)
            return vector;
        
        var pLength = this.playerDistance();
        vector.x = length * vector.x / pLength;
        vector.y = length * vector.y / pLength;
        
        return vector;
    };
    
    //angle from player. radians by default unless inDegrees = true
    prototype.playerAngle = function(inDegrees){
        
        if(!inDegrees)
            inDegrees = false;
        
        var vector = this.playerVector();
        var rads = Math.atan2(vector.y, vector.x);
        
        if(inDegrees)
            return rads * (180 / Math.PI);
        else
            return rads;
    };
    
    Enemy = createjs.promote(Enemy, 'Container');
    Enemy.initialized = true;
})();