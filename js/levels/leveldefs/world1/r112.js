RoomDefs.r112 = {
    
    init : function(){

        var self = this;
        
        this.room.setBgColor('#F00');
        makeTiles.call(this);
        makeObjects.call(this);
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w'], // 0
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 1
                [' ',' ',' ',' ',' ',' ',' ',' ',' ','t','t','t','t','t','t','t','t','t','t',' '], // 2
                [' ',' ',' ',' ',' ',' ',' ',' ',' ','t','t','t','t','t','t','t','t','t','t',' '], // 3
                [' ',' ',' ',' ',' ',' ',' ',' ',' ','t','t',' ',' ',' ',' ',' ',' ','t','t',' '], // 4
                [' ',' ',' ',' ',' ',' ',' ',' ',' ','t','t',' ',' ',' ',' ',' ',' ','t','t',' '], // 5
                ['t','t','t','t','t','t','t','t','t','t','t','t','t','t','t','t','t','t','t',' '], // 6
                ['t','t','t','t','t','t','t','t','t','t','t','t','t','t','t','t','t','t','t',' '], // 7
                [' ',' ',' ',' ',' ',' ',' ',' ',' ','t','t',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 8
                [' ',' ',' ',' ',' ',' ',' ',' ',' ','t','t',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 9
                [' ',' ',' ',' ',' ',' ',' ',' ',' ','t','t',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 10
                ['w','w','w','w','w','w','w','w','w','t','t','w','w','w','w','w','w','w','w','w']]; // 11
            
            var tiles = {
                'w': {type: Wall}, 
                't': {type: Tile, params: {spriteName: 'tile'} },
                ' ': {type: Lava}
            };
            
            this.room.tileGrid.setGrid(tiles, grid);
        };
        
        function makeObjects(){
            
            this.room.addObject(
                new Key({x: 900, y: 150, onCollect: keyCollected}), {persistence: 'persist'});    
        };
        
        function keyCollected(){
            
        }
    }
};