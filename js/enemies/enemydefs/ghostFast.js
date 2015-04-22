function GhostFast(vars){
    
    //prevars    
    this.spriteName = 'ghostBlue';
    this.health = 30;
    
    this.Ghost_constructor(vars);
        
    setupVars.call(this);
    
    function setupVars(){
        
        this.speed = 2.5;
        this.stunTime = 120;

        this.knockback = {            
            ticks: 9,
            velocity: 2
        };

        this.dashTriggerRadius = 240;
        this.dashChargeTime = 30;        

        this.dashSpeed = 19;
        this.dashTime = 16;
    };
};

(function(){
        
    var prototype = createjs.extend(GhostFast, Ghost);
    
    GhostFast = createjs.promote(GhostFast, 'Ghost');
    GhostFast.initialized = true;
})();