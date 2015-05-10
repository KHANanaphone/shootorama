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
        this.rotation = player.facing;
        this.triggered = {};
        this.startup = 2;
        
        this.hitbox = {
            type: 'illusion',
            collidesWith: ['enemy', 'enemyWeapon'],
            width: this.player.size,
            height: this.player.size
        };
        
        this.effectsManager = new EffectsManager(this);       
    };
    
    function setupComponents(){
               
        this.sprite = SpriteManager.makeSprite('playerIllusion');  
        this.sprite.rotation = -90;        
        this.addChild(this.sprite);
    };
    
    function setupEvents(){
        
    }
};

(Illusion.init = function(){
    
    var prototype = createjs.extend(Illusion, createjs.Container);
      
    prototype.tick = function(){

        this.effectsManager.tick();
        
        if(this.startup){
            this.startup--;
            return;
        }        
        
        this.alpha -= 0.05;

        if(this.alpha <= 0)
            this.parent.removeChild(this);
    };
    
    prototype.handleCollision = function(obj){
        
        if(this.alpha < 0.1)
            return;
        if(this.triggered[obj.id])
            return;
        if(!obj.triggersIllusion)
            return;        
        if(this.startup)
            return;
        
        this.triggered[obj.id] = true;
        this.player.triggerIllusion();
        
        if(obj.triggerIllusion)
            obj.triggerIllusion();        
            
        this.effectsManager
            .addEffect(new ScaleEffect(this.sprite, {
            to: 2,
            time: 10
        }));

        this.effectsManager
            .addEffect(new ColorEffect(this.sprite, {
            duration: -1, r: 1, g: 0, b: 1, scaleStart: 0.75
        }));
    };
    
    Illusion = createjs.promote(Illusion, 'Container');
    Illusion.initialized = true;
})();