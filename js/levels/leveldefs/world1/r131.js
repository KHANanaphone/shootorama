RoomDefs.r131 = {
    
    init : function(room){

        this.room.setBgColor('#EEF');   
        makeTiles.call(this);
        makeObjects.call(this);
        
        this.room.playerSpawnPoint = {x: 400, y: 250};
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'], // 0
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'], // 1
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b'], // 2
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 3
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 4
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 5
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 6
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 7
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 8
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b'], // 9
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'], // 10
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b']]; // 11
            
            var tiles = {
                'w': {type: Wall}, 
                'b': {type: Tile, params: {color: 'black'} }
            };
            
            this.room.tileGrid.setGrid(tiles, grid);
        };
        
        function makeObjects(){   
            
            this.room.addText({               

                text: 'You can also dodge hazards or enemy weapons.',
                color: '#FFF',
                x: 500,
                y: 60,
                textAlign: 'center'                    
            });     

            this.room.addText({               

                text: 'Dodge the turret shot, then shoot the red wall \nwith an empowered shot.',
                color: '#FFF',
                x: 500,
                y: 510,
                textAlign: 'center'                    
            });   
            
            this.leftDoor = new Door({x: 15, y: 250, width: 20, height: 100, type: 'locked'});
            this.room.addObject(this.leftDoor);
            
            this.middleDoor = new Door({x: 490, y: 150, width: 20, height: 300, type: 'shootable'});
            this.room.addObject(this.middleDoor);
            
            this.rightDoor = new Door({x: 965, y: 250, width: 20, height: 100});
            this.room.addObject(this.bottomDoor, {fade: true});
            
            this.room.addObject(new Turret({x: 750, y: 160, facing: 0, damage: 2}));  
            this.room.addObject(new Key({x: 250, y: 300})); 
        };
    }
};