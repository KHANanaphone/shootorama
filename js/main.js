var Main = {};
var Resources = {};
var DEBUG = {};

Main.init = function(){
    
    Resources = new createjs.LoadQueue();
    Resources.on('complete', loadComplete);
    Resources.on('fileload', fileLoaded);
    Resources.loadManifest(Main.manifest);
    
    function fileLoaded(e){
        
        if(e.item.type == createjs.AbstractLoader.JAVASCRIPT){
            
            document.body.appendChild(e.result);
        };
    };
    
    function loadComplete(e){
        
        var stage = new createjs.Stage("gameCanvas");
        createjs.Ticker.setFPS(60);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        
        createjs.Ticker.addEventListener('tick', function(){
                      
            if(DEBUG.showHitboxes)
                Main.drawHitboxes();
            
            stage.update();
        });

        Game.init(stage);
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

Main.manifest = [
    
        
    
    {id: 'player', src: 'img/player.png'},
    {id: 'playerIllusion', src: 'img/playerIllusion.png'},
    
    {id: 'ghost', src: 'img/ghost.png'},
    {id: 'ghostOrange', src: 'img/ghostOrange.png'},
    {id: 'ghostBlue', src: 'img/ghostBlue.png'},
    {id: 'ghostRed', src: 'img/ghostBlue.png'},
    
    {id: 'qmark', src: 'img/qmark.png'},
    {id: 'star', src: 'img/star.png'},
    
    {id: 'key', src: 'img/key.png'},
    {id: 'heart', src: 'img/heart.png'},
    {id: 'heartplus', src: 'img/heartplus.png'},
    {id: 'coin', src: 'img/coin.png'},
    
    {id: 'turret', src: 'img/turret.png'},
    {id: 'fire', src: 'img/fire.png'},
    
    {id: 'orbenergy', src: 'img/orbenergy.png'},
    {id: 'orbhealth', src: 'img/orbhealth.png'},
    {id: 'orbcoin', src: 'img/orbcoin.png'}
    
];
