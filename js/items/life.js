function Life(vars){

    this.size = 40;
    this.spriteName = 'heartplus';
        
    this.Item_constructor(vars);
};

(function(){
        
    var prototype = createjs.extend(Life, Item);
    
    prototype.collect = function(obj){
        
        Game.player.addLife(1);
    };
    
    Life = createjs.promote(Life, 'Item');
    Life.initialized = true;
})();