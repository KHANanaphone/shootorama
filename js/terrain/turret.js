function Turret(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        this.persistence = 'persist';
        
        this.rotation = vars.facing ? vars.facing: 0;
        
        this.pushPriority = 9999;
        this.ticks = 0;
        this.shotFrequency = 90;
        this.shotSpeed = 11;
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
           y: 20
        });
        
        this.addChild(this.firePoint);
    };
};

(function(){
        
    var prototype = createjs.extend(Turret, createjs.Container);
      
    prototype.tick = function(){
    
        this.ticks++;
        
        if(this.ticks % this.shotFrequency == 0)
            this.shoot();
    };
    
    prototype.shoot = function(){
        
        var start = this.localToGlobal(this.firePoint.x, this.firePoint.y);
        var rads = (this.rotation + 90) * Math.PI / 180;
        var vector = {
            x: Math.cos(rads) * this.shotSpeed,
            y: Math.sin(rads) * this.shotSpeed
        };
        
        Game.currentRoom.addObject(new EnemyProjectile({
            spriteName: 'fire',
            source: this,
            x: start.x,
            y: start.y,
            vector: vector,
            damage: this.damage
        }));
    };
    
    Turret = createjs.promote(Turret, 'Container');
    Turret.initialized = true;
})();