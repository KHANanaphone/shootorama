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
    }
};