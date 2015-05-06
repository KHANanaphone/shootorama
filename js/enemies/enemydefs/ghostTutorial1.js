function GhostTutorial1(vars){
    
    //prevars
    this.scale = 0.75;
    this.health = 1;
    
    this.Ghost_constructor(vars);
        
    setupVars.call(this);
    
    function setupVars(){
        
        this.playerDamage = 2;
        this.speed = 0.5;

        this.knockback.ticks = 11;
        this.knockback.velocity = 2;

        this.dash.triggerRadius = 1;
    };
};

(function(){
        
    var prototype = createjs.extend(GhostTutorial1, Ghost);
    
    GhostTutorial1 = createjs.promote(GhostTutorial1, 'Ghost');
    GhostTutorial1.initialized = true;
})();