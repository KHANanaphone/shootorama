function ShooterBlue(vars){
    
    //prevars    
    this.spriteName = 'shooterBlue';
    this.health = 60;
    this.scale = 0.9;
    
    this.Shooter_constructor(vars);
        
    setupVars.call(this);
    
    function setupVars(){
        
        this.shootingFrequency = 60;
        this.speed = 2.7;
        
        this.dash.speed = 21;
        this.dash.duration = 12;
        this.shotSpeed = 15;
        
        this.shotDamage = 7;
        this.drop = ['random', 'random', 'random'];
    };
};

(function(){
        
    var prototype = createjs.extend(ShooterBlue, Shooter);
    
    prototype.hit = function(source, damage) {
        
        if(this.stunned || source.empowered){
            
            this.Shooter_hit(source, damage);
        }
        else{ 
            //dodge it
            this.textEffect('Dodged!');
            this.statedef.changeState('dashSide');
            
            return false;
        }        
    };
    
    ShooterBlue = createjs.promote(ShooterBlue, 'Shooter');
    ShooterBlue.initialized = true;
})();