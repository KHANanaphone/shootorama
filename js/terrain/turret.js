function Turret(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        this.persistence = 'persist';
        
        this.rotating = vars.rotating ? vars.rotating : false;
        
        this.rotation = vars.facing ? vars.facing: 0;
        
        this.pushPriority = 9999;
        this.ticks = 0;
        this.shotFrequency = 90;
        this.delay = vars.delay ? vars.delay : 0;
        this.shotSpeed = vars.shotSpeed ? vars.shotSpeed : 7;
        this.damage = vars.damage ? vars.damage : 5;
        
        this.hitbox = {
            type: 'solid',
            width: 25,
            height: 25
        };
    };
    
    function setupComponents(){
                       
        this.sprite = 
            SpriteManager.makeSprite('turret');
        
        this.addChild(this.sprite);
        
        this.firePoint = new createjs.Shape();
        this.firePoint.set({
           x: 0,
           y: 32
        });
        
        this.addChild(this.firePoint);
    };
};

(function(){
        
    var prototype = createjs.extend(Turret, createjs.Container);
      
    prototype.tick = function(){
    
        if(this.delay > 0){
            this.delay--;
            return;
        }
        
        this.ticks++;
        
        if(this.ticks % this.shotFrequency == 0)
            this.shoot();
        
        if(this.rotating)
            this.rotate();
    };
    
    prototype.rotate = function(){
        
        var distX = Game.player.x - this.x;
        var distY = Game.player.y - this.y;
        var rads = Math.atan2(distY, distX);
        
        this.rotation = rads * (180 / Math.PI) - 90;
    };
    
    prototype.shoot = function(){
        
        var start = this.localToGlobal(this.firePoint.x, this.firePoint.y);
        var rads = (this.rotation + 90) * Math.PI / 180;
        var vector = {
            x: Math.cos(rads) * this.shotSpeed,
            y: Math.sin(rads) * this.shotSpeed
        };
        
        Game.currentRoom.addObject(new Projectile({
            type: 'enemy',
            spriteName: 'fire',
            source: this,
            x: start.x,
            y: start.y,
            vector: vector,
            damage: this.damage,
            knockback : {            
                ticks: 9,
                velocity: 2
            }
        }));
    };
    
    Turret = createjs.promote(Turret, 'Container');
    Turret.initialized = true;
})();