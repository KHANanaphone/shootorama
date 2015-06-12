RoomDefs.r144 = {
    
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
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 5
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 6
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 7
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 8
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 9
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 10
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b']]; // 11
            
            var tiles = {
                'w': {type: Wall}, 
                'b': {type: Tile, params: {color: 'black'} }
            };
            
            this.room.tileGrid.setGrid(tiles, grid);
        };
        
        function makeObjects(){
            
            this.chest1 = new Chest({
                x: 75, y: 525, contents: 
                [new Key({type: 'gold'})]
            });
            this.chest2 = new Chest({
                x: 925, y: 525, contents: 
                [new Health({type: 'large'})]
            });
            this.room.addObject(this.chest1);
            this.room.addObject(this.chest2);
            
            this.room.addObject(new Shooter({x: 150, y: 450}));
            this.room.addObject(new Shooter({x: 500, y: 500}));
            this.room.addObject(new Shooter({x: 850, y: 450}));
        };
    },
    
    start: function(){
                
    },
    
    clear: function(){
        
        this.chest1.open();
        this.chest2.open();
    }
};