var Main = {};
var Resources = {};

Main.init = function(){
    
    Resources = new createjs.LoadQueue();
    Resources.on('complete', loadComplete);
    Resources.loadManifest(Main.manifest);
    
    function loadComplete(e){
        
        var stage = new createjs.Stage("gameCanvas");
        createjs.Ticker.setFPS(60);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        
        createjs.Ticker.addEventListener('tick', function(){
                      
            stage.update();
        });

        Game.init(stage);
    };
}

Main.manifest = [
    
    {id: 'ghost', src: 'img/ghost.png'},
    {id: 'ghostOrange', src: 'img/ghostOrange.png'},
    {id: 'ghostBlue', src: 'img/ghostBlue.png'},
    
    {id: 'qmark', src: 'img/qmark.png'},
    {id: 'star', src: 'img/star.png'}
    
];
