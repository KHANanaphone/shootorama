RoomDefs.r120 = {
    
    init : function(){

        this.room.setBgColor('#222');   
        makeTiles.call(this);
        makeObjects.call(this);
        
        this.room.playerSpawnPoint = {x: 400, y: 450};
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','w','w','w','w','w','w','w','w',' ',' ','w','w','w','w','w','w','w','w','b'], // 0
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 1
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 2
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 3
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 4
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 5
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 6
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 7
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 8
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','C',' ','w'], // 9
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
            
            this.topDoor = new Door({x: 450, y: 15, width: 100, height: 20, type: 'locked'});
            this.room.addObject(this.topDoor, {fade: true});          
            
            this.bottomDoor = new Door({x: 450, y: 565, width: 100, height: 20});
            this.room.addObject(this.bottomDoor, {fade: true});
            
            this.vendor = new Vendor({x: 500, y: 200})
            this.room.addObject(this.vendor);
            
            var health = new BuyableItem({
                x: 400,
                y: 300,
                item: new Health({type: 'large'}),
                price: 2,
                vendor: this.vendor,
                vendorQuote: 'Be careful out there.'
            });
            this.room.addObject(health);
            
            var key = new BuyableItem({
                x: 600,
                y: 300,
                item: new Key({}),
                price: 15,
                vendor: this.vendor,
                vendorQuote: "Don't go north unless you're looking for a fight..."
            });
            this.room.addObject(key);
        };
    },
    
    start: function(firstVisit){
        
        if(firstVisit){
            this.vendor.say('Greetings, stranger. Welcome to \nmy cool shop.');
        }
        else{
            this.vendor.say('You again?');
        }        
    }    
};