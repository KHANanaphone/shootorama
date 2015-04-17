function HitManager(enemy){
    
    this.enemy = enemy;
    
    this.start = 60;
    this.window = 20;
    this.visualEffectMaxTicks = 40;
    this.visualEffectTicks = -1;    
    this.currentTicks = 0;
}

HitManager.prototype.hit = function(){

    if(this.enemy.stunned){
        
        this.currentTicks = 0;
        return 1;
    }
    else if(this.enemy.stunnableFramesLeft > 0){
        
        this.enemy.stunnableFrames = 0;
        this.enemy.stunnableFramesLeft = 0;
        this.enemy.statedef.changeState('stun');
        return 3;
    }
    
    //weak hit
    if(this.currentTicks > 0 && this.currentTicks > this.window){
        
        this.currentTicks = this.start;
        return 0.16666666;
    } 
    else if(this.currentTicks > 0 && this.currentTicks <= this.window){
        
        this.visualEffectTicks = this.visualEffectMaxTicks; 
        this.currentTicks = this.start;
        return 2;        
    }
    else{
        
        //this.visualEffectTicks = this.visualEffectMaxTicks; 
        this.currentTicks = this.start;
        return 1;
    }
}

HitManager.prototype.updateVisual = function(){
    
    var scale = this.visualEffectTicks / this.visualEffectMaxTicks;
    var mult = 1 - scale;
    var add = 200 * scale;
    
    this.enemy.sprite.filters = [
        new createjs.ColorFilter(
            mult, mult, mult, 1,
            add / 2,  add,  add / 2,  0)
    ];

    this.enemy.refreshCache();
};

HitManager.prototype.clearVisual = function(){
    
    this.enemy.sprite.filters = [];    
    this.enemy.refreshCache();
};

HitManager.prototype.tick = function(){

    var inner = this.enemy.comboRingInner;
    var outer = this.enemy.comboRingOuter;
    
    if(this.enemy.stunnableFramesLeft > 0){
        
        this.enemy.stunnableFramesLeft--;
        
        if(this.enemy.stunnableFramesLeft == 0){
            
            this.enemy.stunnableFramesLeft = 0;
            this.enemy.stunnableFrames = 0;
        }
    }
    
    if(this.visualEffectTicks > 0){
        this.updateVisual();
        this.visualEffectTicks--;
    }
    else if(this.visualEffectTicks == 0){
        this.clearVisual();
        this.visualEffectTicks = -1;
    }
    
    if(this.currentTicks < 0)
        return;    
    else if(this.currentTicks == 0){

        //clear graphics, combo/cooldown is over
        this.currentTicks = -1;
        inner.graphics.clear();
        outer.graphics.clear
    }
    else if(this.currentTicks > 0 && this.currentTicks <= this.window){
        
        inner.graphics.clear();
        inner.graphics.beginStroke('#0F0').drawCircle(0, 0, this.enemy.size * 0.5);
        inner.alpha = 0.8 * this.currentTicks / this.window;
        
        if(this.currentTicks == this.window)
            outer.graphics.clear();
    }
    else{
        
        var scale = 1 + (this.currentTicks - this.window) / (this.start - this.window);        
        
        outer.graphics.clear();
        outer.graphics.beginStroke('#AAA').drawCircle(0, 0, this.enemy.size * 0.5 * scale);
        
        if(this.currentTicks == this.start){
            inner.alpha = 0.8;
            inner.graphics.clear();
            inner.graphics.beginStroke('#AAA').drawCircle(0, 0, this.enemy.size * 0.5);
        }
    }        
        
    this.currentTicks--;
}