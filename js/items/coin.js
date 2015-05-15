function Coin(vars){
      
    this.value = vars.value ? vars.value : 1;
    this.spriteName = 'orbcoin';
    
    if(this.value == 1)
        this.size = 16; 
    else if(this.value > 1)
        this.size = 24; 
    
    this.Item_constructor(vars);
};

(function(){
        
    var prototype = createjs.extend(Coin, Item);
    
    prototype.collect = function(obj){
        
        obj.addCoins(this.value);
    };
    
    Coin = createjs.promote(Coin, 'Item');
    Coin.initialized = true;
})();