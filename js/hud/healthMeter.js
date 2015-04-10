function HealthMeter(vars){

    if(!HealthMeter.initialized){
        
        HealthMeter.init();
        return new HealthMeter(vars);
    };
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();
    
    function setupVars(){
        
        this.player = vars.player;
        this.x = vars.x;
        this.y = vars.y;
    }
    
    function setupComponents(){
        
        var bgRect = new createjs.Shape();
        bgRect.graphics.beginFill('#000').drawRect(0, 0, 150, 30);
        this.addChild(bgRect);  
        
        var meter = new createjs.Shape();
        meter.graphics.beginFill('#F88').drawRect(5, 5, 140, 20);
        this.addChild(meter);
        this.meter = meter;
        
        var text = new createjs.Text('Health', '16px Serif', '#000');
        text.textAlign = 'center';
        text.x = 75;
        text.y = 6;
        this.addChild(text);
    };
    
    function setupEvents(){
        
        var meter = this;
        
        this.player.on('healthChanged', function(){
            meter.update();
        });
    }
};

HealthMeter.init = function(){
    
    var prototype = createjs.extend(HealthMeter, createjs.Container);
    
    prototype.update = HealthMeter.update;
    
    HealthMeter = createjs.promote(HealthMeter, 'Container');
    HealthMeter.initialized = true;
}

HealthMeter.update = function(){
    
    var scale = this.player.health / this.player.maxHealth;
    
    this.meter.graphics.clear();
    this.meter.graphics.beginFill('#F88').drawRect(5, 5, 140 * scale, 20);
}