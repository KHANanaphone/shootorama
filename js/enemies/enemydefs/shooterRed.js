function ShooterRed(vars){
    
    //prevars    
    this.spriteName = 'shooterRed';
    this.health = 100;
    this.scale = 1.2;
    
    this.Shooter_constructor(vars);
        
    setupVars.call(this);
    
    function setupVars(){
        
        this.shotSpeed = 8;
        this.shotDamage = 9;
        this.drop = ['random', 'random', 'random'];
    };
};

(function(){
        
    var prototype = createjs.extend(ShooterRed, Shooter);
    
    prototype.shoot = function(){
        
        var rads = (this.facing + 90) * Math.PI / 180;
        
        var shotPoint = this.shotPoint.localToGlobal(this.shotPoint.x, this.shotPoint.y);
        
        var vector = {
            x: Math.cos(rads) * this.shotSpeed,
            y: Math.sin(rads) * this.shotSpeed
        };        
        
        this.parent.addObject(new ExplosiveProjectile({
            type: 'enemy',
            spriteName: 'fire',
            source: this,
            x: shotPoint.x,
            y: shotPoint.y,
            size: 16,
            vector: vector,
            damage: this.shotDamage,
            explodePoint: {x: Game.player.x, y: Game.player.y}
        }));
    };
    
    ShooterRed = createjs.promote(ShooterRed, 'Shooter');
    ShooterRed.initialized = true;
})();