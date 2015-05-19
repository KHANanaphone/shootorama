RoomDefs.r111 = {
    
    init: function(room){        
        
        this.started = false;
        this.room = room;
        
        makeBackground.call(this);
        makeWalls.call(this);
        makeObjects.call(this);
        
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
            this.topDoor = room.addWall([450, 0], [550, WT], {fade: true, color: '#AAA'});
            room.addWall([550, 0], [1000, WT]);
            
            //down
            room.addWall([WT, 600 - WT], [1000, 600]);
        };
        
        function makeObjects(){
            
            var self = this;
            
            room.addObject(
                new Trigger({x: 700, y: 100, width: 10, height: 400,
                    onTrigger: function(){
                        
                        self.room.background.removeFloorObject(self.tilesRight, {fade: true});
                        self.room.background.removeFloorObject(self.tilesTop, {fade: true});
                        
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

        this.tilesTop = room.background.addFloorObject(
            new Tile({x: 450, y: 0, width: 100, height: 100})
        );
    },
    
    tick: function(){
        
        this.ticks++;
        
        if(!this.started)
            return;        
        if(this.enemiesLeft == 0)
            return;
        if(this.room.getEnemyCount() >= 8)
            return;
        if(this.ticks % 60 != 0)
            return;
        
        this.room.addObject(new GhostRed({x: 200, y: 200}), {fade: true});     
        this.enemiesLeft--;
    }
};