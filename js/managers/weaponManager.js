function WeaponManager(player){
    
    this.player = player;
    this.lastShot = new Date();
};

WeaponManager.prototype.tick = function(controlState){
    
    if(controlState.shoot.isDown != 1 || controlState.shoot.time <= this.lastShot)
        return;
    
    var line = new Line({
        source: this.player
    });
    
    if(this.empowered){
        
        line.empowered = true;
        this.removeEmpowered();
    };
    
    Game.currentRoom.addChild(line);
    this.lastShot = new Date();
};

WeaponManager.prototype.removeEmpowered = function(){

    this.empowered = false;        
    this.player.effectsManager.clearEffect(this.empoweredEffect);
    this.empoweredEffect = null;
};

WeaponManager.prototype.empower = function(){
    
    this.empowered = true;
    this.empoweredEffect = new ColorEffect(this.player.rect, {
        duration: -1, r: 1, g: 0, b: 0, a: 0.4
    });
    
    this.player.effectsManager.addEffect(this.empoweredEffect);
}