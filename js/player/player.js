function Player() {
    
    this.Container_constructor();

    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();

    function setupVars() {

        this.size = Player.HITBOX_SIZE;
        this.health = 50;
        this.maxHealth = this.health;
        this.keys = 0;

        this.facing = this.rotation;
        
        this.controlsManager = new ControlsManager(this);
        this.movementManager = new MovementManager(this);
        this.weaponManager = new WeaponManager(this);
        this.effectsManager = new EffectsManager(this);

        this.hitbox = {
            type: 'player',
            collidesWith: ['enemy', 'solid'],
            width: this.size,
            height: this.size
        };
    };

    function setupComponents() {

        var rect = new createjs.Shape();
        this.rect = rect;
        rect.graphics
            .setStrokeStyle(2)
            .beginStroke("DeepSkyBlue")
            .beginFill("#DDF")
            .drawRect(
                this.size / -2,
                this.size / -2,
                this.size,
                this.size);

        this.rect.setBounds(-this.size, -this.size, this.size * 2, this.size * 2);
        this.addChild(rect);

        var front = new createjs.Shape();
        front.graphics.beginStroke("DeepSkyBlue").moveTo(5, 0).lineTo(15, 0);
        this.addChild(front);
    };

    function setupEvents() {

    };
};

(function() {

    var prototype = createjs.extend(Player, createjs.Container);

    prototype.setControl = function(type, isDown) {

        this.controlsManager.setControl(type, isDown);
    };

    prototype.tick = function() {

        this.movementManager.tick(this.controlsManager.controlState);
        this.weaponManager.tick(this.controlsManager.controlState);
        this.effectsManager.tick();
        
        if (this.invincibilityTicks > 0) {

            this.invincibilityTicks--;
            if(this.invincibilityTicks % 6 > 3)
                this.alpha = 0;
            else
                this.alpha = 1;
        }
    };
    
    prototype.handleCollision = function(obj) {

        if (obj.hitbox.type == 'solid')
            CollisionManager.push(this, obj);
    };
    
    prototype.hit = function(source) {

        if (this.dead)
            return;
        if(this.invincibilityTicks > 0)
            return;
        
        var event = new createjs.Event('healthChanged');
        event.oldHealth = this.health;

        this.health -= source.playerDamage;
        event.newHealth = this.health;
        
        Game.currentRoom.removeChildrenOfType('illusion');
        
        if(this.weaponManager.empowered)
            this.weaponManager.removeEmpowered();
        
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        } else {

            this.invincibilityTicks = Player.INVINCIBILITY_TICKS;

            if(source.knockback)
                this.movementManager.setKnockback(source);
        }

        this.dispatchEvent(event);
    };
    
    prototype.die = function() {

        this.dead = true;
        this.parent.removeChild(this);
    };
    
    prototype.makeIllusion = function(){
        
        Game.currentRoom.addChild(new Illusion(this));
    };
    
    prototype.triggerIllusion = function(){
        
        this.movementManager.resetDash();
        this.weaponManager.empower();
    };
    
    prototype.addKeys = function(add){
        
        this.keys += add;
    };

    Player = createjs.promote(Player, 'Container');
    Player.initialized = true;
})();

Player.SPEED = 3.6;
Player.DASH_COOLDOWN_TICKS = 90;
Player.DASH_THRESHOLD = 170;
Player.DASH_SPEED_MUL = 2.9;
Player.DASH_DURATION_TICKS = 16;
Player.HITBOX_SIZE = 42;
Player.INVINCIBILITY_TICKS = 60;