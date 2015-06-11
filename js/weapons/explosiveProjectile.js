function ExplosiveProjectile(vars){
    
    this.Projectile_constructor(vars);
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.explodePoint = vars.explodePoint ? vars.explodePoint : null;
    };
    
    function setupComponents(){
        
        if(this.explodePoint){
            
            var point = new createjs.Shape();
            point.x = this.explodePoint.x;
            point.y = this.explodePoint.y;
            point.graphics.beginFill('#F00').drawCircle(0, 0, 2);
            Game.currentRoom.addChild(point);
            this.explodePoint = point;            
        }
    };
};

(function(){
        
    var prototype = createjs.extend(ExplosiveProjectile, Projectile);

    prototype.tick = function(){
        
        this.Projectile_tick();
        
        if(this.explodePoint){
            
            var dist = Math.sqrt(
                Math.pow(this.x - this.explodePoint.x, 2) + Math.pow(this.y - this.explodePoint.y, 2));
            
            if(dist < 15){
                this.x = this.explodePoint.x;
                this.y = this.explodePoint.y;
                this.explode();
            }
        }
    };
    
    prototype.handleCollision = function(obj){

        var dest;
        
        if(obj.hit)
            dest = obj.hit(this, this.damage);
        
        if(!dest)
            this.explode();
    };
    
    prototype.explode = function(){
        
        Game.currentRoom.addObject(
            new Area({
                x: this.x, 
                y: this.y,
                radius: 30, 
                growth: 12,
                duration: 5,
                damage: this.damage,
                collidesWith: ['player']
            })
        );
        
        this.explodePoint.parent.removeChild(this.explodePoint);
        this.destroy();
    };
    
    ExplosiveProjectile = createjs.promote(ExplosiveProjectile, 'Projectile');
})();