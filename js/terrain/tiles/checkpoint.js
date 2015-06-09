function Checkpoint(vars){
    
    this.spriteName = 'checkpoint';    
    this.Tile_constructor(vars);
    this.caresAbout = {player : true};
    
    if(Game.level.isRespawnRoom(vars.room)){        
        this.sprite.gotoAndStop('activated');
        this.activated = true;
    }
};

(function(){
        
    var prototype = createjs.extend(Checkpoint, Tile);
    
    prototype.handleStep = function(player){
        
        if(this.activated)
            return;
        
        this.activated = true;
        Game.checkpointTriggered();
        this.sprite.gotoAndStop('activated');
        player.textEffect('Checkpoint');
    };
    
    Checkpoint = createjs.promote(Checkpoint, 'Tile');
    Checkpoint.initialized = true;
    
})();