function WeaponPeaShooter(player){
    
    this.player = player;
    this.type = 'peaShooter';
    
    this.ammo = -1;
    this.maxAmmo = -1;
    this.shotSpeed = 25;
    this.damage = 5;
    this.empoweredDamage = 15;
    this.timeBetweenShots = 100;
}

WeaponPeaShooter.prototype.shoot = function(empowered){
    
    var angleRads = this.player.facing * Math.PI / 180;
    
    var vector = {
        x: Math.cos(angleRads) * this.shotSpeed,
        y: Math.sin(angleRads) * this.shotSpeed
    };
    
    if(empowered){
        
        Game.currentRoom.addObject(new Projectile({

            type: 'player',
            spriteName: 'peaShooter_empowered',
            source: this.player,
            x: this.player.x,
            y: this.player.y,
            width: 16,
            height: 16,
            vector: vector,
            damage: this.empoweredDamage,
            empowered: true
        }));
        
    }
    else{
        
        Game.currentRoom.addObject(new Projectile({

            type: 'player',
            spriteName: 'peaShooter_bullet',
            source: this.player,
            x: this.player.x,
            y: this.player.y,
            width: 8,
            height: 8,
            vector: vector,
            damage: this.damage

        }));
    }
};