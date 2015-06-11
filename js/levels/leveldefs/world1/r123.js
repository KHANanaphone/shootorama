RoomDefs.r123 = {
    
    init : function(){

        this.room.setBgColor('#EEF');   
        this.complete = false;
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
            
            this.leftLockDoor = new Door({x: 5, y: 250, width: 20, height: 100, type: 'locked'});
            this.room.addObject(this.leftLockDoor);
        };
    },
    
    entering: function(from){
        
        if(from == 'left')
            this.room.removeObject(this.leftLockDoor);
    },
    
    start: function(){
        
        if(this.complete)
            return;
        
        this.leftDoor = new Door({x: 25, y: 250, width: 20, height: 100, persistence: 'remove'});
        this.room.addObject(this.leftDoor, {fade: true});
        
        this.topDoor = new Door({x: 450, y: 15, width: 100, height: 20, persistence: 'remove'});
        this.room.addObject(this.topDoor, {fade: true});
        
        this.rightDoor = new Door({x: 965, y: 250, width: 20, height: 100, persistence: 'remove'});
        this.room.addObject(this.rightDoor, {fade: true});
        
        this.wavesLeft = 3;
        this.wave();
        
    },
    
    wave: function(){
        
        var enemyY = Game.player.y < 300 ? 450 : 150;
        
        if(this.wavesLeft == 3)
            this.room.addObject(new ShooterBlue({x: 500, y:  enemyY, persistence: 'remove'}));
        else if(this.wavesLeft == 2)
            this.room.addObject(new ShooterOrange({x: 500, y:  enemyY, persistence: 'remove'}));
        else if(this.wavesLeft == 1)
            this.room.addObject(new ShooterRed({x: 500, y:  enemyY, persistence: 'remove'}));
        
        this.wavesLeft--;
    },
    
    clear: function(){
        
        if(this.wavesLeft > 0)
            this.wave();
        else {
            
            this.complete = true;
            
            this.room.removeObject(this.leftDoor, {fade: true});
            this.room.removeObject(this.topDoor, {fade: true});
            this.room.removeObject(this.rightDoor, {fade: true});
        }
    }
};