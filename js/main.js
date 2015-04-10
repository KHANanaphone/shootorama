var Main = {};

Main.init = function(){
    
    var stage = new createjs.Stage("gameCanvas");
    
    createjs.Ticker.setFPS(60);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick', tick);
    
    Game.init(stage);
    
    function tick(){
        
        Game.tick();
        stage.update();
    }
}

