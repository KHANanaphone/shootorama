RoomDefs.r141 = {
    
    init: function(){
        
        this.room.setBgColor('#EEF');   
        makeTiles.call(this);
        makeObjects.call(this);
        
        function makeTiles(){
            
            var grid = 
                [//0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'], // 0
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'], // 1
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'], // 2
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b'], // 3
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 4
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 5
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 6
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 7
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b'], // 8
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'], // 9
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

                text: 'Use I or Z to shoot.',
                color: '#FFF',
                x: 500,
                y: 60,
                textAlign: 'center'                    
            });     

            this.room.addText({               

                text: 'Hold P or C to strafe.',
                color: '#FFF',
                x: 500,
                y: 510,
                textAlign: 'center'                    
            });   
            
            this.room.addObject(new GhostTutorial1({x: 950, y: 300, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 900, y: 260, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 900, y: 340, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 850, y: 220, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 850, y: 300, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 850, y: 380, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 800, y: 260, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 800, y: 340, drop: 'none'}));
            this.room.addObject(new GhostTutorial1({x: 750, y: 300, drop: 'none'}));
        };
    },
    
    clear: function(){
        
        this.room.removeObject(this.rightDoor, {fade: true});
    },
    
    start: function(){        
            
        this.leftDoor = new Door({x: 15, y: 250, width: 20, height: 100, persistence: 'remove'});
        this.room.addObject(this.leftDoor, {fade: true});

        this.rightDoor = new Door({x: 965, y: 250, width: 20, height: 100, persistence: 'remove'});
        this.room.addObject(this.rightDoor, {fade: true});
    }
};