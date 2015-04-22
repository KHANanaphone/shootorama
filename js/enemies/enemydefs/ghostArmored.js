function GhostArmored(vars){
    
    //prevars    
    this.spriteName = 'ghostOrange';
    this.health = 100;
    
    this.Ghost_constructor(vars);
        
    setupVars.call(this);
    
    function setupVars(){
        
        this.hits.damageScaling = {
            weak: 0,
            normal: 0.01,
            strong: 0.02,
            stunned: 30,
            counter: 3,
            empowered: 1
        };      
        
        this.hits.combo = {
            startup: 0,
            window: 0
        }
    };
};

(function(){
        
    var prototype = createjs.extend(GhostArmored, Ghost);
    
    prototype.hit = function(source){
        
        this.hits.combo = {
            startup: this.stunned ? 40: 0,
            window: this.stunned ? 12: 0
        };
        
        this.Ghost_hit(source);        
    };
    
    GhostArmored = createjs.promote(GhostArmored, 'Ghost');
    GhostArmored.initialized = true;
})();