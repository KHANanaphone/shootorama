RoomDefs.r130 = {
    
    init : function(){

        this.room.setBgColor('#EEF');   
        makeTiles.call(this);
        makeObjects.call(this);
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','w','w','w','w','w','w','w','w',' ',' ','w','w','w','w','w','w','w','w','b'], // 0
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 1
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 2
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 3
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 4
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 5
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 6
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 7
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 8
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 9
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 10
                ['b','w',' ',' ','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b']]; // 11
            
            var tiles = {
                'w': {type: Wall}, 
                'b': {type: Tile, params: {color: 'black'} }
            };
            
            this.room.tileGrid.setGrid(tiles, grid);
        };
        
        function makeObjects(){
                        
            this.room.addObject(
                new Health({x: 500, y: 300, type: 'maxup', onCollect: spawnEnemies}));
        };
            
        function spawnEnemies(){

            this.room.addObject(new Ghost({x: 100, y: 100}), {fade: {layer: 0}});
            this.room.addObject(new Ghost({x: 900, y: 100}), {fade: {layer: 1}});
            this.room.addObject(new Ghost({x: 100, y: 500}), {fade: {layer: 2}});
            this.room.addObject(new Ghost({x: 900, y: 500}), {fade: {layer: 3}});
        };
    },
    
    clear: function(){
        
        this.room.removeObject(this.topDoor, {fade: true});
    },
    
    start: function(){

        this.topDoor = new Door({x: 450, y: 15, width: 100, height: 20, persistence: 'remove'});
        this.room.addObject(this.topDoor, {fade: true});

        this.rightDoor = new Door({x: 965, y: 250, width: 20, height: 100, persistence: 'remove'});
        this.room.addObject(this.rightDoor, {fade: true});            

        this.bottomDoor = new Door({x: 100, y: 565, width: 100, height: 20, persistence: 'remove'});
        this.room.addObject(this.bottomDoor, {fade: true});
    }
};