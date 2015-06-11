RoomDefs.r132 = {
    
    init : function(room){

        this.room.setBgColor('#EEF');   
        makeTiles.call(this);
        makeObjects.call(this);
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'], // 0
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'], // 1
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'], // 2
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b'], // 3
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
            
            this.room.addText({               

                text: "Dodge the ghost's attack at the last second to gain an \nempowered attack, and take out the ghost with it.",
                color: '#FFF',
                x: 500,
                y: 65,
                textAlign: 'center'                    
            });
            
            
            this.room.addObject(new GhostTutorial3({x: 505, y: 225, drop: 'none'}), {fade: true});
        };
    },
    clear: function(){
        
        this.room.removeObject(this.leftDoor, {fade: true});
    },
    start: function(){
        
        this.leftDoor = new Door({x: 15, y: 250, width: 20, height: 100, persistence: 'remove'});
        this.room.addObject(this.leftDoor, {fade: true});

        this.bottomDoor = new Door({x: 450, y: 565, width: 100, height: 20, persistence: 'remove'});
        this.room.addObject(this.bottomDoor, {fade: true});
    }
};