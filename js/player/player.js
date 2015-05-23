function Player() {
    
    this.Container_constructor();

    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();

    function setupVars() {

        this.size = Player.HITBOX_SIZE;
        this.health = 50;
        this.maxHealth = this.health;
        this.keys = 1;
        this.coins = 7;

        this.facing = this.rotation;
        this.textEffects = [];
        this.textEffectCooldown = 0;
        
        this.controlsManager = new ControlsManager(this);
        this.movementManager = new MovementManager(this);
        this.weaponManager = new WeaponManager(this);
        this.effectsManager = new EffectsManager(this);

        this.hitbox = {
            type: 'player',
            collidesWith: ['enemy', 'solid'],
            width: this.size * 0.6,
            height: this.size * 0.6
        };
    };

    function setupComponents() {

        this.sprite = SpriteManager.makeSprite('player');  
        this.sprite.rotation = -90;        
        this.addChild(this.sprite);
    };

    function setupEvents() {

    };
};

(function() {

    var prototype = createjs.extend(Player, createjs.Container);

    prototype.isDashing = function(){
        
        if(this.movementManager.dash)
            return true;
        
        return false;
    };
    
    prototype.prepareForRoomTransition = function(){
        
        this.movementManager.endMovement();
    };
    
    prototype.setControl = function(type, isDown) {

        this.controlsManager.setControl(type, isDown);
    };

    prototype.tick = function() {

        this.movementManager.tick(this.controlsManager.controlState);
        this.weaponManager.tick(this.controlsManager.controlState);
        
        this.updateTextEffect();
        
        this.effectsManager.tick();        
        this.checkFloor();       
        
        if (this.invincibilityTicks > 0) {

            this.invincibilityTicks--;
            if(this.invincibilityTicks % 6 > 3)
                this.sprite.alpha = 0;
            else
                this.sprite.alpha = 1;
        }
    };
    
    prototype.checkFloor = function(){
        
        var obj = Game.currentRoom.background.getFloorObjectAt(this.x, this.y);
        
        if(obj && obj.playerStep){
            obj.playerStep(this);
        } 
    };
    
    prototype.updateTextEffect = function(){
        
        if(this.textEffectCooldown > 0){
            this.textEffectCooldown--;
            return;
        };
        
        if(this.textEffects.length == 0)
            return;
              
        this.effectsManager.addEffect(this.textEffects.shift(), true);
        this.textEffectCooldown = 30;
    };
    
    prototype.handleCollision = function(obj) {

        if (obj.hitbox.type == 'solid')
            CollisionManager.push(this, obj);
    };
    
    prototype.addHealth = function(amount, anim){
        
        
        var event = new createjs.Event('healthChanged');
        event.oldHealth = this.health;
        
        var newHealth = this.health + amount;
        
        if(newHealth > this.maxHealth)
            newHealth = this.maxHealth;
        else if(newHealth < 0)
            newHealth = 0;
        
        this.health = newHealth;
        event.newHealth = newHealth;
        
        this.dispatchEvent(event);
        
        if(anim != false)
            this.textEffect(amount);
    };
    
    prototype.hit = function(source) {

        if (this.dead)
            return;
        if(this.invincibilityTicks > 0)
            return;
        
        this.addHealth(source.playerDamage * -1); 
        
        if(this.weaponManager.empowered)
            this.weaponManager.removeEmpowered();
        
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        } else {

            Game.currentRoom.removeChildrenOfType('illusion');
            this.invincibilityTicks = Player.INVINCIBILITY_TICKS;

            if(source.knockback)
                this.movementManager.setKnockback(source);
        }        
    };
    
    prototype.die = function() {

        this.dead = true;
        this.parent.removeChild(this);
    };
    
    prototype.makeIllusion = function(){
        
        Game.currentRoom.addObject(new Illusion(this));
    };
    
    prototype.triggerIllusion = function(){
        
        this.movementManager.resetDash();
        this.weaponManager.empower();
    };
    
    prototype.addKeys = function(amount){
                
        if(amount == 0)
            return;
        
        this.keys += amount;
        
        var txt;
        if(amount > 0)
            txt = '+' + amount;
        else
            txt = amount;
        
        txt += ' key';
        
        this.textEffect(txt);
    };
    
    prototype.textEffect = function(txt){
        
        this.textEffects.push(
            new TextEffect(this, {
                text: txt
            })
        );
    };
    
    prototype.addCoins = function(amount){
        
        if(amount == 0)
            return;
        
        this.coins += amount;
        
        var txt;
        if(amount > 0)
            txt = '+' + amount;
        else
            txt = amount;
        
        txt += ' g';
                
        this.textEffect(txt);
    };

    Player = createjs.promote(Player, 'Container');
    Player.initialized = true;
})();

Player.SPEED = 3.6;
Player.DASH_COOLDOWN_TICKS = 90;
Player.DASH_THRESHOLD = 170;
Player.DASH_SPEED_MUL = 4;
Player.DASH_DURATION_TICKS = 16;
Player.HITBOX_SIZE = 42;
Player.INVINCIBILITY_TICKS = 60;