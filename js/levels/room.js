function Room(roomdef){
    
    this.Container_constructor();
        
    this.enemies = [];    
    this.fading = [];    
    this.roomdef = roomdef;
    this.playerSpawnPoint = {x: 500, y: 300};
        
    this.transitionTriggers = {

        left: new TransitionTrigger('left', -20, 300, 2, 600),
        right: new TransitionTrigger('right', 1020, 300, 2, 600),
        up: new TransitionTrigger('up', 500, -20, 1000, 2),
        down: new TransitionTrigger('down', 500, 620, 1000, 2)
    };
    
    this.addChild(
        this.transitionTriggers.left,
        this.transitionTriggers.right,
        this.transitionTriggers.up,
        this.transitionTriggers.down);
    
    this.background = new Background();
    this.addChild(this.background);
    
    roomdef(this);    
};

(function(){
    
    var prototype = createjs.extend(Room, createjs.Container);
    
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
                    this.removeChild(fade.obj);
            };
        };
    };
    
    prototype.tick = function(){
        
        this.setupTick();
        
        for(var i = 0; i < this.children.length; i++){
            
            var c = this.children[i];
            
            if(c.tick)
                c.tick();
        };
        
        CollisionManager.detectCollisions();
    };
    
    prototype.removeChildrenOfType = function(type){
        
        for(var i = this.children.length - 1; i >= 0; i--){
            
            var c = this.children[i];
            
            if(c.type == type)
                this.removeChildAt(i);
        };
    };
    
    prototype.makePlayer = function(){
        
        Game.player = new Player();   
        Game.player.alpha = 0;
        Game.player.x = this.playerSpawnPoint.x;
        Game.player.y = this.playerSpawnPoint.y;
        this.addChild(Game.player);
        
        this.fading.push({
            type: 'in',
            obj: Game.player,
            ticks: 25,
            layer: 0
        });
    };
    
    prototype.addEnemy = function(enemy){
        
        var self = this;
        
        enemy.on('dead', function(e){
            
            self.enemyDead(e.target);
        });
        
        this.addChild(enemy);
        this.enemies.push(enemy);
    };
    
    prototype.enemyDead = function(dead){
        
        for(var i = this.enemies.length - 1; i >= 0; i--){
            
            var e = this.enemies[i];
            
            if(e.id == dead.id)
                this.enemies.splice(i, 1);
        };
        
        if(this.enemies.length == 0 && this.onClear)
            this.onClear(this);
    };
    
    prototype.fadeInObject = function(obj, layer, pause){
        
        if(!layer)
            layer = 0;
        
        obj.alpha = 0;
        this.ready = pause ? false : true;
        
        if(obj.type == 'enemy'){            
            this.addEnemy(obj);
        }
        else{
            this.addChild(obj);
        }
        
        this.fading.push({
            type: 'in',
            obj: obj,
            ticks: 25,
            layer: layer
        });
    };
    
    prototype.fadeOutObject = function(obj, layer, pause){
        
        if(!layer)
            layer = 0;
        
        this.ready = pause ? false : true;
        
        this.fading.push({
            type: 'out',
            obj: obj,
            ticks: 25,
            layer: layer
        });
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
    
    Room = createjs.promote(Room, 'Container');
    Room.initialized = true;
    
})();