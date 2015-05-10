function Key(vars){
    
    this.size = 40;    
    this.spriteName = 'key';    
    this.Item_constructor(vars);
};

(function(){
        
    var prototype = createjs.extend(Key, Item);
    
    prototype.collect = function(obj){
        
        obj.addKeys(1);
    };
    
    Key = createjs.promote(Key, 'Item');
    Key.initialized = true;
})();