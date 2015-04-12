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
        
        this.size = vars.size ? vars.size : 20;     
        this.playerDamage = vars.playerDamage ? vars.playerDamage : 10;
        this.knockback = vars.knockback ? vars.knockback : {
            
            ticks: 9,
            velocity: 2
        };
        
        this.hitbox = {
            type: 'enemy',
            collidesWith: ['player','enemy','wall'],
            width: this.size,
            height: this.size
        };
        
        this.comboManager = new ComboManager(this, vars.combo);
    };
    
    function setupComponents(){
                       
        this.rect = new createjs.Shape();
        this.rect.graphics.beginStroke("Red")
            .drawRect(this.size / -2, this.size / -2, this.size, this.size); 
        this.addChild(this.rect);
        
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
    
        this.rect.cache(
            -this.size / 2 - 3, 
            -this.size / 2 - 3, 
            this.size + 6, 
            this.size + 6);
    };
    
    prototype.tick = function(){    
        
        this.comboManager.tick(this.comboRingInner, this.comboRingOuter);

    };
    
    prototype.handleCollision = function(obj){
    
    };
    
    prototype.takeDamage = function(source){
    
        if (this.dead)
            return;

        var damage = source.damage;
        damage *= this.comboManager.hit();

        this.health -= damage;
        this.dispatchEvent('healthChanged');

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