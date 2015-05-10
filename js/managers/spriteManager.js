var SpriteManager = {};

SpriteManager.makeSprite = function(id){
    
    var spriteData = SpriteManager.spriteData[id];
    
    if(!spriteData.images)
        spriteData.images = [Resources.getResult(id)];    
    
    var spriteSheet = new createjs.SpriteSheet(spriteData);
    var sprite = new createjs.Sprite(spriteSheet);
    sprite.set({
        regX: spriteData.frames.width / 2,
        regY: spriteData.frames.height / 2
    });   
    
    return sprite;
}

SpriteManager.spriteData = {
    
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
    
    'qmark' : {
        frames: {width: 20, height: 20},
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
    
    'key' : {
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
    'heart' : {
        frames : {width: 40, height: 40},
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
    
    'turret': { 
        frames : {width: 40, height: 40},
        animations: {
            initial: 0
        }
    },
    'fire': { 
        frames : {width: 20, height: 20},
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
    'orbcoin' : {
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
};