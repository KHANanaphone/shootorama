function Checkpoint(vars){
    
    this.spriteName = 'checkpoint';    
    this.Tile_constructor(vars);
    this.caresAbout = {player : true};
    
    if(Game.level.isRespawnRoom(vars.room))
        this.setActive(true);
    else
        this.setActive(false);
};

(function(){
        
    var prototype = createjs.extend(Checkpoint, Tile);
    
    prototype.handleStep = function(player){
        
        if(this.activated)
            return;
        
        Game.checkpointTriggered();
        player.textEffect('Checkpoint');
        this.setActive(true);
    };
    
    prototype.setActive = function(set){
        
        if(set){
            this.sprite.gotoAndStop('active');
            this.activated = true;
        }
        else{
            this.sprite.gotoAndStop('inactive');
            this.activated = false;
        }
    };
    
    Checkpoint = createjs.promote(Checkpoint, 'Tile');
    Checkpoint.initialized = true;
    
})();