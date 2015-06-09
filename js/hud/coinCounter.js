function CoinCounter(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.x = vars.x;
        this.y = vars.y;
        this.coins = Game.player.coins;
    };
    
    function setupComponents(){
        
        var sprite = SpriteManager.makeSprite('coin', true);
        this.addChild(sprite);

        var text = new createjs.Text();
        text.x = 60;
        text.y = 10;
        text.font = '30px bitrod';
        text.text = this.coins;
        text.color = '#000';   
        text.textAlign = 'right';
        this.text = text;
        this.addChild(text);        
    };
}

(function(){
    
    var prototype = createjs.extend(CoinCounter, createjs.Container);

    prototype.tick = function(){
        
        if(Game.player.coins != this.coins){
            
            this.coins = Game.player.coins;
            this.text.text = this.coins;
        };
    };
    
    CoinCounter = createjs.promote(CoinCounter, 'Container');
    
})();