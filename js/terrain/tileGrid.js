function TileGrid(room){
    
    this.Container_constructor();
    this.x = 0;
    this.y = 0;
    this.room = room;
    this.persistence = 'persist';
    
    this.tiles = [];
    
    for(var i = 0; i < 12; i++){
        
        this.tiles[i] = [];
        
        for(var j = 0; j < 20; j++)            
            this.tiles[i][j] = [];
    };
    
    var rect = new createjs.Shape();
    rect.graphics.beginStroke('#F00').drawRect(0, 0, 1000, 600);
    this.addChild(rect);
};

(function(){
        
    var prototype = createjs.extend(TileGrid, createjs.Container);
    
    prototype.tick = function(){
        
        for(var i = 0; i < this.children.length; i++){
            
            var c = this.children[i];
            
            if(c.tick)
                c.tick();
        };
    };
    
    //tiles: an object of {string: {constructor: constructor, params: params}, ...}
    //grid: a 20x12 array of strings correlating to the 'tiles' object
    //
    //get it?
    prototype.setGrid = function(tiles, grid){
        
        for(var y = 0; y < grid.length; y++){
            
            var row = grid[y];
            
            for(var x = 0; x < row.length; x++){
                
                var tileInfo = tiles[row[x]];
                
                if(!tileInfo)
                    continue;
                          
                var params = tileInfo.params ? tileInfo.params : {};
                params.tileX = x;
                params.tileY = y;
                params.room = this.room;
                    
                var newTile = new tileInfo.type(params);
                this.setTile(newTile, x, y);
            };
        };
    };
    
    //clear all tiles at a location
    prototype.clearTiles = function(x, y){
        
        var tiles = this.tiles[y][x];
        
        for(var i = 0; i < tiles.length; i++)
            this.removeChild(tiles[i]);
        
        this.tiles[y][x] = [];
    };
    
    //set tile and remove other tiles at location
    prototype.setTile = function(tile, x, y){
        
        this.clearTiles(x, y);
        this.addTile(tile, x, y);
    }; 
    
    //add tile to array on top of existing tiles
    prototype.addTile = function(tile, x, y){
        
        tile.tileX = x;
        tile.tileY = y;
        tile.x = x * 50 + 25;
        tile.y = y * 50 + 25;
        
        this.tiles[y][x].push(tile);        
        this.addChild(tile);
    }; 
    
    //returns true if a tile is removed, false otherwise
    prototype.removeTile = function(tile){
        
        var tileArray = this.tiles[tile.y][tile.x];
        
        for(var i = tileArray.length - 1; i >= 0; i--){
            
            if(tileArray[i].id == tile.id){
                tileArray.splice(i, 1);
                this.removeChild(tile);
                return true;
            }            
        };
        
        return false;
    };
    
    prototype.getTileUnderLocation = function(x, y){
        
        var tileX = Math.floor(x / 50);
        var tileY = Math.floor(y / 50);
        
        if(tileX < 0 || tileX >= 20)
            return null;
        else if(tileY < 0 || tileY >= 12)
            return null;
        
        var tiles = this.tiles[tileY][tileX];
        
        if(tiles.length > 0)
            return tiles[tiles.length - 1];
    };
    
    TileGrid = createjs.promote(TileGrid, 'Container');
    TileGrid.initialized = true;
    
})();


/* SAMPLE TILE GRID

[//0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 0
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 1
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 2
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 3
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 4
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 5
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 6
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 7
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 8
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 9
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 10
[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']]; // 11

*/