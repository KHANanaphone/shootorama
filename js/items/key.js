function Key(vars){
    
    this.spriteName = 'key';    
    this.Item_constructor(vars);
};

(function(){
        
    var prototype = createjs.extend(Key, Item);
    
    prototype.handleCollision = function(obj){
        
        if(obj.hitbox.type != 'player')
            return;
        
        obj.addKeys(1);
        this.destroy();
    };
    
    Key = createjs.promote(Key, 'Item');
    Key.initialized = true;
})();