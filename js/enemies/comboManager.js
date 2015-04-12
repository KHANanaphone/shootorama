function ComboManager(vars){
    
    if(!vars)
        vars = {};
    
    this.start = vars.start ? vars.start : 15;
    this.window = vars.window ? vars.window : 6;
    
    this.currentCombo = 0;
    this.currentTicks = 0;
}

ComboManager.prototype.hit = function(){
    
    if(this.currentTicks > 0 && this.currentTicks <= this.window){
        
        this.currentCombo++;
        this.currentTicks = this.start;
        return 1.0 + (0.2 * this.currentCombo);        
    }
    else{        
        
        this.currentCombo = 0;
        this.currentTicks = this.start;
        return 0.4;
    }    
}

ComboManager.prototype.tick = function(){
    
}