/* For objects deriving from this, here are the vars that need to be set BEFORE
this constructor is called:

- sprite name
- health
- scale

*/
function Enemy(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    setupEvents.call(this);
    
    function setupVars(){
      
        this.type = 'enemy';
        this.persistence = vars.persistence ? vars.persistence : 'reset';
        this.initialX = vars.x;
        this.initialY = vars.y;
        this.x = vars.x;
        this.y = vars.y;
        this.maxHealth = this.health;
        this.pushPriority = 0;
        this.stunTime = this.stunTime ? this.stunTime : 120;
        this.facing = vars.facing ? vars.facing : 0;
        
        this.drop = vars.drop ? vars.drop : 'random';
        
        this.scale = this.scale ? this.scale : 1;
        this.size = this.size * this.scale;
        
        this.hitbox = {
            type: 'enemy',
            collidesWith: ['player', 'solid', 'illusion', 'enemy'],
            width: this.size * 0.85,
            height: this.size * 0.85
        };
        
        this.hits = {
            
            damageScaling : {
                weak: 0.16,
                normal: 1,
                strong: 2,
                stunned: 1,
                counter: 3,
                empowered: 1
            },
            
            combo: {
                startup: 40,
                window: 9
            }
        };
        
        this.hitManager = new HitManager(this);        
        this.statedef = new Statedef(this);
        this.effectsManager = new EffectsManager(this);
    };
    
    function setupComponents(){
                  
        this.sprite = 
            SpriteManager.makeSprite(this.spriteName);
        
        var bounds = this.sprite.getBounds();        
        this.sprite.set({
            scaleX: this.size / bounds.width,
            scaleY: this.size / bounds.height
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
    
    }
};

(function(){
        
    var prototype = createjs.extend(Enemy, createjs.Container);
      
    prototype.init = function(){
        
        this.x = this.initialX;
        this.y = this.initialY;
        this.health = this.maxHealth;
        this.rotation = 0;
        this.effectsManager.clearAll();
    };
    
    prototype.refreshCache = function(){
    
        this.sprite.cache(0, 0, this.size, this.size);        
    };
    
    prototype.flashColor = function(duration, r, g, b){
      
        this.effectsManager.addEffect(
            new ColorEffect(this.sprite, {
                duration: duration, r: r, g: g, b: b
            })
        );
    };
    
    prototype.tick = function(){   
        
        this.hitManager.tick();
        this.healthMeter.tick();
        manageState.call(this);
        this.effectsManager.tick();
        
        function manageState(){

            if(this['state_' + this.statedef.id])
                this['state_' + this.statedef.id]();
            else{
                console.error('State not found: ' + this.statedef.id);
                this.statedef.changeState('initial');
            }            

            this.statedef.time++;
        }        
    };
    
    prototype.handleCollision = function(obj){
    
        if (obj.hitbox.type == 'solid')
            CollisionManager.push(this, obj);
        else if (obj.hitbox.type == 'player' && this.playerDamage)            
            obj.hit(this);
    };
    
    prototype.hit = function(source){
    
        if (this.dead)
            return;

        this.hitManager.hit(source);
    };
    
    prototype.addHealth = function(amount){
        
        var oldHealth = this.health;
        
        var newHealth = this.health + amount;        
        newHealth = newHealth < 0 ? 0 : newHealth;
        newHealth = newHealth > this.maxHeath ? this.maxHeath : newHealth;
        
        if(newHealth == oldHealth)
            return;
        
        this.health = newHealth;
        
        if(this.health == 0)            
            this.die();
        
        var event = new createjs.Event('healthChanged');
        event.oldHealth = oldHealth;
        event.newHealth = newHealth;
        this.dispatchEvent(event);
    };
    
    prototype.die = function(){
    
        this.hitbox = null;
        this.statedef.changeState('dying');        
        this.dead = true;        
        
        if(this.drop == 'none')
            return;
        
        if(typeof this.drop === 'string')
            this.drop = [this.drop];        
            
        for(var i = 0; i < this.drop.length; i++)
            ItemManager.dropItem(this, this.drop[i]);
    };
    
    prototype.move = function(vector, angle){
        
        while(angle < 0)
            angle += 360;
        
        angle = angle % 360;  
        
        var diff = this.facing - angle;
        
        if(diff < -180)
            diff += 360;
        else if(diff > 180)
            diff -= 360;
        
        var newAngle = angle;
        
        if(diff > 5)
            newAngle = this.facing - 5;
        else if(diff < -5)
            newAngle = this.facing + 5;
        
        this.x += vector.x * 0.75;
        this.y += vector.y * 0.75;
        this.facing = newAngle;
        this.sprite.rotation = newAngle;
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
    
    prototype.triggerIllusion = function(){
    
    };    
    
    prototype.state_initial = function(){
        
        this.statedef.changeState(this.defaultState);
    };
    
    prototype.state_stunned = function(){
        
        if(this.statedef.time == 1){

            this.stunned = true;
            var stunEffect = new CirclingParticleEffect(this);
            this.effectsManager.addEffect(stunEffect);
            
            this.statedef.onExitState = function(){
                this.stunned = false;
                this.effectsManager.clearEffect(stunEffect);
            }
        }
        
        if(this.statedef.time > this.stunTime) {
            
            this.statedef.changeState(this.defaultState);            
        }     
    };
    
    prototype.state_dying = function(){
        
        this.alpha -= 0.05;
        
        if(this.statedef.time == 20) {
            
            this.dispatchEvent(new createjs.Event('dead'));  
            this.parent.removeObject(this);     
        };
    }
        
    prototype.state_idle = function(){
        
    };
    
    Enemy = createjs.promote(Enemy, 'Container');
    Enemy.initialized = true;
})();