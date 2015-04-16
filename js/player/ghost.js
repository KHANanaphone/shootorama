function Ghost(player){
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();
    
    function setupVars(){

        this.player = player;
        this.x = player.x;
        this.y = player.y;
        this.rotation = player.rotation;
    };
    
    function setupComponents(){
               
        var rect = new createjs.Shape();
        rect.graphics.beginStroke("SeaGreen").drawRect(
            player.size / -2, 
            player.size / -2,
            player.size, 
            player.size);

        this.addChild(rect);
    };
    
    function setupEvents(){
    
        this.on('tick', this.tick);
    }
};

(Ghost.init = function(){
    
    var prototype = createjs.extend(Ghost, createjs.Container);
      
    prototype.tick = function(){

        this.alpha -= 0.04;

        if(this.alpha <= 0)
            Game.playingArea.removeChild(this);
    }
    
    Ghost = createjs.promote(Ghost, 'Container');
    Ghost.initialized = true;
})();