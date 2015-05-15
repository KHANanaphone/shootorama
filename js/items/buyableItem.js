function BuyableItem(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        this.item = vars.item;
        this.item.x = 0;
        this.item.y = 0;
        this.item.hitbox = null;
        this.persistence = 'persist';
        
        this.vendor = vars.vendor;
        this.vendorQuote = vars.vendorQuote;
        
        this.price = vars.price;  
        
        this.hitbox = {
            type: 'trigger',
            collidesWith: ['player'],
            width: 32,
            height: 32
        };
    };
    
    function setupComponents(){
        
        this.addChild(this.item);        
        
        var price = new createjs.Text();
        price.font = '30px bitrod';
        price.text = this.price;
        price.y = 32;
        price.textAlign = 'center';
        price.color = 'white';
        this.addChild(price);
    };
};

(function(){
        
    var prototype = createjs.extend(BuyableItem, createjs.Container);
    
    prototype.handleCollision = function(obj){
        
        if(obj.hitbox.type != 'player')
            return;
        
        if(obj.coins >= this.price){
            
            obj.addCoins(-this.price);
            this.item.collect(obj);
            this.parent.removeObject(this);           
            this.vendor.say(this.vendorQuote);
        }        
    };
    
    BuyableItem = createjs.promote(BuyableItem, 'Container');
    BuyableItem.initialized = true;
})();