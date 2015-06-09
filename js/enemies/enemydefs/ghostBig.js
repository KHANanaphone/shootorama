function GhostBig(vars){
    
    //prevars
    this.scale = 1.5;
    this.health = 80;
    
    this.Ghost_constructor(vars);
        
    setupVars.call(this);
    
    function setupVars(){
        
        this.touchDamage = 15;
        this.speed = 1.2;

        this.knockback.ticks = 11;
        this.knockback.velocity = 2;

        this.dash.triggerRadius = 120;
        this.dash.chargeTime = 40;
        this.dash.speed = 7;
        this.dash.time = 24;
    };
};

(function(){
        
    var prototype = createjs.extend(GhostBig, Ghost);
    
    GhostBig = createjs.promote(GhostBig, 'Ghost');
    GhostBig.initialized = true;
})();