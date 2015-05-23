RoomDefs.r111 = {
    
    init: function(room){        
        
        var self = this;
        this.started = false;
        this.room = room;
        
        makeBackground.call(this);
        makeWalls.call(this);
        makeObjects.call(this);
        
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
        
        function makeBackground(){
            
            room.background.addFloorObject(
                new Lava({x: 0, y: 0, width: 1000, height: 600}));
            
            this.tilesRight = room.background.addFloorObject(
                new Tile({x: 900, y: 350, width: 100, height: 100})
            );
            
            this.tilesTop = room.background.addFloorObject(
                new Tile({x: 450, y: 0, width: 100, height: 100})
            );
            
            room.background.addFloorObject(
                new Tile({x: 100, y: 100, width: 800, height: 400})
            );
        };
        
        function makeWalls(){            
            
            //left
            room.addWall([0, 0], [WT, 600]);
            
            //right
            
            //top
            room.addWall([WT, 0], [450, WT]);
            room.addWall([550, 0], [1000, WT]);
            
            //down
            room.addWall([WT, 600 - WT], [1000, 600]);
        };
        
        function makeObjects(){            
            
            room.addObject(
                new Trigger({x: 700, y: 100, width: 10, height: 400,
                    onTrigger: function(){
                        
                        self.room.background.removeFloorObject(self.tilesRight, {fade: true});
                        self.room.background.removeFloorObject(self.tilesTop, {fade: true});
                        
                        self.topDoor = 
                            room.addWall([450, 0], [550, WT], {fade: true, color: '#AAA'});
                        self.rightDoor = 
                            room.addWall([1000 - WT, 0], [1000, 600], {fade: true, color: '#AAA'});
                        
                        self.started = true;
                        self.ticks = 0;
                        self.enemiesLeft = 16;
                    }
                })
            );
            
        };
    },
    
    clear: function(){
        
        if(this.enemiesLeft > 0)
            return;
        
        this.room.removeObject(this.rightDoor, {fade: true});
        this.room.removeObject(this.topDoor, {fade: true});
        this.room.addObject(new Health({x: 500, y: 50, type: 'large'}), {fade: true});
        this.room.background.addFloorObject(this.tilesTop, {fade: true});
        this.room.background.addFloorObject(this.tilesRight, {fade: true});
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