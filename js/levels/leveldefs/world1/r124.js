RoomDefs.r124 = {
    
    init : function(){

        this.room.setBgColor('#222');   
        makeTiles.call(this);
        makeObjects.call(this);
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','w','w','w','w','w','w','w','w',' ',' ','w','w','w','w','w','w','w','w','b'], // 0
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 1
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 2
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 3
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 4
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 5
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 6
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 7
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 8
                ['w',' ','C',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 9
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 10
                ['b','w','w','w','w','w','w','w','w',' ',' ','w','w','w','w','w','w','w','w','b']]; // 11
            
            var tiles = {
                'w': {type: Wall}, 
                'b': {type: Tile, params: {color: 'black'} },
                'C': {type: Checkpoint}
            };
            
            this.room.tileGrid.setGrid(tiles, grid);
        };
        
        function makeObjects(){
            
            this.vendor = new Vendor({x: 500, y: 200})
            this.room.addObject(this.vendor);
            
            this.topDoor = new Door({x: 450, y: 15, width: 100, height: 20, type: 'locked'});
            this.room.addObject(this.topDoor);
            
            var health = new BuyableItem({
                x: 300,
                y: 300,
                item: new Health({type: 'large'}),
                price: 5,
                vendor: this.vendor,
                vendorQuote: 'Mmm, delicious!'
            });
            this.room.addObject(health);
            
            var ammo = new BuyableItem({
                x: 500,
                y: 300,
                item: new Ammo({type: 'large'}),
                price: 5,
                vendor: this.vendor,
                vendorQuote: "Shoot 'em up good!"
            });
            this.room.addObject(ammo);
            
            var life = new BuyableItem({
                x: 700,
                y: 300,
                item: new Life({}),
                price: 2,
                vendor: this.vendor,
                vendorQuote: "Try to not die."
            });
            this.room.addObject(life);
        };
    },
    
    start: function(firstVisit){
        
        if(firstVisit){
            this.vendor.say("Hey yo! We have an excellent deal on extra lives!");
        }
        else{
            this.vendor.say('Did you get him?');
        }        
    },
    
    entering: function(from){
        
        if(from == 'up')
            this.room.removeObject(this.topDoor);
    } 
};