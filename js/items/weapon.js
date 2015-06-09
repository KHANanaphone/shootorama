function Weapon(vars){
    
    this.type = vars.type;
    
    if(this.type == 'laser'){
        
        this.spriteName = 'laser_weapon';
    }
    
    this.Item_constructor(vars);
};

(function(){
        
    var prototype = createjs.extend(Weapon, Item);
    
    prototype.collect = function(obj){
        
        Game.player.weaponManager.addWeapon(this.type);
    };
    
    Weapon = createjs.promote(Weapon, 'Item');
    Weapon.initialized = true;
})();