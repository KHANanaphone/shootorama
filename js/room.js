function Room (roomdef, x, y) {
    
    this.Container_constructor();
        
    this.roomX = x;
    this.roomY = y;
    this.fading = [];    
    this.roomdef = roomdef;
    this.playerSpawnPoint = {x: 500, y: 300};
    this.visited = false;
        
    this.transitionTriggers = {

        left: new TransitionTrigger('left', -20, 300, 2, 600),
        right: new TransitionTrigger('right', 1020, 300, 2, 600),
        up: new TransitionTrigger('up', 500, -20, 1000, 2),
        down: new TransitionTrigger('down', 500, 620, 1000, 2)
    };
    
    this.addObject(this.transitionTriggers.left);
    this.addObject(this.transitionTriggers.right);
    this.addObject(this.transitionTriggers.up);
    this.addObject(this.transitionTriggers.down);
    
    this.bgRect = new createjs.Shape();
    this.addChild(this.bgRect);
    
    this.tileGrid = new TileGrid(this);
    this.addChild(this.tileGrid);
    
    this.roomdef.room = this;
    this.roomdef.init();
};

(function(){
    
    var prototype = createjs.extend(Room, createjs.Container);
    
    prototype.entering = function(from){
        
        if(this.roomdef.entering)
            this.roomdef.entering(from);
    };
    
    prototype.start = function(){
        
        if(this.roomdef.start)
            this.roomdef.start(!this.visited);

        this.visited = true;
    };
    
    prototype.enter = function(){
        
        //call the init function of all objects with persistence
        //set to 'reset'
        for(var i = this.children.length - 1; i >= 0; i--){
            
            var c = this.children[i];
            
            if(c.persistence == 'reset' && c.init)
                c.init();
        };
    };    
    
    prototype.leave = function(){
        
        for(var i = this.children.length - 1; i >= 0; i--){
            
            var c = this.children[i];
            
            if(c.persistence == 'remove')
                this.removeChildAt(i);            
        };
    };
    
    prototype.setupTick = function(){
        
        if(this.fading.length == 0){
            this.ready = true;
            return;
        };
        
        var currentLayer = 9999;
        
        for(var i = 0; i < this.fading.length; i++)
            if(this.fading[i].layer < currentLayer)
                currentLayer = this.fading[i].layer;
        
        for(var i = this.fading.length - 1; i >= 0; i--){
            
            var fade = this.fading[i];
            
            if(fade.layer > currentLayer)
                continue;
            
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
                    this.removeObject(fade.obj);
            };
        };
    };
    
    prototype.tick = function(){
        
        if(!this.started){            
            this.started = true;
            this.start();
        }
        
        this.setupTick();
        
        for(var i = 0; i < this.children.length; i++){
            
            var c = this.children[i];
            
            if(c.tick)
                c.tick();
        };
        
        CollisionManager.detectCollisions();
        
        if(this.roomdef.tick)
            this.roomdef.tick();
    };
    
    prototype.removeChildrenOfType = function(type){
        
        for(var i = this.children.length - 1; i >= 0; i--){
            
            var c = this.children[i];
            
            if(c.type == type)
                this.removeChildAt(i);
        };
    };
    
    prototype.makePlayer = function(){
        
        var checkpoint = this.tileGrid.getTileOfType('Checkpoint');
                     
        if(checkpoint){
            Game.player.x = checkpoint.x;
            Game.player.y = checkpoint.y;
        }
        else{
            Game.player.x = this.playerSpawnPoint.x;
            Game.player.y = this.playerSpawnPoint.y;
        }
        
        Game.player.alpha = 0;
        this.addObject(Game.player, {fade: {pause: true}});
    };
    
    prototype.addWall = function(pt1, pt2, vars){
        
        var params = {
            x: pt1[0],
            y: pt1[1],
            width: pt2[0] - pt1[0],
            height: pt2[1] - pt1[1]
        };
        
        if(vars)
            for(var attr in vars) { params[attr] = vars[attr]; }        

        var wall = new Wall(params);        
        this.addObject(wall, vars);
        return wall;
    };
    
    prototype.addObject = function(obj, vars){
        
        if(!obj)
            return;
        if(!vars)
            vars = {};
        
        if(vars.persistence)
            obj.persistence = vars.persistence;
        else 
            obj.persistence = obj.persistence ? obj.persistence : 'remove';
        
        obj.room = this;
        
        if(vars.fade){
            
            if(typeof vars.fade !== 'object')
                vars.fade = {};
            
            obj.alpha = 0;
            
            this.fading.push({               
                type: 'in',
                obj: obj,
                ticks: vars.fade.ticks ? vars.fade.ticks : 25,
                layer: vars.fade.layer ? vars.fade.layer : 0
            });
            
            if(vars.fade.pause)
                this.ready = false;
        };
        
        if(obj.init)
            obj.init();
        
        this.addChild(obj);
        
        return obj;
    };    
    
    prototype.removeObject = function(obj, vars){
            
        if(!obj)
            return;
        if(!vars)
            vars = {};
        
        if(vars.fade){
                      
            if(typeof vars.fade !== 'object')
                vars.fade = {};
            
            this.fading.push({               
                type: 'out',
                obj: obj,
                ticks: vars.fade.ticks ? vars.fade.ticks : 25,
                layer: vars.fade.layer ? vars.fade.layer : 0
            });
            
            if(vars.fade.pause)
                this.ready = false;
        }
        else {
            this.removeChild(obj);    
            
            if(obj.type == 'enemy')
                this.checkEnemyCount();       
        };  
    };
    
    prototype.getEnemyCount = function(){
        
        var enemyCount = 0;
        for(var i = 0; i < this.children.length; i++){

            if(this.children[i].type == 'enemy')
                enemyCount++;
        };
        
        return enemyCount;
    }
    
    prototype.checkEnemyCount = function(){
        
        var enemyCount = this.getEnemyCount();
        
        if(enemyCount == 0){
            
            if(this.onClear)
                this.onClear();
            
            if(this.roomdef.clear)
                this.roomdef.clear();            
        }
    };
    
    prototype.getCollidableChildren = function(){
        
        var collidable = [];
        recursiveGetCollidableChildren(this, collidable);
        
        return collidable;
        
        function recursiveGetCollidableChildren(obj, arr){
            
            for(var i = 0; i < obj.children.length; i++){
        
                var c = obj.children[i];
                
                if(c.hitbox)
                    arr.push(c);
                
                if(c.children)
                   recursiveGetCollidableChildren(c, arr); 
            };
        };        
    };    
    
    prototype.setBgColor = function(color){        
        
        this.bgRect.graphics.clear();
        this.bgRect.graphics.beginFill(color).drawRect(0, 0, 1000, 600);
    };
    
    prototype.addImage = function(imageName, x, y, w, h){
        
        var bitmap = new createjs.Bitmap(Resources.getResult(imageName));
        var bounds = bitmap.getBounds();        
        
        bitmap.set({
            x: x - w/2,
            y: y - h/2,
            scaleX: w / bounds.width,
            scaleY: h / bounds.height
        });
        
        this.addChild(bitmap);
        return bitmap;
    }; 
    
    prototype.addRect = function(color, x, y, w, h){
        
        var rect = new createjs.Shape();
        rect.graphics.beginFill(color).drawRect(x, y, w, h);
        this.addChild(rect);
    };
    
    prototype.addText = function(vars){
        
        var text = new createjs.Text();
        
        if(!vars.font)
            vars.font = '50px bitrod';
        
        text.set(vars);
        
        this.addChild(text);
    };
    
    Room = createjs.promote(Room, 'Container');
    Room.initialized = true;
    
})();