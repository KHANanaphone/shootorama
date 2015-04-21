function HitManager(enemy){
    
    this.enemy = enemy;
    
    this.start = 40;
    this.window = 12;  
    this.currentTicks = 0;
}

HitManager.prototype.hit = function(source){
    
    console.log(this.enemy.statedef.id + ' - ' + this.enemy.statedef.time);
    
    if(source.empowered){
        
        if(this.enemy.stunnable >= 1)
            this.enemy.statedef.changeState('stunned'); 
        
        this.refreshRingEffect(true);
        return source.empoweredDamage;
    }
    
    if(this.enemy.stunnable == 2 && this.currentTicks <= 0){
        
        this.enemy.statedef.changeState('stunned'); 
        this.refreshRingEffect(true);        
        return source.damage * 3;
    };
    
    //weak hit
    if(this.currentTicks > 0 && this.currentTicks > this.window){
        
        this.refreshRingEffect(false);        
        return source.damage / 6;
    } 
    else if(this.currentTicks > 0 && this.currentTicks <= this.window){
             
        this.refreshRingEffect(true);          
        return source.damage * 2;      
    }
    else{
        
        this.refreshRingEffect(false);
        return source.damage;
    }
};

HitManager.prototype.refreshRingEffect = function(flash){  
    
    if(flash)
        this.enemy.flashColor(40, 0.9, 0.9, 0.3);         
        
    this.currentTicks = this.start;
    
    this.enemy.effectsManager.addEffect(
        new RingEffect(this.enemy, {
            start: this.start,
            window: this.window,
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
}