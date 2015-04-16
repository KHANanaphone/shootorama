var TEST;

function SuperghostEnemy(vars){
    
    TEST = this;
    setupVars.call(this);
    this.Enemy_constructor(vars); 
    
    setupComponents.call(this);
    setupEvents.call(this);
    
    function setupVars(){
        
        this.spriteName = 'ghost';
        this.health = 80;
        this.scale = 1.5;
        this.playerDamage = 15;
        
        this.speed = 0.7;
        
        this.dashTriggerRadius = 140;        
        this.dashCooldownTime = 150;
        this.dashChargeTime = 40;        
        
        this.dashSpeed = 7;
        this.dashTime = 24;
    };
    
    function setupComponents(){
        
    };
    
    function setupEvents(){
    
    }
};

(function(){
        
    var prototype = createjs.extend(SuperghostEnemy, Enemy);
    
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
    
    SuperghostEnemy = createjs.promote(SuperghostEnemy, 'Enemy');
    SuperghostEnemy.initialized = true;
})();