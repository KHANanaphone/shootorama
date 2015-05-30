function Door(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
      
        this.x = vars.x + vars.width / 2;
        this.y = vars.y + vars.height / 2;
        
        this.width = vars.width;
        this.height = vars.height;
        this.pushPriority = 9999;
        this.persistence = 'persist';
        this.type = vars.type ? vars.type : 'normal';
        
        this.hitbox = {
            type: 'solid',
            collidesWith: 'player',
            width: this.width,
            height: this.height
        };
    };
    
    function setupComponents(){
                       
        var color;
        
        if(vars.color)
            color = vars.color;
        else if(this.type == 'shootable')
            color = '#F00';
        else if(this.type == 'locked')
            color = '#FFD700';
        else
            color = '#666';
        
        var rect = new createjs.Shape();
        rect.graphics.beginFill(color)
            .drawRect(this.width / -2, this.height / -2, this.width, this.height);
        
        this.rect = rect;
        this.addChild(rect);
    };
};

(function(){
        
    var prototype = createjs.extend(Door, createjs.Container);
      
    prototype.tick = function(){
    
        if(this.breaking){
            
            this.alpha -= 0.1;
            
            if(this.alpha <= 0)
                this.parent.removeChild(this);            
        };
    };
    
    prototype.handleCollision = function(obj){
        
        if(obj.hitbox.type != 'player')
            return;
        
        if(this.type == 'locked' && obj.keys > 0){
            obj.addKeys(-1);
            this.parent.removeObject(this);
        }
    };
    
    prototype.hit = function(source){
        
        if(this.type == 'shootable' && source.empowered){
            this.breaking = true;
        };
    };
    
    Door = createjs.promote(Door, 'Container');
    Door.initialized = true;
})();