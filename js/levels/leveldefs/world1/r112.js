RoomDefs.r112 = {
    
    init: function(room){        
        
        this.room = room;
        room.playerSpawnPoint = {x: 500, y: 575};
        
        makeBackground.call(this);
        makeWalls.call(this);
        makeObjects.call(this);
        
        function makeBackground(){
            
            room.background.setColor('#EEF');    
            
            room.background.addFloorObject(
                new Lava({x: 0, y: 0, width: 1000, height: 600}));
            
            this.tile1 = new Tile({x: 450, y: 50, width: 100, height: 550}); 
            this.tile2 = new Tile({x: 550, y: 50, width: 300, height: 100}); 
            this.tile3 = new Tile({x: 850, y: 50, width: 100, height: 300}); 
            this.tile4 = new Tile({x: 550, y: 250, width: 400, height: 100}); 
            this.tile5 = new Tile({x: 0, y: 250, width: 450, height: 100}); 
            
            room.background.addFloorObject(this.tile1);
            room.background.addFloorObject(this.tile2);
            room.background.addFloorObject(this.tile3);
            room.background.addFloorObject(this.tile4);
            room.background.addFloorObject(this.tile5);
        };
        
        function makeWalls(){            
            
            //left
            room.addWall([0, 0], [WT, 250]);
            room.addWall([0, 350], [WT, 600]);
            
            //top
            room.addWall([WT, 0], [1000, WT]);
            
            //down
            room.addWall([WT, 600 - WT], [450, 600]);
            room.addWall([550, 600 - WT], [1000, 600]);
        };
        
        function makeObjects(){
            
            var self = this;
            
            room.addObject(new Key({x: 900, y: 100}));     
            room.addObject(
                new Trigger({x: 900, y: 100, width: 100, height: 100, 
                onTrigger: function(){                    
                    self.room.background.removeFloorObject(self.tile1, {fade: true});
                    self.room.background.removeFloorObject(self.tile2, {fade: true});
            
                    room.background.addText({
                        text: '<- \nDash \n<-',
                        x: 500,
                        y: 260,
                        textAlign: 'center',
                        color: 'black'
                    });
                }})
            );
        };
    }
};