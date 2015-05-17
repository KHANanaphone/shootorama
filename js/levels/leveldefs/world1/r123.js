RoomDefs.r123 = {
    
    init: function(room){        
        
        this.room = room;
        
        makeBackground.call(this);
        makeWalls.call(this);
        makeObjects.call(this);
        
        function makeBackground(){
            
            room.background.setColor('#EEF');            
        };
        
        function makeWalls(){            
            
            //left
            room.addWall([0, 0], [WT, 250]);
            this.leftDoor = room.addWall([0, 250], [WT, 350], {type: 'locked'});
            room.addWall([0, 350], [WT, 600]);
        };
        
        function makeObjects(){
            
        };
    },
    
    entering: function(from){
        
        if(from == 'left')
            this.room.removeObject(this.leftDoor);
    },
};