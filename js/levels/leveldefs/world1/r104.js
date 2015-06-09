RoomDefs.r104 = {
    
    init : function(){

        this.room.setBgColor('#EEF');   
        makeTiles.call(this);
        makeObjects.call(this);
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b'], // 0
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 1
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 2
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 3
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 4
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 5
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 6
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 7
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 8
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 9
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 10
                ['b','w','w','w','w','w','w','w','w',' ',' ','w','w','w','w','w','w','w','w','b']]; // 11
            
            var tiles = {
                'w': {type: Wall}, 
                'b': {type: Tile, params: {color: 'black'} }            
            };
            
            this.room.tileGrid.setGrid(tiles, grid);
        };
        
        function makeObjects(){

            this.room.addObject(new GhostTutorial1({x: 300, y: 300, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 350, y: 300, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 400, y: 300, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 450, y: 300, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 500, y: 300, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 550, y: 300, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 600, y: 300, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 650, y: 300, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 700, y: 300, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 750, y: 300, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 800, y: 300, drop: 'none'}));
        };
    },
    
    clear: function(){
        
    }
};