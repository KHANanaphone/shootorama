var TEST;

function SuperghostEnemy(vars){
    
    TEST = this;
    setupVars.call(this);
    this.Enemy_constructor(vars); 
    
    setupComponents.call(this);
    setupEvents.call(this);
    
    function setupVars(){
        
        //required
        this.spriteName = 'ghost';
        this.defaultState = 'chasing';
        this.health = 80;
        this.playerDamage = 15;
        
        //optional
        this.scale = 1.5;
        this.stunTime = 90;    
        this.speed = 0.7;
                 
        this.knockback = {            
            ticks: 11,
            velocity: 2.2
        };
        
        this.dashTriggerRadius = 120;        
        this.dashCooldownTime = 150;
        this.dashChargeTime = 40;        
        
        this.dashSpeed = 7;
        this.dashTime = 24;
        
        this.pushPriority = 10;
    };
    
    function setupComponents(){
        
    };
    
    function setupEvents(){
    
    }
};

(function(){
        
    var prototype = createjs.extend(SuperghostEnemy, Enemy);
    
    prototype.state_chasing = function(){
        
        var vector = this.playerVector(this.speed);
        var angle = this.playerAngle(true) - 90;

        this.move(vector, angle);
        
        if(Game.player.dead){
            this.statedef.changeState('idle');
            return;
        }
        else if(this.playerDistance() < this.dashTriggerRadius
               && this.statedef.time > this.dashCooldownTime){
            this.statedef.changeState('dashCharging');
            return;
        }
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
        
        if(this.statedef.time == 1){
            
            this.triggersGhost = true;
            this.pushPriority = -1;
            this.knockback.velocity = 4;
            this.setStunnable(10);
            
            this.statedef.onExitState = function(){
            
                this.triggersGhost = false;
                this.pushPriority = 1;
                this.delayStun = false;
                this.knockback.velocity = 2;
            };
        }
        else if(this.statedef.time == 10){
            
            this.delayStun = true;
        }
        
        this.move(this.dashVector, this.dashAngle);
        
        if(this.statedef.time > this.dashTime){
            
            this.statedef.changeState('chasing');
        };
    };
    
    SuperghostEnemy = createjs.promote(SuperghostEnemy, 'Enemy');
    SuperghostEnemy.initialized = true;
})();