function Area(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.x = vars.x;
        this.y = vars.y;
        this.playerDamage = vars.damage;
        this.radius = vars.radius;
        this.growth = vars.growth ? vars.growth : 0;
        this.spriteName = vars.spriteName ? vars.spriteName : null;
        
        this.hitbox = {
            type: 'weapon',
            collidesWith: vars.collidesWith,
            radius: this.radius            
        };
    };
    
    function setupComponents(){

        this.circle = new createjs.Shape();
        this.circle.graphics.beginStroke('#F00').setStrokeStyle(3).drawCircle(0, 0, this.radius);
        this.addChild(this.circle);
        
//        this.sprite = SpriteManager.makeSprite(vars.spriteName);        
//        this.sprite.rotation = this.source.rotation;
//        
//        this.addChild(this.sprite);
    };
};

(function(){
        
    var prototype = createjs.extend(Area, createjs.Container);
      
    prototype.tick = function(){
        
    };
    
    prototype.handleCollision = function(obj){
            
        debugger;
    };
    
    Area = createjs.promote(Area, 'Container');
})();