function Illusion(player){
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();
    
    function setupVars(){

        this.type = 'illusion';
        this.player = player;
        this.x = player.x;
        this.y = player.y;
        this.rotation = player.rotation;
        this.triggered = {};
        this.startup = 8;
        
        this.hitbox = {
            type: 'illusion',
            collidesWith: ['enemy'],
            width: this.player.size,
            height: this.player.size
        };
        
    };
    
    function setupComponents(){
               
        this.rect = new createjs.Shape();
        this.rect.graphics.beginStroke("SeaGreen").drawRect(
            player.size / -2, 
            player.size / -2,
            player.size, 
            player.size);
        this.rect.setBounds(-player.size, -player.size, player.size * 2, player.size * 2);

        this.addChild(this.rect);
        this.rectEffectsManager = new EffectsManager(this.rect);
    };
    
    function setupEvents(){
        
    }
};

(Illusion.init = function(){
    
    var prototype = createjs.extend(Illusion, createjs.Container);
      
    prototype.tick = function(){

        this.rectEffectsManager.tick();
        
        if(this.startup){
            this.startup--;
            return;
        }        
        
        this.alpha -= 0.05;

        if(this.alpha <= 0)
            this.parent.removeChild(this);
    };
    
    prototype.handleCollision = function(obj){
        
        if(this.alpha < 0.2)
            return;
        if(this.triggered[obj.id])
            return;
        if(!obj.triggersIllusion)
            return;        
        if(this.startup)
            return;
        
        this.triggered[obj.id] = true;
        this.player.triggerIllusion();
        obj.triggerIllusion();
        
        if(!this.rect.expanding){
            
            this.rect.expanding = true;
            
            this.rectEffectsManager
                .addEffect(new ScaleEffect(this.rect, {
                to: 2,
                time: 10
            }));
            
            this.rectEffectsManager
                .addEffect(new ColorEffect(this.rect, {
                duration: -1, r: 1, g: 0, b: 1
            }));
        }
    };
    
    Illusion = createjs.promote(Illusion, 'Container');
    Illusion.initialized = true;
})();