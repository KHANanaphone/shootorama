function GhostTutorial3(vars){
    
    //prevars 
    this.health = 1;
    
    this.Ghost_constructor(vars);
        
    setupVars.call(this);
    
    function setupVars(){
        
        this.touchDamage = 2;
        
        this.speed = 1;
        this.dash.triggerRadius = 120;
        
        this.hits.damageScaling = {
            weak: 0,
            normal: 0,
            strong: 0,
            stunned: 0,
            counter: 0,
            empowered: 1
        }; 
        
        this.hits.combo = {
            startup: 0,
            window: 0
        }  
    };
};

(function(){
        
    var prototype = createjs.extend(GhostTutorial3, Ghost);
    
    GhostTutorial3 = createjs.promote(GhostTutorial3, 'Ghost');
    GhostTutorial3.initialized = true;
})();