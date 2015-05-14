function EffectsManager(target){
    
    this.target = target;    
    this.effects = [];
    this.nextId = 0;
};

EffectsManager.prototype.addEffect = function(effect){
    
    effect.id = this.nextId;
    this.nextId++;
    
    this.removeEffectsOfType(effect.type);    
    this.effects.push(effect);
};

EffectsManager.prototype.removeEffectsOfType = function(type){
    
    var withRemoved = [];
    
    for(var i = 0; i < this.effects.length; i++){
        
        var effect = this.effects[i];
        
        if(effect.type != type)
            withRemoved.push(effect);
        else if(effect.clear)
            effect.clear();
    };
    
    this.effects = withRemoved;
};

EffectsManager.prototype.clearAll = function(){
    
    for(var i = 0; i < this.effects.length; i++){
        this.effects[i].clear();
    };
    
    this.effects = [];   
};

EffectsManager.prototype.clearEffect = function(effect){
    
    if(effect.clear)
        effect.clear();
    
    this.effects = this.effects.filter(function(value){
        
        if(effect.id == value.id)
            return false;
        
        return true;
    });
}
    
EffectsManager.prototype.tick = function(){
    
    var stillRunning = [];
    var withRemoved = [];    
    
    for(var i = 0; i < this.effects.length; i++){
        
        var effect = this.effects[i];
        
        if(effect.tick)
            effect.tick();
        
        if(effect.timeRemaining == -1){
            
            stillRunning.push(effect);
        } 
        else if(effect.timeRemaining > 0){
            
            stillRunning.push(effect);
            effect.timeRemaining--;
        }   
        else{
            if(effect.clear)
                effect.clear();
        }        
    };    
    
    this.effects = stillRunning;
};