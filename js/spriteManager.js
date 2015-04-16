var SpriteManager = {};

SpriteManager.makeSprite = function(id){
    
    var spriteData = SpriteManager.spriteData[id];
    
    if(!spriteData.images)
        spriteData.images = [Resources.getResult(id)];    
    
    var spriteSheet = new createjs.SpriteSheet(spriteData);
    return new createjs.Sprite(spriteSheet);    
}

SpriteManager.spriteData = {
    
  'ghost' : {
        frames: {width: 40, height: 40},
        animations: {
            stand: 0
        }
    }
};