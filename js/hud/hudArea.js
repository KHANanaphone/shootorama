function HudArea(){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    setupEvents.call(this);    
    
    function setupVars(){
        
        this.y = 600;
    };
    
    function setupComponents(){
        
        var boundary = new createjs.Shape();
        boundary.graphics.beginStroke('Black').beginFill('White').drawRect(0, 0, 1000, 120); 
        this.addChild(boundary);
        
        this.healthMeter = new HealthMeter({
            x:20,
            y:30
        });
        this.addChild(this.healthMeter);
        
        this.dashMeter = new DashMeter({
            x:20,
            y:70
        });
        this.addChild(this.dashMeter); 
        
        this.keys = new KeyCounter({
            x: 950,
            y: 80
        });
        this.addChild(this.keys);
    };
    
    function setupEvents(){
        
        this.on('tick', this.tick);
    };
}

(function(){
    
    var prototype = createjs.extend(HudArea, createjs.Container);

    //prototypez
    prototype.tick = function(){
        
        if(!Game.player)
            return;
    
        for(var i = 0; i < this.children.length; i++)
            if(this.children[i].tick)
                this.children[i].tick();
    };

    HudArea = createjs.promote(HudArea, 'Container');
})();