function PlayingArea(){
    
    if(!PlayingArea.initialized){
        PlayingArea.init();
        return new PlayingArea();
    }
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();    
    
    function setupVars(){
    };
    
    function setupComponents(){
        
        var boundary = new createjs.Shape();
        boundary.graphics.beginStroke('Black').drawRect(0, 0, 1024, 480); 
        this.addChild(boundary);
        this.boundary = boundary;
    };
    
    function setupEvents(){
    };
}

PlayingArea.init = function(){
    
    var prototype = createjs.extend(PlayingArea, createjs.Container);
    
    prototype.getTargets = PlayingArea.getTargets;
    
    PlayingArea = createjs.promote(PlayingArea, 'Container');
    PlayingArea.initialized = true;
}

PlayingArea.getTargets = function(point){
    
    var targets = [];
    
    for(var i = 0; i < this.children.length; i++){
        
        var obj = this.children[i];
        var hitbox = obj.hitbox;
        
        if(!hitbox)
            return;
        
        if(hitbox.shape == 'circle'){
            
            var circle = {
                center: {x: obj.x, y: obj.y},
                radius: hitbox.radius
            };
            
            if(inCircle(circle, point))
                targets.push({x: point.x, y: point.y, obj: obj});
        }
        else if(hitbox.shape == 'rect'){
            
            var rect = {
                x: obj.x,
                y: obj.y,
                w: hitbox.width,
                height: hitbox.height;
            };
            
            if(inRect(rect, point))
                targets.push({x: point.x, y: point.y, obj: obj});
        }
    }    
    
    return targets;
    
    function inCircle(circle, point){
        
    }
    
    function inRect(rect, point){
        
    }
}