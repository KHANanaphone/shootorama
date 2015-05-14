RoomDefs.r131 = {
    
    init: function(room){
        
        var WT = 15; //wall thickness
        var keyDoor;

        makeBG();
        makeWalls();
        makeObjects();

        function makeBG(){

            room.background.setColor('#EEF');
            room.background.addRect('#000', 0, 0, 1000, 150);  
            room.background.addRect('#000', 0, 450, 1000, 150);  

            room.background.addText({               

                text: 'You can also dodge hazards or enemy weapons.',
                color: '#FFF',
                x: 500,
                y: 60,
                textAlign: 'center'                    
            });     

            room.background.addText({               

                text: 'Dodge the turret shot, then shoot the red wall \nwith an empowered shot.',
                color: '#FFF',
                x: 500,
                y: 510,
                textAlign: 'center'                    
            });     
        };

        function makeWalls(){

            keyDoor = new Wall({x: 0, y: 250, width: WT, height: 100, type: 'locked'});

            //left
            room.addObject(new Wall({x: 0, y: 150, width: WT, height: 100}));
            room.addObject(keyDoor, {fade: true});
            room.addObject(new Wall({x: 0, y: 350, width: WT, height: 100})); 

            //right
            room.addObject(new Wall({x: 1000 - WT, y: 150, width: WT, height: 100}));
            room.addObject(new Wall({x: 1000 - WT, y: 250, width: WT, height: 100}), {fade: true});
            room.addObject(new Wall({x: 1000 - WT, y: 350, width: WT, height: 100}));

            //down            
            room.addObject(new Wall({x: WT, y: 150, width: 1000 - WT * 2, height: WT}));

            //top            
            room.addObject(new Wall({x: WT, y: 450 - WT, width: 1000 - WT * 2, height: WT}));
        };

        function makeObjects(){

            room.addObject(new Key({x: 250, y: 300}), {fade: true});            
            room.addObject(new Turret({x: 750, y: 160, facing: 0, damage: 2}), {fade: true});            
            room.addObject(
                new Wall({x: 500, y: 150, width: WT, height: 300, type: 'shootable'}), {fade: true});
        };

        room.onClear = function(){

            //room.fadeOutObject(topDoor);
        };
    }
};