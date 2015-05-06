(function(){

    var WT = 15;
    
    Game.roomdefs['r1'] = {
    
    setup : function(room){
        
        var topDoor = new Wall({x: 460, y: 0, width: 80, height: WT, color: '#AAA'});
        var rightDoor = new Wall({x: 1000 - WT, y: 260, width: WT, height: 80, color: '#AAA'});
        
        room.fadeInObject(new Ghost({x: 300, y: 300}));
        room.fadeInObject(new Ghost({x: 700, y: 300}));
        
        //left
        room.addChild(new Wall({x: 0, y: 0, width: WT, height: 600})); 
        
        //down
        room.addChild(new Wall({x: 0, y: 600 - WT, width: 1000, height: WT}));
        
        //right
        room.addChild(new Wall({x: 1000 - WT, y: 0, width: WT, height: 260}));
        room.addChild(rightDoor);
        room.addChild(new Wall({x: 1000 - WT, y: 340, width: WT, height: 260}));   
        
        //up
        room.addChild(new Wall({x: 0, y: 0, width: 460, height: WT})); 
        room.fadeInObject(topDoor);
        room.addChild(new Wall({x: 540, y: 0, width: 460, height: WT})); 
        
        room.addTransition('right', 'r2');
        
        room.onClear = function(){
            
            this.fadeOutObject(rightDoor, 0);
        }
    }
};

Game.roomdefs['r2'] = {
    
    setup : function(room){
        
        var topDoor = new Wall({x: 460, y: 0, width: 80, height: WT, color: '#AAA'});
        var leftDoor = new Wall({x: 0, y: 260, width: WT, height: 80, color: '#AAA'});
        
        room.fadeInObject(new GhostBig({x: 300, y: 300}));
        room.fadeInObject(new GhostBig({x: 700, y: 300}));
        
        //right
        room.addChild(new Wall({x: 1000 - WT, y: 0, width: WT, height: 600})); 
        
        //down
        room.addChild(new Wall({x: 0, y: 600 - WT, width: 1000, height: WT}));
        
        //left
        room.addChild(new Wall({x: 0, y: 0, width: WT, height: 260}));
        room.fadeInObject(leftDoor);
        room.addChild(new Wall({x: 0, y: 340, width: WT, height: 260}));   
        
        //up
        room.addChild(new Wall({x: 0, y: 0, width: 460, height: WT})); 
        room.addChild(topDoor);
        room.addChild(new Wall({x: 540, y: 0, width: 460, height: WT})); 
        
        room.addTransition('up', 'r3');
        
        room.onClear = function(){
            
            this.fadeOutObject(topDoor, 0);
        }
    }
};

Game.roomdefs['r3'] = {
    
    setup : function(room){
        
        var downDoor = new Wall({x: 460, y: 600 - WT, width: 80, height: WT, color: '#AAA'});
        var leftDoor = new Wall({x: 0, y: 260, width: WT, height: 80, color: '#AAA'});
        
        room.fadeInObject(new GhostFast({x: 300, y: 300}));
        room.fadeInObject(new GhostFast({x: 700, y: 300}));
        
        //right
        room.addChild(new Wall({x: 1000 - WT, y: 0, width: WT, height: 600})); 
        
        //up
        room.addChild(new Wall({x: 0, y: 0, width: 1000, height: WT}));
        
        //left
        room.addChild(new Wall({x: 0, y: 0, width: WT, height: 260}));
        room.addChild(leftDoor);
        room.addChild(new Wall({x: 0, y: 340, width: WT, height: 260}));   
        
        //down
        room.addChild(new Wall({x: 0, y: 600 - WT, width: 460, height: WT})); 
        room.fadeInObject(downDoor);
        room.addChild(new Wall({x: 540, y: 600 - WT, width: 460, height: WT})); 
        
        room.addTransition('left', 'r4');
        
        room.onClear = function(){
            
            this.fadeOutObject(leftDoor, 0);
        }
    }
};

Game.roomdefs['r4'] = {
    
    setup : function(room){
        
        var downDoor = new Wall({x: 460, y: 600 - WT, width: 80, height: WT, color: '#AAA'});
        var rightDoor = new Wall({x: 1000 - WT, y: 260, width: WT, height: 80, color: '#AAA'});
        
        room.fadeInObject(new GhostArmored({x: 300, y: 300}));
        room.fadeInObject(new GhostArmored({x: 700, y: 300}));
        
        //right
        room.addChild(new Wall({x: 1000 - WT, y: 0, width: WT, height: 260}));
        room.fadeInObject(rightDoor);
        room.addChild(new Wall({x: 1000 - WT, y: 340, width: WT, height: 260}));  
        
        //up
        room.addChild(new Wall({x: 0, y: 0, width: 1000, height: WT}));
        
        //left
        room.addChild(new Wall({x: 0, y: 0, width: WT, height: 600}));   
        
        //down
        room.addChild(new Wall({x: 0, y: 600 - WT, width: 460, height: WT})); 
        room.addChild(downDoor);
        room.addChild(new Wall({x: 540, y: 600 - WT, width: 460, height: WT})); 
        
        room.addTransition('down', 'r1');
        
        room.onClear = function(){
            
            this.fadeOutObject(downDoor, 0);
        }
    }
};
})();