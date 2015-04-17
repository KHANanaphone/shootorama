function CollisionManager(playingArea){
    
    this.playingArea = playingArea;
}

//Push the object with higher 'pushPriority'. If it's a tie, obj1 pushes obj2.
//If the object has no pushPriority, it is set to 0
CollisionManager.push = function(obj1, obj2){
    
    if(!obj1.pushPriority)
        obj1.pushPriority = 0;
    if(!obj2.pushPriority)
        obj2.pushPriority = 0;
    
    if(obj2.pushPriority > obj1.pushPriority){
        var pusher = obj2;
        var pushed = obj1;
    }
    else {
        var pusher = obj1;
        var pushed = obj2;        
    }        
    
    //center of this object to the center of the colliding object
    var xDist = pusher.x - pushed.x;
    var yDist = pusher.y - pushed.y;
    
    //how far away the objects have to be in this direction for them to be not touching
    var xBuffer = Math.abs(pusher.hitbox.width + pushed.hitbox.width) / 2;
    var yBuffer = Math.abs(pusher.hitbox.height + pushed.hitbox.height) / 2;    

    //how far this object would have to be moved to fix the collision
    var xPush, yPush;
    
    if(xDist > 0)
        xPush = pusher.x - xBuffer - pushed.x;
    else
        xPush = pusher.x + xBuffer - pushed.x;
    
    if(yDist > 0)
        yPush = pusher.y - yBuffer - pushed.y;
    else
        yPush = pusher.y + yBuffer - pushed.y;
    
    //push the least distance
    if(Math.abs(xPush) < Math.abs(yPush))
        pushed.x += xPush;
    else
        pushed.y += yPush;
};

//get vector between source and target
CollisionManager.getKnockbackVector = function(target, source, speed){
    
    var xDist = target.x - source.x;
    var yDist = target.y - source.y;
    var length = Math.sqrt(xDist * xDist + yDist * yDist);
    
    var vector = {
        x: xDist * speed / length,
        y: yDist * speed / length
    }
    
    return vector;
};

CollisionManager.prototype.detectCollisions = function(){
    
    var children = this.playingArea.children;
    
    for(var i = 0; i < children.length; i++){
    
        var obj1 = children[i];
        
        if(!obj1.hitbox)
            continue;
        
        for(var j = i + 1; j < children.length; j++){
            
            var obj2 = children[j];
            
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
        
        if(isNaN(obj1.x) || isNaN(obj1.y) || isNaN(obj2.x) || isNaN(obj2.y)){
            
            console.error("Object's location is valid.");
            return false;
        }
        
        var xDist = Math.abs(obj1.x - obj2.x) - (obj1.hitbox.width + obj2.hitbox.width) / 2;
        var yDist = Math.abs(obj1.y - obj2.y) - (obj1.hitbox.height + obj2.hitbox.height) / 2;
        
        if(isNaN(xDist) || xDist >= 0)
            return false;
        if(isNaN(yDist) || yDist >= 0)
            return false;
        
        return true;
    }
}

//get all children at the given point that match the desired hitbox 
// type in the array 'lookingFor'
CollisionManager.prototype.getTargets = function(point, lookingFor){
    
    var children = this.playingArea.children;
    var targets = [];
    
    for(var i = 0; i < children.length; i++){
        
        var obj = children[i];
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