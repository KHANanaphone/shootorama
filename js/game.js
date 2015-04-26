var Game = {
    playingArea: null,
    hudArea: null,
    player: null,
    stage: null,
    roomdefs: {}
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
    
    Game.fadeInRoom('r1');   
};

Game.fadeInRoom = function(id){
    
    this.currentRoom = new Room(Game.roomdefs[id]);
    Game.playingArea.fadeInRoom(this.currentRoom);
};

Game.transitionRoom = function(direction){
    
    var nextRoomId = this.playingArea.currentRoom.transitionTriggers[direction].targetId; 
    this.currentRoom = new Room(Game.roomdefs[nextRoomId]);    
    Game.playingArea.transitionRoom(this.currentRoom, direction);    
};