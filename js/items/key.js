function Key(vars){
    
    this.size = 40;    
    this.type = vars.type ? vars.type : 'metal';
    
    if(vars.type == 'gold')
        this.spriteName = 'goldkey';
    else
        this.spriteName = 'key'; 
    
    this.Item_constructor(vars);
};

(function(){
        
    var prototype = createjs.extend(Key, Item);
    
    prototype.collect = function(obj){
        
        if(this.type == 'gold')
            obj.addKeys('gold');
        else
            obj.addKeys(1);
    };
    
    Key = createjs.promote(Key, 'Item');
    Key.initialized = true;
})();