Game.roomdefs['start'] = {
    
    setup : function(room){
        
        var door = new Wall({x: 990, y: 260, width: 10, height: 80, color: '#AAA'});
                
        room.playerSpawnPoint = {x: 500, y: 300};
        
        room.addEnemy(new Ghost({x: 40, y: 40}));
        
        room.addChild(new Wall({x: 0, y: 0, width: 10, height: 600})); 
        room.addChild(new Wall({x: 990, y: 0, width: 10, height: 260}));
        room.addChild(door);
        room.addChild(new Wall({x: 990, y: 340, width: 10, height: 260}));        
        room.addChild(new Wall({x: 0, y: 0, width: 1000, height: 10})); 
        room.addChild(new Wall({x: 0, y: 590, width: 1000, height: 10}));
        
        room.addTransition('right', 'next');
        
        room.onClear = function(){
            
            this.fadeInObject(new Exit({x: 100, y: 300, roomId: 'next'}), 0);
            this.fadeOutObject(door, 1);
        }
    }
};

Game.roomdefs['next'] = {
    
    setup : function(room){
        
        room.addEnemy(new GhostArmored({x: 900, y: 300}));
             
        var door = new Wall({x: 0, y: 260, width: 10, height: 80, color: '#AAA'});
        room.addChild(door);
        
        room.addChild(new Wall({x: 0, y: 0, width: 10, height: 260}));
        room.addChild(new Wall({x: 0, y: 340, width: 10, height: 260}));
        room.fadeInObject(door);
        room.addChild(new Wall({x: 990, y: 0, width: 10, height: 600}));
        room.addChild(new Wall({x: 0, y: 0, width: 1000, height: 10})); 
        room.addChild(new Wall({x: 0, y: 590, width: 1000, height: 10}));
        
    }
};

Game.roomdefs['transitions'] = {
    
        setup : function(room){
                
        room.addChild(new Wall({x: 0, y: 0, width: 20, height: 20}));
        room.playerSpawnPoint = {x: 500, y: 300};
            
        room.addTransition('right', 'transitions');
        room.addTransition('left', 'transitions');
        room.addTransition('up', 'transitions');
        room.addTransition('down', 'transitions');
    }
};