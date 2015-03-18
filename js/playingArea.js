var PlayingArea = {};

PlayingArea.init = function(stage){
    
    this.stage = stage;
    this.collisionObjects = [];
    
    this.player = new Player();    
    this.addCollisionObject(this.player);
    
    this.enemy = new Enemy({x: 300, y: 300});
    this.addCollisionObject(this.enemy);
    
    return this;
};

PlayingArea.addCollisionObject = function(obj){
    
    this.collisionObjects.push(obj);
    this.stage.addChild(obj);
}

PlayingArea.removeCollisionObject = function(obj){
        
    this.collisionObjects.splice(this.collisionObjects.indexOf(obj), 1);
    this.stage.removeChild(obj);
}

PlayingArea.findTargets = function(point){
    
    var targets = [];
    
    for(var i = 0; i < this.collisionObjects.length; i++){
        
        var obj = this.collisionObjects[i];
        if(obj.hitTest(point.x, point.y))
            targets.push({
                x: point.x,
                y: point.y
                //obj: obj
            });
    }    
    
    return targets;
}