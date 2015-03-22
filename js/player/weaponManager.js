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
    
    Game.playingArea.addChild(line);
    this.lastShot = new Date();
};