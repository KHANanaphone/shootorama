var Main = {};

Main.init = function(){
    
    var stage = new createjs.Stage("gameCanvas");
    
    createjs.Ticker.setFPS(30);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick', tick);
    
    var area = new PlayingArea(stage);
    
    function tick(){
        
        stage.update();
    }
}

