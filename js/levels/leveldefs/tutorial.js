(function(){
    
    var WT = 15; //wall thickness
    
    LevelDefs.tutorial = {
        
        map: [
            ['r1', 'r2', 'r3'],
            ['r4', 'r5', 'r6']
        ],
        initialX: 1,
        initialY: 0,
        roomSetups: {
            r1: r1,
            r2: r2,
            r3: r3,
            r4: r4,
            r5: r5,
            r6: r6
        }
    };
    
    function r1(room){
        
    };
    
    function r2(room){
        
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
            room.addChild(new Wall({x: 0, y: 150, width: WT, height: 100}));
            room.fadeInObject(keyDoor);
            room.addChild(new Wall({x: 0, y: 350, width: WT, height: 100})); 
            
            //right
            room.addChild(new Wall({x: 1000 - WT, y: 150, width: WT, height: 100}));
            room.fadeInObject(new Wall({x: 1000 - WT, y: 250, width: WT, height: 100}));
            room.addChild(new Wall({x: 1000 - WT, y: 350, width: WT, height: 100}));
            
            //down            
            room.addChild(new Wall({x: WT, y: 150, width: 1000 - WT * 2, height: WT}));
            
            //top            
            room.addChild(new Wall({x: WT, y: 450 - WT, width: 1000 - WT * 2, height: WT}));
        };
        
        function makeObjects(){
            
            room.fadeInObject(new Key({x: 250, y: 300}));            
            room.fadeInObject(new Turret({x: 750, y: 160, facing: 0, damage: 2}));            
            room.fadeInObject(new Wall({x: 500, y: 150, width: WT, height: 300, type: 'shootable'}));
        };
        
        room.onClear = function(){
            
            //room.fadeOutObject(topDoor);
        };
    };
    
    function r3(room){
        
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
            room.addChild(new Wall({x: 0, y: 150, width: WT, height: 100}));
            room.fadeInObject(leftDoor);
            room.addChild(new Wall({x: 0, y: 350, width: WT, height: 250})); 
            
            //down
            room.addChild(new Wall({x: WT,  y: 600 - WT, width: 450, height: WT}));
            room.fadeInObject(new Wall({x: 450, y: 600 - WT, width: 100,  height: WT}));
            room.addChild(new Wall({x: 550, y: 600 - WT, width: 450 - WT, height: WT}));
                        
            //right
            room.addChild(new Wall({x: 1000 - WT, y: 150, width: WT, height: 450}));
            
            //top            
            room.addChild(new Wall({x: WT, y: 150, width: 1000 - WT * 2, height: WT}));
            

        };
        
        function makeEnemies(){
            
            room.fadeInObject(new GhostTutorial3({x: 500, y: 195}));            
        };
        
        room.onClear = function(){
            
            room.fadeOutObject(leftDoor);
        };
    };
    
    function r4(room){
        
        room.playerSpawnPoint = {x: 600, y: 250};
            
        makeBG();
        makeWalls();

        room.addChild(new Turret({x: 400, y: 35, facing: 0, damage: 2}));

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
            room.addChild(new Wall({x: 200, y: 0, width: WT, height: 450})); 

            //down
            room.addChild(new Wall({x: 200 + WT, y: 450 - WT, width: 800 - WT * 2, height: WT}));

            //right
            room.addChild(new Wall({x: 1000 - WT, y: 0, width: WT, height: 250}));
            room.addChild(new Wall({x: 1000 - WT, y: 350, width: WT, height: 100}));   

            //up
            room.addChild(new Wall({x: 200 + WT, y: 0, width: 135, height: WT, type: 'shootable'})); 
            room.addChild(new Wall({x: 350, y: 0, width: 650 - WT, height: WT})); 
        };
    };
    
    function r5(room){
        
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
            room.addChild(new Wall({x: 0, y: 150, width: WT, height: 100}));
            room.fadeInObject(new Wall({x: 0, y: 250, width: WT, height: 100}));
            room.addChild(new Wall({x: 0, y: 350, width: WT, height: 100}));   
            
            //up
            room.addChild(new Wall({x: WT, y: 150, width: 1000 - WT * 2, height: WT}));
            
            //down
            room.addChild(new Wall({x: WT, y: 450 - WT, width: 1000 - WT * 2, height: WT}));
            
            //right
            room.addChild(new Wall({x: 1000 - WT, y: 150, width: WT, height: 100}));
            room.fadeInObject(rightDoor);
            room.addChild(new Wall({x: 1000 - WT, y: 350, width: WT, height: 100}));
        };
        
        function makeEnemies(){
            
            room.fadeInObject(new GhostTutorial1({x: 950, y: 300}));
            room.fadeInObject(new GhostTutorial1({x: 900, y: 250}));
            room.fadeInObject(new GhostTutorial1({x: 900, y: 350}));
            room.fadeInObject(new GhostTutorial1({x: 850, y: 200}));
            room.fadeInObject(new GhostTutorial1({x: 850, y: 300}));
            room.fadeInObject(new GhostTutorial1({x: 850, y: 400}));
            room.fadeInObject(new GhostTutorial1({x: 800, y: 250}));
            room.fadeInObject(new GhostTutorial1({x: 800, y: 350}));
            room.fadeInObject(new GhostTutorial1({x: 750, y: 300}));
        };
        
        room.onClear = function(){
            
            room.fadeOutObject(rightDoor);
        };
    };
    
    function r6(room){
        
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
            room.addChild(new Wall({x: 0, y: 150, width: WT, height: 100}));
            room.fadeInObject(new Wall({x: 0, y: 250, width: WT, height: 100}));
            room.addChild(new Wall({x: 0, y: 350, width: WT, height: 100})); 
            
            //down
            room.addChild(new Wall({x: WT, y: 450 - WT, width: 1000 - WT * 2, height: WT}));
                        
            //right
            room.addChild(new Wall({x: 1000 - WT, y: 150, width: WT, height: 300}));
            
            //top            
            room.addChild(new Wall({x: 550, y: 150, width: 450 - WT, height: WT}));
            room.addChild(new Wall({x: 550, y: 0, width: WT, height: 150}));
            room.addChild(topDoor);
            room.addChild(new Wall({x: 450, y: 0, width: WT, height: 150}));
            room.addChild(new Wall({x: WT, y: 150, width: 450, height: WT}));
            

        };
        
        function makeEnemies(){
            
            room.fadeInObject(new GhostTutorial2({x: 950, y: 300}));
        };
        
        room.onClear = function(){
            
            room.fadeOutObject(topDoor);
        };
    };
    
})();