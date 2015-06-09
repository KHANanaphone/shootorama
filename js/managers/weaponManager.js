function WeaponManager(player){
    
    this.player = player;
    this.lastShot = new Date();
    this.indexToType = [null];
    this.weapons = {};
    
    this.addWeapon('peaShooter');
};

WeaponManager.prototype.getWeaponByIndex = function(index){
    
    return this.weapons[this.indexToType[index]];
};

WeaponManager.prototype.selectWeaponByIndex = function(index){
    
    this.selectWeapon(this.indexToType[index]);
};

WeaponManager.prototype.onChange = function(callback){
    
    this.onchange = callback;
};

WeaponManager.prototype.selectWeapon = function(type){
    
    var weapon = this.weapons[type];
    
    if(!weapon)
        return;    
    
    this.selectedWeaponType = type; 
    this.selectedWeapon = this.weapons[type];

    if(this.onchange)
        this.onchange();
};

WeaponManager.prototype.addWeapon = function(type){
    
    if(type == 'peaShooter'){
        this.weapons.peaShooter = new WeaponPeaShooter(this.player);
    }
    else if(type == 'laser'){        
        this.weapons.laser = new WeaponLaser(this.player);
    }
    else
        return;
    
    this.indexToType.push(type);    
    this.selectWeapon(type);
};

WeaponManager.prototype.tick = function(controlState){
    
    var weapon = this.selectedWeapon;
    
    if(controlState.shoot.isDown != 1 || controlState.shoot.time <= this.lastShot)
        return;
    
    if(controlState.shoot.time - this.lastShot < weapon.timeBetweenShots)
        return;
    
    if(weapon.ammo == 0)
        this.selectWeapon('peaShooter');
    
    weapon.shoot(this.empowered);
    
    if(weapon.ammo > 0)
        weapon.ammo--;
    
    if(this.empowered)
        this.removeEmpowered();
    
    this.lastShot = new Date();
    
    if(this.onchange)
        this.onchange();
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
};

WeaponManager.prototype.addAmmo = function(amount){
    
    //refill selected weapon
    while(amount > 0.5){
        
        if(this.selectedWeapon.ammo >= this.selectedWeapon.maxAmmo)
            break;
        
        this.selectedWeapon.ammo++;
        amount -= 100 / this.selectedWeapon.maxAmmo;
    }
    
    //refill other weapons
    while(amount > 0.5){
        
        var begin = amount;
        for(var type in this.weapons){
            var weapon = this.weapons[type];
            
            if(weapon.ammo < weapon.maxAmmo){
                
                weapon.ammo++;
                amount -= 100 / weapon.maxAmmo;
            }
        }
        
        if(amount == begin)
            break;
    }
    
    if(this.onchange)
        this.onchange();
};

// ammo remaining / max ammo across all weapons
WeaponManager.prototype.getAmmoPct = function(){
    
    var pct = 0, count = 0;
    
    for(var type in this.weapons){
        
        var weapon = this.weapons[type];
        
        if(weapon.ammo == -1)
            continue;
        
        pct += weapon.ammo / weapon.maxAmmo;
        count++;
    };
    
    if(count == 0)
        return 0;
    return pct / count;
}