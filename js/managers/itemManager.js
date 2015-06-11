var ItemManager = {};

ItemManager.dropItem = function(obj, item){
    
    if(item == 'random')
        item = ItemManager.getRandomSmallItem();
    else if(item == 'none')
        return;
    
    item.setMovementVector(getRandomVector());
    item.x = obj.x;
    item.y = obj.y;
    
    Game.currentRoom.addObject(item, {fade: true});
    
    function getRandomVector(){
        
        var angle = Math.random() * 360 * Math.PI / 180;
        
        return {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };        
    };
};

// gets a random small item (health, money, or energy).
// it's not really random, it is actually affected by the player's
// current status (health, weapon energy)
ItemManager.getRandomSmallItem = function(){
    
    var healthChance = (1 - Game.player.health / Game.player.maxHealth) * 0.8;    
    var ammoChance = (1 - Game.player.weaponManager.getAmmoPct()) * 0.6;
    var coinChance = 1;
    
    var total = healthChance + ammoChance + coinChance;
    
    console.log('Health: ' + healthChance / total + 
                ' Ammo: ' + ammoChance / total + 
                ' Coin: ' + coinChance / total);
    
    var rand = Math.random() * total;
    
    if(rand <= healthChance)
        return new Health({type: 'small'});
    else if(rand <= healthChance + ammoChance)
        return new Ammo({type: 'small'});
    else
        return new Coin({});
}