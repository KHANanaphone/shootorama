function Health(vars){
    
    this.spriteName = 'health';    
    this.Item_constructor(vars);
};

(function(){
        
    var prototype = createjs.extend(Health, Item);
    
    prototype.handleCollision = function(obj){
        
        if(obj.hitbox.type != 'player')
            return;
        
        obj.health = obj.maxHealth;
        this.destroy();
    };
    
    Health = createjs.promote(Health, 'Item');
    Health.initialized = true;
})();