RoomDefs.r100 = {
    
    init: function(){        
        
        var self = this;
        
        makeBackground.call(this);
        makeWalls.call(this);
        makeObjects.call(this);
        
        function makeBackground(){
            
            this.room.background.setColor('#EEF');
            this.room.background.addFloorObject(
                new Pit({x: 0, y: 0, width: 850, height: 600})
            );
            this.room.background.addFloorObject(
                new Pit({x: 850, y: 150, width: 150, height: 450})
            );
        };
        
        function makeWalls(){            
            
            //left
            this.room.addWall([0, 450], [WT, 600]);
            
            //right
            this.room.addWall([1000 - WT, 65], [1000, 600]);
            
            //up
            this.room.addWall([850, 0], [1000, WT]);
            
            //down
            this.room.addWall([0, 600 - WT], [1000 - WT, 600]);
            
            //other
            this.room.addWall([850, WT], [900, 150]);
            this.room.addWall([950, 65], [1000 - WT, 150]);
            this.room.addWall([WT, 450], [50, 600 - WT]);
            this.room.addWall([100, 450], [150, 600 - WT]);
            this.room.addWall([50, 550], [100, 600 - WT]);
        };
        
        function makeObjects(){
            
            this.bridgeTiles = [
                new Tile({x: 900, y: 150, width: 50, height: 150}),
                new Tile({x: 750, y: 250, width: 150, height: 50}),
                new Tile({x: 750, y: 300, width: 50, height: 250}),
                new Tile({x: 250, y: 500, width: 500, height: 50}),
                new Tile({x: 250, y: 400, width: 50, height: 100}),
                new Tile({x: 300, y: 400, width: 350, height: 50}),
                new Tile({x: 600, y: 150, width: 50, height: 250}),
                new Tile({x: 650, y: 150, width: 150, height: 50}),
                new Tile({x: 750, y: 50, width: 50, height: 100}),
                new Tile({x: 250, y: 50, width: 500, height: 50}),
                new Tile({x: 250, y: 100, width: 50, height: 250}),
                new Tile({x: 150, y: 300, width: 100, height: 50}),
                new Tile({x: 150, y: 50, width: 50, height: 250}),
                new Tile({x: 50, y: 50, width: 100, height: 50}),
                new Tile({x: 50, y: 100, width: 50, height: 450})
            ];

            for(var i = 0; i < this.bridgeTiles.length; i++)
                this.room.background.addFloorObject(this.bridgeTiles[i]);
            
            this.room.addObject(new Health({x: 75, y: 525, type: 'heart'}));
        };
    }
};