function ShooterOrange(vars){
    
    //prevars    
    this.spriteName = 'shooterOrange';
    this.health = 125;
    this.scale = 1.5;
    
    this.Shooter_constructor(vars);
        
    setupVars.call(this);
    
    function setupVars(){
        
        this.shotSpeed = 8;     
        this.moveInRadius = 500;   
        
        this.dash.dashAwayRadius = 200;
        
        this.defaultWindow = {
            startup: 40,
            window: 15
        };
        
        this.shotDamage = 8;
        this.touchDamage = 15;
        this.drop = ['random', 'random', 'random'];
    };
};

(function(){
        
    var prototype = createjs.extend(ShooterOrange, Shooter);    
    
    prototype.shoot = function(){
        
        var rads = (this.facing + 90) * Math.PI / 180;
        
        var angles = [rads - 0.8, rads - 0.4, rads, rads + 0.4, rads + 0.8];
        var shotPoint = this.shotPoint.localToGlobal(this.shotPoint.x, this.shotPoint.y);
        
        for(var i = 0; i < angles.length; i++){
            
            var vector = {
                x: Math.cos(angles[i]) * this.shotSpeed,
                y: Math.sin(angles[i]) * this.shotSpeed
            };
            
            this.parent.addObject(new Projectile({
                type: 'enemy',
                spriteName: 'fire',
                source: this,
                x: shotPoint.x,
                y: shotPoint.y,
                size: 18,
                vector: vector,
                damage: this.shotDamage
            }));
        };
    };
    
    prototype.hit = function(source, damage){
        
        this.Enemy_hit(source, damage);
    };
    
    ShooterOrange = createjs.promote(ShooterOrange, 'Shooter');
    ShooterOrange.initialized = true;
})();