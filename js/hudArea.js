function HudArea(){
    
    if(!HudArea.initialized){
        HudArea.init();
        return new HudArea();
    }
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();    
    
    function setupVars(){
    };
    
    function setupComponents(){
        
        var boundary = new createjs.Shape();
        boundary.graphics.beginStroke('Black').drawRect(0, 600, 1000, 120); 
        this.addChild(boundary);
    };
    
    function setupEvents(){
    };
}

HudArea.init = function(){
    
    var prototype = createjs.extend(HudArea, createjs.Container);
    
    //prototypez
    
    HudArea = createjs.promote(HudArea, 'Container');
    HudArea.initialized = true;
}