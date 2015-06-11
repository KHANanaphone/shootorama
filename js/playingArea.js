function PlayingArea(){
    
    this.Container_constructor();

    setupVars.call(this);
    setupComponents.call(this);
    setupEvents.call(this); 
    
    function setupVars(){
        
        this.alpha = 0;        
        this.ready = false;
    };
    
    function setupComponents(){
        
        var boundary = new createjs.Shape();
        boundary.graphics.beginStroke('Black').drawRect(0, 0, 1000, 600); 
        this.addChild(boundary);
    };
    
    function setupEvents(){
        
        this.on('tick', this.tick);
    };
}

(function(){
    
var prototype = createjs.extend(PlayingArea, createjs.Container);

    prototype.fadeInRoom = function(room){
        
        this.ready = false;
        room.started = false;
        
        this.fadeStatus = {
            room: room,
            fadeOutFramesLeft: this.currentRoom ? 25 : 0,
            fadeInFramesLeft: 25
        };
    };
    
    prototype.transitionRoom = function(next, direction){
        
        this.ready = false;
        next.started = false;
        var ticks;
        var enterFrom;
                
        if(direction == 'left'){
            next.x = -1000;
            next.y = 0;
            Game.player.x += 1000;

            ticks = 75;
            enterFrom = 'right';
        }
        else if(direction == 'right'){
            next.x = 1000;
            next.y = 0;
            Game.player.x -= 1000;
            ticks = 75;
            enterFrom = 'left';
        }
        else if(direction == 'up'){
            next.x = 0;
            next.y = -600;
            Game.player.y += 600;
            ticks = 60;
            enterFrom = 'down';
        }
        else if(direction == 'down'){
            next.x = 0;
            next.y = 600;
            Game.player.y -= 600;
            ticks = 60;
            enterFrom = 'up';
        }
        
        this.currentRoom.removeObject(Game.player);
        next.addObject(Game.player);
        next.entering(enterFrom);
        this.addChild(next);
        
        this.transitionStatus = {
            
            room: next,
            direction: direction,
            ticksLeft: ticks,
            ticks: ticks
        };
    };
    
    prototype.tick = function(){

        if(this.ready == false){    
            
            if(this.fadeStatus)
                this.handleFade();
            
            if(this.transitionStatus)
                this.handleTransition();
        }            
        else if(this.currentRoom.ready)
            this.currentRoom.tick();
        else
            this.currentRoom.setupTick();
    };
    
    prototype.handleTransition = function(){
        
        var ts = this.transitionStatus;
        
        if(ts.ticksLeft > 0){
            
            if(ts.direction == 'left'){
                this.currentRoom.x += 1000/ts.ticks;
                ts.room.x += 1000/ts.ticks;
                Game.player.x -= 50/ts.ticks;
            }
            else if(ts.direction == 'right'){
                this.currentRoom.x -= 1000/ts.ticks;
                ts.room.x -= 1000/ts.ticks;
                Game.player.x += 50/ts.ticks;
            }
            else if(ts.direction == 'up'){
                this.currentRoom.y += 600/ts.ticks;
                ts.room.y += 600/ts.ticks;
                Game.player.y -= 50/ts.ticks;
            }
            else if(ts.direction == 'down'){
                this.currentRoom.y -= 600/ts.ticks;
                ts.room.y -= 600/ts.ticks;
                Game.player.y += 50/ts.ticks;
            };
            
            ts.ticksLeft--;
        }
        else {
            
            this.removeChild(this.currentRoom);
            this.currentRoom = this.transitionStatus.room;
            this.ready = true;
            this.transitionStatus = null;
        }
    };
    
    prototype.handleFade = function(){
    
        
        if(this.fadeStatus.fadeOutFramesLeft > 0){
            this.fadeStatus.fadeOutFramesLeft--;
            this.alpha -= 0.04;
        }
        else if(this.fadeStatus.fadeOutFramesLeft == 0){

            this.fadeStatus.fadeOutFramesLeft = -1;

            if(this.currentRoom)        
                this.removeChild(this.currentRoom);

            this.currentRoom = this.fadeStatus.room;
            this.currentRoom.x = 0;
            this.currentRoom.y = 0;
            this.addChild(this.currentRoom);
        }
        else if(this.fadeStatus.fadeInFramesLeft > 0){

            this.fadeStatus.fadeInFramesLeft--;
            this.alpha += 0.04;
        }
        else if(this.fadeStatus.fadeInFramesLeft == 0){

            this.currentRoom.makePlayer();            
            this.fadeStatus.fadeInFramesLeft = -1;
            this.fadeStatus = null;
            this.ready = true;
        };
    };
    
    PlayingArea = createjs.promote(PlayingArea, 'Container');
    PlayingArea.initialized = true;
})();

