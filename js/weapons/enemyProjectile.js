function EnemyProjectile(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.source = vars.source;
        
        this.x = vars.x;
        this.y = vars.y;
        this.vector = vars.vector;
        this.triggersIllusion = true;
        this.playerDamage = vars.damage ? vars.damage: 1;
        
        this.hitbox = {
            type: 'enemyWeapon',
            collidesWith: ['player','solid','illusion'],
            width: 10,
            height: 10
        };
    };
    
    function setupComponents(){

        this.sprite = SpriteManager.makeSprite(vars.spriteName);        
        this.sprite.rotation = this.source.rotation;
        
        this.addChild(this.sprite);
    };
};

(function(){
        
    var prototype = createjs.extend(EnemyProjectile, createjs.Container);
      
    prototype.tick = function(){
        
        this.x += this.vector.x;
        this.y += this.vector.y;
    };
    
    prototype.handleCollision = function(obj){
        
        if(obj.hitbox.type == 'player'){
            
            obj.hit(this);
            this.destroy();
        }
        else if(obj.hitbox.type == 'solid'){
            
            this.destroy();
        }
    };
    
    prototype.destroy = function(){
        
        this.parent.removeChild(this);
    };
    
    EnemyProjectile = createjs.promote(EnemyProjectile, 'Container');
})();