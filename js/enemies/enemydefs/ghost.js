function Ghost (vars){
    
    if(!this.spriteName)
        this.spriteName = 'ghost';
    
    this.health = this.health ? this.health : 40;
    this.size = 60;
    
    this.Enemy_constructor(vars); 
    
    setupVars.call(this);   
    setupComponents.call(this);
    
    function setupVars(){
        
        //required
        this.defaultState = 'chasing';
        this.touchDamage = 5; 
        
        //default stats        
        this.stunTime = 90;        
        this.speed = 1.4;
           
        this.knockback = {            
            ticks: 9,
            velocity: 2
        };
        
        this.dash = {
            triggerRadius: 140,
            cooldownTime: 90,
            chargeTime: 40,
            speed: 10,
            time: 18
        };
    };
    
    function setupComponents(){
            
    };
}

(function(){
        
    var prototype = createjs.extend(Ghost, Enemy);
    
    prototype.state_chasing = function(){
        
        var vector = this.playerVector(this.speed);
        var angle = this.playerAngle(true) - 90;

        this.move(vector, angle);
        
        if(Game.player.dead){
            this.statedef.changeState('idle');
        }
        else if(this.playerDistance() < this.dash.triggerRadius
               && this.statedef.time > this.dash.cooldownTime){
            this.statedef.changeState('dashCharging');
        }
    };
    
    prototype.state_dashCharging = function(){
        
        if(this.statedef.time > this.dash.chargeTime){
            this.statedef.changeState('dashing');
        }   
        else if(this.statedef.time == 1){
            
            this.effectsManager.addEffect(new ExpandingParticleEffect(this, {
                time: this.dash.chargeTime,
                distance: 1.5,
                reverse: true,
                count: 5
            }));
            
            this.dash.vector = this.playerVector(this.dash.speed);
            this.dash.angle = this.playerAngle(true) - 90;
        }     
    };
    
    prototype.state_dashing = function(){
        
        if(this.statedef.time == 1){
            
            this.triggersIllusion = true;
            this.pushPriority = -1;
            this.knockback.velocity = 4;       
            
            this.statedef.onExitState = function(){
            
                this.triggersIllusion = false;
                this.pushPriority = 1;
                this.knockback.velocity = 2;
                this.stunnable = 0;
            };
        }
        else if(this.statedef.time == 10){
            
            this.stunnable = 0;
        }
        
        this.move(this.dash.vector, this.dash.angle);
        
        if(this.statedef.time > this.dash.time){
            
            if(this.confused)
                this.statedef.changeState('confused');
            else
                this.statedef.changeState('chasing');
        };
    };
    
    prototype.state_confused = function(){
        
        if(this.statedef.time == 1){
            
            this.stunnable = 1;
            this.effectsManager.addEffect(
                new TextEffect(this, {
                    text: '?',
                    time: 80,
                    size: '35px'
                })
            );
            
            this.statedef.onExitState = function(){
                
                this.confused = false;
                this.stunnable = 0;
            };
        }
        
        
        if(this.statedef.time == 60){            
            this.statedef.changeState('chasing');
        };
    };
    
    prototype.triggerIllusion = function(){

        this.confused = true;
    };
    
    Ghost = createjs.promote(Ghost, 'Enemy');
    Ghost.initialized = true;
})();