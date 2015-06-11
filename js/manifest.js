Main.manifest = [];

//scripts
Main.manifest.push(

    "js/playingArea.js",
    "js/room.js",
    
    "js/items/item.js",
    "js/items/ammo.js",
    "js/items/buyableItem.js",
    "js/items/coin.js",
    "js/items/health.js",
    "js/items/life.js",
    "js/items/key.js",
    "js/items/weapon.js",
    
    "js/weapons/area.js",
    "js/weapons/line.js",
    "js/weapons/projectile.js",
    "js/weapons/explosiveProjectile.js",
    
    "js/effects/circlingParticleEffect.js",
    "js/effects/colorEffect.js",
    "js/effects/expandingParticleEffect.js",
    "js/effects/textEffect.js",
    "js/effects/ringEffect.js",
    "js/effects/scaleEffect.js",
    
    "js/managers/collisionManager.js",
    "js/managers/controlsManager.js",
    "js/managers/effectsManager.js",
    "js/managers/hitManager.js",
    "js/managers/itemManager.js",
    "js/managers/movementManager.js",
    "js/managers/spriteManager.js",
    "js/managers/weaponManager.js",
    
    "js/player/illusion.js",
    "js/player/player.js",
    "js/player/weapons/peaShooter.js",
    "js/player/weapons/laser.js",
    
    "js/enemies/enemy.js",
    "js/enemies/enemyHealthMeter.js",
    "js/enemies/statedef.js",
    
    "js/enemies/enemydefs/ghost.js",
    "js/enemies/enemydefs/ghostArmored.js",
    "js/enemies/enemydefs/ghostBig.js",
    "js/enemies/enemydefs/ghostFast.js",
    "js/enemies/enemydefs/ghostRed.js",
    "js/enemies/enemydefs/ghostTutorial1.js",
    "js/enemies/enemydefs/ghostTutorial2.js",
    "js/enemies/enemydefs/ghostTutorial3.js",
    
    "js/enemies/enemydefs/shooter.js",
    "js/enemies/enemydefs/shooterBlue.js",
    "js/enemies/enemydefs/shooterRed.js",
    "js/enemies/enemydefs/shooterOrange.js",
    
    "js/terrain/tiles/tile.js",
    "js/terrain/tiles/checkpoint.js",    
    "js/terrain/tiles/lava.js",
    "js/terrain/tiles/pit.js",
    "js/terrain/tiles/wall.js",
    
    "js/terrain/background.js",
    "js/terrain/chest.js",
    "js/terrain/door.js",
    "js/terrain/invisibleWall.js",
    "js/terrain/statue.js",
    "js/terrain/tileGrid.js",
    "js/terrain/trigger.js",
    "js/terrain/transitionTrigger.js",
    "js/terrain/turret.js",
    "js/terrain/vendor.js",
    
    "js/hud/coinCounter.js",
    "js/hud/dashMeter.js",
    "js/hud/healthMeter.js",
    "js/hud/hudArea.js",
    "js/hud/keyCounter.js",
    "js/hud/weaponBar.js",
    "js/hud/weaponPanel.js",
    
    "js/levels/level.js",
    "js/levels/leveldefs/world1/r100.js",
    "js/levels/leveldefs/world1/r101.js",
    "js/levels/leveldefs/world1/r102.js",
    "js/levels/leveldefs/world1/r103.js",
    "js/levels/leveldefs/world1/r104.js",
    "js/levels/leveldefs/world1/r110.js",
    "js/levels/leveldefs/world1/r111.js",
    "js/levels/leveldefs/world1/r112.js",
    "js/levels/leveldefs/world1/r113.js",
    "js/levels/leveldefs/world1/r114.js",
    "js/levels/leveldefs/world1/r120.js",
    "js/levels/leveldefs/world1/r121.js",
    "js/levels/leveldefs/world1/r122.js",
    "js/levels/leveldefs/world1/r123.js",
    "js/levels/leveldefs/world1/r130.js",
    "js/levels/leveldefs/world1/r131.js",
    "js/levels/leveldefs/world1/r132.js",
    "js/levels/leveldefs/world1/r140.js",
    "js/levels/leveldefs/world1/r141.js",
    "js/levels/leveldefs/world1/r142.js",
    "js/levels/leveldefs/level1.js"
);

//images
Main.manifest.push(
    
    {id: 'checkpoint', src: 'img/checkpoint.png'},
    {id: 'chest', src: 'img/chest.png'},
    {id: 'chestlocked', src: 'img/chestlocked.png'},
    {id: 'coin', src: 'img/coin.png'},
    
    {id: 'fire', src: 'img/fire.png'},
    
    {id: 'ghost', src: 'img/ghost.png'},
    {id: 'ghostBlue', src: 'img/ghostBlue.png'},
    {id: 'ghostOrange', src: 'img/ghostOrange.png'},
    {id: 'ghostRed', src: 'img/ghostRed.png'},
    {id: 'ghostStatue', src: 'img/ghostStatue.png'},
    
    {id: 'heart', src: 'img/heart.png'},
    {id: 'heartplus', src: 'img/heartplus.png'},
    
    {id: 'key', src: 'img/key.png'},
    
    {id: 'lava', src: 'img/lava.png'},
    {id: 'laser_weapon', src: 'img/laser_weapon.png'},
    
    {id: 'orbcoin', src: 'img/orbcoin.png'},
    {id: 'orbenergy', src: 'img/orbenergy.png'},
    {id: 'orbhealth', src: 'img/orbhealth.png'},
    {id: 'orbhealthplus', src: 'img/orbhealthplus.png'},
    
    {id: 'peaShooter_bullet', src: 'img/peaShooter_bullet.png'},
    {id: 'peaShooter_empowered', src: 'img/peaShooter_empowered.png'},
    {id: 'peaShooter_weapon', src: 'img/peaShooter_weapon.png'},
    {id: 'pit', src: 'img/pit.png'},
    {id: 'player', src: 'img/player.png'},
    {id: 'playerIllusion', src: 'img/playerIllusion.png'},
    
    {id: 'qmark', src: 'img/qmark.png'},
    
    {id: 'shooter', src: 'img/shooter.png'}, 
    {id: 'shooterBlue', src: 'img/shooterBlue.png'}, 
    {id: 'shooterRed', src: 'img/shooterRed.png'}, 
    {id: 'shooterOrange', src: 'img/shooterOrange.png'}, 
    {id: 'star', src: 'img/star.png'}, 
    
    {id: 'tile', src: 'img/tile.png'},     
    
    {id: 'turret', src: 'img/turret.png'},
    
    {id: 'vendor', src: 'img/vendor.png'}

    
);