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
        boundary.graphics.beginStroke('Black').drawRect(0, 0, 1024, 610); 
        this.addChild(boundary);
        this.boundary = boundary;
    };
    
    function setupEvents(){
        
        this.on('tick', this.tick);
    };
}

PlayingArea.init = function(){
    
    var prototype = createjs.extend(PlayingArea, createjs.Container);
    
    prototype.tick = PlayingArea.tick;
    prototype.detectCollisions = PlayingArea.detectCollisions;
    prototype.getTargets = PlayingArea.getTargets;
    
    PlayingArea = createjs.promote(PlayingArea, 'Container');
    PlayingArea.initialized = true;
}

PlayingArea.tick = function(){
    
    this.detectCollisions();
}

PlayingArea.detectCollisions = function(){
    
    for(var i = 0; i < this.children.length; i++){
    
        var obj1 = this.children[i];
        
        if(!obj1.hitbox)
            continue;
        
        for(var j = i + 1; j < this.children.length; j++){
            
            var obj2 = this.children[j];
            
            if(!obj2.hitbox)
                continue;
            
            if(
                (obj1.hitbox.collidesWith.indexOf(obj2.hitbox.type) == -1) &&
                (obj2.hitbox.collidesWith.indexOf(obj1.hitbox.type) == -1) 
            )
                continue; //don't care about each other
            
            if(hasCollision(obj1, obj2)){
                obj1.handleCollision(obj2);
                obj2.handleCollision(obj1);
            }
        }        
    }   
    
    function hasCollision(obj1, obj2){
        
        var xDist = Math.abs(obj1.x - obj2.x) - (obj1.hitbox.width + obj2.hitbox.width) / 2;
        var yDist = Math.abs(obj1.y - obj2.y) - (obj1.hitbox.height + obj2.hitbox.height) / 2;
        
        if(xDist >= 0)
            return false;
        if(yDist >= 0)
            return false;
        
        return true;
    }
}

//get all children at the given point that match the desired hitbox 
// type in the array 'lookingFor'
PlayingArea.getTargets = function(point, lookingFor){
    
    var targets = [];
    
    for(var i = 0; i < this.children.length; i++){
        
        var obj = this.children[i];
        var hitbox = obj.hitbox;
        
        if(!hitbox)
            continue;
        
        if(lookingFor.indexOf(hitbox.type) == -1)
            continue;
        
        if(point.x < obj.x - hitbox.width / 2 ||
          point.x > obj.x + hitbox.width / 2 ||
          point.y < obj.y - hitbox.height / 2 ||
          point.y > obj.y + hitbox.height / 2)
            continue;
            
        targets.push({x: point.x, y: point.y, obj: obj});
    }    
    
    return targets;
}