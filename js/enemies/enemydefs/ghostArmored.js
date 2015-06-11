function GhostArmored(vars){
    
    //prevars    
    this.spriteName = 'ghostOrange';
    this.health = 125;
    this.scale = 1.5;
    
    this.Ghost_constructor(vars);
        
    setupVars.call(this);
    
    function setupVars(){
        
        this.speed = 2.8;
        this.touchDamage = 10;
        
        this.hits.damageScaling = {
            weak: 0.1,
            normal: 0.2,
            strong: 0.3,
            stunned: 3,
            counter: 3,
            empowered: 1
        };      
        
        this.stunTime = 150;
        
        this.hits.combo = {
            startup: 0,
            window: 0
        }
    };
};

(function(){
        
    var prototype = createjs.extend(GhostArmored, Ghost);
    
    prototype.hit = function(source, damage){
        
        this.hits.combo = {
            startup: this.stunned || source.empowered ? 40: 0,
            window: this.stunned || source.empowered ? 12: 0
        };
        
        this.Ghost_hit(source, damage);        
    };
    
    GhostArmored = createjs.promote(GhostArmored, 'Ghost');
    GhostArmored.initialized = true;
})();