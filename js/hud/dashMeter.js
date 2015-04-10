function DashMeter(vars){

    if(!DashMeter.initialized){
        
        DashMeter.init();
        return new DashMeter(vars);
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
        meter.graphics.beginFill('#FFF').drawRect(5, 5, 140, 20);
        this.addChild(meter);
        this.meter = meter;
        
        var text = new createjs.Text('D  A  S  H', '16px Serif', '#000');
        text.textAlign = 'center';
        text.x = 75;
        text.y = 6;
        this.addChild(text);
    };
    
    function setupEvents(){
        this.on('tick', this.tick);
    }
};

DashMeter.init = function(){
    
    var prototype = createjs.extend(DashMeter, createjs.Container);
    
    prototype.tick = DashMeter.tick;
    
    DashMeter = createjs.promote(DashMeter, 'Container');
    DashMeter.initialized = true;
}

DashMeter.tick = function(){
        
    var scale = 
        (Player.DASH_COOLDOWN_TICKS - this.player.movementManager.dashCooldown) / Player.DASH_COOLDOWN_TICKS;
    
    if(scale < 1){  
        this.ready = false;
        this.meter.graphics.clear();
        this.meter.graphics.beginFill('#AAA').drawRect(5, 5, 140 * scale, 20);
    }
    else if(!this.ready){
        this.ready = true;
        this.meter.graphics.clear();
        this.meter.graphics.beginFill('#FFF').drawRect(5, 5, 140, 20);
    }
}