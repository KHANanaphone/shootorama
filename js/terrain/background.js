function Background(){
    
    this.Container_constructor();
    this.x = 0;
    this.y = 0;
    this.persistence = 'persist';
    
    this.rect = new createjs.Shape();
    this.addChild(this.rect);    
    
    this.floorObjects = [];
    this.fading = [];
};

(function(){
        
    var prototype = createjs.extend(Background, createjs.Container);
    
    prototype.tick = function(){
        
        this._doFading();
    };
    
    prototype._doFading = function(){
        
        for(var i = this.fading.length - 1; i >= 0; i--){
            
            var fade = this.fading[i];
            
            if(fade.type == 'in')
                fade.obj.alpha += 0.04;
            else
                fade.obj.alpha -= 0.04;
            
            fade.ticks--;
            
            if(fade.ticks == 0){
                
                this.fading.splice(i, 1);
                
                if(fade.type == 'in')
                    fade.obj.alpha = 1;
                else
                    this._removeFloorObject(fade.obj);
            };
        };
    };
    
    prototype.addFloorObject = function(obj, fade){
        
        if(fade){    
            this.fading.push({
                type: 'in',
                obj: obj,
                ticks: 25
            });
            
            obj.alpha = 0;
        }
        
        this.addChild(obj);
        
        if(obj instanceof FloorObject)
            this.floorObjects.push(obj);
        
        return obj;
    };
        
    prototype.removeFloorObject = function(obj, fade){
                
        if(fade){    
            this.fading.push({
                type: 'out',
                obj: obj,
                ticks: 25
            });
        }
        else {            
            this._removeFloorObject(obj);
        }
    };
    
    prototype._removeFloorObject = function(obj){
        
        this.removeChild(obj);
        
        for(var i = 0; i < this.floorObjects.length; i++){
            
            if(obj.id == this.floorObjects[i].id){
                this.floorObjects.splice(i, 1);
                return;
            }
        };
    };        
    
    //gets the highest-level 'steppable' object under a point
    prototype.getFloorObjectAt = function(x, y){
        
        for(var i = this.floorObjects.length - 1; i >= 0; i--){
            
            var obj = this.floorObjects[i];
            
            if(obj.x <= x && obj.x + obj.width >= x &&
               obj.y <= y && obj.y + obj.height >= y){
                
                return obj;
            }
        };
        
        return null;
    };
    
    Background = createjs.promote(Background, 'Container');
    Background.initialized = true;
})();