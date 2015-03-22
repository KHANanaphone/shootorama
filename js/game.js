var Game = {
    playingArea: null,
    hudArea: null,
    player: null
};

Game.init = function(stage){
    
    //Player
    Game.player = new Player();
    
    //Playing Area
    Game.playingArea = new PlayingArea();
    stage.addChild(Game.playingArea);
    
    Game.playingArea.addChild(Game.player);
    Game.playingArea.addChild(new Enemy({x: 300, y: 300}));
    
    //Hud Area
    Game.hudArea = new HudArea();
    stage.addChild(Game.hudArea);
    
    Game.hudArea.addChild(new DashMeter(Game.player));
};

Game.tick = function(){
    
    Game.handleCollisions();
}

Game.handleCollisions = function(){
    
    
}