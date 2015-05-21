RoomDefs.r100 = {
    
    init: function(){        
        
        var self = this;
        
        makeBackground.call(this);
        makeWalls.call(this);
        makeObjects.call(this);
        
        function makeBackground(){
            
            this.room.background.setColor('#EEF'); 
            
            this.startTile = new Tile({
                x: 900, 
                y: 100, 
                width: 50, 
                height: 50,
                step: function(){self.activate();}
            });
            
            this.room.background.addFloorObject(
                this.startTile
            );
        };
        
        function makeWalls(){            
            
            //left
            this.room.addWall([0, 0], [WT, 600]);
            
            //right
            this.room.addWall([1000 - WT, 65], [1000, 600]);
            
            //up
            this.room.addWall([WT, 0], [1000, WT]);
            
            //down
            this.room.addWall([0, 600 - WT], [1000 - WT, 600]);
            
            //other
            this.room.addWall([850, WT], [900, 150]);
            this.room.addWall([950, 65], [1000 - WT, 150]);
            this.room.addWall([WT, 450], [50, 600 - WT]);
            this.room.addWall([100, 450], [150, 600 - WT]);
            this.room.addWall([50, 550], [100, 600 - WT]);
            
            this.door = this.room.addWall([50, 450], [100, 500]);
        };
        
        function makeObjects(){
            
            this.badTiles = [
                new Tile({x: 0, y: 0, width: 50, height: 450, step: function(){self.deactivate();}}),
                new Tile({x: 50, y: 0, width: 800, height: 50, step: function(){self.deactivate();}}),
                new Tile({x: 300, y: 50, width: 50, height: 250, step: function(){self.deactivate();}}),
                new Tile({x: 50, y: 200, width: 100, height: 100, step: function(){self.deactivate();}}),
                new Tile({x: 100, y: 100, width: 150, height: 50, step: function(){self.deactivate();}}),
                new Tile({x: 400, y: 100, width: 200, height: 300, step: function(){self.deactivate();}}),
                new Tile({x: 200, y: 150, width: 50, height: 200, step: function(){self.deactivate();}}),
                new Tile({x: 200, y: 350, width: 200, height: 50, step: function(){self.deactivate();}}),
                new Tile({x: 100, y: 350, width: 100, height: 100, step: function(){self.deactivate();}}),
                new Tile({x: 150, y: 450, width: 50, height: 100, step: function(){self.deactivate();}}),
                new Tile({x: 150, y: 550, width: 850, height: 50, step: function(){self.deactivate();}}),
                new Tile({x: 950, y: 150, width: 50, height: 400, step: function(){self.deactivate();}}),
                new Tile({x: 600, y: 100, width: 150, height: 50, step: function(){self.deactivate();}}),
                new Tile({x: 250, y: 450, width: 500, height: 50, step: function(){self.deactivate();}}),
                new Tile({x: 800, y: 300, width: 150, height: 250, step: function(){self.deactivate();}}),
                new Tile({x: 650, y: 200, width: 100, height: 250, step: function(){self.deactivate();}}),
                new Tile({x: 750, y: 200, width: 50, height: 50, step: function(){self.deactivate();}}),
                new Tile({x: 800, y: 150, width: 100, height: 100, step: function(){self.deactivate();}}),
                new Tile({x: 800, y: 50, width: 50, height: 100, step: function(){self.deactivate();}})
            ];
            
            this.room.addObject(new Health({x: 75, y: 525, type: 'heart'}));
            this.room.addObject(new Trigger({x: 50, y: 500, width: 50, height: 50,
                onTrigger: function(){
                    self.complete();
                }
            }));
        };
    },
    
    activate: function(){
        
        this.activated = true;
        this.room.background.removeFloorObject(this.startTile);
        
        for(var i = 0; i < this.badTiles.length; i++)
            this.room.background.addFloorObject(this.badTiles[i]);
        
        this.room.removeObject(this.door);
    },
    
    deactivate: function(){
        
        if(!this.activated)
            return;
        
        for(var i = 0; i < this.badTiles.length; i++)
            this.room.background.removeFloorObject(this.badTiles[i]);
        
        if(!this.completed){
            this.room.background.addFloorObject(this.startTile);
            this.room.addObject(this.door);
        }
    },
    
    complete: function(){
        
        this.completed = true;
        this.deactivate();
    }
};