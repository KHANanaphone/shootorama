function PlayingArea(stage){
    
    this.stage = stage;
    this.player = new Player();
    
    stage.addChild(this.player);
    
    this.dashMeter = new DashMeter(this.player);
    stage.addChild(this.dashMeter);
};