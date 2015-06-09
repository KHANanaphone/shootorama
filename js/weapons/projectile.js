function Projectile(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.source = vars.source;
        
        this.x = vars.x;
        this.y = vars.y;
        this.width = vars.width ? vars.width : 24;
        this.height = vars.height ? vars.height: 24;
        this.vector = vars.vector;
        this.damage = vars.damage ? vars.damage: 1;
        this.knockback = vars.knockback ? vars.knockback : null;
        this.sourceType = vars.type;
        this.empowered = vars.empowered;

        this.triggersIllusion = (this.sourceType == 'enemy');
        var collides = this.sourceType == 'enemy' ? ['player','solid'] : ['enemy','solid'];
        
        this.hitbox = {
            type: 'projectile',
            collidesWith: collides,
            width: this.width,
            height: this.height
        };
    };
    
    function setupComponents(){

        this.sprite = SpriteManager.makeSprite(vars.spriteName);        
        this.sprite.rotation = Math.atan2(this.vector.x, this.vector.y) * -180 / Math.PI;
        
        this.addChild(this.sprite);
    };
};

(function(){
        
    var prototype = createjs.extend(Projectile, createjs.Container);
      
    prototype.tick = function(){
        
        this.x += this.vector.x;
        this.y += this.vector.y;
    };
    
    prototype.handleCollision = function(obj){

        if(obj.hit)
            obj.hit(this, this.damage);
        
        this.destroy();        
    };
    
    prototype.destroy = function(){
        
        this.parent.removeChild(this);
    };
    
    Projectile = createjs.promote(Projectile, 'Container');
})();