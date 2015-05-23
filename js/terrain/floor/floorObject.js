function FloorObject(vars){
    
    this.Container_constructor();   
      
    this.x = vars.x;
    this.y = vars.y;
    this.width = vars.width;
    this.height = vars.height;
};

(function(){
        
    var prototype = createjs.extend(FloorObject, createjs.Container);
    
    FloorObject = createjs.promote(FloorObject, 'Container');
    FloorObject.initialized = true;
})();