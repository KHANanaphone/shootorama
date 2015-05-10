function Coin(vars){
    
    this.size = 16;    
    this.spriteName = 'orbcoin';    
    this.Item_constructor(vars);
};

(function(){
        
    var prototype = createjs.extend(Coin, Item);
    
    prototype.collect = function(obj){
        
        obj.addCoins(1);
    };
    
    Coin = createjs.promote(Coin, 'Item');
    Coin.initialized = true;
})();