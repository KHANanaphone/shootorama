function WeaponLaser(player){
    
    this.player = player; 
    this.type = 'laser';
    
    this.ammo = 15;
    this.maxAmmo = 15;
    this.damage = 8;
    this.empoweredDamage = 16;
    this.timeBetweenShots = 100;
}

WeaponLaser.prototype.shoot = function(empowered){ 
    
    var params = {
            source: this.player,
            direction: this.player.facing * Math.PI / 180
        }
    
    if(empowered){     
        params.damage = this.empoweredDamage;
        params.empowered = true;
    }
    else{
        params.damage = this.damage;
        params.empowered = false;
    }

    var line = new Line(params);
    Game.currentRoom.addObject(line);
};