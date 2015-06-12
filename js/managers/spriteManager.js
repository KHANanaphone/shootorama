var SpriteManager = {};

SpriteManager.makeSprite = function(id, dontCenter){
    
    var spriteData = SpriteManager.spriteData[id];
      
    if(!spriteData.images)
        spriteData.images = [Resources.getResult(id)];    
    
    var spriteSheet = new createjs.SpriteSheet(spriteData);
    var sprite = new createjs.Sprite(spriteSheet);
    
    if(!dontCenter)
        sprite.set({
            regX: spriteData.frames.width / 2,
            regY: spriteData.frames.height / 2
        });   
    
    return sprite;
}

SpriteManager.spriteData = {
    
    'bossskull' : {
        frames : {width: 100, height: 100},
        animations: {
            initial: 0
        }
    },
    
    'checkpoint' : {
        frames : {width: 50, height: 50},
        animations: {
            inactive: 0,
            active: 1
        }
    },
    'chest' : {
        frames : {width: 48, height: 48},
        animations: {
            initial: 0
        }
    },
    'chestlocked' : {
        frames : {width: 48, height: 48},
        animations: {
            initial: 0
        }
    },
    'coin' : {
        frames : {width: 40, height: 40},
        animations: {
            initial: 0
        }
    },
    
    'fire': { 
        frames : {width: 32, height: 32},
        animations: {
            initial: 0
        }
    },
    
    'ghost' : {
        frames: {width: 40, height: 40},
        animations: {
            stand: 0
        }
    },    
    'ghostBlue' : {
        frames: {width: 40, height: 40},
        animations: {
            stand: 0
        }
    },    
    'ghostOrange' : {
        frames: {width: 40, height: 40},
        animations: {
            stand: 0
        }
    },  
    'ghostRed' : {
        frames: {width: 40, height: 40},
        animations: {
            stand: 0
        }
    },         
    'ghostStatue' : {
        frames : {width: 48, height: 48},
        animations: {
            initial: 0
        }
    },  
    'goldkey' : {
        frames : {width: 40, height: 40},
        animations: {
            initial: 0
        }
    },  
      
    'heart' : {
        frames : {width: 40, height: 40},
        animations: {
            initial: 0
        }
    },    
    'heartplus' : {
        frames : {width: 40, height: 40},
        animations: {
            initial: 0
        }
    },  
    
    'key' : {
        frames : {width: 40, height: 40},
        animations: {
            initial: 0
        }
    },  
    
    'lava' : {
        frames : {width: 50, height: 50},
        animations: {
            initial: 0
        }
    },      
    'laser_weapon' : {
        frames : {width: 40, height: 40},
        animations: {
            initial: 0
        }
    },    
    
    'orbcoin' : {
        frames : {width: 32, height: 32},
        animations: {
            initial: 0
        }
    },
    'orbenergy' : {
        frames : {width: 32, height: 32},
        animations: {
            initial: 0
        }
    },
    'orbhealth' : {
        frames : {width: 32, height: 32},
        animations: {
            initial: 0
        }
    },
    'orbhealthplus' : {
        frames : {width: 32, height: 32},
        animations: {
            initial: 0
        }
    },
        
    'peaShooter_bullet' : {
        frames: {width: 8, height: 8},
        animations: {
            stand: 0
        }
    },       
    'peaShooter_empowered' : {
        frames: {width: 16, height: 16},
        animations: {
            stand: 0
        }
    },  
    'peaShooter_weapon' : {
        frames: {width: 40, height: 40},
        animations: {
            stand: 0
        }
    },
    
    'pit' : {
        frames: {width: 50, height: 50},
        animations: {
            stand: 0
        }
    },  
    'player' : {
        frames: {width: 48, height: 48},
        animations: {
            stand: 0
        }
    },    
    'playerIllusion' : {
        frames: {width: 48, height: 48},
        animations: {
            stand: 0
        }
    },
    
    'qmark' : {
        frames: {width: 20, height: 20},
        animations: {
            initial: 0
        }
    },
    
    'shooter' : {
        frames : {width: 48, height: 48},
        animations: {
            initial: 0
        }
    },  
    'shooterBlue' : {
        frames : {width: 48, height: 48},
        animations: {
            initial: 0
        }
    },  
    'shooterRed' : {
        frames : {width: 48, height: 48},
        animations: {
            initial: 0
        }
    },  
    'shooterOrange' : {
        frames : {width: 48, height: 48},
        animations: {
            initial: 0
        }
    },  
    'star' : {
        frames : {width: 20, height: 20},
        animations: {
            initial: 0
        }
    },  
    
    'tile' : {
        frames : {width: 50, height: 50},
        animations: {
            initial: 0
        }
    },
    'turret': { 
        frames : {width: 40, height: 40},
        animations: {
            initial: 0
        }
    },
    
    'vendor': { 
        frames : {width: 48, height: 48},
        animations: {
            initial: 0
        }
    },
};