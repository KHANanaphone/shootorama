function Vendor(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        this.persistence = 'reset';        
        this.pushPriority = 9999;
        
        this.hitbox = {
            type: 'solid',
            width: 48,
            height: 48
        };
        
        this.size = 48;
        
        this.effectsManager = new EffectsManager(this);
    };
    
    function setupComponents(){
                       
        this.sprite = 
            SpriteManager.makeSprite('vendor');
        
        this.addChild(this.sprite);
    };
};

(function(){
        
    var prototype = createjs.extend(Vendor, createjs.Container);
      
    prototype.init = function(){
        
        this.effectsManager.clearAll();
    };
    
    prototype.tick = function(){
        
        this.effectsManager.tick();
    };
    
    prototype.say = function(text){
        
        this.effectsManager.addEffect(
            new TextEffect(this, {
                color: 'white',
                text: text,
                time: 500
            })
        );
    };
    
    prototype.hit = function(){
        
        var dialogs = [
            'Ow.',
            'Stop That.',
            'Quit it!',
            "Well, that's rude.",
            'Mama mia!',
            'Augh!',
            'Blarg!',
            'No effect.',
            'Go away.'
        ];
        var r = Math.floor(Math.random() * dialogs.length);
        
                
        this.say(dialogs[r]);        
    };
    
    Vendor = createjs.promote(Vendor, 'Container');
    Vendor.initialized = true;
})();