function GhostEnemy(vars){
    
    
    setupVars.call(this);
    this.Enemy_constructor(vars);    
    setupComponents.call(this);
    setupEvents.call(this);
    
    function setupVars(){
        
        this.spriteName = 'ghost';
        this.health = 40;
        this.playerDamage = 5;
        
        this.speed = 0.9;
        
        this.dashTriggerRadius = 190;        
        this.dashCooldownTime = 150;
        this.dashChargeTime = 40;
        
        this.dashSpeed = 10;
        this.dashTime = 18;
    };
    
    function setupComponents(){
        
    };
    
    function setupEvents(){
    
    }
};

(function(){
        
    var prototype = createjs.extend(GhostEnemy, Enemy);
    
    prototype.state_initial = function(){
        
        this.statedef.changeState('chasing');
    };
    
    prototype.state_chasing = function(){
        
        if(Game.player.dead){
            this.statedef.changeState('idle');
            return;
        }
        else if(this.playerDistance() < this.dashTriggerRadius
               && this.statedef.time > this.dashCooldownTime){
            this.statedef.changeState('dashCharging');
            return;
        }

        var vector = this.playerVector(this.speed);
        var angle = this.playerAngle(true) - 90;

        this.move(vector, angle);
    };
    
    prototype.state_dashCharging = function(){
        
        if(this.statedef.time > this.dashChargeTime){
            this.statedef.changeState('dashing');
        }   
        else if(this.statedef.time <= 1){
            this.dashVector = this.playerVector(this.dashSpeed);
            this.dashAngle = this.playerAngle(true) - 90;
        }     
    };
    
    prototype.state_dashing = function(){
        
        if(this.statedef.time > this.dashTime){
            this.statedef.changeState('chasing');   
            return;
        }

        this.move(this.dashVector, this.dashAngle);
    };
    
    prototype.state_idle = function(){
        
    }
    
    GhostEnemy = createjs.promote(GhostEnemy, 'Enemy');
    GhostEnemy.initialized = true;
})();