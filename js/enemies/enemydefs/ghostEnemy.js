function GhostEnemy(vars){
    
    setupVars.call(this);
    this.Enemy_constructor(vars);    
    setupComponents.call(this);
    setupEvents.call(this);
    
    function setupVars(){
        
        //required
        this.spriteName = 'ghost';
        this.defaultState = 'chasing';
        this.health = 40;
        this.playerDamage = 5;
        
        //optional
        this.stunTime = 90;        
        this.speed = 0.9;
           
        this.knockback = {            
            ticks: 9,
            velocity: 2
        };
        
        this.dashTriggerRadius = 140;        
        this.dashCooldownTime = 150;
        this.dashChargeTime = 40;
        
        this.dashSpeed = 10;
        this.dashTime = 18;
    };
    
    function setupComponents(){
        
        this.questionMark = SpriteManager.makeSprite('qmark').set({           
            x: 0,
            y: this.size * -1,
            scaleX: this.scale,
            scaleY: this.scale,
            alpha: 0
        });
        this.addChild(this.questionMark);
        
    };
    
    function setupEvents(){
    
    }
};

(function(){
        
    var prototype = createjs.extend(GhostEnemy, Enemy);
    
    prototype.state_chasing = function(){
        
        var vector = this.playerVector(this.speed);
        var angle = this.playerAngle(true) - 90;

        this.move(vector, angle);
        
        if(Game.player.dead){
            this.statedef.changeState('idle');
        }
        else if(this.playerDistance() < this.dashTriggerRadius
               && this.statedef.time > this.dashCooldownTime){
            this.statedef.changeState('dashCharging');
        }
    };
    
    prototype.state_dashCharging = function(){
        
        if(this.statedef.time > this.dashChargeTime){
            this.statedef.changeState('dashing');
        }   
        else if(this.statedef.time == 1){
            
            this.effectsManager.addEffect(new ExpandingParticleEffect(this, {
                time: this.dashChargeTime,
                distance: 1.5,
                reverse: true,
                count: 5
            }));
            
            this.dashVector = this.playerVector(this.dashSpeed);
            this.dashAngle = this.playerAngle(true) - 90;
        }     
    };
    
    prototype.state_dashing = function(){
        
        if(this.statedef.time == 1){
            
            this.triggersGhost = true;
            this.pushPriority = -1;
            this.knockback.velocity = 4;
            this.stunnable = 2;            
            this.flashColor(10, 1, 0.5, 0.5);        
            
            this.statedef.onExitState = function(){
            
                this.triggersGhost = false;
                this.pushPriority = 1;
                this.knockback.velocity = 2;
                this.stunnable = 0;
            };
        }
        else if(this.statedef.time == 10){
            
            this.stunnable = 0;
        }
        
        this.move(this.dashVector, this.dashAngle);
        
        if(this.statedef.time > this.dashTime){
            
            if(this.confused)
                this.statedef.changeState('confused');
            else
                this.statedef.changeState('chasing');
        };
    };
    
    prototype.state_confused = function(){
        
        if(this.statedef.time == 1){
            
            this.stunnable = 1;
            
            this.statedef.onExitState = function(){
                
                this.confused = false;
                this.stunnable = 0;
                this.questionMark.alpha = 0;
            };
        }
        
        this.questionMark.alpha += 0.05;
        
        if(this.statedef.time == 60){            
            this.statedef.changeState('chasing');
        };
    };
    
    prototype.triggerGhost = function(){

        this.confused = true;
    };
    
    GhostEnemy = createjs.promote(GhostEnemy, 'Enemy');
    GhostEnemy.initialized = true;
})();