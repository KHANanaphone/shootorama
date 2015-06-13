function ExplosiveProjectile(vars){
    
    this.Projectile_constructor(vars);
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.speed = vars.speed ? vars.speed : 10;
        this.targetPoint = vars.targetPoint ? vars.targetPoint : null;
        
        var xDiff = this.targetPoint.x - this.x;
        var yDiff = this.targetPoint.y - this.y;
        var angle = Math.atan2(yDiff, xDiff);
        
        this.vector = {
            x: Math.cos(angle) * this.speed,
            y: Math.sin(angle) * this.speed
        };      
    };
    
    function setupComponents(){
        
        if(this.targetPoint){
            
            var point = new createjs.Shape();
            point.x = this.targetPoint.x;
            point.y = this.targetPoint.y;
            point.graphics.beginFill('#F00').drawCircle(0, 0, 2);
            Game.currentRoom.addChild(point);
            this.targetPoint = point;            
        }
    };
};

(function(){
        
    var prototype = createjs.extend(ExplosiveProjectile, Projectile);

    prototype.tick = function(){
        
        this.Projectile_tick();
        
        if(this.targetPoint){
            
            var dist = Math.sqrt(
                Math.pow(this.x - this.targetPoint.x, 2) + Math.pow(this.y - this.targetPoint.y, 2));
            
            if(dist < 15){
                this.x = this.targetPoint.x;
                this.y = this.targetPoint.y;
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
        
        this.targetPoint.parent.removeChild(this.targetPoint);
        this.destroy();
    };
    
    ExplosiveProjectile = createjs.promote(ExplosiveProjectile, 'Projectile');
})();