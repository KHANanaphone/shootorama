function HitManager(enemy){
    
    this.enemy = enemy;
    this.currentTicks = 0;
    this.ticksSinceLastHit = 0;
}

HitManager.prototype.hit = function(source){
    
    var dmg;
    
    if(source.empowered){
        
        if(this.enemy.stunnable >= 1)
            this.enemy.statedef.changeState('stunned'); 
        
        this.refreshRingEffect(true);
        dmg = source.empoweredDamage * this.enemy.hits.damageScaling.empowered;
    }
    else if(this.enemy.stunnable == 2 && this.ticksSinceLastHit >= 30){
        
        this.enemy.statedef.changeState('stunned'); 
        this.refreshRingEffect(true);        
        dmg = source.damage * this.enemy.hits.damageScaling.counter;
    }
    else if(this.currentTicks > 0 && this.currentTicks > this.enemy.hits.combo.window){
        
        this.refreshRingEffect(false);        
        dmg = source.damage * this.enemy.hits.damageScaling.weak;
    } 
    else if(this.currentTicks > 0 && this.currentTicks <= this.enemy.hits.combo.window){
             
        this.refreshRingEffect(true);          
        dmg = source.damage * this.enemy.hits.damageScaling.strong;      
    }
    else{
        
        this.refreshRingEffect(false);
        dmg = source.damage * this.enemy.hits.damageScaling.normal;
    }
    
    this.ticksSinceLastHit = 0;

    if(this.enemy.stunned)
        return dmg * this.enemy.hits.damageScaling.stunned;
    else
        return dmg;
};

HitManager.prototype.refreshRingEffect = function(flash){  
    
    if(flash)
        this.enemy.flashColor(40, 0.9, 0.9, 0.3);         
        
    this.currentTicks = this.enemy.hits.combo.startup;
    
    this.enemy.effectsManager.addEffect(
        new RingEffect(this.enemy, {
            start: this.enemy.hits.combo.startup,
            window: this.enemy.hits.combo.window,
            color1: '#AAA',
            color2: '#8F8'
        })
    );
};

HitManager.prototype.tick = function(){
    
    if(this.enemy.stunnableFramesLeft > 0){
        
        this.enemy.stunnableFramesLeft--;
        
        if(this.enemy.stunnableFramesLeft == 0){
            
            this.enemy.stunnableFramesLeft = 0;
            this.enemy.stunnableFrames = 0;
        }
    }
        
    this.currentTicks--;
    this.ticksSinceLastHit++;
}