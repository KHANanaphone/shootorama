RoomDefs.r130 = {
    
    init: function(room){
    
        this.room = room;
        
        var WT = 15; //wall thickness
        var topDoor;

        makeBG();
        makeWalls();
        makeObjects();

        function makeBG(){

            room.background.setColor('#EEF');
        };

        function makeWalls(){

            topDoor = new Wall({x: 450, y: 0, width: 100, height: WT});

            //left
            room.addObject(new Wall({x: 0, y: 0, width: WT, height: 600}));

            //right
            room.addObject(new Wall({x: 1000 - WT, y: 0, width: WT, height: 250}));
            
            room.addObject(new Wall({x: 1000 - WT, y: 250, width: WT, height: 100}), {fade: true});
            room.addObject(new Wall({x: 1000 - WT, y: 350, width: WT, height: 250}));

            //top
            room.addObject(new Wall({x: WT, y: 0, width: 450 - WT, height: WT}));
//            room.addObject(topDoor);
            room.addObject(new Wall({x: 550, y: 0, width: 450 - WT, height: WT}));

            //bottom
            room.addObject(new Wall({x: WT, y: 600 - WT, width: 215 - WT, height: WT}));
            room.addObject(new Wall({x: 215, y: 600 - WT, width: 135, height: WT}), {fade: true});
            room.addObject(new Wall({x: 350, y: 600 - WT, width: 650 - WT, height: WT}));
        };

        function makeObjects(){

            room.addObject(
                new Health({x: 500, y: 300, type: 'heart', onCollect: spawnEnemies}));
        };        

        function spawnEnemies(){

            room.addObject(new Ghost({x: 100, y: 100}), {fade: {layer: 0}});
            room.addObject(new Ghost({x: 900, y: 100}), {fade: {layer: 1}});
            room.addObject(new Ghost({x: 100, y: 500}), {fade: {layer: 2}});
            room.addObject(new Ghost({x: 900, y: 500}), {fade: {layer: 3}});
        };

        room.onClear = function(){

            room.removeObject(topDoor, {fade: true});
        };
    }
};