function ComboManager(enemy, vars){
    
    if(!vars)
        vars = {};
    
    this.enemy = enemy;
    
    this.start = vars.start ? vars.start : 38;
    this.window = vars.window ? vars.window : 15;
    this.visualEffectMaxTicks = 15;
    this.visualEffectTicks = -1;
    
    this.currentCombo = 0;
    this.currentTicks = 0;
}

ComboManager.prototype.hit = function(){
    
    //weak hit
    if(this.currentTicks > 0 && this.currentTicks > this.window){
        
        this.currentCombo = 0;
        this.currentTicks = this.start;
        return 0.25;
    } 
    else if(this.currentTicks > 0 && this.currentTicks <= this.window){
        
        this.currentCombo++;
        this.visualEffectTicks = this.visualEffectMaxTicks; 
        this.currentTicks = this.start;
        return 1.5;        
    }
    else{
        
        this.currentCombo = 0;
        this.visualEffectTicks = this.visualEffectMaxTicks; 
        this.currentTicks = this.start;
        return 1;
    }
}

ComboManager.prototype.updateVisual = function(){
    
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

ComboManager.prototype.clearVisual = function(){
    
    this.enemy.sprite.filters = [];    
    this.enemy.refreshCache();
};

ComboManager.prototype.tick = function(inner, outer){

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