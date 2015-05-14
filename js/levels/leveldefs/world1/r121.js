RoomDefs.r121 = {
    
    init: function(room){
        
        this.room = room;
        
        room.addObject(
            new Ghost({x: 100, y: 100}), {
                fade: true
            }
        );        
        
        room.addObject(
            new Ghost({x: 100, y: 200}), {
                fade: true
            }
        );        
        
        room.addObject(
            new Ghost({x: 100, y: 300}), {
                fade: true
            }
        );
    }    
};