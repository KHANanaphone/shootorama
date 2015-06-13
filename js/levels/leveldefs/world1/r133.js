RoomDefs.r133 = {
    
    init : function(){

        this.room.setBgColor('#F00');   
        
        this.complete = false;
        makeTiles.call(this);
        makeObjects.call(this);
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b'], // 0
                ['w',' ',' ','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 1
                ['w',' ',' ','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 2
                ['w',' ',' ','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 3
                ['w',' ',' ','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 4
                ['w',' ',' ','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 5
                ['w',' ',' ','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 6
                ['w',' ',' ','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 7
                ['w',' ',' ','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 8
                ['w',' ',' ','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 9
                ['w',' ',' ','l','l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 10
                ['b','w','w','w','w','w','w','w','w',' ',' ','w','w','w','w','w','w','w','w','b']]; // 11
            
            var tiles = {
                'w': {type: Wall}, 
                'b': {type: Tile, params: {color: 'black'} },
                'l': {type: Lava},
                ' ': {type: Tile, params: {color: '#EEF'} }
            };
            
            this.room.tileGrid.setGrid(tiles, grid);
        };
        
        function makeObjects(){            
            
            
        };
    },
    
    start: function(){
        
        if(this.complete)
            return;
        
        this.botDoor = new Door({x: 450, y: 565, width: 100, height: 20, persistence: 'remove'});
        this.room.addObject(this.botDoor, {fade: true});
        
        this.rightDoor = new Door({x: 965, y: 250, width: 20, height: 100, persistence: 'remove'});
        this.room.addObject(this.rightDoor, {fade: true});
        
        this.boss = new BossShooter({x: 100, y: 300, ringColor1: '#444', ringColor2: '#080'});     
        this.room.addObject(this.boss);
    },
    
    clear: function(){
        
        this.complete = true;
            
        this.room.removeObject(this.botDoor, {fade: true});
        this.room.removeObject(this.rightDoor, {fade: true});
    }
};