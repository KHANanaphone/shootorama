RoomDefs.r103 = {
    
    init : function(){

        this.room.setBgColor('#222');   
        makeTiles.call(this);
        makeObjects.call(this);
        
        this.room.playerSpawnPoint = {x: 400, y: 450};
        
        function makeTiles(){
            
            var grid = 
                [//0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b'], // 0
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 1
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 2
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 3
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 4
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 5
                [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 6
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 7
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 8
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','C',' ','w'], // 9
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 10
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b']]; // 11
            
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
            
            var health = new BuyableItem({
                x: 300,
                y: 300,
                item: new Health({type: 'large'}),
                price: 2,
                vendor: this.vendor,
                vendorQuote: 'Mmm, delicious!'
            });
            this.room.addObject(health);
            
            var health = new BuyableItem({
                x: 500,
                y: 300,
                item: new Weapon({type: 'laser'}),
                price: 5,
                vendor: this.vendor,
                vendorQuote: 'Excellent choice. You can change your weapon with the number keys.'
            });
            this.room.addObject(health);
            
            var key = new BuyableItem({
                x: 700,
                y: 300,
                item: new Key({}),
                price: 10,
                vendor: this.vendor,
                vendorQuote: "Have fun unlocking things."
            });
            this.room.addObject(key);
        };
    },
    
    start: function(firstVisit){
        
        if(firstVisit){
            this.vendor.say('Hi again! We have new weapon on sale for a special price!');
        }
        else{
            this.vendor.say('How was gun?');
        }        
    }    
};