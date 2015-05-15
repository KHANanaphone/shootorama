var WT = 15;

RoomDefs.r120 = {
    
    init: function(room){        
        
        this.room = room;
        
        makeBackground.call(this);
        makeWalls.call(this);
        makeObjects.call(this);
        
        function makeBackground(){
            
            room.background.setColor('#222');
        };
        
        function makeWalls(){
            
            //left
            room.addWall([0, 0], [WT, 600]);
            
            //top
            room.addWall([WT, 0], [450, WT]);
            room.addWall([450, 0], [550, WT], {type: 'locked'});
            room.addWall([550, 0], [1000 - WT, WT]);
            
            //right
            room.addWall([1000 - WT, 0], [1000, 250]);
            room.addWall([1000 - WT, 350], [1000, 600]);
            
            //down
            room.addWall([WT, 600 - WT], [450, 600]);
            room.addWall([550, 600 - WT], [1000 - WT, 600]);
        };
        
        function makeObjects(){
            
            this.vendor = new Vendor({x: 500, y: 200})
            room.addObject(this.vendor);
            
            var health = new BuyableItem({
                x: 400,
                y: 300,
                item: new Health({type: 'large'}),
                price: 2,
                vendor: this.vendor,
                vendorQuote: 'Be careful out there.'
            });
            room.addObject(health);
            
            var key = new BuyableItem({
                x: 600,
                y: 300,
                item: new Key({}),
                price: 15,
                vendor: this.vendor,
                vendorQuote: "Don't get into too much trouble with that key."
            });
            room.addObject(key);
        };
    },
    
    start: function(firstVisit){
        
        if(firstVisit){
            this.room.addWall([450, 600 - WT], [550, 600], {fade: true});
            this.vendor.say('Greetings, stranger. Welcome to \nmy cool shop.');
        }
        else{
            this.vendor.say('You again?');
        }
        
    }
};