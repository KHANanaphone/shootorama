RoomDefs.r132 = {
    
    init : function(room){

        var WT = 15; //wall thickness
        var leftDoor;

        makeBG();
        makeWalls();
        makeEnemies();

        function makeBG(){

            room.background.setColor('#EEF');
            room.background.addRect('#000', 0, 0, 1000, 150);

            room.background.addText({               

                text: 'Press O or X to dash.',
                color: '#FFF',
                x: 500,
                y: 15,
                textAlign: 'center'                    
            });

            room.background.addText({               

                text: "Dodge the ghost's attack at the last second to gain an \nempowered attack, and take out the ghost with it.",
                color: '#FFF',
                x: 500,
                y: 65,
                textAlign: 'center'                    
            });
        };

        function makeWalls(){

            leftDoor = new Wall({x: 0, y: 250, width: WT, height: 100});

            //left
            room.addObject(new Wall({x: 0, y: 150, width: WT, height: 100}));
            room.addObject(leftDoor, {fade: true});
            room.addObject(new Wall({x: 0, y: 350, width: WT, height: 250})); 

            //down
            room.addObject(new Wall({x: WT,  y: 600 - WT, width: 450, height: WT}));
            room.addObject(new Wall({x: 450, y: 600 - WT, width: 100,  height: WT}), {fade: true});
            room.addObject(new Wall({x: 550, y: 600 - WT, width: 450 - WT, height: WT}));

            //right
            room.addObject(new Wall({x: 1000 - WT, y: 150, width: WT, height: 450}));

            //top            
            room.addObject(new Wall({x: WT, y: 150, width: 1000 - WT * 2, height: WT}));


        };

        function makeEnemies(){

            room.addObject(new GhostTutorial3({x: 500, y: 195, drop: 'none'}), {fade: true});            
        };

        room.onClear = function(){

            room.removeObject(leftDoor, {fade: true});
        };
    }
};