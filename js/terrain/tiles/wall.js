function Wall(vars){
    
    if(!vars)
        vars = {};
    
    if(!vars.color)
        vars.color = '#000';
    
    this.Tile_constructor(vars);
    
    this.hitbox = {
        type: 'solid',
        width: 50, 
        height: 50
    };
};

(function(){
        
    var prototype = createjs.extend(Wall, Tile);
    
    Wall = createjs.promote(Wall, 'Tile');
    Wall.initialized = true;
    
})();