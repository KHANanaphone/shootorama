function WeaponBar(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    this.update(Game.player.weaponManager);
    
    function setupVars(){
        
        this.x = vars.x;
        this.y = vars.y;        
        
        var self = this;        
        
        Game.player.weaponManager.onChange(function(){
            self.update(this);
        });
    };
    
    function setupComponents(){
        
        this.addChild(new WeaponPanel({x: 0, y: 0, index: 1}));
        this.addChild(new WeaponPanel({x: 80, y: 0, index: 2}));
        this.addChild(new WeaponPanel({x: 160, y: 0, index: 3}));
        this.addChild(new WeaponPanel({x: 240, y: 0, index: 4}));
        this.addChild(new WeaponPanel({x: 320, y: 0, index: 5}));
        this.addChild(new WeaponPanel({x: 400, y: 0, index: 6}));
        this.addChild(new WeaponPanel({x: 480, y: 0, index: 7}));
        this.addChild(new WeaponPanel({x: 560, y: 0, index: 8}));
    };
}

(function(){
    
    var prototype = createjs.extend(WeaponBar, createjs.Container);
    
    prototype.update = function(weaponManager){
        
        for(var i = 0; i < this.children.length; i++){
            
            var c = this.children[i];
            var type = weaponManager.indexToType[c.index];
            var selected = weaponManager.selectedWeaponType == type;
            
            c.update(weaponManager.weapons[type], selected);
        }
    };
    
    WeaponBar = createjs.promote(WeaponBar, 'Container');
    
})();