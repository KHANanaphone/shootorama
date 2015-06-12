RoomDefs.r134 = {
    
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
                [' ',' ',' ',' ',' ',' ',' ',' ',' ','w','w',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 5
                [' ',' ',' ',' ',' ',' ',' ',' ',' ','w','w',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 6
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
            
            this.room.addObject(new Door({x: 15, y: 250, width: 20, height: 100, type: 'goldlocked'}));
            
            this.room.addObject(new Turret(
                {x: 50, y: 545, facing: 243, delay: 0, shotSpeed: 13}));            
            this.room.addObject(new Turret(
                {x: 50, y: 55, facing: 297, delay: 23, shotSpeed: 13}));            
            this.room.addObject(new Turret(
                {x: 950, y: 545, facing: 117, delay: 45, shotSpeed: 13}));            
            this.room.addObject(new Turret(
                {x: 950, y: 55, facing: 63, delay: 68, shotSpeed: 13}));
            
            var img = this.room.addImage('bossskull', 100, 300, 100, 100);
            img.rotation = 270;
            img.alpha = 0.3;
            
        };
    }
};