function Tile(vars){
    
    this.Container_constructor(vars);
    
    this.type = vars.type ? vars.type : 'floor';
    this.width = 50;
    this.height = 50;
    this.room = vars.room;
    
    this.pushPriority = 99999;
    
    this.caresAbout = this.caresAbout ? this.caresAbout : {};

    this.rect = new createjs.Shape();
    this.addChild(this.rect);
    
    if(vars.spriteName){
        this.sprite = SpriteManager.makeSprite(this.spriteName, true);
        this.addChild(this.sprite);
    }
    
    if(vars.color){
        this.rect.graphics.beginFill(vars.color).drawRect(this.width / -2, this.height / -2, 50, 50);
    }
};

(function(){
        
    var prototype = createjs.extend(Tile, createjs.Container);
    
    Tile = createjs.promote(Tile, 'Container');
    Tile.initialized = true;
    
})();