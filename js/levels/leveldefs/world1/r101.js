RoomDefs.r101 = {
    
    init: function(){        
        
        var self = this;
        
        makeBackground.call(this);
        makeWalls.call(this);
        makeObjects.call(this);
        
        function makeBackground(){
            
            this.room.background.setColor('#EEF'); 
        };
        
        function makeWalls(){            
            
            //left
            this.room.addWall([0, 65], [WT, 600]);
            
            //right
            this.room.addWall([1000 - WT, 0], [1000, 250]);
            this.room.addWall([1000 - WT, 350], [1000, 600]);
            
            //top
            this.room.addWall([0, 0], [1000 - WT, WT]);
            
            //down
            this.room.addWall([WT, 600 - WT], [450, 600]);
            this.room.addWall([550, 600 - WT], [1000, 600]);
        };
        
        function makeObjects(){
            
            this.room.addObject(new Shooter({x: 500, y: 100}));            
        };
    }
};