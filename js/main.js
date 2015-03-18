var Main = {};

Main.init = function(){
    
    var stage = new createjs.Stage("gameCanvas");
    
    createjs.Ticker.setFPS(30);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick', tick);
    
    var playingArea = PlayingArea.init(stage);
    
    this.dashMeter = new DashMeter(playingArea.player);
    stage.addChild(this.dashMeter);
    
    function tick(){
        
        stage.update();
    }
}

