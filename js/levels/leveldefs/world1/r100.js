RoomDefs.r100 = {
    
    init : function(){

        this.room.setBgColor('#F00');   
        makeTiles.call(this);
        makeObjects.call(this);
        
        this.room.playerSpawnPoint = {x: 400, y: 450};
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b','w','w'], // 0
                ['w','t','t','t','t','t',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w','t','t'], // 1
                ['w','t',' ',' ',' ','t',' ','t','t','t','t','t','t','t','t',' ',' ','w','t','w'], // 2
                ['w','t','t','t',' ','t',' ','t',' ',' ',' ',' ',' ',' ','t',' ',' ',' ','t','w'], // 3
                ['w',' ',' ','t',' ','t',' ','t',' ',' ',' ',' ','t','t','t',' ',' ',' ','t','w'], // 4
                ['w',' ',' ','t',' ','t',' ','t',' ','t','t',' ','t',' ',' ',' ',' ',' ','t','w'], // 5
                ['w','t','t','t',' ','t','t','t',' ','t','t',' ','t',' ','t','t','t','t','t','w'], // 6
                ['w','t',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','t',' ','t',' ',' ',' ',' ','w'], // 7
                ['w','t',' ',' ',' ','t','t','t','t','t','t','t','t',' ','t',' ',' ',' ',' ','w'], // 8
                ['w','t','w',' ',' ','t',' ',' ',' ',' ',' ',' ',' ',' ','t',' ',' ',' ',' ','w'], // 9
                ['w','t','w',' ',' ','t','t','t','t','t','t','t','t','t','t',' ',' ',' ',' ','w'], // 10
                ['w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b']]; // 11
            
            var tiles = {
                'w': {type: Wall}, 
                'b': {type: Tile, params: {color: 'black'} },
                't': {type: Tile, params: {spriteName: 'tile'} },
                ' ': {type: Lava}
            };
            
            this.room.tileGrid.setGrid(tiles, grid);
        };
        
        function makeObjects(){

            this.room.addObject(new Health({x: 75, y: 525, type: 'maxup'}));
            this.room.addObject(new Turret({x: 500, y: 300, rotating: true}))
        };
    }
};