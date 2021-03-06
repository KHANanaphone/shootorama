function DashMeter(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    setupEvents.call(this);  
    
    function setupVars(){

        this.x = vars.x;
        this.y = vars.y;
    }
    
    function setupComponents(){
        
        var bgRect = new createjs.Shape();
        bgRect.graphics.beginFill('#FFF').beginStroke('#000').drawRect(0, 0, 150, 30);
        this.addChild(bgRect);  
        
        var meter = new createjs.Shape();
        meter.graphics.beginFill('#AAA').drawRect(5, 5, 140, 20);
        this.addChild(meter);
        this.meter = meter;
        
        var text = new createjs.Text('D  A  S  H', '16px Serif', '#000');
        text.textAlign = 'center';
        text.x = 75;
        text.y = 6;
        this.addChild(text);
    };
    
    function setupEvents(){
        
    }
};

(function(){
    
    var prototype = createjs.extend(DashMeter, createjs.Container);
    
    prototype.tick = function(){
        
        var scale = 
            (Player.DASH_COOLDOWN_TICKS - Game.player.movementManager.dashCooldown) 
        / Player.DASH_COOLDOWN_TICKS;

        if(scale < 1){  
            this.ready = false;
            this.meter.graphics.clear();
            this.meter.graphics.beginFill('#AAA').drawRect(5, 5, 140 * scale, 20);
        }
        else if(!this.ready){
            this.ready = true;
            this.meter.graphics.clear();
            this.meter.graphics.beginFill('#AAA').drawRect(5, 5, 140, 20);
        }
    }
    
    DashMeter = createjs.promote(DashMeter, 'Container');
    DashMeter.initialized = true;
})();