function KeyCounter(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.x = vars.x;
        this.y = vars.y;
        this.keys = 0;
    };
    
    function setupComponents(){
        
        var sprite = SpriteManager.makeSprite('key', true);
        this.addChild(sprite);

        var text = new createjs.Text();
        text.x = 60;
        text.y = 10;
        text.font = '30px bitrod';
        text.text = this.keys;
        text.color = '#000';   
        text.textAlign = 'right';
        this.text = text;
        this.addChild(text);        
    };
}

(function(){
    
    var prototype = createjs.extend(KeyCounter, createjs.Container);

    prototype.tick = function(){
        
        if(Game.player.keys != this.keys){
            
            this.keys = Game.player.keys;
            this.text.text = this.keys;
        };
    };
    
    KeyCounter = createjs.promote(KeyCounter, 'Container');
    
})();