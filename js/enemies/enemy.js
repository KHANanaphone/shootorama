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
        
        this.health = vars.health ? vars.health : 50;
        this.maxHealth = vars.maxHealth ? vars.maxHealth : this.health;
        
        this.size = vars.size ? vars.size : 40;     
        this.playerDamage = vars.playerDamage ? vars.playerDamage : 10;
        this.knockback = vars.knockback ? vars.knockback : {
            
            ticks: 9,
            velocity: 2
        };
        
        this.hitbox = {
            type: 'enemy',
            collidesWith: ['player','enemy','wall'],
            width: this.size * 0.75,
            height: this.size * 0.75
        };
        
        this.comboManager = new ComboManager(this, vars.combo);
    };
    
    function setupComponents(){
                  
        var spriteData = {
            images: [Resources.getResult('ghost')],
            frames: {width: 40, height: 40},
            animations: {
                stand: 0
            }
        };
        
        var spriteSheet = new createjs.SpriteSheet(spriteData);
        this.sprite = new createjs.Sprite(spriteSheet, 'stand')
            .set({
            x: this.size / -2,
            y: this.size / -2
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

Enemy.init = function(){
        
    var prototype = createjs.extend(Enemy, createjs.Container);
      
    prototype.refreshCache = function(){
    
        this.sprite.cache(
            0, 0, this.size, this.size);
        
    };
    
    prototype.tick = function(){    
        
        this.comboManager.tick(this.comboRingInner, this.comboRingOuter);
        this.healthMeter.tick();

    };
    
    prototype.handleCollision = function(obj){
    
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
        
    }
    
    Enemy = createjs.promote(Enemy, 'Container');
    Enemy.initialized = true;
};