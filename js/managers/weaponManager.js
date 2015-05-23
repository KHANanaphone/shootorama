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
    
    Game.currentRoom.addObject(line);
    this.lastShot = new Date();
};

WeaponManager.prototype.removeEmpowered = function(){

    this.empowered = false;        
    this.player.effectsManager.removeEffect(this.empoweredEffect);
    this.empoweredEffect = null;
};

WeaponManager.prototype.empower = function(){
    
    this.empowered = true;
    this.empoweredEffect = new ColorEffect(this.player.sprite, {
        duration: 1000, scales: false, r: 1, g: 0, b: 0, scaleStart: 0.5
    });
    
    this.player.effectsManager.addEffect(this.empoweredEffect);
}