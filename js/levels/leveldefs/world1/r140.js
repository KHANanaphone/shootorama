RoomDefs.r140 = {
    
    init: function(room){
        
        var WT = 15; //wall thickness
        room.playerSpawnPoint = {x: 600, y: 250};

        makeBG();
        makeWalls();

    //        var chest = new Chest({x: 300, y: 275, items: [new Key({})] });
    //        
    //        room.addObject(new Trigger({
    //            x: 600, y: 200, width: 50, height: 50, 
    //            onTrigger: function(){
    //                chest.open();
    //            }
    //        }));
    //        
    //        room.addObject(chest);
    //        room.addObject(new Chest({x: 300, y: 325, type: 'locked' , items: ['random', 'R', 'R'] }));
    //        room.addObject(new Key({x: 300, y: 375}));

        room.addObject(new Turret({x: 400, y: 35, facing: 0, damage: 2}));

        function makeBG(){

            room.background.setColor('#EEF');  
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
                y: 282,
                textAlign: 'right'                    
            });
        };

        function makeWalls(){

            //left
            room.addObject(new Wall({x: 200, y: 0, width: WT, height: 450})); 

            //down
            room.addObject(new Wall({x: 200 + WT, y: 450 - WT, width: 800 - WT * 2, height: WT}));

            //right
            room.addObject(new Wall({x: 1000 - WT, y: 0, width: WT, height: 250}));
            room.addObject(new Wall({x: 1000 - WT, y: 350, width: WT, height: 100}));   

            //up
            room.addObject(new Wall({x: 200 + WT, y: 0, width: 135, height: WT, type: 'shootable'})); 
            room.addObject(new Wall({x: 350, y: 0, width: 650 - WT, height: WT})); 
        };
    }
};