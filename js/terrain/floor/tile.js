function Tile(vars){
    
    this.FloorObject_constructor(vars);
    
    var blue = new createjs.Shape();
    blue.graphics.beginFill('blue').drawRect(0, 0, vars.width, vars.height);
    this.addChild(blue);
};

(function(){
        
    var prototype = createjs.extend(Tile, FloorObject);
    Tile = createjs.promote(Tile, 'FloorObject');
    Tile.initialized = true;
})();