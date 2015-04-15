var Game = {
    playingArea: null,
    hudArea: null,
    player: null,
    stage: null
};

Game.init = function(stage){
    
    Game.stage = stage;
    
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
};

Game.tick = function(){
    
    Game.handleCollisions();
}

Game.handleCollisions = function(){
    
    
}

Game.debugPixel = function(x, y){
    
    var ctx = Game.stage.canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(x, y, 2, 2);
}