function Statue(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        this.persistence = 'remove';
        
        this.hitbox = {
            type: 'solid',
            collidesWith: ['player'],
            width: 48,
            height: 48
        };
    };
    
    function setupComponents(){
                       
        this.sprite = SpriteManager.makeSprite('ghostStatue');        
        this.addChild(this.sprite);
    };
};

(function(){
        
    var prototype = createjs.extend(Chest, createjs.Container);
    
    prototype.tick = function(){
        
    };
    
    Chest = createjs.promote(Chest, 'Container');
    Chest.initialized = true;
})();