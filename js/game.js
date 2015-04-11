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
    
    Game.MakeWalls();
    
    //Hud Area
    Game.hudArea = new HudArea();
    stage.addChild(Game.hudArea);
    
    Game.hudArea.addChild(new HealthMeter({
        x:20,
        y:630,
        player: Game.player
    }));
    Game.hudArea.addChild(new DashMeter({
        x:20,
        y:670,
        player: Game.player
    }));
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

Game.MakeWalls = function(){
    
    var leftWall = new Wall({x: 5, y: 300, width: 10, height: 600}); 
    var rightWall = new Wall({x: 995, y: 300, width: 10, height: 600});
    var topWall = new Wall({x: 500, y: 5, width: 1000, height: 10}); 
    var botWall = new Wall({x: 500, y: 595, width: 1000, height: 10});
    
    Game.playingArea.addChild(leftWall);
    Game.playingArea.addChild(rightWall);
    Game.playingArea.addChild(topWall);
    Game.playingArea.addChild(botWall);
}