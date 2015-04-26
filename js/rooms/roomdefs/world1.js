Game.roomdefs['r1'] = {
    
    setup : function(room){
        
        var topDoor = new Wall({x: 460, y: 0, width: 80, height: 10, color: '#AAA'});
        var rightDoor = new Wall({x: 990, y: 260, width: 10, height: 80, color: '#AAA'});
        
        room.fadeInObject(new Ghost({x: 300, y: 300}));
        room.fadeInObject(new Ghost({x: 700, y: 300}));
        
        //left
        room.addChild(new Wall({x: 0, y: 0, width: 10, height: 600})); 
        
        //down
        room.addChild(new Wall({x: 0, y: 590, width: 1000, height: 10}));
        
        //right
        room.addChild(new Wall({x: 990, y: 0, width: 10, height: 260}));
        room.addChild(rightDoor);
        room.addChild(new Wall({x: 990, y: 340, width: 10, height: 260}));   
        
        //up
        room.addChild(new Wall({x: 0, y: 0, width: 460, height: 10})); 
        room.fadeInObject(topDoor);
        room.addChild(new Wall({x: 540, y: 0, width: 460, height: 10})); 
        
        room.addTransition('right', 'r2');
        
        room.onClear = function(){
            
            this.fadeOutObject(rightDoor, 0);
        }
    }
};

Game.roomdefs['r2'] = {
    
    setup : function(room){
        
        var topDoor = new Wall({x: 460, y: 0, width: 80, height: 10, color: '#AAA'});
        var leftDoor = new Wall({x: 0, y: 260, width: 10, height: 80, color: '#AAA'});
        
        room.fadeInObject(new GhostBig({x: 300, y: 300}));
        room.fadeInObject(new GhostBig({x: 700, y: 300}));
        
        //right
        room.addChild(new Wall({x: 990, y: 0, width: 10, height: 600})); 
        
        //down
        room.addChild(new Wall({x: 0, y: 590, width: 1000, height: 10}));
        
        //left
        room.addChild(new Wall({x: 0, y: 0, width: 10, height: 260}));
        room.fadeInObject(leftDoor);
        room.addChild(new Wall({x: 0, y: 340, width: 10, height: 260}));   
        
        //up
        room.addChild(new Wall({x: 0, y: 0, width: 460, height: 10})); 
        room.addChild(topDoor);
        room.addChild(new Wall({x: 540, y: 0, width: 460, height: 10})); 
        
        room.addTransition('up', 'r3');
        
        room.onClear = function(){
            
            this.fadeOutObject(topDoor, 0);
        }
    }
};

Game.roomdefs['r3'] = {
    
    setup : function(room){
        
        var downDoor = new Wall({x: 460, y: 590, width: 80, height: 10, color: '#AAA'});
        var leftDoor = new Wall({x: 0, y: 260, width: 10, height: 80, color: '#AAA'});
        
        room.fadeInObject(new GhostFast({x: 300, y: 300}));
        room.fadeInObject(new GhostFast({x: 700, y: 300}));
        
        //right
        room.addChild(new Wall({x: 990, y: 0, width: 10, height: 600})); 
        
        //up
        room.addChild(new Wall({x: 0, y: 0, width: 1000, height: 10}));
        
        //left
        room.addChild(new Wall({x: 0, y: 0, width: 10, height: 260}));
        room.addChild(leftDoor);
        room.addChild(new Wall({x: 0, y: 340, width: 10, height: 260}));   
        
        //down
        room.addChild(new Wall({x: 0, y: 590, width: 460, height: 10})); 
        room.fadeInObject(downDoor);
        room.addChild(new Wall({x: 540, y: 590, width: 460, height: 10})); 
        
        room.addTransition('left', 'r4');
        
        room.onClear = function(){
            
            this.fadeOutObject(leftDoor, 0);
        }
    }
};

Game.roomdefs['r4'] = {
    
    setup : function(room){
        
        var downDoor = new Wall({x: 460, y: 590, width: 80, height: 10, color: '#AAA'});
        var rightDoor = new Wall({x: 990, y: 260, width: 10, height: 80, color: '#AAA'});
        
        room.fadeInObject(new GhostArmored({x: 300, y: 300}));
        room.fadeInObject(new GhostArmored({x: 700, y: 300}));
        
        //right
        room.addChild(new Wall({x: 990, y: 0, width: 10, height: 260}));
        room.fadeInObject(rightDoor);
        room.addChild(new Wall({x: 990, y: 340, width: 10, height: 260}));  
        
        //up
        room.addChild(new Wall({x: 0, y: 0, width: 1000, height: 10}));
        
        //left
        room.addChild(new Wall({x: 0, y: 0, width: 10, height: 600}));   
        
        //down
        room.addChild(new Wall({x: 0, y: 590, width: 460, height: 10})); 
        room.addChild(downDoor);
        room.addChild(new Wall({x: 540, y: 590, width: 460, height: 10})); 
        
        room.addTransition('down', 'r1');
        
        room.onClear = function(){
            
            this.fadeOutObject(downDoor, 0);
        }
    }
};