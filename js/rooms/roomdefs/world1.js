(function(){

    var WT = 15; //wall thickness
    
    Game.roomdefs['r1'] = {
    
        setup : function(room){

            room.playerSpawnPoint = {x: 600, y: 250};
            
            makeBG();
            makeWalls();
            
            function makeBG(){
                
                room.background.addRect('#EEF', 0, 0, 1000, 450);  
                room.background.addRect('#000', 0, 450, 1000, 150); 
                room.background.addRect('#000', 0, 0, 200, 450);         
                room.background.addText({               
                    
                    text: 'Use arrow keys or WSAD to move',
                    color: '#FFF',
                    x: 500,
                    y: 500,
                    textAlign: 'center'                    
                });     
                
                room.background.addText({                   
                    text: 'Tutorial ->',
                    color: 'rgba(0, 0, 0, 0.4)',
                    x: 960,
                    y: 232,
                    textAlign: 'right'                    
                });
            };
            
            function makeWalls(){
                
                
                //left
                room.addChild(new Wall({x: 200, y: 0, width: WT, height: 450})); 

                //down
                room.addChild(new Wall({x: 200 + WT, y: 450 - WT, width: 800 - WT * 2, height: WT}));

                //right
                room.addChild(new Wall({x: 1000 - WT, y: 0, width: WT, height: 200}));
                room.addChild(new Wall({x: 1000 - WT, y: 300, width: WT, height: 150}));   

                //up
                room.addChild(new Wall({x: 350, y: 0, width: 650 - WT, height: WT})); 
            };

            room.addTransition('up', 'r6');
            room.addTransition('right', 'r2');
        }
    };
    
    Game.roomdefs['r6'] = {
    };
    
    Game.roomdefs['r6'] = {
    };
})();