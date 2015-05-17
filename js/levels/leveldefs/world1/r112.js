RoomDefs.r112 = {
    
    init: function(room){        
        
        this.room = room;
        
        makeBackground.call(this);
        makeWalls.call(this);
        makeObjects.call(this);
        
        function makeBackground(){
            
            room.background.setColor('#EEF');    
            
            room.background.addFloorObject(
                new Lava({x: 0, y: 400, width: 1000, height: 50}));
            
            room.background.addFloorObject(
                new Tile({x: 400, y: 400, width: 100, height: 50}));
        };
        
        function makeWalls(){            
            
        };
        
        function makeObjects(){
            
        };
    }
};