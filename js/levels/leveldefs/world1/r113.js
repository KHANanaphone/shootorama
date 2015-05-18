RoomDefs.r113 = {
    
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
        };
        
        function makeWalls(){            
            
            //top
            room.addWall([0, 0], [1000, WT]);
            
            //down
            room.addWall([0, 600 - WT], [1000, 600]);
        };
        
        function makeObjects(){
            
        };
    }
};