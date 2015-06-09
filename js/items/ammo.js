function Ammo(vars){
      
    this.type = vars.type ? vars.type : 'small';
    this.spriteName = 'orbenergy';
    
    if(this.type == 'small')
        this.size = 16; 
    else if(this.type == 'medium')
        this.size = 24; 
    else if(this.type == 'large')
        this.size = 32;
    
    this.Item_constructor(vars);
};

(function(){
        
    var prototype = createjs.extend(Ammo, Item);
    
    prototype.collect = function(player){
        
        if(this.type == 'small')
            player.weaponManager.addAmmo(20);
        else if(this.type == 'medium')
            player.weaponManager.addAmmo(50);
        else if(this.type == 'large')
            player.weaponManager.addAmmo(100);
    };
    
    Ammo = createjs.promote(Ammo, 'Item');
    Ammo.initialized = true;
})();