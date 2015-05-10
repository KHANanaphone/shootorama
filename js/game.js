var Game = {
    playingArea: null,
    hudArea: null,
    player: null,
    stage: null
};

Game.init = function(stage){
    
    Game.stage = stage;
    Game.player = new Player();
    
    //Playing Area
    Game.playingArea = new PlayingArea();
    stage.addChild(Game.playingArea);
    
    //Hud Area
    Game.hudArea = new HudArea();
    stage.addChild(Game.hudArea);
    
    Game.level = new Level('tutorial');
    Game.currentRoom = Game.level.currentRoom;
    Game.playingArea.fadeInRoom(Game.level.currentRoom);
};

Game.tryTransitionRoom = function(direction){
    
    if(!Game.level.tryTransitionRoom(direction))
        return false;
    
    Game.player.prepareForRoomTransition();
    Game.currentRoom = Game.level.currentRoom;
    Game.playingArea.transitionRoom(Game.level.currentRoom, direction);    
    
    return true;
};