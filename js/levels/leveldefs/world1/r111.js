RoomDefs.r111 = {
    
    init : function(){

        var self = this;
        
        this.spawnPoints = [
            [100, 100], 
            [500, 100], 
            [900, 100], 
            [900, 300], 
            [900, 500], 
            [500, 500], 
            [100, 500], 
            [100, 300]
        ];
        
        this.room.setBgColor('#F00');
        makeTiles.call(this);
        makeObjects.call(this);
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['w','w','w',' ',' ','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w'], // 0
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 1
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 2
                ['w',' ',' ','t','t','t','t','t','t','t','t','t','t','t','t','t','t',' ',' ',' '], // 3
                ['w',' ',' ','t','t','t','t','t','t','t','t','t','t','t','t','t','t',' ',' ',' '], // 4
                ['w',' ',' ','t','t','t','t','t','t','t','t','t','t','t','t','t','t',' ',' ',' '], // 5
                ['w',' ',' ','t','t','t','t','t','t','t','t','t','t','t','t','t','t',' ',' ',' '], // 6
                ['w',' ',' ','t','t','t','t','t','t','t','t','t','t','t','t','t','t',' ',' ',' '], // 7
                ['w',' ',' ','t','t','t','t','t','t','t','t','t','t','t','t','t','t',' ',' ',' '], // 8
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 9
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 10
                ['w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w']]; // 11
            
            var tiles = {
                'w': {type: Wall}, 
                't': {type: Tile, params: {spriteName: 'tile'} },
                ' ': {type: Lava}
            };
            
            this.room.tileGrid.setGrid(tiles, grid);
            
            this.trapTiles = [
                {tile: new Tile({spriteName: 'tile'}), x: 3, y: 0},
                {tile: new Tile({spriteName: 'tile'}), x: 4, y: 0},
                {tile: new Tile({spriteName: 'tile'}), x: 3, y: 1},
                {tile: new Tile({spriteName: 'tile'}), x: 4, y: 1},
                {tile: new Tile({spriteName: 'tile'}), x: 3, y: 2},
                {tile: new Tile({spriteName: 'tile'}), x: 4, y: 2},
                
                {tile: new Tile({spriteName: 'tile'}), x:17, y: 7},
                {tile: new Tile({spriteName: 'tile'}), x:18, y: 7},
                {tile: new Tile({spriteName: 'tile'}), x:19, y: 7},
                {tile: new Tile({spriteName: 'tile'}), x:17, y: 8},
                {tile: new Tile({spriteName: 'tile'}), x:18, y: 8},
                {tile: new Tile({spriteName: 'tile'}), x:19, y: 8}
            ];
            
            for(var i = 0; i < this.trapTiles.length; i++){
                
                var tt = this.trapTiles[i];
                this.room.tileGrid.addTile(tt.tile, tt.x, tt.y);
            };
            
        };
        
        function makeObjects(){

            this.room.addObject(new Trigger({
                x: 700, y: 100, width: 10, height: 400,
                onTrigger: function(){self.setupTrap(); }
            }));
        };
    },
        
    setupTrap: function(){       
        
        this.started = true;
        this.ticks = 0;
        this.enemiesLeft = 16;
        
        this.topDoor = new Door({x: 150, y: 15, width: 100, height: 20});
        this.room.addObject(this.topDoor, {fade: true});

        this.rightDoor = new Door({x: 965, y: 50, width: 20, height: 500});
        this.room.addObject(this.rightDoor);
        
        for(var i = 0; i < this.trapTiles.length; i++){

            var tt = this.trapTiles[i];
            this.room.tileGrid.removeTile(tt.tile, true);
        };
    },
        
    clear: function(){
        
        if(this.enemiesLeft > 0)
            return;
        
        this.room.removeObject(this.rightDoor, {fade: true});
        this.room.removeObject(this.topDoor, {fade: true});
        this.room.addObject(new Health({x: 200, y: 100, type: 'large'}), {fade: true});
        
        for(var i = 0; i < this.trapTiles.length; i++){

            var tt = this.trapTiles[i];
            this.room.tileGrid.addTile(tt.tile, tt.tileX, tt.tileY, true);
        };
    },
        
    tick: function(){
        
        this.ticks++;
        
        if(!this.started)
            return;        
        if(this.enemiesLeft == 0)
            return;
        if(this.room.getEnemyCount() >= 8)
            return;
        if(this.ticks % 50 != 0)
            return;
        
        var i = this.enemiesLeft % 8;
        var pt = this.spawnPoints[i];
        
        this.room.addObject(new GhostRed({x: pt[0], y: pt[1]}), {fade: true});     
        this.enemiesLeft--;
    }
};