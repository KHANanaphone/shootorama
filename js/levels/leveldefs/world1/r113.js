RoomDefs.r113 = {
    
    init: function(){        
        
        var self = this;        
        this.room.setBgColor('#F00');
        makeTiles.call(this);
        makeObjects.call(this);
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w'], // 0
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 1
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 2
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 3
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 4
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','t','t'], // 5
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','t','t'], // 6
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 7
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 8
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 9
                [' ',' ',' ',' ',' ',' ',' ',' ',' ','t','t',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 10
                ['w','w','w','w','w','w','w','w','w','t','t','w','w','w','w','w','w','w','w','w']]; // 11
            
            var tiles = {
                'w': {type: Wall}, 
                't': {type: Tile, params: {spriteName: 'tile'} },
                ' ': {type: Lava}
            };
            
            this.room.tileGrid.setGrid(tiles, grid);
        };
        
        function makeObjects(){
            
            this.sequences = [
                [{x: 14, y: 5}, {x: 14, y: 6}, {x: 15, y: 5}, {x: 15, y: 6}],
                [{x:  7, y: 2}, {x:  7, y: 3}, {x:  8, y: 2}, {x:  8, y: 3}],
                [{x: 15, y: 1}, {x: 15, y: 2}, {x: 16, y: 1}, {x: 16, y: 2}],
                [{x: 11, y: 2}, {x: 11, y: 3}, {x: 12, y: 2}, {x: 12, y: 3}],
                [{x: 10, y: 6}, {x: 10, y: 7}, {x: 11, y: 6}, {x: 11, y: 7}]
//                [{x: 14, y: 5}, {x: 14, y: 6}, {x: 15, y: 5}, {x: 15, y: 6}],
//                [{x: 15, y: 1}, {x: 15, y: 2}, {x: 16, y: 1}, {x: 16, y: 2}],
//                [{x: 11, y: 2}, {x: 11, y: 3}, {x: 12, y: 2}, {x: 12, y: 3}],  
//                [{x: 10, y: 6}, {x: 10, y: 7}, {x: 11, y: 6}, {x: 11, y: 7}]        
            ];
            
            this.room.addObject(new Key({x: 400, y: 150, persistence: 'persist'}));
            
            this.ticks = 0;
            this.tileSequence = 0;
            this.fadeInTileSequence();
        };
    },
    
    tick: function(){
        
        this.ticks++;
        
        if(this.ticks % 100 == 0){
            
            this.fadeOutTileSequence();
            this.tileSequence++;
            
            if(this.tileSequence >= this.sequences.length)
                this.tileSequence = this.tileSequence % this.sequences.length;
            
            this.fadeInTileSequence();
        }
    },
    
    fadeOutTileSequence: function(){
        
        if(!this.prevTiles)
            return;
        
        for(var i = 0; i < this.prevTiles.length; i++){
            
            this.room.tileGrid.removeTile(this.prevTiles[i], true);
        }
    },
    
    fadeInTileSequence: function(){
            
        this.prevTiles = this.currentTiles;
        this.currentTiles = [
            new Tile({spriteName: 'tile'}),
            new Tile({spriteName: 'tile'}),
            new Tile({spriteName: 'tile'}),
            new Tile({spriteName: 'tile'})
        ];
        
        for(var i = 0; i < this.currentTiles.length; i++){
            
            var currentSequence = this.sequences[this.tileSequence];
            this.room.tileGrid.addTile(this.currentTiles[i], currentSequence[i].x, currentSequence[i].y, true);
        }
    }
};