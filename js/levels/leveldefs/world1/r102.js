RoomDefs.r102 = {
    
    init : function(){

        this.cleared = false;
        this.room.setBgColor('#F00');   
        makeTiles.call(this);
        makeObjects.call(this);
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b'], // 0
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 1
                ['w','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','w'], // 2
                ['w','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','w'], // 3
                ['w','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','w'], // 4
                ['z',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'], // 5
                ['z',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','z'], // 6
                ['w','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','w'], // 7
                ['w','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','w'], // 8
                ['w','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','l','w'], // 9
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 10
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b']]; // 11
            
            var tiles = {
                'w': {type: Wall}, 
                'b': {type: Tile, params: {color: 'black'} },
                'z': {type: Tile, params: {color: '#EEF'} },
                'l': {type: Lava},
                ' ': {type: Tile, params: {spriteName: 'tile'} }
            };
            
            this.room.tileGrid.setGrid(tiles, grid);
        };
        
        function makeObjects(){

            this.room.addObject(
                new InvisibleWall({x: 50, y: 100, width: 900, height: 25, stops: ['enemy']}));
            this.room.addObject(
                new InvisibleWall({x: 50, y: 475, width: 900, height: 25, stops: ['enemy']}));
            
            this.room.addObject(new Shooter({x: 500, y: 75, drop: 'none'}));
            this.room.addObject(new Shooter({x: 500, y: 525, drop: 'none'}));
        };
    },
    
    start: function(){
        
        if(this.cleared)
            return;
        
        this.enemiesLeft = 0;
        
        this.leftDoor = new Door({x: 15, y: 250, width: 20, height: 100, persistence: 'remove'});
        this.room.addObject(this.leftDoor, {fade: true});

        this.rightDoor = new Door({x: 965, y: 250, width: 20, height: 100, persistence: 'remove'});
        this.room.addObject(this.rightDoor, {fade: true});
        
    },
    
    clear: function(){
        
        if(this.enemiesLeft == 0){
            this.cleared = true;
            this.room.removeObject(this.leftDoor, {fade: true});  
            this.room.removeObject(this.rightDoor, {fade: true});  
        } 
        else{
            this.enemiesLeft = 0;
            this.room.addObject(new Shooter({x: 500, y: 525, drop: 'none'}));
        }
    }
};