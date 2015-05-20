function Area(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.x = vars.x;
        this.y = vars.y;
        this.damage = vars.damage;
        this.playerDamage = vars.playerDamage;
        this.radius = vars.radius;
        this.duration = vars.duration;
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
        
        if(this.growth)       
            this.hitbox.radius += this.growth;

        this.drawCircle();
        
        this.duration--;        
        
        if(this.duration <= 0)
            this.parent.removeObject(this);
    };
    
    prototype.drawCircle = function(){
        
        this.circle.graphics.clear();
        this.circle.graphics.beginStroke('#F00').setStrokeStyle(3).drawCircle(0, 0, this.hitbox.radius);
    };
    
    prototype.handleCollision = function(obj){
        
        obj.hit(this);
    };
    
    Area = createjs.promote(Area, 'Container');
})();