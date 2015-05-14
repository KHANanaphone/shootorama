RoomDefs.r141 = {
    
    init: function(room){
        
        var WT = 15; //wall thickness
        var rightDoor;

        makeBG();
        makeWalls();
        makeEnemies();

        function makeBG(){

            room.background.setColor('#EEF');
            room.background.addRect('#000', 0, 0, 1000, 150);
            room.background.addRect('#000', 0, 450, 1000, 150);   

            room.background.addText({               

                text: 'Use I or Z to shoot.',
                color: '#FFF',
                x: 500,
                y: 60,
                textAlign: 'center'                    
            });     

            room.background.addText({               

                text: 'Hold P or C to strafe.',
                color: '#FFF',
                x: 500,
                y: 510,
                textAlign: 'center'                    
            });     
        };

        function makeWalls(){

            rightDoor = new Wall({x: 1000 - WT, y: 250, width: WT, height: 100});

            //left
            room.addObject(new Wall({x: 0, y: 150, width: WT, height: 100}));
            room.addObject(new Wall({x: 0, y: 250, width: WT, height: 100}), {fade: true});
            room.addObject(new Wall({x: 0, y: 350, width: WT, height: 100}));   

            //up
            room.addObject(new Wall({x: WT, y: 150, width: 1000 - WT * 2, height: WT}));

            //down
            room.addObject(new Wall({x: WT, y: 450 - WT, width: 1000 - WT * 2, height: WT}));

            //right
            room.addObject(new Wall({x: 1000 - WT, y: 150, width: WT, height: 100}));
            room.addObject(rightDoor, {fade: true});
            room.addObject(new Wall({x: 1000 - WT, y: 350, width: WT, height: 100}));
        };

        function makeEnemies(){

            room.addObject(new GhostTutorial1({x: 950, y: 300, drop: 'none'}), {fade: true});
            room.addObject(new GhostTutorial1({x: 900, y: 250, drop: 'none'}), {fade: true});
            room.addObject(new GhostTutorial1({x: 900, y: 350, drop: 'none'}), {fade: true});
            room.addObject(new GhostTutorial1({x: 850, y: 200, drop: 'none'}), {fade: true});
            room.addObject(new GhostTutorial1({x: 850, y: 300, drop: 'none'}), {fade: true});
            room.addObject(new GhostTutorial1({x: 850, y: 400, drop: 'none'}), {fade: true});
            room.addObject(new GhostTutorial1({x: 800, y: 250, drop: 'none'}), {fade: true});
            room.addObject(new GhostTutorial1({x: 800, y: 350, drop: 'none'}), {fade: true});
            room.addObject(new GhostTutorial1({x: 750, y: 300, drop: 'none'}), {fade: true});
        };

        room.onClear = function(){

            room.removeObject(rightDoor, {fade: true});
        };
    }
};