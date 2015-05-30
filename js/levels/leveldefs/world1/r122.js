RoomDefs.r122 = {
    
    init : function(){

        this.cleared = false;
        this.room.setBgColor('#EEF');   
        makeTiles.call(this);
        makeObjects.call(this);
        
        this.room.playerSpawnPoint = {x: 400, y: 450};
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','w','w','w','w','w','w','w','w',' ',' ','w','w','w','w','w','w','w','w','b'], // 0
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 1
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 2
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 3
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 4
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 5
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 6
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
            
            this.topDoor = new Door({x: 450, y: 15, width: 100, height: 20});
            this.room.addObject(this.topDoor, {fade: true});
            
            this.leftDoor = new Door({x: 15, y: 250, width: 20, height: 100});
            this.room.addObject(this.leftDoor, {fade: true});
            
            this.rightDoor = new Door({x: 965, y: 250, width: 20, height: 100, type: 'locked'});
            this.room.addObject(this.rightDoor);
        };
    },
    
    entering: function(from){
        
        if(from == 'right')
            this.room.removeObject(this.rightDoor);
    },
    
    start: function(firstVisit){        
        
        if(this.cleared)
            return;
        
        this.wavesLeft = 2;
        this.wave();
    },    
    
    clear: function(){
        
        if(this.wavesLeft > 0)
            this.wave();
        else{
            this.cleared = true;
            this.room.removeObject(this.leftDoor, {fade: true});
            this.room.removeObject(this.topDoor, {fade: true});
        }
    },
        
    wave: function(){  
        
        var x = Game.player.x > 500 ? 200 : 800;
        
        this.room.addObject(
            new GhostFast({x: x, y: 300}),
            {fade: true, persistence: 'remove'}
        );
        
        this.wavesLeft--;
    }
};