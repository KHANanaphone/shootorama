function Shooter(vars) {

    if (!this.spriteName)
        this.spriteName = 'shooter';

    this.health = this.health ? this.health : 40;
    this.size = 48;

    this.Enemy_constructor(vars);

    setupVars.call(this);
    setupComponents.call(this);

    function setupVars() {

        //required
        this.clockwise = false;
        this.defaultState = 'moveAndShoot';
        this.playerDamage = 5;
        this.shotDamage = 5;
        this.shotSpeed = 6;

        //default stats        
        this.stunTime = 120;
        this.speed = 2;
        this.moveInRadius = 275;
        this.stunnable = 1;        
        this.shootingFrequency = 80;
        
        this.hits.damageScaling.empowered = 1.33;

        this.dash = {
            dashAwayRadius: 125,
            duration: 18,
            speed: 20
        };

        this.knockback = {
            ticks: 9,
            velocity: 2
        };

        if (!vars.drop)
            this.drop = ['random', 'random'];
    };

    function setupComponents() {

    };
}

(function() {

    var prototype = createjs.extend(Shooter, Enemy);

    prototype.state_moveAndShoot = function() {

        if (this.statedef.time <= 1) {

            this.hits.combo = {
                startup: 0,
                window: 0
            }
        };
        
        if(this.statedef.time % this.shootingFrequency == 8)
            this.shoot();

        var playerDist = this.playerDistance();
        var playerVector = this.playerVector(this.speed);
        var playerAngle = this.playerAngle(true) - 90;
        var angle = this.clockwise ? Math.PI / 2 : Math.PI / -2;

        if (playerDist > this.moveInRadius)
            this.move(playerVector, playerAngle)
        else {

            var perpVector = {
                x: playerVector.x * Math.cos(angle) -
                    playerVector.y * Math.sin(angle),
                y: playerVector.x * Math.sin(angle) +
                    playerVector.y * Math.cos(angle),
            };
            this.move(perpVector, playerAngle);
        }

        if (Game.player.dead) {
            this.statedef.changeState('idle');
        } else if (playerDist < this.dash.dashAwayRadius) {
            this.statedef.changeState('dashAway');
        }
    };

    prototype.state_dashAway = function() {

        var speed = this.speed + this.dash.speed *
            ((this.dash.duration - this.statedef.time) / this.dash.duration);

        var playerVector = this.playerVector(speed);
        var dashVector = {
            x: playerVector.x * -1,
            y: playerVector.y * -1
        };

        this.move(dashVector);

        if (this.statedef.time >= this.dash.duration) {
            this.statedef.changeState('moveAndShoot');
        }
    };

    prototype.state_dashSide = function() {

        if (this.statedef.time <= 1) {

            var playerVector = this.playerVector(1);
            var angle = this.clockwise ? Math.PI / 2 : Math.PI / -2;

            this.sideDashVector = {
                x: playerVector.x * Math.cos(angle) -
                    playerVector.y * Math.sin(angle),
                y: playerVector.x * Math.sin(angle) +
                    playerVector.y * Math.cos(angle),
            };

            this.clockwise = !this.clockwise;
        };

        var speed = this.speed + this.dash.speed *
            ((this.dash.duration - this.statedef.time) / this.dash.duration);

        var scaledVector = {
            x: this.sideDashVector.x * speed,
            y: this.sideDashVector.y * speed,
        };
        this.move(scaledVector);

        if (this.statedef.time >= this.dash.duration)
            this.statedef.changeState('moveAndShoot');
    };

    prototype.hit = function(source) {

        var dodge = true;
        if(this.stunned || source.empowered){
            
            this.hits.combo = {
                startup: 40,
                window: 22
            };
            dodge = false;
        }
        
        if(dodge)
            this.statedef.changeState('dashSide');
        
        this.Enemy_hit(source);
    };

    prototype.handleCollision = function(obj) {

        this.Enemy_handleCollision(obj);

        if (obj.hitbox.type == 'solid')
            this.clockwise = !this.clockwise;
    };
    
    prototype.shoot = function(){
        
        var rads = (this.facing + 90) * Math.PI / 180;
        
        var vector = {
            x: Math.cos(rads) * this.shotSpeed,
            y: Math.sin(rads) * this.shotSpeed
        }; 
        
        this.parent.addObject(new EnemyProjectile({
            spriteName: 'fire',
            source: this,
            x: this.x,
            y: this.y,
            vector: vector,
            damage: this.shotDamage
        }));
    };

    Shooter = createjs.promote(Shooter, 'Enemy');
    Shooter.initialized = true;
})();