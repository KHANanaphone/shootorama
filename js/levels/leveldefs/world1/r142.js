RoomDefs.r142 = {
    
    init : function(){
        
        this.room.setBgColor('#EEF');   
        makeTiles.call(this);
        makeObjects.call(this);
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','b','b','b','b','b','b','b','w',' ',' ','w','b','b','b','b','b','b','b','b'], // 0
                ['b','b','b','b','b','b','b','w',' ',' ',' ',' ','w','b','b','b','b','b','b','b'], // 1
                ['b','b','b','b','b','b','b','w',' ',' ',' ',' ','w','b','b','b','b','b','b','b'], // 2
                ['b','w','w','w','w','w','w','w',' ',' ',' ',' ','w','w','w','w','w','w','w','b'], // 3
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 4
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 5
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 6
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

                text: 'Shoot an enemy when the rings match up \nfor bonus "combo" damage.',
                color: '#FFF',
                x: 500,
                y: 460,
                textAlign: 'center'                    
            });   
            
            this.room.addText({               

                text: 'Take this ghost out with this technique.',
                color: '#FFF',
                x: 500,
                y: 530,
                textAlign: 'center'                    
            });            
            
            this.room.addObject(new GhostTutorial2({x: 925, y: 300, drop: 'none'}), {fade: true});
        };
    },
    clear: function(){
        
        this.room.removeObject(this.topDoor, {fade: true});
    },
    start: function(){
        
        this.leftDoor = new Door({x: 15, y: 250, width: 20, height: 100, persistence: 'remove'});
        this.room.addObject(this.leftDoor, {fade: true});

        this.topDoor = new Door({x: 450, y: 15, width: 100, height: 20, persistence: 'remove'});
        this.room.addObject(this.topDoor, {fade: true});
    }
};