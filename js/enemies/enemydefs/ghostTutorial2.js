function GhostTutorial2(vars){
    
    //prevars 
    this.health = 50;
    
    this.Ghost_constructor(vars);
        
    setupVars.call(this);
    
    function setupVars(){
        
        this.speed = 0.7;
        this.stunTime = 0;
        this.playerDamage = 2;

        this.dash.triggerRadius = 0;
        
        this.hits.damageScaling = {
            weak: 0.05,
            normal: 0.1,
            strong: 2.1,
            stunned: 0,
            counter: 0,
            empowered: 0
        };   
        
        this.hits.combo = {
            startup: 40,
            window: 15
        };
    };
};

(function(){
        
    var prototype = createjs.extend(GhostTutorial2, Ghost);
    
    GhostTutorial2 = createjs.promote(GhostTutorial2, 'Ghost');
    GhostTutorial2.initialized = true;
})();