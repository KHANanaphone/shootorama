function GhostRed(vars){
    
    //prevars    
    this.spriteName = 'ghostRed';
    this.health = 5;
    this.scale = 0.8;
    
    this.Ghost_constructor(vars);
        
    setupVars.call(this);
    
    function setupVars(){
        
        this.drop = [];
        this.speed = 3.3;
        this.stunTime = 120;

        this.knockback = {            
            ticks: 9,
            velocity: 2
        };

        this.hits.combo = {
            startup: 0,
            window: 0
        };
        
        this.dash.triggerRadius = 0;
    };
};

(function(){
        
    var prototype = createjs.extend(GhostRed, Ghost);
    
    prototype.die = function(){
        
        this.Ghost_die();
        
        Game.currentRoom.addObject(
            new Area({
                x: this.x, 
                y: this.y,
                radius: 20, 
                growth: 3,
                duration: 30,
                playerDamage: 5,
                damage: 5,
                collidesWith: ['enemy', 'player']
            })
        );
    };
    
    GhostRed = createjs.promote(GhostRed, 'Ghost');
    GhostRed.initialized = true;
})();