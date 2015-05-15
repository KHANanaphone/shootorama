RoomDefs.r121 = {
    
    init: function(room){        
        
        this.room = room;
        
        makeBackground.call(this);
        makeWalls.call(this);
        makeObjects.call(this);
        
        function makeBackground(){
            
            room.background.setColor('#EEF');
            
            this.ghosts = [];
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
            
            room.addObject(this.chest);
            
        };
    },
    
    start: function(firstVisit){        
            
        for(var i = 0; i < 4; i++){

            var g = this.room.background.addImage('ghost', 900, 100 + 133 * i, 60, 60);
            g.alpha = 0.2;
            g.rotation = 90;
            this.ghosts.push(g);                
        }

        this.addGhost();
    },
    
    clear: function(){
        
        if(this.ghosts.length > 0)
            this.addGhost();
        else
            this.chest.open();
    },
        
    addGhost: function(){  
        
        var g = this.ghosts.shift();
        
        if(!g)
            return;
        
        this.room.removeObject(g, {fade: {ticks: 100}});
        this.room.addObject(
            new GhostFast({x: g.x - 15, y: g.y + 30, 
                           persistence: 'remove', drop: 'none', facing: 90}), 
            {fade: true}
        );
    }
};