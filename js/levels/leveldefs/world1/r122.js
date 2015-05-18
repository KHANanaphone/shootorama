RoomDefs.r122 = {
    
    init: function(room){        
        
        this.room = room;
        this.cleared = false;
        
        makeBackground.call(this);
        makeWalls.call(this);
        makeObjects.call(this);
        
        function makeBackground(){
            
            room.background.setColor('#EEF');            
        };
        
        function makeWalls(){            
            
            //left
            room.addWall([0, 0], [WT, 250]);
            this.leftDoor = room.addWall([0, 250], [WT, 350], {fade: true, color: '#AAA'});
            room.addWall([0, 350], [WT, 600]);
            
            //top
            room.addWall([WT, 0], [450, WT]);
            this.topDoor = room.addWall([450, 0], [550, WT], {fade: true, color: '#AAA'});
            room.addWall([550, 0], [1000 - WT, WT]);
            
            //right
            room.addWall([1000 - WT, 0], [1000, 250]);
            this.rightDoor = 
                room.addWall([1000 - WT, 250], [1000, 350], {type: 'locked'});
            room.addWall([1000 - WT, 350], [1000, 600]);
            
            //down
            room.addWall([WT, 600 - WT], [1000, 600]);
        };
        
        function makeObjects(){
            
            
        };
    },
    
    entering: function(from){
        
        if(from == 'right')
            this.room.removeObject(this.rightDoor);
    },
    
    start: function(firstVisit){        
        
        if(this.cleared)
            return;
        
        this.wavesLeft = 2;
        this.wave();
    },
    
    clear: function(){
        
        if(this.wavesLeft > 0)
            this.wave();
        else{
            this.cleared = true;
            this.room.removeObject(this.leftDoor, {fade: true});
            this.room.removeObject(this.topDoor, {fade: true});
        }
    },
        
    wave: function(){  
        
        var x = Game.player.x > 500 ? 200 : 800;
        
        this.room.addObject(
            new GhostFast({x: x, y: 300}),
            {fade: true, persistence: 'remove'}
        );
        
        this.wavesLeft--;
    }
};