function HealthMeter(vars){
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    
    function setupVars(){
        
        this.lastHealth = -1;
        this.redHealth = -1;
        
        this.x = vars.x;
        this.y = vars.y;
    }
    
    function setupComponents(){
        
        var bgRect = new createjs.Shape();
        bgRect.graphics.beginFill('#FFF').beginStroke('#000').drawRect(0, 0, 150, 30);
        this.addChild(bgRect);  
        
        this.greenMeter = new createjs.Shape();
        this.addChild(this.greenMeter);
        
        this.redMeter = new createjs.Shape();
        this.addChild(this.redMeter);
        
        var text = new createjs.Text('Health', '16px Serif', '#000');
        text.textAlign = 'center';
        text.x = 75;
        text.y = 6;
        this.addChild(text);
    };
};

(function(){
    
    var prototype = createjs.extend(HealthMeter, createjs.Container);
    
    prototype.tick = function(){
        
        var player = Game.player;
        
        if(this.lastHealth != player.health){
            
            this.redHealth = this.lastHealth;            
            this.lastHealth = player.health;            
            
            var scale = player.health / player.maxHealth;

            this.greenMeter.graphics.clear();
            this.greenMeter.graphics.beginFill('#8F8').drawRect(5, 5, 140 * scale, 20);
        };        
        
        if(this.redHealth == -1)
            return;
        
        if(this.redHealth <= player.health){
            this.redHealth = -1;
            this.redMeter.graphics.clear();
            return;
        }      
        
        this.redHealth -= player.maxHealth * 0.004;
        var start = player.health / player.maxHealth;
        var end = this.redHealth / player.maxHealth - start;
    
        this.redMeter.graphics.clear();        
        this.redMeter.graphics
            .beginFill('#F88')
            .drawRect(5 + 140 * start, 4.5, 140 * end, 20); 
    };
    
    HealthMeter = createjs.promote(HealthMeter, 'Container');
    HealthMeter.initialized = true;
})();