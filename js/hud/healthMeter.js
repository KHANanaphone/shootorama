function HealthMeter(vars){
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();
    
    this.update();
    
    function setupVars(){
        
        this.redHealth = -1;
        
        this.player = vars.player;
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
    
    function setupEvents(){
        
        var meter = this;
        
        this.player.on('healthChanged', function(e){
            
            meter.update(e);
        });
        
        this.on('tick', this.tick);
    }
};

(function(){
    
    var prototype = createjs.extend(HealthMeter, createjs.Container);
    
    prototype.update = function(e){
    
        var scale = this.player.health / this.player.maxHealth;

        this.greenMeter.graphics.clear();
        this.greenMeter.graphics.beginFill('#8F8').drawRect(5, 5, 140 * scale, 20);
        
        if(e)
            this.redHealth = e.oldHealth;
    };
    
    prototype.tick = function(){
        
        if(this.redHealth == -1)
            return;
        
        if(this.redHealth <= this.player.health){
            this.redHealth = -1;
            this.redMeter.graphics.clear();
            return;
        }      
        
        this.redHealth -= this.player.maxHealth * 0.004;
        var start = this.player.health / this.player.maxHealth;
        var end = this.redHealth / this.player.maxHealth - start;
    
        this.redMeter.graphics.clear();        
        this.redMeter.graphics
            .beginFill('#F88')
            .drawRect(5 + 140 * start, 4.5, 140 * end, 20); 
    };
    
    HealthMeter = createjs.promote(HealthMeter, 'Container');
    HealthMeter.initialized = true;
})();