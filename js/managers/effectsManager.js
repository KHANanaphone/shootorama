function EffectsManager(target){
    
    this.target = target;    
    this.effects = [];
    this.nextId = 0;
};

EffectsManager.prototype.addEffect = function(effect, overlap){
    
    effect.id = this.nextId;
    this.nextId++;
    
    if(!overlap)
        this.removeEffectsOfType(effect.type);  
    
    this.effects.push(effect);
};

EffectsManager.prototype.removeEffectsOfType = function(type){
    
    var withRemoved = [];
    
    for(var i = 0; i < this.effects.length; i++){
        
        var effect = this.effects[i];
        
        if(effect.type != type)
            withRemoved.push(effect);
        else 
            this.clearEffect(effect);
    };
    
    this.effects = withRemoved;
};

EffectsManager.prototype.clearAll = function(){
    
    for(var i = 0; i < this.effects.length; i++){
        this.clearEffect(this.effects[i]);
    };
    
    this.effects = [];   
};

EffectsManager.prototype.removeEffect = function(effect){
    
    this.clearEffect(effect);
    
    this.effects = this.effects.filter(function(value){
        
        if(effect.id == value.id)
            return false;
        
        return true;
    });    
};
    
EffectsManager.prototype.clearEffect = function(effect){
    
    if(effect.clear)
        effect.clear();
    
    if(effect.onClear)
        effect.onClear();    
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
            this.clearEffect(effect);
        }        
    };    
    
    this.effects = stillRunning;
};