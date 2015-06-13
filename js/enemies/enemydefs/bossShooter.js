function BossShooter(vars) {

    if (!this.spriteName)
        this.spriteName = 'bossShooter';

    this.health = 100;
    this.size = 100;

    this.Enemy_constructor(vars);

    setupVars.call(this);
    setupComponents.call(this);

    function setupVars() {
        
        //required
        this.defaultState = 'green';
        this.phase = 'green';
        this.touchDamage = 100;        
        
        this.hits.damageScaling = {
            weak: 0.2,
            normal: 1,
            strong: 3,
            stunned: 1,
            counter: 3,
            empowered: 2
        };
        
        this.defaultWindow = {
            startup: 30,
            window: 40
        };
        
        this.goingUp = false;
        
        this.drop = [new Health({type: 'maxup'})];
        this.persistence = 'remove';
    };

    function setupComponents() {
        
        this.shotPointTop = new createjs.Shape();
        this.shotPointTop.x = 43;
        this.shotPointTop.y = -25;
        this.inner.addChild(this.shotPointTop);
        
        this.shotPointBottom = new createjs.Shape();
        this.shotPointBottom.x = 43;
        this.shotPointBottom.y = 25;
        this.inner.addChild(this.shotPointBottom);
        
//        this.shotPointTop.graphics.beginFill('red').drawCircle(0, 0, 5);
//        this.shotPointBottom.graphics.beginFill('red').drawCircle(0, 0, 5);
    };
}

(function() {

    var prototype = createjs.extend(BossShooter, Enemy);

    prototype.state_green = function(){
        
        this.slide(4);
        
        if(this.ticks % 60 == 59){            
            this.shoot('top', {x: 15, y: 0}, 5);
            this.shoot('bottom', {x: 15, y: 0}, 5);            
        };
    };
    
    prototype.state_blue = function(){
        
        this.slide(6);
        
        var t = this.ticks % 120;
        
        if(t % 8 == 0 && t < 41)          
            this.shoot('top', {x: 20, y: 0}, 5);
        else if(t % 8 == 4 && t < 45)       
            this.shoot('bottom', {x: 20, y: 0}, 5);  
    };
    
    prototype.state_orange = function(){
        
        this.slide(2);
        
        if(this.ticks % 60 == 0){
            
            var arm = this.ticks % 120 == 0 ? 'top' : 'bottom';
            
            this.shoot(arm, {x: 11, y: -3}, 5)
            this.shoot(arm, {x: 11.5, y: -1.5}, 5);
            this.shoot(arm, {x: 12, y: 0}, 5);
            this.shoot(arm, {x: 11.5, y: 1.5}, 5);
            this.shoot(arm, {x: 11, y: 3}, 5);
        };
    };
    
    prototype.state_red = function(){

        this.slide(4);
        
        if(this.ticks % 90 == 0){
            
            var shotPointTop = this.shotPointTop.localToGlobal(0, 0);
            var shotPointBottom = this.shotPointBottom.localToGlobal(0, 0);
            
            var target = {x: Game.player.x, y: Game.player.y};
            
            Game.currentRoom.addObject(new ExplosiveProjectile({
                type: 'enemy',
                spriteName: 'fire',
                source: this,
                x: shotPointTop.x,
                y: shotPointTop.y,
                speed: 13,
                targetPoint: {x: target.x, y: target.y - 70},
                damage: 10
            }));   
            
            Game.currentRoom.addObject(new ExplosiveProjectile({
                type: 'enemy',
                spriteName: 'fire',
                source: this,
                x: shotPointBottom.x,
                y: shotPointBottom.y,
                speed: 13,
                targetPoint: {x: target.x, y: target.y + 70},
                damage: 10
            }));   
        };
    };    
    
    prototype.slide = function(speed){
        
        this.move({x: 0, y: speed * (this.goingUp ? -1 : 1)}, null);
    };
    
    prototype.shoot = function(arm, vector, damage){
        
        var shotPoint = (arm == 'top' ? 
            this.shotPointTop.localToGlobal(0, 0) : 
            this.shotPointBottom.localToGlobal(0, 0));
        
        Game.currentRoom.addObject(new Projectile({
            type: 'enemy',
            spriteName: 'fire',
            source: this,
            x: shotPoint.x,
            y: shotPoint.y,
            vector: vector,
            damage: damage
        }));
    };
    
    prototype.handleCollision = function(obj){
        
        this.Enemy_handleCollision(obj);
        
        if(obj.hitbox.type == 'solid')
            this.goingUp = !this.goingUp;
    };
    
    prototype.die = function(){
        
        if(this.phase == 'green'){
            this.phase = 'blue';
            this.maxHealth = 100;
        }
        else if(this.phase == 'blue'){
            this.phase = 'orange';
            this.maxHealth = 200;
        }
        else if(this.phase == 'orange'){
            this.phase = 'red';
            this.maxHealth = 100;
        }
        else if(this.phase == 'red'){
            this.Enemy_die();
            return;
        }
        
        this.sprite.gotoAndStop(this.phase);
        this.statedef.changeState(this.phase);
        this.health = this.maxHealth;
        
        this.effectsManager.addEffect(new ColorEffect(this.sprite, {
            r: 1, g: 1, b: 1, duration: 50
        }));
    };
    
    BossShooter = createjs.promote(BossShooter, 'Enemy');
    BossShooter.initialized = true;
})();