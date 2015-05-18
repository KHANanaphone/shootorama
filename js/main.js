var Main = {};
var Resources = {};
var DEBUG = {};

Main.init = function(){
    
    Resources = new createjs.LoadQueue();
    Resources.on('complete', loadComplete);
    Resources.on('fileload', fileLoaded);
    Resources.loadManifest(Main.manifest);
    
    var loadedCount = 0;
    var total = Main.manifest.length;
    $('#loading .total').text(total);
    
    function fileLoaded(e){
        
        if(e.item.type == createjs.AbstractLoader.JAVASCRIPT){  
            
            document.body.appendChild(e.result);
        };
        
        loadedCount++;
        $('#loading .loaded').text(loadedCount);
    };
    
    function loadComplete(e){
        
        $('#loading').hide();
        
        var stage = new createjs.Stage("gameCanvas");
        this.stage = stage;
        createjs.Ticker.setFPS(60);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        
        var ticks = 0;
        
        createjs.Ticker.addEventListener('tick', function(){
            
            if(DEBUG.showFPS && createjs.Ticker.getTicks() % 60 == 0) 
                Main.updateFPS(createjs.Ticker.getMeasuredFPS());
            
            if(DEBUG.showHitboxes)
                Main.drawHitboxes();
            
            stage.update();
        });

        Game.init(stage);
    };
};

Main.updateFPS = function(fps){
   
    this.fpsText.text = Math.round(fps * 10) / 10;
};

Main.showFPS = function(source){
    
    DEBUG.showFPS = source.checked;
    
    if(source.checked){
        
        var text = new createjs.Text();
        text.x = 0;
        text.y = 800;
        this.fpsText = 'FPS: ' + text;
        
        Game.stage.addChild(text);
    }
    else {
        
        this.fpsText.parent.removeChild(this.fpsText);
    };
};

Main.debugShowHitboxes = function(source){
  
    DEBUG.showHitboxes = source.checked;
    
    if(!source.checked)
        removeDebugHitboxes();
    
    function removeDebugHitboxes(){
        
        if(!Game.currentRoom)
            return;
        
        recurse(Game.currentRoom);
    };
    
    function recurse(obj){
        
        for(var i = 0; i < obj.children.length; i++){
            
            var c = obj.children[i];
            
            if(c.debugHitbox){
                
                c.removeChild(c.debugHitbox);
                c.debugHitbox = null;
            };
            
            if(c.children)
                recurse(c);
        };        
    };
};

Main.drawHitboxes = function(){
    
    if(!Game.currentRoom)
        return;
    
    recurse(Game.currentRoom);
    
    function recurse(obj){
        
        for(var i = 0; i < obj.children.length; i++){
            
            var c = obj.children[i];
            
            if(c.hitbox && !c.debugHitbox){                
                
                var xOffset = c.hitbox.x ? c.hitbox.x : 0;
                var yOffset = c.hitbox.y ? c.hitbox.y : 0;
                
                c.debugHitbox = new createjs.Shape();
                c.debugHitbox.graphics.beginStroke('#00F').drawRect(
                    c.hitbox.width / -2 + xOffset, 
                    c.hitbox.height / -2 + yOffset,
                    c.hitbox.width, 
                    c.hitbox.height);
                c.addChild(c.debugHitbox);
            };
            
            if(c.children)
                recurse(c);
        };  
    };
};
