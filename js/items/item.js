function Item(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        
        this.size = 40;
        
        this.hitbox = {
            type: 'item',
            collidesWith: ['player'],
            width: this.size,
            height: this.size
        };
    };
    
    function setupComponents(){
                       
        this.sprite = SpriteManager.makeSprite(this.spriteName);          
        this.addChild(this.sprite);
    };
};

(function(){
        
    var prototype = createjs.extend(Item, createjs.Container);
    
    prototype.destroy = function(){
        
        this.parent.removeChild(this);
    };
    
    Item = createjs.promote(Item, 'Container');
    Item.initialized = true;
})();