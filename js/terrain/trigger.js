function Trigger(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        this.persistence = 'persist';
        this.onTrigger = vars.onTrigger;
        this.persistent = vars.persistent? vars.persistent : false;
        
        this.hitbox = {
            type: 'trigger',
            collidesWith: ['player'],
            width: vars.width,
            height: vars.height
        };
    };
};

(function(){
        
    var prototype = createjs.extend(Trigger, createjs.Container);
    
    prototype.handleCollision = function(obj){
        
        if(this.triggered)
            return;
        if(obj.hitbox.type != 'player')
            return;
        
        this.triggered = true;
        
        if(this.onTrigger)
            this.onTrigger();   
        if(!this.persistent)
            this.parent.removeChild(this);
    };
    
    Trigger = createjs.promote(Trigger, 'Container');
    Trigger.initialized = true;
})();