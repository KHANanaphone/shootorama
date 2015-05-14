RoomDefs.r142 = {
    
    init : function(room){
        
        var WT = 15; //wall thickness
        var topDoor;

        makeBG();
        makeWalls();
        makeEnemies();

        function makeBG(){

            room.background.setColor('#EEF');
            room.background.addRect('#000', 0, 450, 1000, 150); 
            room.background.addRect('#000', 0, 0, 450, 150);   
            room.background.addRect('#000', 550, 0, 450, 150);   
            room.background.addText({               

                text: 'Shoot an enemy when the rings match up \nfor bonus "combo" damage.',
                color: '#FFF',
                x: 500,
                y: 460,
                textAlign: 'center'                    
            });   
            room.background.addText({               

                text: 'Take this ghost out with this technique.',
                color: '#FFF',
                x: 500,
                y: 530,
                textAlign: 'center'                    
            });   
        };

        function makeWalls(){

            topDoor = new Wall({x: 450, y: 0, width: 100, height: WT});

            //left
            room.addObject(new Wall({x: 0, y: 150, width: WT, height: 100}));
            room.addObject(new Wall({x: 0, y: 250, width: WT, height: 100}), {fade: true});
            room.addObject(new Wall({x: 0, y: 350, width: WT, height: 100})); 

            //down
            room.addObject(new Wall({x: WT, y: 450 - WT, width: 1000 - WT * 2, height: WT}));

            //right
            room.addObject(new Wall({x: 1000 - WT, y: 150, width: WT, height: 300}));

            //top            
            room.addObject(new Wall({x: 550, y: 150, width: 450 - WT, height: WT}));
            room.addObject(new Wall({x: 550, y: 0, width: WT, height: 150}));
            room.addObject(topDoor);
            room.addObject(new Wall({x: 450, y: 0, width: WT, height: 150}));
            room.addObject(new Wall({x: WT, y: 150, width: 450, height: WT}));


        };

        function makeEnemies(){

            room.addObject(new GhostTutorial2({x: 950, y: 300, drop: 'none'}), {fade: true});
        };

        room.onClear = function(){

            room.removeObject(topDoor, {fade: true});
        };
    }
};