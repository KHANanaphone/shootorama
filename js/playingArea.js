function PlayingArea(stage){
    
    this.stage = stage;
    this.player = new Player();
    
    stage.addChild(this.player);
};