function HitManager(enemy){
    
    this.enemy = enemy;
    this.currentTicks = 0;
    this.ticksSinceLastHit = 0;
}

HitManager.prototype.hit = function(source, damage){
    
    var dmg, type;
    
    if(source.empowered){
        
        if(this.enemy.stunnable >= 1)
            this.enemy.statedef.changeState('stunned'); 
        
        this.refreshRingEffect(true);
        type = 'empowered';
        dmg = damage * this.enemy.hits.damageScaling.empowered;
    }
    else if(this.enemy.stunnable == 2 && this.ticksSinceLastHit >= 30){
        
        this.enemy.statedef.changeState('stunned'); 
        this.refreshRingEffect(true);   
        type = 'stun';     
        dmg = damage * this.enemy.hits.damageScaling.counter;
    }
    else if(this.currentTicks > 0 && this.currentTicks > this.enemy.hits.combo.window){
        
        //this.refreshRingEffect(false);
        type = 'weak';            
        dmg = damage * this.enemy.hits.damageScaling.weak;
    } 
    else if(this.currentTicks > 0 && 
            this.currentTicks <= this.enemy.hits.combo.window &&
            this.ticksSinceLastHit > this.enemy.hits.combo.startup - this.enemy.hits.combo.window){
             
        this.refreshRingEffect(true);    
        type = 'strong';                  
        dmg = damage * this.enemy.hits.damageScaling.strong;      
    }
    else{
        
        this.refreshRingEffect(false);
        type = 'normal';            
        dmg = damage * this.enemy.hits.damageScaling.normal;
    }
    
    this.ticksSinceLastHit = 0;

    if(this.enemy.stunned)
        dmg *= this.enemy.hits.damageScaling.stunned;
    
    dmg = Math.floor(dmg);
    
    this.enemy.addHealth(-dmg);
    this.textEffect(type, dmg);
};

HitManager.prototype.textEffect = function(type, damage){
    
    if(damage == 0)
        return;
    
    var params = {text: damage};
    
    if(type == 'empowered' || type == 'stun'){
        params.color = 'red';
        params.size = '35px';
        params.text += '!';
    }
    else if(type == 'strong'){
        params.color = '#ccac00';
        params.size = '30px';
    }
    else if(type == 'normal'){
        params.color = 'black';
        params.size = '25px';
    }
    else if(type == 'weak'){
        params.color = '#BBB';
        params.size = '25px';
    }    
    
    this.enemy.effectsManager.addEffect(new TextEffect(this.enemy, params));
};

HitManager.prototype.refreshRingEffect = function(flash){  
    
    if(flash)
        this.enemy.flashColor(40, 1, 0.8, 0);         
        
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