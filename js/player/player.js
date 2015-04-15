function Player() {

    if (!Player.initialized) {
        Player.init();
        return new Player();
    }

    this.Container_constructor();

    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();

    function setupVars() {

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
            collidesWith: ['enemy', 'wall'],
            width: this.size,
            height: this.size
        };
    };

    function setupComponents() {

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
        front.graphics.beginStroke("DeepSkyBlue").moveTo(5, 0).lineTo(15, 0);
        this.addChild(front);
    };

    function setupEvents() {

        this.on('tick', this.tick);
    }
};

Player.init = function() {

    var prototype = createjs.extend(Player, createjs.Container);

    prototype.setControl = function(type, isDown) {

        this.controlsManager.setControl(type, isDown);
    };

    prototype.tick = function() {

        this.movementManager.tick(this.controlsManager.controlState);
        this.weaponManager.tick(this.controlsManager.controlState);

        if (this.invincibilityTicks > 0) {

            this.invincibilityTicks--;
            if(this.invincibilityTicks % 6 > 3)
                this.alpha = 0;
            else
                this.alpha = 1;
        }
    };
    
    prototype.handleCollision = function(obj) {

        if (obj.hitbox.type == 'wall')
            CollisionManager.push(this, obj);

        if(this.invincibilityTicks > 0)
            return;

        if (obj.playerDamage)
            this.takeDamage(obj);

    };
    
    prototype.takeDamage = function(source) {

        if (this.dead)
            return;
        
        var event = new createjs.Event('healthChanged');
        event.oldHealth = this.health;

        this.health -= source.playerDamage;
        event.newHealth = this.health;

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

    Player = createjs.promote(Player, 'Container');
    Player.initialized = true;
};

Player.SPEED = 3.6;
Player.DASH_COOLDOWN_TICKS = 90;
Player.DASH_THRESHOLD = 170;
Player.DASH_SPEED_MUL = 2.8;
Player.DASH_DURATION_TICKS = 11;
Player.HITBOX_SIZE = 35;
Player.INVINCIBILITY_TICKS = 60;