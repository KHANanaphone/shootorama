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
            collidesWith: ['player', 'solid'],
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
    
    prototype.setMovementVector = function(vector){
        
        this.movement = {
            ticksLeft: 60,
            vector: vector
        } 
    };
    
    prototype.tick = function(){
        
        if(this.movement){
            
            var scale = this.movement.ticksLeft / 60;
            
            this.x += this.movement.vector.x * 1.5 * scale;
            this.y += this.movement.vector.y * 1.5 * scale;
            this.movement.ticksLeft--;
            
            if(this.movement.ticksLeft == 0)
                this.movement = null;
        };
    };
    
    prototype.handleCollision = function(obj){
        
        if(obj.hitbox.type == 'solid'){
            
            CollisionManager.push(this, obj);
            return;
        }     
        
        if(this.movement)
            return;
        if(this.collected)
            return;
        if(obj.hitbox.type != 'player')
            return;
        
        this.collect(obj);
        this.collected = true;
        
        if(this.onCollect)
            this.onCollect();
        
        this.destroy();
    };
    
    prototype.destroy = function(){
        
        this.parent.removeChild(this);
    };
    
    Item = createjs.promote(Item, 'Container');
    Item.initialized = true;
})();