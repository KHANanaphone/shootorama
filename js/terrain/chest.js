function Chest(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        this.type = vars.type ? vars.type : 'normal';
        this.persistence = 'persist';
        this.pushPriority = 9999;
        
        if(typeof vars.contents === 'string')
            this.contents = [vars.contents];
        else
            this.contents = vars.contents;
        
        this.hitbox = {
            type: 'none',
            collidesWith: ['player'],
            width: 48,
            height: 48
        };
    };
    
    function setupComponents(){
                       
        var sprName = (this.type == 'locked') ? 'chestlocked' : 'chest';
        this.sprite = SpriteManager.makeSprite(sprName);        
        this.addChild(this.sprite);
    };
};

(function(){
        
    var prototype = createjs.extend(Chest, createjs.Container);
    
    prototype.handleCollision = function(obj){
        
        if(obj.hitbox.type != 'player')
            return;
        
        if(this.type != 'locked')
            return;
        
        if(obj.keys > 0){
            
            this.open();
            obj.addKeys(-1);
        };     
    };
    
    prototype.open = function(){
        
        this.opened = true;
        this.nextItem = 1;
    };
    
    prototype.tick = function(){
        
        if(!this.opened)
            return;
        
        this.nextItem--;
        
        if(this.nextItem == 0){
            
            var item = this.contents.shift();
            ItemManager.dropItem(this, item);   
            
            if(this.contents.length > 0)
                this.nextItem = 8;
            else
                Game.currentRoom.removeObject(this, {fade: true});
        }
    };
    
    Chest = createjs.promote(Chest, 'Container');
    Chest.initialized = true;
})();