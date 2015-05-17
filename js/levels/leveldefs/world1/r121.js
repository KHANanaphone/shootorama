RoomDefs.r121 = {
    
    init: function(room){        
        
        this.room = room;
        
        makeBackground.call(this);
        makeWalls.call(this);
        makeObjects.call(this);
        
        function makeBackground(){
            
            room.background.setColor('#EEF');
        };
        
        function makeWalls(){
            
            //left
            room.addWall([0, 0], [WT, 250]);
            room.addWall([0, 350], [WT, 600]);
            
            //top
            room.addWall([WT, 0], [1000, WT]);
            
            //right
            room.addWall([1000 - WT, 0], [1000, 250]);
            room.addWall([1000 - WT, 350], [1000, 600]);
            
            //down
            room.addWall([WT, 600 - WT], [1000, 600]);
        };
        
        function makeObjects(){
            
            this.room.addObject(new GhostArmored({x: 700, y: 300}));            
            
            this.chest = new Chest({
                x: 950,
                y: 550,
                contents: [
                    new Coin({value: 1}), 
                    new Coin({value: 1}),
                    new Coin({value: 1}),
                    new Coin({value: 1}),
                    new Coin({value: 1}),
                    new Health({type: 'small'})
                ]
            });
            
            this.room.addObject(this.chest);
        };
    },
    
    clear: function(){
        
        this.chest.open();
    },
};