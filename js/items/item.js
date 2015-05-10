function Item(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        this.onCollect = vars.onCollect;
        
        if(!this.size)
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
        
        var bounds = this.sprite.getBounds();        
        this.sprite.set({
            scaleX: this.size / bounds.width,
            scaleY: this.size / bounds.height
        });                       
        
        this.addChild(this.sprite);
    };
};

(function(){
        
    var prototype = createjs.extend(Item, createjs.Container);
    
    prototype.tick = function(){
        
        if(this.collected){
            
            this.alpha -= 0.1;
            
            if(this.alpha <= 0)
                this.parent.removeChild(this);
        }
    };
    
    prototype.handleCollision = function(obj){
        
        if(this.collected)
            return;
        
        if(obj.hitbox.type != 'player')
            return;
        
        this.collect(obj);
        this.collected = true;
        
        if(this.onCollect)
            this.onCollect();
    };
    
    prototype.destroy = function(){
        
        this.parent.removeChild(this);
    };
    
    Item = createjs.promote(Item, 'Container');
    Item.initialized = true;
})();